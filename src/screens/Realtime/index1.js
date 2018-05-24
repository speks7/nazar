import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import PropTypes from "prop-types";
import { Button, Text, Icon } from "react-native-elements";
import { RNCamera } from "react-native-camera";

import Clarifai from "clarifai";
import { CLARIFAY_KEY } from "react-native-dotenv";
import timer from "react-native-timer";

import Camera from "./Camera";
import styles from "./styles";
import Notif from "../../components/Notif";

class Realtime extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      value: null,
      flashMode: RNCamera.Constants.FlashMode.auto,
      flash: "auto",
      showFlashOptions: false,
      type: RNCamera.Constants.Type.back
    };

    this._cancel = this._cancel.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.selectFlashMode = this.selectFlashMode.bind(this);
    this.showFlashOptionsBlock = this.showFlashOptionsBlock.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    timer.setInterval(this, "takePicture", () => this.takePicture(), 1000);
    timer.setInterval(this, "clearInterval", () => this.clearInterval(), 30000);
  }

  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: CLARIFAY_KEY //dummy
    });

    process.nextTick = setImmediate; // RN polyfill

    /*const { data } = this.props.navigation.state.params.image;
    const file = { base64: data };

    clarifai.models
      .predict(Clarifai.GENERAL_MODEL, file)
      .then(response => {
        const { concepts } = response.outputs[0].data;

        if (concepts && concepts.length > 0) {
          for (const prediction of concepts) {
            return this.setState({
              loading: false,
              result: prediction.name,
              value: prediction.value
            });
          }
        }
      })
      .catch(err => alert(err));*/
    /*
      .catch(e => {
        Alert.alert(
          "An error has occurred",
          "Sorry, the quota may be exceeded, try again later!",
          [{ text: "OK", onPress: () => this._cancel() }],
          { cancelable: false }
        );
      });*/
  }

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  async clearInterval() {
    timer.clearInterval(this);
    this.setState({
      loading: true,
      captureText: ""
    });
  }

  selectFlashMode(type) {
    if (type === "auto") {
      this.setState({
        flashMode: RNCamera.Constants.FlashMode.auto,
        flash: "auto",
        showFlashOptions: false
      });
    } else if (type === "off") {
      this.setState({
        flashMode: RNCamera.Constants.FlashMode.off,
        flash: "off",
        showFlashOptions: false
      });
    } else {
      this.setState({
        flashMode: RNCamera.Constants.FlashMode.on,
        flash: "on",
        showFlashOptions: false
      });
    }
  }

  showFlashOptionsBlock() {
    this.setState({
      showFlashOptions: true
    });
  }

  switchCamera() {
    if (this.state.type === RNCamera.Constants.Type.back) {
      this.setState({
        type: RNCamera.Constants.Type.front
      });
    } else {
      this.setState({
        type: RNCamera.Constants.Type.back
      });
    }
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const datas = await this.camera.takePictureAsync(options);
      const file = datas.uri;
      const data = datas.uri;

      clarifai.models
        .predict(Clarifai.GENERAL_MODEL, file)
        .then(response => {
          const { concepts } = response.outputs[0].data;

          if (concepts && concepts.length > 0) {
            for (const prediction of concepts) {
              this.setState({
                loading: false,
                result: prediction.name,
                value: prediction.value
              });
            }
          }
        })
        .catch(err => alert(err));
    }
  }

  _cancel() {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  render() {
    let autoColor = this.state.flash === "auto" ? "yellow" : "white";
    let onColor = this.state.flash === "on" ? "yellow" : "white";
    let offColor = this.state.flash === "off" ? "yellow" : "white";
    return (
      <View style={styles.container}>
        <View style={styles.cameraOptionsHeader}>
          {this.state.showFlashOptions ? (
            <View style={styles.flashOptionsContainer}>
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={() => this.selectFlashMode("auto")}
              >
                <Text style={[{ color: autoColor }, styles.flashOptionsText]}>
                  Auto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={() => this.selectFlashMode("on")}
              >
                <Text style={[{ color: onColor }, styles.flashOptionsText]}>
                  On
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={() => this.selectFlashMode("off")}
              >
                <Text style={[{ color: offColor }, styles.flashOptionsText]}>
                  Off
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={this.showFlashOptionsBlock}>
              <Icon
                style={styles.flashIcon}
                type="MaterialIcons"
                name={
                  this.state.flash === "auto"
                    ? "flash-auto"
                    : this.state.flash === "on"
                      ? "flash-on"
                      : "flash-off"
                }
              />
            </TouchableOpacity>
          )}
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.type}
          flashMode={this.state.flashMode}
          mirrorImage={true}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            onPress={this.switchCamera}
          >
            <Icon
              style={styles.cameraIcon}
              type="Ionicons"
              name="reverse-camera"
            />
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Icon
              iconStyle={styles.googleLink}
              type="font-awesome"
              name="google"
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/search?q=${this.state.result}`
                )
              }
            />
            <Icon
              iconStyle={styles.wikiLink}
              type="font-awesome"
              name="wikipedia-w"
              onPress={() =>
                Linking.openURL(
                  `https://en.m.wikipedia.org/w/index.php?search=${
                    this.state.result
                  }&title=Special:Search&fulltext=1`
                )
              }
            />
          </View>
          <Button
            text="Revert"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.Button}
            textStyle={styles.ButtonText}
            onPress={this._cancel}
          />
        </View>
        )}
      </View>
    );
  }
}

Realtime.propTypes = {
  navigation: PropTypes.object
};

export default Realtime;
