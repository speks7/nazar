import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const Header = props => (
  <View style={styles.container}>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{props.title.toUpperCase()}</Text>
    </View>
    <View style={styles.subtitleWrapper}>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Header;
