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
  LayoutAnimation
} from "react-native";

import { Input, Button } from "react-native-elements";

import PropTypes from "prop-types";

import ImagePicker from "react-native-image-picker";

import Header from "../../components/Header";
import BackgroundImage from "../../components/BackgroundImage";
import XPButton from "../../components/XPButton";

import styles from "./styles";

const BG_IMAGE = require("../../assets/bkg.jpg");

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
    header: (
      <Header
        title="nazar"
        subtitle="Electronic component detection"
      />
    )
  };

  constructor() {
    super();

    this.state = {
      loading: false
    };

    this.state = {
      email: "",
      password: "",
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true
    };

    this._onClick = this._onClick.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);

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
      isLoading: false
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake()
      });
    }, 1500);
  }

  signUp() {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid:
          password == passwordConfirmation || this.confirmationInput.shake()
      });
    }, 1500);
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="position"
            >
              <View style={styles.titleContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.titleText}>NAZAR</Text>
                </View>
                <View style={{ marginTop: -10, marginLeft: 10 }}>
                  <Text style={styles.titleText}>Prediction</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  textStyle={[
                    styles.categoryText,
                    isLoginPage && styles.selectedCategoryText
                  ]}
                  text={"Predict"}
                />
                <Button
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  textStyle={[
                    styles.categoryText,
                    isSignUpPage && styles.selectedCategoryText
                  ]}
                  text={"About"}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <View style={styles.formContainer}>
                <Input
                  value={email}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Email"}
                  containerStyle={{
                    borderBottomColor: "rgba(0, 0, 0, 0.38)"
                  }}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => this.setState({ email })}
                  displayError={!isEmailValid}
                  errorMessage="Please enter a valid email address"
                />
                <Input
                  value={password}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType={isSignUpPage ? "next" : "done"}
                  blurOnSubmit={true}
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: "rgba(0, 0, 0, 0.38)"
                  }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Password"}
                  ref={input => (this.passwordInput = input)}
                  onSubmitEditing={() =>
                    isSignUpPage ? this.confirmationInput.focus() : this.login()
                  }
                  onChangeText={password => this.setState({ password })}
                  displayError={!isPasswordValid}
                  errorMessage="Please enter at least 8 characters"
                />
                {isSignUpPage && (
                  <Input
                    value={passwordConfirmation}
                    secureTextEntry={true}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType={"done"}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Confirm password"}
                    ref={input => (this.confirmationInput = input)}
                    onSubmitEditing={this.signUp}
                    onChangeText={passwordConfirmation =>
                      this.setState({ passwordConfirmation })
                    }
                    displayError={!isConfirmationValid}
                    errorMessage="Please enter the same password"
                  />
                )}
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  activeOpacity={0.8}
                  text={isLoginPage ? "LOGIN" : "SIGN UP"}
                  onPress={isLoginPage ? this.login : this.signUp}
                  textStyle={styles.loginTextButton}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
              <Button
                text={"Learn more ?"}
                textStyle={{ color: "white" }}
                buttonStyle={{ backgroundColor: "transparent" }}
                underlayColor="transparent"
                onPress={() => console.log("Account created")}
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
