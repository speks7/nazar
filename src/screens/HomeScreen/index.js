import React, { Component } from "react";
import { Alert, View, StatusBar, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import Header from '../../components/Header'
import BackgroundImage from '../../components/BackgroundImage'
import XPButton from '../../components/XPButton'

import styles from "./styles";

class HomeScreen extends Component {
  static navigationOptions = {
    header: (
      <Header
        title="nazar"
        subtitle="&quot;Electronic component detection system&quot;"
      />
    )
  };

  constructor() {
    super();

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage source={require("../../assets/bkg.jpg")}>
          {!this.state.loading ? (
            <XPButton title="Analyze an image" onPress={this._onClick} />
          ) : (
            <ActivityIndicator size="large" color="#e74c3c" />
          )}
        </BackgroundImage>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object
};

export default HomeScreen;
