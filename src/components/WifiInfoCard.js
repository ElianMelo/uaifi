import React, { Component } from 'react';
import WifiService from '../services/WifiService';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    SafeAreaView
} from 'react-native';

export default class WifiInfoCard extends Component {

    componentDidMount(prevProps) {
        console.log(WifiService.getWifiList());
    }

    render() {
        return (
            <SafeAreaView>
            </SafeAreaView>
        );
    }
}