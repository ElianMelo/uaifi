
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
import RoomService from '../services/RoomService';
import IntervalService from '../services/IntervalService';

export default class CreateRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            registry: null,
            roomName: null,
            canPress: true,
            modalVisible: false,
            disableRoomName: false,
            modalDescription: 'Preencha o nome do Cômodo!',
            buttonColor: '#2196F3',
            buttonLabel: 'Registrar',
            labels: ['0'],
            data: [0],
            max: 0,
            min: 0,
            avg: 0
        };
    }

    onChangeText = (text) => {
        this.setState({ roomName: text });
    }

    createReport = async () => {
        let data = this.state.data;

        let pieGraph = [0, 0, 0, 0, 0];

        data.forEach((dbm) => {
            let position = IntervalService.calcInterval(dbm).code-1
            pieGraph[position] += 1;
        });

        let max = Math.max(...data);
        let min = Math.min(...data);
        let sum = data.reduce((a, b) => a + b, 0);
        let avg = (sum / data.length).toFixed(2) || 0;
        let variation = IntervalService.calcOscillation(Math.abs(min) - Math.abs(max));

        this.setState({ max, min, avg, variation, pieGraph });
        this.setState({ disableRoomName: true});

        let rooms = await RoomService.getRooms();
        if(rooms) {
            await RoomService.setRooms([...rooms, {
                name: this.state.roomName,
                max: this.state.max,
                min: this.state.min,
                avg: this.state.avg,
                variation: this.state.variation,
                pieGraph: this.state.pieGraph
            }]);
        } else {
            await RoomService.setRooms([{
                name: this.state.roomName,
                max: this.state.max,
                min: this.state.min,
                avg: this.state.avg,
                variation: this.state.variation,
                pieGraph: this.state.pieGraph
            }]);
        }
        
        this.state.props.navigation.navigate('Room');
    }

    initRegistry = async () => {
        if (!this.state.roomName) {
            this.setState({ modalDescription: 'Preencha o nome do cômodo!'});
            this.setState({ modalVisible: true });
            return;
        }
        if(await RoomService.isRoomNameInUse(this.state.roomName)) {
            this.setState({ modalDescription: 'Nome de cômodo já está sendo utilizado'});
            this.setState({ modalVisible: true });
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
                                <Text style={styles.modalText}>{this.state.modalDescription}</Text>
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
                                data: this.state.data,
                                color: (opacity = 1) => `rgba(2, 117, 216, ${opacity})`,
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={256}
                    verticalLabelRotation={30}
                    yAxisSuffix={" dbm"}
                    chartConfig={{
                        backgroundColor: "#A9A9A9",
                        backgroundGradientFrom: "#A9A9A9",
                        backgroundGradientTo: "#A9A9A9",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "2",
                            strokeWidth: "1",
                            stroke: "#0275d8"
                        }
                    }}
                    verticalLabelRotation={90}
                    xLabelsOffset={-10}
                    segments={5}
                />
                <View>
                    <Text style={styles.h1Text}>Instruções</Text>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>1. Preencha o nome do cômodo</Text>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>2. Posicione dentro do cômodo a ser analisado</Text>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>3. Pressione o botão "Registrar"</Text>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>4. Percorra a área do cômodo</Text>
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.pText}>5. Pressione o botão "Finalizar"</Text>
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
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 16,
        margin: 8,
        color: "#000",
        marginBottom: 15,
        textAlign: "center"
    }
});

