
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';

import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import WifiIconStatic from './WifiIconStatic';

export default class Help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            tableHeadSignal: ['Ícone', 'Intervalo (dBm)', 'Classificação'],
            tableDataSignal: [
                [<WifiIconStatic dbm={-20} size={30} />, '>= - 30', 'Excelente'],
                [<WifiIconStatic dbm={-40} size={30} />, '-67 <= x < -30', 'Muito bom'],
                [<WifiIconStatic dbm={-70} size={30} />, '-70 <= x < -67', 'Bom'],
                [<WifiIconStatic dbm={-80} size={30} />, '-80 <= x < -70', 'Fraco'],
                [<WifiIconStatic dbm={-90} size={30} />, '< -80', 'Inutilizável']
            ],
            tableHeadVariation: ['Intervalo', 'Classificação'],
            tableDataVariation: [
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
            <ScrollView style={{ marginTop: 24 }}>
                <Text style={styles.h1Text}>Nível do Sinal</Text>
                <View style={styles.paddingBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={this.state.tableHeadSignal} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={this.state.tableDataSignal} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                </View>
                <Text style={styles.h1Text}>Grau de Oscilação</Text>
                <View style={styles.paddingBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={this.state.tableHeadVariation} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={this.state.tableDataVariation} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    h1Text: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    head: {
        height: 40,
    },
    wrapper: {
        flexDirection: 'row',
    },
    row: {
        height: 28
    },
    text: {
        textAlign: 'center',
        color: "#000"
    },
    paddingBox: {
        padding: 32,
    },
});

