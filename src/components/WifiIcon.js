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

export default class WifiIcon extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        let interval;

        setTimeout(() => {
            this.setSignal(this.props.dbm);
            interval = setInterval(() => {
                if(this.props.dbm) {
                    this.setSignal(this.props.dbm);
                }
            }, 1000);        
        }, 1);
        
        this.state = {
            dbm: props.dbm,
            setSignalInterval: interval,
            signalDescription: "Sem dados",
            signalCode: 0,
            signalDbm: 0,            
        };
    }

    componentWillUnmount(props) {
        clearInterval(this.state.setSignalInterval);
    }

    setSignal = (dbmValue) => {
        if(dbmValue) {
            let interval = IntervalService.calcInterval(dbmValue);
            this.setState({ signalDescription: interval.desc })
            this.setState({ signalCode: interval.code })
            this.setState({ signalDbm: dbmValue })
            return;
        }
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
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.setSignal();
                }, 500);
            }
        }
    }

    componentDidMount(prevProps) {
        if(!this.props.notCalculate) {
            this.getPermission();
        }
    }

    renderDescription = () => {
        return (
            <>  
                <Text style={styles.pText}>{"Status do Sinal: " + this.state.signalDescription + "\n"}</Text>
                <Text style={styles.pText}>{"Valor do Sinal em DBM: " + this.state.signalDbm + "\n"}</Text>
            </>
        )
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
                {this.props.showDescription && this.renderDescription()}  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bkg: {
        backgroundColor: "white"
    },
    imageBox: {
        display: "flex",
        alignItems: "center"
    },
    pText: {
        fontSize: 12,
        color: "#000"
    },
});
