import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import WifiIconSelfRefresh from './WifiIconSelfRefresh';
export default class Home extends Component {

    constructor(props) {
        super(props);
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
                <WifiIconSelfRefresh size={100} />
                <View style={styles.buttonView}>
                    <Button
                        title="Cômodos"
                        onPress={() =>
                            this.state.props.navigation.navigate('Room')
                        }
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Lista de Wifi"
                        onPress={() =>
                            this.state.props.navigation.navigate('WifiList')
                        }
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Relatório"
                        onPress={() =>
                            this.state.props.navigation.navigate('Report')
                        }
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        style={styles.button}
                        title="Ajuda"
                        onPress={() =>
                            this.state.props.navigation.navigate('Help')
                        }
                    >
                    </Button>
                </View>
            </View>
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
});
