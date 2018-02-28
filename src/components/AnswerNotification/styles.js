import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  notifValid: {
    backgroundColor: "green"
  },
  notifError: {
    backgroundColor: "red"
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5
  }
});

export default styles;
