import React, { Component } from "react";
import { Animated, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";

import { Text } from "react-native-elements";

import styles from "./styles";

class Notif extends Component {
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
    const icon = require("../../assets/valid.png");

    const notifStyles = [styles.container];

    notifStyles.push(styles.notif);

    return (
      <Animated.View
        style={[
          ...notifStyles,
          {
            transform: [{ translateY: this.state.slideAnim }]
          }
        ]}
      >
        <Text style={styles.text}>{this.props.answer.toUpperCase()}</Text>
        <Text style={styles.text}>{this.props.value}</Text>
        <ImageBackground source={icon} style={styles.icon} />
      </Animated.View>
    );
  }
}

Notif.propTypes = {
  answer: PropTypes.string
};

export default Notif;
