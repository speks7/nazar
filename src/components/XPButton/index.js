import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const XPButton = props => {
  const {
    title,
    color,
    accessibilityLabel,
    disabled,
    textOnly,
    onPress,
    onLongPress
  } = props;

  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (color) {
    if (!textOnly) {
      if (Platform.OS === "ios") {
        textStyles.push({ color: color });
      } else {
        buttonStyles.push({ backgroundColor: color });
      }
    } else {
      textStyles.push({ color: color });
      buttonStyles.push(styles.textOnly);
    }
  }

  const accessibilityTraits = ["button"];
  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
    textStyles.push(styles.textDisabled);
    accessibilityTraits.push("disabled");
  }

  const formattedTitle = Platform.OS == "android" ? title.toUpperCase() : title;
  const TouchKey =
    Platform.OS == "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchKey
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={accessibilityTraits}
      disabled={disabled}
      onPress={() => (onPress ? onPress() : null)}
      onLongPress={() => (onLongPress ? onLongPress() : null)}
    >
      <View style={buttonStyles}>
        <Text style={textStyles} disabled={disabled}>
          {formattedTitle}
        </Text>
      </View>
    </TouchKey>
  );
};

XPButton.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  textOnly: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func
};

export default XPButton;
