import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const BackgroundImage = props => {
  const { resizeMode } = props;

  const containerStyles = [styles.bkg];

  if (resizeMode) {
    containerStyles.push({ resizeMode: resizeMode });
  }

  return (
    <View style={styles.container}>
      <Image source={props.source} style={containerStyles}>
        {props.children}
      </Image>
    </View>
  );
};

BackgroundImage.propTypes = {
  resizeMode: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string
    }),
    PropTypes.number
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default BackgroundImage;
