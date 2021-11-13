
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Pressable,
    Modal,
    TextInput,
    Dimensions
} from 'react-native';

import {
    LineChart,
} from "react-native-chart-kit";

import WifiService from '../services/WifiService';

import WifiIcon from './WifiIcon';

export default class CreateRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registry: null,
            roomName: null,
            canPress: true,
            modalVisible: false,
            disableRoomName: false,
            buttonColor: '#2196F3',
            buttonLabel: 'Registrar',
            labels: ['0'],
            data: [0],
            max: null,
            min: null,
            avg: null
        };
    }

    onChangeText = (text) => {
        this.setState({ roomName: text });
    }

    createReport = () => {
        let data = this.state.data;
        let max = Math.max(...data);
        let min = Math.min(...data);
        let sum = data.reduce((a, b) => a + b, 0);
        let avg = (sum / data.length).toFixed(2) || 0;

        this.setState({ max, min, avg });
        this.setState({ disableRoomName: true})
    }

    initRegistry = async () => {
        if (!this.state.roomName) {
            this.setState({ modalVisible: true })
            return;
        }
        if (this.state.canPress) {
            if (this.state.registry) {
                clearInterval(this.state.registry);
                this.setState({ registry: null });
                this.setState({ canPress: false });
                this.createReport();
            } else {
                this.setState({ buttonColor: "#d9534f" });
                this.setState({ buttonLabel: "Finalizar" });
                let signal = await WifiService.getSignal();
                this.setState({ labels: ["1s"] });
                this.setState({ data: [signal] });

                let getSignalInterval = setInterval(async () => {
                    let signal = await WifiService.getSignal();
                    let newSecond = this.state.labels.length * 3;
                    this.setState({ labels: [...this.state.labels, newSecond + "s"] });
                    this.setState({ data: [...this.state.data, signal] });
                }, 3000)

                this.setState({ registry: getSignalInterval });
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.nameInput}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({ modalVisible: !this.state.modalVisible })
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.pText}>Preencha o nome do Cômodo!</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                >
                                    <Text style={styles.textStyle}>Fechar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Text style={styles.inputTextLabel}>
                        Nome:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onChangeText}
                        value={this.state.roomName}
                        editable={!this.state.disableRoomName}
                    />
                </View>
                <LineChart
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                data: this.state.data
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={256}
                    verticalLabelRotation={30}
                    chartConfig={{
                        backgroundColor: "#A9A9A9",
                        backgroundGradientFrom: "#A9A9A9",
                        backgroundGradientTo: "#A9A9A9",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#A9A9A9"
                        }
                    }}
                    verticalLabelRotation={90}
                    xLabelsOffset={-10}
                    segments={5}
                    bezier
                />
                <View>
                    <Text style={styles.h1Text}>Relatório Sinal (DBM)</Text>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>Melhor sinal: {this.state?.max}</Text>
                        <WifiIcon size={30} notCalculate={true} dbm={this.state?.max}/>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>Pior sinal: {this.state?.min}</Text>
                        <WifiIcon size={30} notCalculate={true} dbm={this.state?.min}/>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>Média sinal: {this.state?.avg}</Text>
                        <WifiIcon size={30} notCalculate={true} dbm={this.state?.avg}/>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title={this.state.buttonLabel}
                        color={this.state.buttonColor}
                        onPress={this.initRegistry}
                        disabled={!this.state.canPress}
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
    nameInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    reportLine: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        height: 40,
        width: 220,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        color: "#000"
    },
    buttonView: {
        marginTop: 50,
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
    pText: {
        fontSize: 16,
        margin: 8,
        paddingLeft: 16,
        color: "#000"
    },
    inputTextLabel: {
        fontSize: 20,
        margin: 16,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

