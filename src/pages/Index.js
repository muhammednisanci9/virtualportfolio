import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TotalBalance from '../components/TotalBalance'
import PortfolioSummary from '../components/PortfolioSummary'
import TopBar from '../components/TopBar'
import CategoryBar from '../components/CategoryBar'

const Index = () => {
  return (
    <View>
      <TopBar></TopBar>
      <CategoryBar></CategoryBar>
      <TotalBalance></TotalBalance>
      <ScrollView>
        <PortfolioSummary></PortfolioSummary>
      </ScrollView>
    </View>
  )
}

export default Index