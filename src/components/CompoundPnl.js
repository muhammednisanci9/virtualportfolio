import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { VictoryPie } from 'victory-native'
import { PieChart } from 'react-native-chart-kit';

const CompoundPnl = () => {

    const data = [
        {
            name: "Kısa Vade",
            population: 40,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Uzun Vade",
            population: 0,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];


    const screenWidth = Dimensions.get("window").width;

    return (
        <View>
            <Text>CompoundPnl</Text>
            <View>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 10]}
                    absolute
                />
                <View
                    style={{
                        width: 120,
                        height: 120,
                        backgroundColor: 'white',
                        borderRadius: 60,
                        position: 'absolute',
                        left: '16.3%',
                        top: '27.6%'
                    }}
                >

                </View>
            </View>
        </View>
    )
}

export default CompoundPnl