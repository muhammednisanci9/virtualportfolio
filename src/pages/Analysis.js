import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TotalBalance from '../components/TotalBalance'
import PortfolioSummary from '../components/PortfolioSummary'
import TopBar from '../components/TopBar'
import CategoryBar from '../components/CategoryBar'
import CoinSummary from '../components/CoinSummary'
import CoinBalance from '../components/CoinBalance'
import ProcesSummaryAnalysis from '../components/ProcessSummaryAnalysis'
import AnalysisGraphic from '../components/AnalysisGraphic'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

const Analysis = ({ navigation }) => {
  const [categoryBar, setCategoryBar] = useState(1)

  const [categories, setCategories] = React.useState([]);


  React.useEffect(() => {
    getCategoriesFromUserDevice();
  }, []);


  const getCategoriesFromUserDevice = async () => {
    try {
      const categories = await AsyncStorage.getItem('categories');
      if (categories != null) {
        setCategories(JSON.parse(categories));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const GetCategoryBar = () => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: '#282644',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            marginHorizontal: '3%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'grey',
            padding: 5,
            borderRadius: 20,

          }}
        >
          {categories.map(categoryItem => (
            <TouchableOpacity
              key={categoryItem.categoryId}
              onPress={() => setCategoryBar(categoryItem.categoryId)}
              style={categoryBar == categoryItem.categoryId ? styles.activeGetCategory : styles.normalGetCategory}
            >
              <Text style={{ color: '#fff' }}>{categoryItem.categoryName}</Text>
            </TouchableOpacity>
          ))}

        </View>
      </View>
    )
  }

  const GetCategoryBarBefore = () => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: '#282644',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            marginHorizontal: '3%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'grey',
            padding: 5,
            borderRadius: 20,

          }}
        >

          <TouchableOpacity
            key={1}
            style={styles.activeGetCategory}
          >
            <Text style={{ color: '#fff' }}>{'Örnek Portföy 1'}</Text>
          </TouchableOpacity>


        </View>
      </View>
    )
  }


  return (
    <View>
      <TopBar title={'Bütün İşlemler'}></TopBar>
      <CategoryBar></CategoryBar>
      {categories.length > 0 ? <GetCategoryBar></GetCategoryBar> : <GetCategoryBarBefore></GetCategoryBarBefore>}
      <AnalysisGraphic category={categoryBar}></AnalysisGraphic>

      <ProcesSummaryAnalysis navigation={navigation} category={categoryBar}></ProcesSummaryAnalysis>
    </View>
  )
}


const styles = StyleSheet.create({
  listItem: {
    height: 47,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  swipeContentContainerStyle: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positiveItem: {
    color: '#a2cebf'
  },
  negativeItem: {
    color: '#F96666'
  },
  activeCategory: {
    backgroundColor: '#333',
    width: '33%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5
  },
  normalCategory: {
    width: '33%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5
  },
  activeGetCategory: {
    backgroundColor: '#333',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    flexGrow: 1
  },
  normalGetCategory: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    flexGrow: 1
  }
});


export default Analysis