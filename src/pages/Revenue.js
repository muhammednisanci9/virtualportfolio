import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../components/TopBar'
import RevenueSummary from '../components/RevenueSummary'
import RevenueBalance from '../components/RevenueBalance'

const Revenue = ({ navigation }) => {
  return (
    <View>
      <TopBar title={'Hesaplama'}></TopBar>
      
        <RevenueSummary navigation={navigation}></RevenueSummary>
    </View>
  )
}

export default Revenue