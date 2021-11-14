
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import JsonService from '../services/JsonService';

export default class Help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            rooms: [],
            globalMax: 0,
            globalMin: 0,
            globalAvg: 0
        };
    }

    componentDidMount() {
        this.readRooms();
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.readRooms();
                }
            )
        })
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    readRooms = async () => {
        let rooms = await JsonService.getRooms();
        if(rooms) {
            this.setState({ rooms });

            let dbmMax = [];
            let dbmMin = [];
            let dbmAvg = [];
            
            rooms.forEach((item) => {
                dbmMax.push(Number(item.max));
                dbmMin.push(Number(item.min));
                dbmAvg.push(Number(item.avg));
            });

            let globalMax = Math.max(...dbmMax);
            let globalMin = Math.min(...dbmMin);
            let sum = dbmAvg.reduce((a, b) => a + b, 0);
            let globalAvg = (sum / dbmAvg.length).toFixed(2) || 0;

            this.setState({ globalMax, globalMin, globalAvg });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.h1Text}>
                    Relatório
                </Text>
                <View style={styles.reportBox}>
                    <Text style={styles.h2Text}>Global</Text>
                    <Text style={styles.pText}>Melhor sinal: {this.state.globalMax}</Text>
                    <Text style={styles.pText}>Pior sinal: {this.state.globalMin}</Text>
                    <Text style={styles.pText}>Média sinal: {this.state.globalAvg}</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={this.onPress}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
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
    reportBox: {
        padding: 16,
        paddingLeft: 32
    },
    h2Text: {
        padding: 8,
        fontSize: 26,
        fontWeight: '900',
        color: "#000",
    },
    pText: {
        color: "#000",
        fontSize: 20,
    },
    addButton: {
        position: "absolute",
        bottom: 32,
        right: 32,
        width: 60,
        height: 60,
        borderRadius: 60/2,
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
    }
});

