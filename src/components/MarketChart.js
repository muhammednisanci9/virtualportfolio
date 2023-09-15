import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


const MarketChart = ({ data, height }) => {

    return (
        <AreaChart
            style={{ height: height }}
            data={data}
            gridMin={-100}
            gridMax={120}
            start={-100}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ fill: '#282644' }}>
        </AreaChart>
    )
}

export default MarketChart