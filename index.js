import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import PredictScreen from './screens/PredictScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Prediction: { screen: PredictScreen }
})

AppRegistry.registerComponent('nazar', () => App)
