import { StyleSheet, Dimensions } from "react-native";

const blackTransparent = "rgba(0,0,0,0.75)";
const white = "rgba(255,255,255,1.0)";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center"
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blackTransparent
  },
  loaderText: {
    color: white,
    fontSize: 16
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  Button: {
    width: 150,
    borderRadius: 50,
    height: 45,
    backgroundColor: "#00aeefff",
    marginBottom: 30
  },
  ButtonText: {
    fontFamily: 'bold',
    fontSize: 20,
    color: "white"
  }
});

export default styles;
