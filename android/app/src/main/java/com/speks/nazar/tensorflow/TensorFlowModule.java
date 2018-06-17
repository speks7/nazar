package com.artist.tensorflow;

/**
 * Created by dano on 01/03/17.
 */
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import android.graphics.Matrix;

import android.provider.MediaStore;
import android.net.Uri;
import android.content.Context;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.media.Image;
import android.media.Image.Plane;
import android.media.ImageReader;
import android.media.ImageReader.OnImageAvailableListener;
import android.os.Bundle;
import android.os.SystemClock;
import android.os.Trace;

import java.nio.ByteBuffer;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import org.tensorflow.TensorFlow;
import org.tensorflow.contrib.android.TensorFlowInferenceInterface;
import com.artist.tensorflow.utils.ImageUtils;


public class TensorFlowModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("tensorflow_inference");
    }

    private static final String MODEL_FILE = "file:///android_asset/stylize_v1/stylize_quantized.pb";

    private Context context;
    private TensorFlowInferenceInterface inferenceInterface;
    private static final String INPUT_NODE = "input";
    private static final String STYLE_NODE = "style_num";
    private static final String OUTPUT_NODE = "transformer/expand/conv3/conv/Sigmoid";
    private static final int NUM_STYLES = 26;

    private final float[] styleVals = new float[NUM_STYLES];
    private int[] intValues;
    private float[] floatValues;

    private int previewWidth = 0;
    private int previewHeight = 0;
    private int desiredSize = 1024;

    private Bitmap sourceBitmap = null;
    private Bitmap croppedBitmap = null;
    private Matrix frameToCropTransform;
    private Matrix cropToFrameTransform;

    public TensorFlowModule (ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "TensorFlowModule";
    }

    @ReactMethod
    public void getVersion(Promise promise) {
        promise.resolve(TensorFlow.version());
    }

    @ReactMethod
    public void stylize(String uri, int styleIndex, Promise promise) throws IOException {
        inferenceInterface = new TensorFlowInferenceInterface(context.getAssets(), MODEL_FILE);
        
        sourceBitmap = MediaStore.Images.Media.getBitmap(this.context.getContentResolver(), Uri.parse(uri));

        previewWidth = sourceBitmap.getWidth();
        previewHeight = sourceBitmap.getHeight();

        croppedBitmap = Bitmap.createBitmap(desiredSize, desiredSize, Config.ARGB_8888);

        frameToCropTransform =
            ImageUtils.getTransformationMatrix(
                previewWidth, previewHeight,
                desiredSize, desiredSize,
                0, true);
        cropToFrameTransform = new Matrix();
        frameToCropTransform.invert(cropToFrameTransform);

        final Canvas canvas = new Canvas(croppedBitmap);
        canvas.drawBitmap(sourceBitmap, frameToCropTransform, null);

        intValues = new int[desiredSize * desiredSize];
        floatValues = new float[desiredSize * desiredSize * 3];

        croppedBitmap.getPixels(
            intValues, 0, croppedBitmap.getWidth(), 0, 0, croppedBitmap.getWidth(), croppedBitmap.getHeight());
        for (int i = 0; i < intValues.length; ++i) {
            final int val = intValues[i];
            floatValues[i * 3] = ((val >> 16) & 0xFF) / 255.0f;
            floatValues[i * 3 + 1] = ((val >> 8) & 0xFF) / 255.0f;
            floatValues[i * 3 + 2] = (val & 0xFF) / 255.0f;
        }
        for (int i = 0; i < NUM_STYLES; ++i) {
            if (i == styleIndex) {
                styleVals[styleIndex] = 1.0f;
            } else {
                styleVals[i] = 0.0f;
            }
        }

        inferenceInterface.feed(
            INPUT_NODE, floatValues, 1, croppedBitmap.getWidth(), croppedBitmap.getHeight(), 3);
        inferenceInterface.feed(STYLE_NODE, styleVals, NUM_STYLES);
        inferenceInterface.run(new String[] {OUTPUT_NODE}, false);
        inferenceInterface.fetch(OUTPUT_NODE, floatValues);

        for (int i = 0; i < intValues.length; ++i) {
            intValues[i] =
                0xFF000000
                    | (((int) (floatValues[i * 3] * 255)) << 16)
                    | (((int) (floatValues[i * 3 + 1] * 255)) << 8)
                    | ((int) (floatValues[i * 3 + 2] * 255));
        }
        croppedBitmap.setPixels(
            intValues, 0, croppedBitmap.getWidth(), 0, 0, croppedBitmap.getWidth(), croppedBitmap.getHeight());

        // get uri object from bitmap
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        croppedBitmap.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
        String path = MediaStore.Images.Media.insertImage(this.context.getContentResolver(), croppedBitmap, "Title", null);
        // Uri.parse(path)

        // get real path from uri object
        String [] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = this.context.getContentResolver().query(Uri.parse(path), proj, null, null, null);
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String realPath = cursor.getString(column_index);
        cursor.close();

        promise.resolve(realPath);
    }
}
