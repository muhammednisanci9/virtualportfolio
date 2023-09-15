import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart } from 'react-native-svg-charts'

const LotChart = () => {


        const data = [ 2, 10, 4, 5, -4, -10, 7, 1, 4, -2 ]

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
                </LinearGradient>
            </Defs>
        )

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                contentInset={ { top: 20, bottom: 20 } }
                svg={{
                    strokeWidth: 2,
                    stroke: 'url(#gradient)',
                }}
            >
                <Gradient/>
            </LineChart>
        )
    }


export default LotChart