import React, { Component } from 'react'
import { Alert, View, StatusBar, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

class HomeScreen extends Component {
    static navigationOptions = {
      header: <Header title='nazar' subtitle='"Electronic component detection system"' />,
    }
    
    constructor() {
      super()
  
      this.state = {
        loading: false,
      }
  
    render() {

    }
  }
}
  
  HomeScreen.propTypes = {
    navigation: PropTypes.object,
  }
  
  export default HomeScreen