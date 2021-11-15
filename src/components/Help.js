
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
            rooms: [],
            tableHead1: ['Ícone', 'Intervalo (dBm)', 'Classificação'],
            tableData1: [
                [<WifiIconStatic dbm={-20} size={30}/>, '>= - 30', 'Excelente'],
                [<WifiIconStatic dbm={-40} size={30}/>, '-67 <= x < -30', 'Muito bom'],
                [<WifiIconStatic dbm={-70} size={30}/>, '-70 <= x < -67', 'Bom'],
                [<WifiIconStatic dbm={-80} size={30}/>, '-80 <= x < -70', 'Fraco'],
                [<WifiIconStatic dbm={-90} size={30}/>, '< -80', 'Inutilizável']
            ],
            tableHead2: ['Intervalo', 'Classificação'],
            tableData2: [
                ['<= 14', 'Estável'],
                ['14 < x <= 28', 'Fraco'],
                ['28 < x <= 42', 'Médio'],
                ['42 < x <= 56', 'Alto'],
                ['> 56', 'Instável']
            ],
        };
    }

    render() {
        return (
            <View style={{ flex: 1 , marginTop: 24}}>
                <Text style={styles.h1Text}>Nível do Sinal</Text>
                <View style={styles.reportBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={this.state.tableHead1} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={this.state.tableData1} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                </View>
                <Text style={styles.h1Text}>Grau de Oscilação</Text>
                <View style={styles.reportBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={this.state.tableHead2} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={this.state.tableData2} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
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
    h1Text: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
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

