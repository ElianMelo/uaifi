import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import WifiManager from "react-native-wifi-reborn";

export default class App extends Component {

  getSign = () => {
    WifiManager.getCurrentSignalStrength().then(
      (result) => {
        console.log(result);
      },
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
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW', 
            },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setInterval(this.getSign, 1000);
      } else {
          // Permission denied
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
        <StatusBar barStyle={'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Header />
          <View
            style={{
              backgroundColor: Colors.black,
            }}>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
