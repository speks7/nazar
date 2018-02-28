import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: "#e74c3c",
      borderRadius: 2
    }
  }),
  textOnly: Platform.select({
    ios: {
      backgroundColor: "transparent"
    },
    android: {
      backgroundColor: "transparent",
      elevation: 0
    }
  }),
  text: Platform.select({
    ios: {
      color: "#e74c3c",
      textAlign: "center",
      padding: 20,
      fontSize: 18
    },
    android: {
      color: "white",
      textAlign: "center",
      padding: 20,
      fontWeight: "500"
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: "#dfdfdf"
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: "#cdcdcd"
    },
    android: {
      color: "#a1a1a1"
    }
  })
});

export default styles;
