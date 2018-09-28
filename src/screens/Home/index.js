import React, { Component } from "react";
import {
  Alert,
  View,
  StatusBar,
  ActivityIndicator,
  UIManager,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Image,
  Linking
} from "react-native";

//import { AdMobBanner } from "react-native-admob";

import { Button, Text } from "react-native-elements";

import PropTypes from "prop-types";

import SplashScreen from "react-native-splash-screen";

import ImagePicker from "react-native-image-picker";

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
    this._onClick2 = this._onClick2.bind(this);
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

  componentDidMount() {
    //SplashScreen.show();
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
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

  _onClick2() {
    this.props.navigation.navigate("Realtime");
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
                {isAboutPage && (
                  <View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 26,
                          color: "#00aeefff",
                          fontWeight: "normal"
                        }}
                      >
                        NAZAR
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 26,
                          color: "green",
                          fontWeight: "normal",
                          textAlign: "right"
                        }}
                      >
                        v1.2.2
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "black",
                          fontWeight: "normal"
                        }}
                      >
                        An electronic component detection app which allows the
                        user to identify different electronic components in
                        realtime or using captured images using tensorflow
                        server.
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "rgba(216, 121, 112, 1)",
                          fontWeight: "normal",
                          marginLeft: 40
                        }}
                      >
                        INFO
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          marginHorizontal: 15
                        }}
                      >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.infoTypeLabel}>Camera</Text>
                            <Text style={styles.infoTypeLabel}>Gallery</Text>
                            <Text style={styles.infoTypeLabel}>Tensorflow</Text>
                            <Text style={styles.infoTypeLabel}>Prediction</Text>
                            <Text style={styles.infoTypeLabel}>Octopart</Text>
                          </View>
                          <View style={{ marginLeft: 8 }}>
                            <Text style={styles.infoAnswerLabel}>
                              Take a picture using native camera
                            </Text>
                            <Text style={styles.infoAnswerLabel}>
                              Use already captured images
                            </Text>
                            <Text style={styles.infoAnswerLabel}>
                              Request Heroku Server base64
                            </Text>
                            <Text style={styles.infoAnswerLabel}>
                              Show predicted name and value
                            </Text>
                            <Text style={styles.infoAnswerLabel}>
                              Show description of component
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                {isPredictPage && (
                  <View>
                    <Button
                      buttonStyle={styles.loadButton}
                      containerStyle={{ flex: 0 }}
                      activeOpacity={0.8}
                      text={"Analyze an image"}
                      onPress={this._onClick}
                      textStyle={styles.loadTextButton}
                      loading={loading}
                      disabled={loading}
                    />
                    <Button
                      buttonStyle={styles.loadButton2}
                      containerStyle={{ flex: 0 }}
                      activeOpacity={0.8}
                      text={"Realtime analysis"}
                      onPress={this._onClick2}
                      textStyle={styles.loadTextButton}
                      loading={loading}
                      disabled={loading}
                    />
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
              <Button
                text={"©Team Speks"}
                textStyle={{ color: "white" }}
                buttonStyle={{ backgroundColor: "transparent" }}
                underlayColor="transparent"
                onPress={() =>
                  Linking.openURL(`https://github.com/aryaminus/nazar`)
                }
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

/*
            <View style={{ height: 50 }}>
              <AdMobBanner
                adSize="banner"
                adUnitID="ca-app-pub-9119188523765586/7283753335"
                //ref={el => (this._basicExample = el)}
                //testDevices={[AdMobBanner.simulatorId]}
                //onAdFailedToLoad={error => console.error(error)}
              />
            </View>
*/
