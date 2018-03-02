import React, { Component } from "react";
import { Animated, Text, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

//const ThingToFind = "Pizza";

class AnswerNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideAnim: new Animated.Value(-100)
    };
  }

  componentDidMount() {
    Animated.spring(this.state.slideAnim, {
      toValue: 0,
      useNativeDriver: true
    }).start();
  }

  render() {
    const isValid = this.props.answer === this.props.answer;
    const icon = isValid
      ? require("../../assets/valid.png")
      : require("../../assets/error.png");

    const notifStyles = [styles.container];

    if (isValid) {
      notifStyles.push(styles.notifValid);
    } else {
      notifStyles.push(styles.notifError);
    }

    return (
      <Animated.View
        style={[
          ...notifStyles,
          {
            transform: [{ translateY: this.state.slideAnim }]
          }
        ]}
      >
        <Text style={styles.text}>{this.props.answer}</Text>
        <ImageBackground source={icon} style={styles.icon} />
      </Animated.View>
    );
  }
}

AnswerNotification.propTypes = {
  answer: PropTypes.string
};

export default AnswerNotification;
