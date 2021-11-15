
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

import {
    PieChart,
} from "react-native-chart-kit";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false // optional
};
export default class PieChartSignal extends Component {

    constructor(props) {
        super(props);
        this.data = [
            {
                name: "Inutilizavel",
                population: 0,
                color: "#ff0000",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Fraco",
                population: 0,
                color: "#fbff00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Bom",
                population: 0,
                color: "#b1f01a",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Muito bom",
                population: 12,
                color: "#53ab00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Excelente",
                population: 14,
                color: "#2e7300",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ];
        this.data.forEach((item, index) => {
            this.data[index].population = this.props.values[index];
        })
    }

    render() {
        return (
            <PieChart
                data={this.data}
                width={screenWidth - 10}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"30"}
                absolute
            />
        );
    }
}

const styles = StyleSheet.create({
    graph: {
        margin: 10
    }
});
