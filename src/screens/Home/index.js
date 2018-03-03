import React, { Component } from "react";
import {
  Alert,
  View,
  StatusBar,
  ActivityIndicator,
  UIManager,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  LayoutAnimation,
  Image
} from "react-native";

import { Button } from "react-native-elements";

import PropTypes from "prop-types";

import ImagePicker from "react-native-image-picker";

import Header from "../../components/Header";
import BackgroundImage from "../../components/BackgroundImage";
import XPButton from "../../components/XPButton";

import styles from "./styles";

const BG_IMAGE = require("../../assets/bkg.jpg");
const IC_IMAGE = require("../../assets/MainScreen.png");

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      loading: false,
      selectedCategory: 0
    };

    this._onClick = this._onClick.bind(this);
    this.selectCategory = this.selectCategory.bind(this);

    this.options = {
      title: "Select an image",
      takePhotoButtonTitle: "Take a picture",
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
        Alert.alert("Error", "Check permissions.", { cancelable: false });
        this.setState({ loading: false });
      } else {
        const { navigate } = this.props.navigation;
        navigate("Prediction", { image: response });
        this.setState({ loading: false });
      }
    });
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      loading: false
    });
  }

  render() {
    const { selectedCategory, loading } = this.state;
    const isPredictPage = selectedCategory === 0;
    const isAboutPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loadContainer}
              behavior="position"
            >
              <View style={styles.titleContainer}>
                <Image style={styles.logo} source={IC_IMAGE} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button
                  disabled={loading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  textStyle={[
                    styles.categoryText,
                    isPredictPage && styles.selectedCategoryText
                  ]}
                  text={"Predict"}
                />
                <Button
                  disabled={loading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  textStyle={[
                    styles.categoryText,
                    isAboutPage && styles.selectedCategoryText
                  ]}
                  text={"About"}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isPredictPage} />
                <TabSelector selected={isAboutPage} />
              </View>
              <View style={styles.formContainer}>
                {isAboutPage && <Text>Nazaria</Text>}
                {isPredictPage && (
                  <Button
                    buttonStyle={styles.loadButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    text={isPredictPage ? "Analyze an image" : "SIGN UP"}
                    onPress={this._onClick}
                    textStyle={styles.loadTextButton}
                    loading={loading}
                    disabled={loading}
                  />
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
              <Button
                text={"Learn more ?"}
                textStyle={{ color: "white" }}
                buttonStyle={{ backgroundColor: "transparent" }}
                underlayColor="transparent"
                onPress={() => console.log("To github repo")}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
