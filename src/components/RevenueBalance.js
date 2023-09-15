import { View, Text, Image } from 'react-native'
import React from 'react'
import LotChart from './LotChart'
import LotMiniSummary from './LotMiniSummary'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RevenueMiniSummary from './RevenueMiniSummary';

const RevenueBalance = ({ percentTarget, percentPnl, pnlTarget, pnlPrice, totalDay }) => {

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: '3%',
                paddingRight: '3%',
                backgroundColor: '#282644',
                paddingBottom: 350,
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 2.5
                }}

            >
                
                <RevenueMiniSummary percentTarget={percentTarget} percentPnl={percentPnl} pnlTarget={pnlTarget} pnlPrice={pnlPrice} totalDay={totalDay}></RevenueMiniSummary>

            </View>
        </View>
    )
}

export default RevenueBalance