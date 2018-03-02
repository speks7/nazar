import React, { Component } from "react";
import { ActivityIndicator, View, Text, StatusBar, Alert } from "react-native";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";

import Clarifai from "clarifai";

import BackgroundImage from "../../components/BackgroundImage";
import AnswerNotification from "../../components/AnswerNotification";
import XPButton from "../../components/XPButton";

import styles from "./styles";

class PredictScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: ""
    };

    this._cancel = this._cancel.bind(this);
  }

  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: "" //dummy
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
              return this.setState({ loading: false, result: prediction.name });
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
      <BackgroundImage source={{ uri: sourceImage }} resizeMode="cover">
        <StatusBar hidden />
        {this.state.loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={75} color="#95a5a6" />
            <Text style={styles.loaderText}>Analysis in progress...</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <AnswerNotification answer={this.state.result} />
            <XPButton
              title="Revert"
              color="#3498db"
              textOnly
              onPress={this._cancel}
            />
          </View>
        )}
      </BackgroundImage>
    );
  }
}

PredictScreen.propTypes = {
  navigation: PropTypes.object
};

export default PredictScreen;
