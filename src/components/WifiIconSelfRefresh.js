import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import PermissionService from '../services/PermissionService';
import WifiService from '../services/WifiService';
import IntervalService from '../services/IntervalService';

const wifiImages = [
    require('../../assets/wificode0.png'),
    require('../../assets/wificode1.png'),
    require('../../assets/wificode2.png'),
    require('../../assets/wificode3.png'),
    require('../../assets/wificode4.png'),
    require('../../assets/wificode5.png'),
];

export default class WifiIconSelfRefresh extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            signalDescription: "Sem dados",
            signalCode: 0,
            signalDbm: 0,            
        };
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setSignal = () => {
        WifiService.getSignal().then((dbm) => {
            let interval = IntervalService.calcInterval(dbm);
            this.setState({ signalDescription: interval.desc })
            this.setState({ signalCode: interval.code })
            this.setState({ signalDbm: dbm })
        })
    }

    getPermission = async () => {
        let permission = await PermissionService.getPermissions();

        if (permission == true) {
            this.interval = setInterval(() => {
                this.setSignal();
            }, 500);
        }
    }

    componentDidMount() {
        this.getPermission();
    }

    render() {
        return (
            <View style={[styles.imageBox]}>
                <Image
                    style={{
                        width: this.props.size,
                        height: this.props.size,
                    }}
                    source={wifiImages[this.state.signalCode ? this.state.signalCode : 0]}
                />
                <Text style={styles.pText}>{"Status do Sinal: " + this.state.signalDescription + "\n"}</Text>
                <Text style={styles.pText}>{"Valor do Sinal em dBm: " + this.state.signalDbm + "\n"}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBox: {
        display: "flex",
        alignItems: "center"
    },
    pText: {
        fontSize: 12,
        color: "#000"
    },
});
