import { StyleSheet, Dimensions } from "react-native";

const blackTransparent = "rgba(0,0,0,0.75)";
const white = "rgba(255,255,255,1.0)";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraOptionsHeader: {
    flexDirection: 'row',
    height: 80,
    zIndex: 80,
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  backButton: {
    fontSize: 40,
    color: 'white',
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
    //justifyContent: "flex-end",
    alignItems: "center",
    //width: SCREEN_WIDTH,
    //height: SCREEN_HEIGHT
  },
  cameraClickBlock: {
    //flex: 1,
    flexDirection: 'row',
    width: '100%',
    bottom: 5,
    position: 'absolute',
    paddingRight: 15,
    marginBottom: 20
  },
  cameraIcon: {
    fontSize: 45,
    color: 'white',
    marginBottom: 20
  },
  animator: {
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: '#263238',
    borderWidth: 1,
    borderColor: '#00aeefff',
    bottom: 80,
    left: 12,
    right: 12,
  },
  slider: {
    //flex: 1,
    //backgroundColor: 'rgba(232, 147, 142, 1)',
    alignItems: 'center',
    justifyContent: 'center'
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
  octopart: {
    color: 'rgba(216, 121, 112, 1)', 
    paddingLeft: 15,               
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 25,
    paddingBottom: 5,
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'left',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: '#00aeefff',
    fontFamily: 'regular',
    paddingBottom: 10,
  }
});

export default styles;