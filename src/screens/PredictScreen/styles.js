import { StyleSheet } from 'react-native'

const blackTransparent = 'rgba(0,0,0,0.75)'
const white = 'rgba(255,255,255,1.0)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackTransparent,
  },
  loaderText: {
    color: white,
    fontSize: 16,
  },
})

export default styles
