
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import InternetSpeedService from '../services/InternetSpeedService';

export default class Speed extends Component {

    constructor(props) {
        super(props);

        this.max = 0;
        this.min = 0;
        this.avg = 0;
        this.speeds = [];

        this.state = {
            props: props,
            speed: [],
            networkSpeed: 0,
            buttonColor: '#2196F3',
            buttonLabel: 'Medir',
            buttonMeasure: true,
            max: 0,
            min: 0,
            avg: 0,
        };
    }

    measureSpeed = () => {
        if(this.state.buttonMeasure) {
            this.interval = setInterval(() => {
                this.getNetworkBandwidth();
            }, 500);

            this.speeds = [];

            this.setState({ 
                buttonMeasure : false,
                buttonColor: "#d9534f",
                buttonLabel: "Finalizar",
                max: 0, 
                min: 0, 
                avg: 0
            });
        } else {
            clearInterval(this.interval);

            let data = this.speeds;
            let max = Math.max(...data);
            let min = Math.min(...data);
            let sum = data.reduce((a, b) => a + b, 0);
            let avg = (sum / data.length).toFixed(2) || 0;

            this.setState({ 
                buttonMeasure : true,
                buttonColor: "#2196F3",
                buttonLabel: "Medir",
            });

            if(data) {
                this.setState({ max, min, avg });
            }
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    getNetworkBandwidth = async () => {
        let result = await InternetSpeedService.measureConnectionSpeed().then();

        if(result) {
            this.speeds.push(Number(result));
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.reportBox}>
                    <Text style={styles.pText}>Velocidade mínima: {this.state.min + " Mbps"}</Text>
                    <Text style={styles.pText}>Velocidade média: {this.state.avg + " Mbps"}</Text>
                    <Text style={styles.pText}>Velocidade máxima: {this.state.max + " Mbps"}</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title={this.state.buttonLabel}
                        color={this.state.buttonColor}
                        onPress={this.measureSpeed}
                    >
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    graph: {
        margin: 10
    },
    buttonView: {
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 8
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    reportBox: {
        padding: 32,
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

