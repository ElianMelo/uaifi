import React, { Component } from 'react';
import WifiService from '../services/WifiService';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import WifiIconStatic from './WifiIconStatic';

export default class WifiList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            list: [
                {
                    "BSSID": "BSSID",
                    "SSID": "nome da rede wifi",
                    "capabilities": "[tecnologia]",
                    "frequency": 0,
                    "level": 0,
                    "timestamp": 0
                },
            ]
        };
    }

    getWifiList = () => {
        WifiService.getWifiList().then((wifiList) => {
            this.setState({ list: [...wifiList] });
        });
    }

    componentDidMount(prevProps) {
        this.getWifiList();

        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.getWifiList();
                }
            )
        })
    }

    calcTime = (timestamp) => {
        var date = new Date(timestamp);
        return (
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
            "/" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
        );
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.cardBox}>
                <View style={styles.cardDataIcon}>
                    <WifiIconStatic
                        size={90}
                        dbm={item.level}
                    />
                </View>
                <View style={styles.cardData}>
                    <Text style={styles.h2Text}>{item.SSID}</Text>
                    <Text style={styles.pText}>
                        {
                            "Frequência: " + item.frequency + ' MHz\n' +
                            "Nível de sinal: " + item.level + ' dBm\n' +
                            "Endereço MAC: " + item.BSSID + '\n' +
                            "Data: " + this.calcTime(item.timestamp) + '\n'
                        }
                    </Text>
                    <Text style={styles.cardFooter}>{"Tecnologias: " + item.capabilities}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.h1Text}>
                    WiFi dentro do alcance
                </Text>
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.SSID}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    graph: {
        margin: 10
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    addButton: {
        position: "absolute",
        bottom: 32,
        right: 32,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        paddingLeft: 22,
        paddingTop: 7,
        alignSelf: "flex-end",
        backgroundColor: "#2196F3",
        textAlign: "center"
    },
    addText: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "900"
    },
    cardBox: {
        backgroundColor: '#B1B1B1',
        margin: 8,
        width: Dimensions.get("window").width - 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardData: {
        padding: 8,
    },
    cardDataIcon: {
        paddingLeft: 12,
        paddingRight: 8
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
    },
    h2Text: {
        color: "#000",
        fontSize: 20,
        paddingBottom: 8,
        fontWeight: '900'
    },
    pText: {
        color: "#000",
    },
    cardFooter: {
        color: "#000",
        fontSize: 8
    },
    tinyLogo: {
        width: 100,
        height: 100
    },
});

