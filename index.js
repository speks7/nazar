import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './src/screens/HomeScreen'
import PredictScreen from './src/screens/PredictScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Prediction: { screen: PredictScreen }
})

AppRegistry.registerComponent('nazar', () => App)
