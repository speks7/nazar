'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal"
import { TfImageRecognition } from 'react-native-tensorflow'


class BadInstagramCloneApp extends Component {

  constructor() {
    super()
    this.image = require('./assets/dumbbell.jpg');
    this.state = {
        isModal: false,
        path: '路径',
        result: '22'
    };
  }

  componentDidMount() {
      // this._reg(this.image)
  }

  _toggleModal = () =>
      this.setState({ isModal: false });

  async _reg (img) {
    try {
      const tfImageRecognition = new TfImageRecognition({
          model:require('./assets/tensorflow_inception_graph.pb'),
          labels: require('./assets/tensorflow_labels.txt')
      })

      const results = await tfImageRecognition.recognize({
          image: img//this.image
      })

      // const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`

      const items = results.map(item => {return item.name}).join('、')
      const resultText = `我们找到了${items}`

      await tfImageRecognition.close()

      return resultText

    } catch(err) {
        alert(err)
    }
  }

  async takePicture () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      this._reg(data.uri.replace("file:///", ''))
          .then(res => {
              this.setState({ isModal: true })
              this.setState({ result: res })
          })

    }
  };


  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View>
          <Modal isVisible={this.state.isModal} style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTxt}>{ this.state.result }</Text>
              <TouchableOpacity onPress={this._toggleModal} style={styles.modalBtn}>
                  <Text>Hide me!</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
            <Icon name="camera-alt" style={styles.captureIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 60,
    width: 60,
    height: 60,
    alignSelf: 'center',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureIcon: {
    fontSize: 24,
    color: '#ccc'
  },
  modal: {
    height: 120,
    flex: 0,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalTxt: {
    textAlign: 'left',
    lineHeight: 40
  },
  modalBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 0,
    alignSelf: 'flex-end',
    backgroundColor: '#e0e0e0',
  }
});

export default BadInstagramCloneApp;

// AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);
