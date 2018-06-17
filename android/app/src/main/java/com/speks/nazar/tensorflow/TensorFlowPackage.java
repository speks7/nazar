package com.artist.tensorflow;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.artist.tensorflow.TensorFlowModule;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by linytsysu on 09/09/17.
 */

public class TensorFlowPackage implements com.facebook.react.ReactPackage {
    @Override
    // Register Native Modules to JS
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        return Arrays.<NativeModule>asList(
                new TensorFlowModule(reactApplicationContext)
        );
    }

    @Override
    // Registers Java ViewManagers to JS
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
