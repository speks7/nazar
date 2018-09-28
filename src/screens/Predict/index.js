import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StatusBar,
  Alert,
  ImageBackground,
  Linking
} from "react-native";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";

import { Button, Text, Icon } from "react-native-elements";

import Clarifai from "clarifai";

//import { CLARIFAY_KEY } from "react-native-dotenv";

import Notif from "../../components/Notif";

import styles from "./styles";

class Predict extends Component {
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
  }

  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: "d5a118308d1242a08836611d45c5f129" //dummy
    });

    process.nextTick = setImmediate; // RN polyfill

    const { data } = this.props.navigation.state.params.image;
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
      .catch(err => alert(err));
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

  _cancel() {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  render() {
    const { type, data } = this.props.navigation.state.params.image;
    const sourceImage = `data:${type};base64,${data}`;

    return (
      <ImageBackground source={{ uri: sourceImage }} style={styles.bgImage}>
        <StatusBar hidden />
        {this.state.loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={1} color="#00aeefff" />
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

Predict.propTypes = {
  navigation: PropTypes.object
};

export default Predict;
