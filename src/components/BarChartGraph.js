
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import {
    BarChart,
} from "react-native-chart-kit";


export default class BarChartGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teste: "Teste",
        };
    }

    componentDidMount(prevProps) {
        // function
    }

    render() {
        return (
            <View style={styles.graph}>
                <BarChart
                    data={{
                        labels: ["Sala", "Cozinha", "Quarto", "Banheiro", "Varanda", "Churrasqueira"],
                        datasets: [
                            {
                                data: [10, 20, 20, 60, 80, 100]
                            },
                        ]
                    }}
                    width={Dimensions.get("window").width - 8}
                    height={400}
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
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#00BFFF"
                        }
                    }}
                    verticalLabelRotation={90}
                    xLabelsOffset={-20}
                    segments={5}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    graph: {
        margin: 10
    }
});
