import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center"
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white"
  },
  loadContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  loadTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  loadButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200
  },
  loadButton2: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200,
    marginTop: 10
  },
  titleContainer: {
    height: 280,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  loadText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  logo: {
    width: 268,
    height: 250
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
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: "black",
    fontSize: 15,
    fontFamily: "regular"
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  infoTypeLabel: {
    fontSize: 15,
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 5,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'regular',
    paddingBottom: 5,
  }
});

export default styles;
