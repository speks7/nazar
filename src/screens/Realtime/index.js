"use strict";
import React, { Component } from "react";
import {
  Animated,
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
  ScrollView,
  Button,
  NetInfo
} from "react-native";
import { RNCamera } from "react-native-camera";
import { Text, Icon } from "react-native-elements";
import timer from "react-native-timer";
import SlidingUpPanel from "rn-sliding-up-panel";
import { TfImageRecognition } from "react-native-tensorflow";

import styles from "./styles";

export default class Realtime extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.image = require("../../../assets/dumbbell.jpg");
    this.state = {
      result: "Detected item",
      value: "",
      flashMode: RNCamera.Constants.FlashMode.off,
      flash: "auto",
      showFlashOptions: false,
      type: RNCamera.Constants.Type.back,
      visible: false
    };
    //this.alreadySelectedImages = this.props.navigation.state.params.alreadySelectedImages;
    this.goBack = this.goBack.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.selectFlashMode = this.selectFlashMode.bind(this);
    this.showFlashOptionsBlock = this.showFlashOptionsBlock.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    timer.setInterval(this, "takePicture", () => this.takePicture(), 1000);
    timer.setInterval(this, "clearInterval", () => this.clearInterval(), 30000);
  }

  componentDidMount() {
    process.nextTick = setImmediate; // RN polyfill
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
  };

  async _reg(img, basimg) {
    var preder = "data:image/jpg;base64," + basimg;
    var preder2 = null;
    var items = "";
    if (this.state.status) {
      fetch("https://nazar-server.herokuapp.com/classify_image/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: [
            {
              image64: preder
              //image64: "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACqgAAAqoBkhG1CAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANASURBVEiJtZVLaFxlFMd/57s3M0pFazCTR2utUhQNmaRqrS248NEspJsuBKWPVYpNYpJidVEqbbAR026kyYwo3QmC1o2L7ISgIIq0NJmEUdpgFkIlM6Momi6c3PsdFxnbmem9M5OLc3b3nPM/v3O++z0gonWk53Z1TM0/E1XvRhWqNa8LxIAjUfQSRXT/x1fuixVbbgAt6ptt+eM9uY3WMFHAsaJ7BNgExMSxA1FqbBysKmCOlXkGu8ezsaaDE6lMP+gTZa4thVbv1aaDjcrxap8Ib62vRJPAD6TmH1WhPyDUk5jO7Gsa2MUcCNOIyNtNAbelsx1gZ0C/DEl5KXFhce//DjZ27ZSq/IDIN8DFoBwxeqbReg1tiK704oO+tUtAvORaBnLAbqqaV5G9+TeS39er2dDEvvXfKYMCPALsCdIbbWzquhN3pq4+ZNW5zvq93JBZo88Vhvu+rZVTd2Kr5sxGoADGcrpeTs2J29LZHcZ6PxHtFXsxN9I7G9pcLaXRtfGIUFCZrHWbhQbapxd6QOcAJ0D1tyifoqiKHAS9N5CNHMiPJAPPfY2JdTIQCn+K9Z9dGekdXBntHbLWfxrIB1UQdIJLl4JqBIPbpzMvAC8H9iOcXxl98sf/PgtjO5cQToV0392Rf+xQY2BVQTgfUqgYN/JRtdOK+xmwGiRQGA96r+8At6cWX0N5KgT88y9DyT+qnYXh7lWQ76rcqyXy9t9avWPVmgrwjqmlOOhECBRgKSygYn+tct0FzADvIRxuS2fvKQ9WHJW/zM1hUXk4rLhUXpuVMb1jqV1gv0KfGo7G/6m8hG5NvPmDuc2iErZJAFClM7wp6QppdquxzHgt/kD5ub4FjrlyEmgN0C4D76uYfie+ticM7K7dPITKPlTPlTTl5ih6LpHKTJY1BF0Xstt8411j/b8AeMAXYvXiymjv14hoGDDQVKU9tfA8MAC8wu1fWsSRx3NDyWUXwIo3UYIWRfncV3u2MLZzfSONbQhZGkc0B7PAbGfq6kmL8ybKUeBufD0LHJS29FyfseYyIp94jj39+2DfjQiourZlKrPVE30X5LAj7JbE1PwJXOer/FDPQjOA1Zb4cDGJb/v/BU/ZDa+FhKXnAAAAAElFTkSuQmCC"
            }
          ]
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson.Component);
          this.setState({
            result: responseJson.Component,
            value: responseJson.Predictions
          });
        })
        .catch(error => {
          //console.error(error);
          this.setState({
            result: "Image size too big",
            value: "Get closer to the component"
          });
        });
    } else {
      //alert("Internet is not available..!!");
      try {
        const tfImageRecognition = new TfImageRecognition({
          model: require("../../../assets/tensorflow_inception_graph.pb"),
          labels: require("../../../assets/tensorflow_labels.txt")
        });

        const results = await tfImageRecognition.recognize({
          image: img //this.image
        });

        results.forEach(
          result => ((preder2 = result.confidence), (items = result.name))
        );

        await tfImageRecognition.close();

        this.setState({
          result: items,
          value: preder2 * 100 + "%"
        });
      } catch (err) {
        this.setState({
          result: "No Internet",
          value: "Please connect to the internet"
        });
        //console.log("Error");
      }
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //console.log(data.uri);
      /*this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, photoPath: data.uri }
      });*/
      //this._reg(data.uri.replace("file:///", ""));
      this._reg(data.uri.replace("file:///", ""), data.base64);
    }
  };

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  async clearInterval() {
    timer.clearInterval(this);
    this.setState({
      result: "",
      value: ""
    });
  }

  goBack() {
    this.props.navigation.goBack();
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

  render() {
    let autoColor = this.state.flash === "auto" ? "yellow" : "white";
    let onColor = this.state.flash === "on" ? "yellow" : "white";
    let offColor = this.state.flash === "off" ? "yellow" : "white";
    return (
      <View style={styles.container}>
        <View style={styles.cameraOptionsHeader}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon iconStyle={styles.backButton} name="arrow-back" />
          </TouchableOpacity>
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
                iconStyle={styles.flashIcon}
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
        <View style={styles.cameraClickBlock}>
          <View style={{ flex: 1 }} />
          <Animated.View style={[styles.animator]}>
            <ScrollView style={{ height: 100 }}>
              <Text
                style={{
                  fontSize: 26,
                  color: "#fff",
                  fontFamily: "bold",
                  textAlign: "center",
                  marginTop: 10
                }}
              >
                {this.state.result}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "#fff",
                  fontFamily: "bold",
                  textAlign: "center",
                  marginTop: 10
                }}
              >
                {this.state.value}
              </Text>
            </ScrollView>
          </Animated.View>
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
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            onPress={this.switchCamera}
          >
            <Icon iconStyle={styles.cameraIcon} name="switch-camera" />
          </TouchableOpacity>
        </View>
        <Button
          title="Show Details"
          onPress={() => this.setState({ visible: true })}
        />
        <SlidingUpPanel
          visible={this.state.visible}
          onRequestClose={() => this.setState({ visible: false })}
        >
          <View style={styles.slider}>
            <Text
              style={{
                fontSize: 26,
                color: "#00aeefff",
                fontFamily: "bold",
                marginBottom: 70
              }}
            >
              NAZAR
            </Text>
            <Text
              style={{
                fontSize: 26,
                color: "#00aeefff",
                fontFamily: "bold",
                marginBottom: 40
              }}
            >
              {this.state.result}
            </Text>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}
