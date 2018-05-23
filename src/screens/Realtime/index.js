import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";

import Clarifai from "clarifai";
import { CLARIFAY_KEY } from "react-native-dotenv";
import timer from "react-native-timer";

import Camera from "./Camera";

class Realtime extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: "",
      value: null
    };

    this._cancel = this._cancel.bind(this);
    this.takePicture = this.takePicture.bind(this);
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
      done: true,
      captureText: ""
    });
  }

  async takePicture() {
    const self = this;
    const image64 = await this.camera.capture();
    const file = image64.data;

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
      .catch(err => alert(err));
  }

  _cancel() {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  render() {
    return (
      <ImageBackground source={{ uri: sourceImage }} style={styles.bgImage}>
        <StatusBar hidden />
        {this.state.loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={65} color="#00aeefff" />
            <Text style={styles.loaderText}>Analysis in progress...</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Notif answer={this.state.result} value={this.state.value} />
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
      </ImageBackground>
    );
  }
}

Realtime.propTypes = {
  navigation: PropTypes.object
};

export default Realtime;
