import { StyleSheet, Dimensions } from "react-native";

const blackTransparent = "rgba(0,0,0,0.75)";
const white = "rgba(255,255,255,1.0)";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center"
  },
  cameraOptionsHeader: {
    flexDirection: 'row',
    height: 80,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  flashOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  flashOptionsText: {
    fontSize: 14,
    fontWeight: '700'
  },
  flashIcon: {
    fontSize: 30,
    color: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
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
  },
  wikiLink: {
    color: 'black', 
    paddingLeft: 15,               
  },
  googleLink: {
      color: '#d62d20',
      paddingLeft: 22,       
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 25,
    paddingBottom: 5,
  }
});

export default styles;