import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Agenda } from 'react-native-calendars'



const DenemeCalendar = () => {



  const [lots, setLots] = React.useState([]);

  React.useEffect(() => {
    getLotsFromUserDevice();
  }, []);


  const getLotsFromUserDevice = async () => {
    try {
      const lots = await AsyncStorage.getItem('lots');
      if (lots != null) {
        setLots(JSON.parse(lots));
      }
    } catch (error) {
      console.log(error);
    }
  };






  const fonts = {
    Montserrat: {
      regular: 'Montserrat-Regular',
      light: 'Montserrat-Light',
      medium: 'Montserrat-Medium',
      semibold: 'Montserrat-SemiBold',
      bold: 'Montserrat-Bold',
    },
    Roboto: {
      thin: 'Roboto-Thin',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold'
    },
    Kalam: {
      light: 'Kalam-Light',
      regular: 'Kalam-Regular',
      bold: 'Kalam-Bold'
    }
  }

  const size = {
    Title: {
      title1: 15,
      title2: 16,
      title3: 17,
      title4: 18,
      title5: 19,
      title6: 20,
      title7: 21,
      title8: 22
    }
  }





  const [items, setItems] = useState({})


  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const loadItems = (day) => {
    const items = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems)
      console.log(newItems)
    }, 1000);
  }


  const renderItem = (item) => {
    return (
      <View>
          <View
            key={item}
            style={styles.listItem}
          >
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  padding: 7,
                  backgroundColor: '#fbfbfb',
                  borderRadius: 25,
                  width: 45,
                  height: 45,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: fonts.Kalam.bold
                  }}
                >
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingVertical: 3,
                  alignSelf: 'center',
                  backgroundColor: '#fbfbfb',
                  width: 100
                }}
              >
                <Text
                  style={{
                    color: '#111',
                    fontSize: 11,
                    fontFamily: fonts.Roboto.medium,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingVertical: 3,
                  alignSelf: 'center',
                  backgroundColor: '#fbfbfb',
                  width: 50
                }}
              >
                <Text
                  style={{
                    fontSize: size.Title.title3,
                    fontFamily: fonts.Roboto.medium,
                    color: '#333'
                  }}
                ></Text>
              </View>
            </View>
          </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-05-16'}
        renderItem={renderItem}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  listItemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
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
  },
  positiveItem: {
    color: '#a2cebf'
  },
  negativeItem: {
    color: '#F96666'
  },
  activeCategory: {
    backgroundColor: '#333',
    width: '49%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5
  },
  normalCategory: {
    width: '49%',
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
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  }
});


export default DenemeCalendar