import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  PermissionsAndroid
} from 'react-native';

import WifiManager from "react-native-wifi-reborn";
import IntervalService from './src/services/IntervalService';

const wifiImages = [
  require('./assets/wificode1.png'),
  require('./assets/wificode2.png'),
  require('./assets/wificode3.png'),
  require('./assets/wificode4.png'),
  require('./assets/wificode5.png'),
];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Uai Fi",
      descriptionText: "Aplicativo para avaliar o sinal de WiFi",
      signalNowDescription: "Bom",
      signalNowCode: 3,
      signalNowDbm: -50,
    };
  }

  getSign = () => {
    WifiManager.getCurrentSignalStrength().then(
      (dbm) => {
        let interval = IntervalService.calcInterval(dbm);
        this.setState({signalNowDescription: interval.desc})
        this.setState({signalNowCode: interval.code})
        this.setState({signalNowDbm: dbm})
      }
    );
  }

  getWifiList = () => {
    WifiManager.loadWifiList().then(
      (result) => {
        console.log(result);
      }
    );
  }

  permissions = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de localização é necessário para conexões WiFi",
          message:
            "Esse aplicatiVO precisa de sua permissão de localização" +
            "para buscar por conexões wifi.",
          buttonNegative: 'RECUSAR',
          buttonPositive: 'PERMITIR', 
            },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setInterval(this.getSign, 500); 
          this.getSign();
          this.getWifiList();
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentDidMount(prevProps) {
    this.permissions();
  }

  render () {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.headerBox}>
            <Text style={styles.h1Text}>
              {this.state.titleText}
            </Text>
            <Text style={styles.h2Text}>{this.state.descriptionText}</Text>
          </View>
          <View style={styles.imageBox}>
            <Image
              style={styles.tinyLogo}
              source={wifiImages[this.state.signalNowCode]}
            />
            <Text style={styles.pText}>{"Status do Sinal: " + this.state.signalNowDescription + "\n"}</Text>
            <Text style={styles.pText}>{"Valor do Sinal em DBM: " + this.state.signalNowDbm + "\n"}</Text>
          </View>
          <View style={styles.roomButton}>
            <View style={styles.roomButton2}>
              <Button
                title="Cadastrar Cômodo"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: "white"
  },
  roomButton: {
    display: 'flex',
    alignItems: 'center'
  },
  roomButton2: {
    width: 200
  },
  headerBox: {
    textAlign: "center"
  },
  h1Text: {
    fontSize: 32,
    margin: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  h2Text: {
    marginLeft: 6,
    textAlign: "center"
  },
  pText: {
    fontSize: 12,
  },
  imageBox: {
    display: "flex",
    alignItems: "center",
    padding: 24
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
