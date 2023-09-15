import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../components/TopBar'
import BudgetSummary from '../components/BudgetSummary'

const Profile = ({ navigation }) => {
  return (
    <View>
      <TopBar title={'Para İşlemleri'}></TopBar>
      <ScrollView
        style={{
          paddingTop: 10,
          backgroundColor: '#282644',
        }}
      >
        <BudgetSummary navigation={navigation}></BudgetSummary>
      </ScrollView>
    </View>
  )
}

export default Profile