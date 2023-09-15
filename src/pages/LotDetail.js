import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../components/TopBar'
import LotSummary from '../components/LotSummary'
import LotBalance from '../components/LotBalance'

const LotDetail = ({ route }) => {
  const { lotName, getLotCategoryId } = route.params;
  return (
    <View>
      <TopBar title={lotName}></TopBar>
      <LotBalance lotName={lotName}></LotBalance>
      <LotSummary lotName={lotName} getLotCategoryId={getLotCategoryId}></LotSummary>
    </View>
  )
}

export default LotDetail