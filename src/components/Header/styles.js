import { StyleSheet } from "react-native";

const colors = {
  red: "#e74c3c",
  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)"
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "center"
  },
  titleWrapper: {
    height: 80,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.black
  },
  title: {
    color: colors.white,
    fontSize: 50,
    fontWeight: "bold"
  },
  subtitleWrapper: {
    height: 40,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.black
  },
  subtitle: {
    color: colors.red,
    fontSize: 25,
    fontWeight: "bold"
  }
});

export default styles;
