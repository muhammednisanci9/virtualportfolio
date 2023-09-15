import React from 'react'
import { LineChart } from 'react-native-svg-charts'
import { View } from 'react-native'

const SingleChart = () => {
    const data = [50, 100, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -100]

    const contentInset = { top: 10, bottom: 10 }

    return (
        <View style={{ height: 50, flexDirection: 'row' }}>
            
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={data}
                svg={{ stroke: '#333' }}
                contentInset={contentInset}
            >
            </LineChart>
        </View>
    )
}

export default SingleChart