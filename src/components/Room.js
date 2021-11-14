
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import {
    BarChart,
} from "react-native-chart-kit";
import IntervalService from '../services/IntervalService';

import JsonService from '../services/JsonService';

import WifiIcon from './WifiIcon';
export default class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            rooms: [],
            labels: [0],
            data: [0]
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
        }

        this.setState({ labels: [] });
        this.setState({ data: [] });

        rooms?.forEach((item) => {
            this.setState({ labels: [...this.state.labels, item.name] });
            this.setState({ data: [...this.state.data, IntervalService.calcInterval(item.avg).graph] });
        });
    }

    onPress = () => {
        this.state.props.navigation.navigate('CreateRoom')
    }

    deleteItem = async (name) => {
        await JsonService.removeRoom(name);
        await this.readRooms();
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.cardRows}>    
                    <View style={styles.cardAvgIcon}>
                        <WifiIcon size={70} notCalculate={true} dbm={item.avg} />
                    </View>
                    <View>
                        <Text style={styles.cardH1Text}>{item.name}</Text>
                        <View style={styles.reportLine}>
                            <Text style={styles.cardPText}>Melhor sinal: {item.max + " dbm"}</Text>
                            <WifiIcon size={20} notCalculate={true} dbm={item.max} />
                        </View>
                        <View style={styles.reportLine}>
                            <Text style={styles.cardPText}>Pior sinal: {item.min + " dbm"}</Text>
                            <WifiIcon size={20} notCalculate={true} dbm={item.min} />
                        </View>
                        <View style={styles.reportLine}>
                            <Text style={styles.cardPText}>Média sinal: {item.avg + " dbm"}</Text>
                            <WifiIcon size={20} notCalculate={true} dbm={item.avg} />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => {
                            this.deleteItem(item.name)
                        }}
                    >
                        <Text style={styles.removeText}>❌</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BarChart
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                data: this.state.data
                            },
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={300}
                    fromZero={true}
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
                            r: "3",
                            strokeWidth: "5",
                            stroke: "#00BFFF"
                        }
                    }}
                    verticalLabelRotation={20}
                    xLabelsOffset={-40}
                    segments={5}
                />
                <FlatList
                    data={this.state.rooms}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.name}
                />
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
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#B1B1B1",
        borderRadius: 10,
        margin: 10,
        padding: 8,
        paddingBottom: 12
    },
    cardRows: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardAvgIcon: {
        paddingRight: 20,
        paddingLeft: 10
    },
    reportLine: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
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
        color: "#000"
    },
    cardPText: {
        fontSize: 14,
        color: "#000",
        marginRight: 8
    },
    cardH1Text: {
        fontSize: 20,
        paddingBottom: 8,
        fontWeight: 'bold',
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
    removeButton: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 30,
        height: 30,
        borderRadius: 60 / 2,
        paddingLeft: 7.5,
        paddingTop: 6,
        alignSelf: "flex-end",
        backgroundColor: "white",
        textAlign: "center"
    },
    addText: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "900"
    },
    removeText: {
        fontSize: 12,
        color: "#FFF",
    },
});

