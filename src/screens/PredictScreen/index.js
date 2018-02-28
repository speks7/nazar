import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

class PredictScreen extends Component {
    static navigationOptions = {
      header: null,
    }
  
    constructor(props) {
      super(props)
  
      this.state = {
        loading: true,
        result: '',
      }
    }
  
    componentDidMount() {
      })
  
  
    render() {

      return (
      )
    }
  }
  
  PredictScreen.propTypes = {
    navigation: PropTypes.object,
  }
  
  export default PredictScreen