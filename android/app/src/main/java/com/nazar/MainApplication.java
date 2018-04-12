package com.speks.nazar;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import cl.json.RNSharePackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
//import com.wix.RNCameraKit.RNCameraKitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactlibrary.RNOpenCvLibraryPackage;

import org.opencv.android.BaseLoaderCallback;
import org.opencv.android.LoaderCallbackInterface;

import java.util.Arrays;
import java.util.List;

import org.opencv.android.OpenCVLoader;

import android.util.Log;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new RNViewShotPackage(),
            new RNSharePackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNAdMobPackage(),
          new RNOpenCvLibraryPackage()
            //new RNCameraKitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

    private BaseLoaderCallback mLoaderCallback = new BaseLoaderCallback(this) {
    @Override
    public void onManagerConnected(int status) {
      switch (status) {
        case LoaderCallbackInterface.SUCCESS:
        {
          Log.i("OpenCV", "OpenCV loaded successfully");
        } break;
        default:
        {
          super.onManagerConnected(status);
        } break;
      }
    }
  };

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    if (!OpenCVLoader.initDebug()) {
      Log.d("OpenCv", "Error while init");
    }
  }

  public void onResume()
  {
    if (!OpenCVLoader.initDebug()) {
      Log.d("OpenCV", "Internal OpenCV library not found. Using OpenCV Manager for initialization");
      OpenCVLoader.initAsync(OpenCVLoader.OPENCV_VERSION_3_0_0, this, mLoaderCallback);
    } else {
      Log.d("OpenCV", "OpenCV library found inside package. Using it!");
      mLoaderCallback.onManagerConnected(LoaderCallbackInterface.SUCCESS);
    }
  }

}
