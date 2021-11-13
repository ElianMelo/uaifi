import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    SafeAreaView
} from 'react-native';

const wifiImages = [
    require('../../assets/wificode1.png'),
    require('../../assets/wificode2.png'),
    require('../../assets/wificode3.png'),
    require('../../assets/wificode4.png'),
    require('../../assets/wificode5.png'),
];

import PermissionService from '../services/PermissionService';
import IntervalService from '../services/IntervalService';
import WifiService from '../services/WifiService';

import WifiIcon from './WifiIcon';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.interval;
        this.state = {
            props: props,
            titleText: "Uai Fi",
            descriptionText: "Aplicativo para avaliar o sinal de WiFi",
        };
    }

    render() {
        return (
            <View>
                <View style={styles.headerBox}>
                    <Text style={styles.h1Text}>
                        {this.state.titleText}
                    </Text>
                    <Text style={styles.h2Text}>{this.state.descriptionText}</Text>
                </View>
                <WifiIcon size={100} showDescription={true}/>
                <View style={styles.buttonView}> 
                    <Button
                        title="Cômodos"
                        onPress={() =>
                            this.state.props.navigation.navigate('Room', { detail: 'Esse é o detalhe do item' })
                        }
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Lista de Wifi"
                        onPress={() =>
                            this.state.props.navigation.navigate('WifiList', { detail: 'Esse é o detalhe do item' })
                        }
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Relatório"
                        onPress={() =>
                            this.state.props.navigation.navigate('Report', { detail: 'Esse é o detalhe do item' })
                        }
                    >
                    </Button>
                </View>
                
            </View >
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 8
    },
    headerBox: {
        textAlign: "center",
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    h2Text: {
        marginLeft: 6,
        textAlign: "center",
        color: "#000"
    },
    pText: {
        fontSize: 12,
        color: "#000"
    },
    roomButton: {
        display: 'flex',
        alignItems: 'center'
    },
    roomButton2: {
        width: 200
    },
});
