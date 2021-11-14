
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import JsonService from '../services/JsonService';

import WifiIconStatic from './WifiIconStatic';

export default class Help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            rooms: [],
            tableHead: ['Ícone', 'Intervalo (dBm)', 'Classificação'],
            tableData: [
                [<WifiIconStatic dbm={-20} size={30}/>, '>= - 30', 'Excelente'],
                [<WifiIconStatic dbm={-40} size={30}/>, '-67 <= x < -30', 'Muito bom'],
                [<WifiIconStatic dbm={-70} size={30}/>, '-70 <= x < -67', 'Bom'],
                [<WifiIconStatic dbm={-80} size={30}/>, '-80 <= x < -70', 'Fraco'],
                [<WifiIconStatic dbm={-90} size={30}/>, '< -80', 'Inutilizável']
            ],
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
        if (rooms) {
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
                <View style={styles.reportBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={this.state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
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
    container: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#fff' 
    },
    head: { 
        height: 40, 
    },
    wrapper: { 
        flexDirection: 'row',
    },
    title: { 
        flex: 1,
    },
    row: { 
        height: 28 
    },
    text: { 
        textAlign: 'center',
        color: "#000"
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
    }
});

