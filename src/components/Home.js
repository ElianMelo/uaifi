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

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.interval;
        this.state = {
            props: props,
            titleText: "Uai Fi",
            descriptionText: "Aplicativo para avaliar o sinal de WiFi",
            signalNowDescription: "Bom",
            signalNowCode: 3,
            signalNowDbm: -50
        };
    }

    setSignal = () => {
        WifiService.getSignal().then((dbm) => {
            let interval = IntervalService.calcInterval(dbm);
            this.setState({ signalNowDescription: interval.desc })
            this.setState({ signalNowCode: interval.code })
            this.setState({ signalNowDbm: dbm })
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
        this.getPermission();
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
                <View style={styles.imageBox}>
                    <Image
                        style={styles.tinyLogo}
                        source={wifiImages[this.state.signalNowCode]}
                    />
                    <Text style={styles.pText}>{"Status do Sinal: " + this.state.signalNowDescription + "\n"}</Text>
                    <Text style={styles.pText}>{"Valor do Sinal em DBM: " + this.state.signalNowDbm + "\n"}</Text>
                </View>
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
    imageBox: {
        display: "flex",
        alignItems: "center",
        padding: 24
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    roomButton: {
        display: 'flex',
        alignItems: 'center'
    },
    roomButton2: {
        width: 200
    },
});
