import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  notif: {
    backgroundColor: "transparent"
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5
  }
});

export default styles;
