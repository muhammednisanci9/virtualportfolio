import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TotalBalance from '../components/TotalBalance'
import PortfolioSummary from '../components/PortfolioSummary'
import TopBar from '../components/TopBar'
import CategoryBar from '../components/CategoryBar'
import CoinSummary from '../components/CoinSummary'
import CoinBalance from '../components/CoinBalance'

const CoinDetail = ({ navigation }) => {
  return (
    <View>
      <TopBar title={'Portföyüm'}></TopBar>
      <CategoryBar></CategoryBar>
      <CoinBalance></CoinBalance>

      <CoinSummary navigation={navigation}></CoinSummary>
    </View>
  )
}

export default CoinDetail