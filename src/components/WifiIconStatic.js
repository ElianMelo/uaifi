import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

import IntervalService from '../services/IntervalService';

const wifiImages = [
    require('../../assets/wificode0.png'),
    require('../../assets/wificode1.png'),
    require('../../assets/wificode2.png'),
    require('../../assets/wificode3.png'),
    require('../../assets/wificode4.png'),
    require('../../assets/wificode5.png'),
];

export default class WifiIconStatic extends Component {

    constructor(props) {
        super(props);
        let interval = IntervalService.calcInterval(props.dbm);
        this.signalCode = interval.code;
    }

    render() {
        return (
            <View style={styles.imageBox}>
                <Image
                    style={{
                        width: this.props.size,
                        height: this.props.size,
                    }}
                    source={wifiImages[this.signalCode]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBox: {
        display: "flex",
        alignItems: "center"
    },
});
