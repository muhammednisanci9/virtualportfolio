import React from 'react'
import { BarChart } from 'react-native-svg-charts'
 
const CoinChart = () => {
        const fill = '#fff'
        const data = [100, 10, 40, 95, -4, -24, -100]
 
        return (
            <BarChart style={{ height: 100 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
            </BarChart>
        )
}

export default CoinChart