import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  PermissionsAndroid,
  Dimensions
} from 'react-native';
export default class Header extends Component {

  constructor(props) {
    /*super(props);
    this.state = {
      titleText: "Uai Fi",
      descriptionText: "Aplicativo para avaliar o sinal de WiFi",
      signalNowDescription: "Bom",
      signalNowCode: 3,
      signalNowDbm: -50
    };*/
  }

  componentDidMount(prevProps) {
    // function
  }

  render() {
    return (
      <SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: "white"
  },
});
