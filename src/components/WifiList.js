import React, { Component } from 'react';
import WifiService from '../services/WifiService';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
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
                    BSSID: "BSSID",
                    SSID: "nome da rede wifi",
                    capabilities: "[tecnologia]",
                    frequency: 0,
                    level: 0,
                    timestamp: 0
                },
            ]
        };
    }

    getWifiList = async() => {      
        let wifiList = await WifiService.getWifiList();
        this.setState({ list: [...wifiList] });
    }

    componentDidMount() {
        this.getWifiList();

        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.getWifiList();
                }
            ),
            intervalGetList: setInterval(() => {
                this.getWifiList();
            }, 2000)
        })
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
        clearInterval(this.state.intervalGetList);
    }

    calcTime = (timestamp) => {
        var date = new Date(timestamp);
        return (
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
            "/" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
            "/" + date.getFullYear() +
            " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
            ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
            ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
        );
    }

    formatCapabilities = (cap) => {
        let newCap = cap.split('][').join('] [');
        return newCap;
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.cardBox}>
                <View style={styles.cardBoxLine}>
                    <View style={styles.cardDataIcon}>
                        <WifiIconStatic
                            size={90}
                            dbm={item.level}
                        />
                    </View>
                    <View style={styles.cardData}>
                        <Text style={styles.h2Text}>{item.SSID}</Text>

                        <View style={styles.reportLine}>
                            <Text style={styles.typeText}>{"Frequência: "}</Text>
                            <Text style={styles.pText}>{(item.frequency / 1000).toFixed(2) + ' GHz'}</Text>
                        </View>

                        <View style={styles.reportLine}>
                            <Text style={styles.typeText}>{"Nível de sinal: "}</Text>
                            <Text style={styles.pText}>{item.level + ' dBm'}</Text>
                        </View>

                        <View style={styles.reportLine}>
                            <Text style={styles.typeText}>{"Endereço MAC: "}</Text>
                            <Text style={styles.pText}>{item.BSSID + ''}</Text>
                        </View>

                        <View style={styles.reportLine}>
                            <Text style={styles.typeText}>{"Data: "}</Text>
                            <Text style={styles.pText}>{this.calcTime(item.timestamp) + ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.reportLine}>
                    <Text style={styles.cardFooter}>{"Tecnologias: " + this.formatCapabilities(item.capabilities)}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.max}>
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
    max: {
        width: Dimensions.get("screen").width,
    },
    cardBox: {
        backgroundColor: '#C0C0C0',
        padding: 8,
        margin: 8,
        width: Dimensions.get("screen").width - 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
        elevation: 5,
    },
    cardBoxLine: {
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
        color: "#0275d8",
        fontSize: 20,
        paddingBottom: 8,
        fontWeight: '900'
    },
    typeText: {
        fontWeight: "bold",
        color: "#000"
    },
    pText: {
        color: "#000",
    },
    cardFooter: {
        color: "#000",
        fontSize: 10,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    reportLine: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
    },
});

