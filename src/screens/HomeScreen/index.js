import React, { Component } from "react";
import { Alert, View, StatusBar, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import ImagePicker from 'react-native-image-picker'

import Header from "../../components/Header";
import BackgroundImage from "../../components/BackgroundImage";
import XPButton from "../../components/XPButton";

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

    this._onClick = this._onClick.bind(this);

    this.options = {
      title: "Select an image",
      takePhotoButtonTitle: "To take a picture",
      chooseFromLibraryButtonTitle: "Choose from the gallery",
      cancelButtonTitle: "Cancel",
      cameraType: "back",
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
        path: "Nazar"
      }
    };
  }

  _onClick() {
    this.setState({ loading: true });
    ImagePicker.showImagePicker(this.options, response => {
      if (response.didCancel) {
        this.setState({ loading: false });
      } else if (response.error) {
        Alert.alert("Error", "Check the permissions.", { cancelable: false });
        this.setState({ loading: false });
      } else {
        const { navigate } = this.props.navigation;
        navigate("Prediction", { image: response });
        this.setState({ loading: false });
      }
    });
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
