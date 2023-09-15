import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../components/TopBar'
import ProcesSummary from '../components/ProcessSummary'

const Process = ({ navigation }) => {
  return (
    <View>
      <TopBar title={'Bütün İşlemler'}></TopBar>
      <ScrollView
        style={{
          paddingTop: 10,
          backgroundColor: '#282644',
        }}
      >
        <ProcesSummary navigation={navigation}></ProcesSummary>
      </ScrollView>
    </View>
  )
}

export default Process