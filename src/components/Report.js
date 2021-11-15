
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native';

import RoomService from '../services/RoomService';

import PieChartSignal from './PieChartSignal';

import WifiIconStatic from './WifiIconStatic';

export default class Report extends Component {

    constructor(props) {

        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            rooms: [],
            globalPieChart: [0, 0, 0, 0, 0],
            canShowGlobal: false,
            canShowIcon: false,
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
        let rooms = await RoomService.getRooms();
        if (rooms) {
            this.setState({ rooms });

            let dbmMax = [];
            let dbmMin = [];
            let dbmAvg = [];
            let dbmPieChart = [0, 0, 0, 0, 0];

            rooms.forEach((item) => {
                dbmMax.push(Number(item.max));
                dbmMin.push(Number(item.min));
                dbmAvg.push(Number(item.avg));

                dbmPieChart[0] += item.pieGraph[0];
                dbmPieChart[1] += item.pieGraph[1];
                dbmPieChart[2] += item.pieGraph[2];
                dbmPieChart[3] += item.pieGraph[3];
                dbmPieChart[4] += item.pieGraph[4];
            });

            let globalMax = Math.max(...dbmMax);
            let globalMin = Math.min(...dbmMin);
            let sum = dbmAvg.reduce((a, b) => a + b, 0);
            let globalAvg = (sum / dbmAvg.length).toFixed(2) || 0;

            this.setState({ globalMax, globalMin, globalAvg });

            this.setState({
                globalPieChart: dbmPieChart,
                canShowGlobal: true,
                canShowIcon: true
            });
        }
    }

    renderItem = ({ item }) => {
        return (
            <View>
                <Text style={styles.h1Text}>{item.name}</Text>
                <PieChartSignal values={item.pieGraph} />
                <View style={styles.card}>
                    <View style={styles.reportLine}>
                        <Text style={styles.cardPText}>Melhor sinal: {item.max + " dbm"}</Text>
                        <WifiIconStatic size={20} dbm={item.max} />
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.cardPText}>Pior sinal: {item.min + " dbm"}</Text>
                        <WifiIconStatic size={20} dbm={item.min} />
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.cardPText}>Média sinal: {item.avg + " dbm"}</Text>
                        <WifiIconStatic size={20} dbm={item.avg} />
                    </View>
                    <View style={styles.reportLine}>
                        <Text style={styles.cardPText}>Grau de oscilação: {item.variation}</Text>
                    </View>
                </View>

                <View style={styles.divideLine}>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.reportBox}>
                        <Text style={styles.h2Text}>Relatório Global</Text>
                        <View style={styles.reportLine}>
                            <Text style={styles.pText}>Melhor sinal: {this.state.globalMax + " dBm "}</Text>
                            {
                                this.state.canShowIcon ?
                                    <WifiIconStatic size={30} dbm={this.state.globalMax} /> :
                                    null
                            }
                        </View>
                        <View style={styles.reportLine}>
                            <Text style={styles.pText}>Pior sinal: {this.state.globalMin + " dBm "}</Text>
                            {
                                this.state.canShowIcon ?
                                    <WifiIconStatic size={30} dbm={this.state.globalMin} /> :
                                    null
                            }
                        </View>
                        <View style={styles.reportLine}>
                            <Text style={styles.pText}>Média sinal: {this.state.globalAvg + " dBm "}</Text>
                            {
                                this.state.canShowIcon ?
                                    <WifiIconStatic size={30} dbm={this.state.globalAvg} /> :
                                    null
                            }
                        </View>
                    </View>
                    {
                        this.state.canShowGlobal ?
                            <PieChartSignal values={this.state.globalPieChart} /> :
                            null
                    }

                    <View style={styles.reportBox}>
                        <Text style={styles.h2Text}>Relatório por cômodo</Text>
                    </View>
                    <View>
                        {
                            this?.state?.rooms[0]?.pieGraph ?
                                (<FlatList
                                    nestedScrollEnabled={true}
                                    scrollEnabled={false}
                                    data={this.state.rooms}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.name}
                                />) : null
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    reportLine: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#B1B1B1",
        borderRadius: 10,
        margin: 10,
        padding: 16
    },
    divideLine: {
        backgroundColor: "black",
        height: 3,
        margin: 4
    },
    cardPText: {
        fontSize: 14,
        color: "#000",
        marginRight: 8
    },
    h1Text: {
        fontSize: 24,
        margin: 8,
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
});

