import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Home from './src/screens/Home'
import Predict from './src/screens/Predict'

const App = StackNavigator({
  Home: { screen: Home },
  Prediction: { screen: Predict }
})

AppRegistry.registerComponent('Nazar', () => App)
