import React, { Component } from 'react';
import WifiService from '../services/WifiService';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    FlatList,
    SafeAreaView,
    Dimensions
} from 'react-native';

const wifiImages = [
    require('../../assets/wificode1.png'),
    require('../../assets/wificode2.png'),
    require('../../assets/wificode3.png'),
    require('../../assets/wificode4.png'),
    require('../../assets/wificode5.png'),
];

export default class WifiInfoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount(prevProps) {
        WifiService.getWifiList().then((wifiList) => {
            this.setState({ list: [...wifiList] });
        });
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.cardBox}>
                <View style={styles.cardData}>
                    <Image
                        style={styles.tinyLogo}
                        source={wifiImages[4]}
                    />
                </View>
                <View style={styles.cardData}>
                    <Text>
                        {
                            "Nome da rede: " + item.SSID + '\n' +
                            "Frequência: " + item.frequency + ' MHz\n' +
                            "Nível de sinal: " + item.level + ' dBm\n' +
                            "Endereço MAC: " + item.BSSID + '\n' +
                            "Data: " + this.calcTime(item.timestamp) + '\n' +
                            "Tecnologias: " + item.capabilities + '\n'
                        }
                    </Text>
                </View>
            </View>
        )
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

    render() {
        return (
            <View>
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
    cardBox: {
        backgroundColor: '#778899',
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
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
    },
    tinyLogo: {
        width: 100,
        height: 100
    },
});