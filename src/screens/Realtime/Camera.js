import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";

import { StatusBar, View, StyleSheet, Dimensions } from "react-native";

export default class MyCamera extends PureComponent<void, *, void> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <RNCamera
          ref={cam => {
            this.props.setCam(cam);
          }}
          playSoundOnCapture={false}
          jpegQuality={40}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  }
});
