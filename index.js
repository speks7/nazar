import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Home from './src/screens/Home'
import Predict from './src/screens/Predict'
import Realtime from './src/screens/Realtime'

const App = StackNavigator({
  Home: { screen: Home },
  Prediction: { screen: Predict },
  Realtime: {screen: Realtime}
})

AppRegistry.registerComponent('Nazar', () => App)
