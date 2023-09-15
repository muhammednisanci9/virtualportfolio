import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Deneme = () => {

  const category = 1 // (geçici) -> veri categoryBar dan gelecek

  const [lots, setLots] = React.useState([]);

  const [budgets, setBudgets] = React.useState([]);

  React.useEffect(() => {
    getBudgetsFromUserDevice();
  }, []);


  const getBudgetsFromUserDevice = async () => {
    try {
      const budgets = await AsyncStorage.getItem('budgets');
      if (budgets != null) {
        setBudgets(JSON.parse(budgets));
      }
    } catch (error) {
      console.log(error);
    }
  };


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



  const calculatePercentageOfChange = (x, y) => {
    const step1 = y - x;
    const step2 = step1 / x;
    let step3 = step2 * 100
    
    if(x == 0 && y == 0){
      step3 = 0
    }

    return step3.toFixed(2)
  }


  const getLotNames = () => {
    const lotNames = []
    lots.map(l => {
      if (lotNames.includes(l.lotName) == false) {
        lotNames.push(l.lotName)
      }
    })
    return lotNames
  }


  const dates = (ago) => {
    const dates = []

    const d = new Date();

    let getAgo = ago
    if (d.getDay() == 1 || d.getDay() == 2 || d.getDay() == 3 || d.getDay() == 4) {
      getAgo += 2
    } else if (d.getDay() == 0) {
      getAgo += 3
    } else if (d.getDay() == 6) {
      getAgo += 4
    }

    const dDay = d.getDate(); //Current Date
    const dMonth = d.getMonth() + 1; //Current Month
    const dYear = d.getFullYear(); //Current Year
    const dDate = dYear + '-' + dMonth + '-' + dDay


    if (d.getDay() == 0 || d.getDay() == 6) {

    } else {
      dates.push(dDate)
    }

    for (let i = 0; i < getAgo; i++) {
      d.setDate(d.getDate() - 1)
      let dDay = d.getDate(); //Current Date
      const dMonth = d.getMonth() + 1; //Current Month
      const dYear = d.getFullYear(); //Current Year
      { dDay == 1 ? dDay = '01' : dDay == 2 ? dDay = '02' : dDay == 3 ? dDay = '03' : dDay == 4 ? dDay = '04' : dDay == 5 ? dDay = '05' : dDay == 6 ? dDay = '06' : dDay == 7 ? dDay = '07' : dDay == 8 ? dDay = '08' : dDay == 9 ? dDay = '09' : dDay = dDay }
      const dDate = dYear + '-' + dMonth + '-' + dDay


      if (d.getDay() == 0 || d.getDay() == 6) {

      } else {
        dates.push(dDate)
      }

    }
    return dates.reverse()
  }

  const getBudgetPrice = (id, date) => {
    const totalBudget = []
    budgets.filter(fBudget => fBudget.budgetCategoryId == id && fBudget.budgetDate <= date).map(budget => {
      totalBudget.push(parseFloat(budget.budgetPrice))
    })
    return totalBudget.reduce((sum, current) => sum + current, 0)
  }


  const getLotPnl = () => {
    const haveLot = []
    getLotNames().map(lName => {
      let sortedLots = lots.filter(lot => lot.lotName == lName && lot.lotCategoryId == category).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
      const buyAverage = []
      const qty = []
      const price = []
      const totalPrice = []

      sortedLots.map(lot => {
        const sellSummary = []

        if (lot.lotStatus == true) {
          qty.push(parseFloat(lot.lotQty))
          price.push(parseFloat(lot.lotPrice))
          totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
          if (buyAverage.reduce((sum, current) => sum + current, 0) > 0) {
            buyAverage.splice(0)
          }
          buyAverage.push(totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0))

        } else {
          qty.push(-parseFloat(lot.lotQty))
          const setSellQty = -parseFloat(lot.lotQty)
          price.push(-parseFloat(lot.lotPrice))
          const setSellPrice = -parseFloat(lot.lotPrice)
          totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
          const setAverageSell = calculatePercentageOfChange(buyAverage.reduce((sum, current) => sum + current, 0), parseFloat(lot.lotPrice))
          const totalSellPrice = parseFloat(lot.lotPrice) * parseFloat(lot.lotQty)
          const totalBuyPrice = buyAverage.reduce((sum, current) => sum + current, 0) * parseFloat(lot.lotQty)
          const pnl = totalSellPrice - totalBuyPrice
          sellSummary.push([lot.lotDate, lot.lotCategoryId, pnl])

        }
        if (qty.reduce((sum, current) => sum + current, 0) == 0) {
          buyAverage.splice(0)
          totalPrice.splice(0)
        }
        sellSummary.length > 0 ? haveLot.push(sellSummary) : null
      })


    })
    let haveLotSorted = haveLot.sort((a, b) => new Date(...a[0][0].split('/').reverse()) - new Date(...b[0][0].split('/').reverse()));


    return haveLotSorted


  }

  const calculateForDate = (day) => {
    const totalPnl = []
    const dayMonts = []
    const dayPnl = []
    dates(day).map(getDate => {
      const totalPnlDay = []
      getLotPnl().filter(fLot => fLot[0][0] == getDate).map(lot => {
        totalPnlDay.push(lot[0][2])

      })
      dayMonts.push(getDate.slice(5))
      totalPnl.push(totalPnlDay.reduce((sum, current) => sum + current, 0))
      dayPnl.push([getDate.slice(5), totalPnlDay.reduce((sum, current) => sum + current, 0)])
    })

    return dayPnl
  }


  const calculateForDatePnl = (day) => {
    const totalPnl = []
    const dayMonts = []
    const dayPnl = []
    const totalPnlDay = []

    calculateBetween2Dates().map(getDate => {
      const dailyPnl = []
      getLotPnl().filter(fLot => fLot[0][0] == getDate).map(lot => {
        totalPnlDay.push(lot[0][2])
        dailyPnl.push(lot[0][2])
      })
      //dayMonts.push(getDate.slice(5))
      //totalPnl.push(totalPnlDay.reduce((sum, current) => sum + current, 0))
      const totalBudget = getBudgetPrice(category, getDate)
      const totalPrice = totalBudget + totalPnlDay.reduce((sum, current) => sum + current, 0)
      const percentPnl = calculatePercentageOfChange(totalBudget, totalPrice)
      const percentDailyPnl = calculatePercentageOfChange(totalBudget, totalPrice)
      dayPnl.push(
        {
          'date': getDate.slice(5),
          'totalPrice': totalPrice,
          'percentPnl': percentPnl,
          'dailyPnl': dailyPnl.reduce((sum, current) => sum + current, 0),
          'percentDailyPnl': percentDailyPnl,
        }
      )
    })

    return dayPnl
  }

  const calculateBetween2Dates = () => {
    const dates = []
    const d = new Date(); // bitiş zamanı şimdi otomatik
    const dOld = new Date(2022, 9, 2); // başlangıç zamanı


    const dDay = d.getDate() //Current Date
    const dMonth = d.getMonth() + 1; //Current Month
    const dYear = d.getFullYear(); //Current Year
    const dDate = dYear + '-' + dMonth + '-' + dDay

    const dDayOld = dOld.getDate() //Current Date
    const dMonthOld = dOld.getMonth() + 1; //Current Month
    const dYearOld = dOld.getFullYear(); //Current Year
    const dDateOld = dYearOld + '-' + dMonthOld + '-' + dDayOld

    const oldDate = '2022-10-22'

    
    const newDate =  ((d - dOld) / 86400000).toFixed(0)


    for (let i = 0; i <= newDate; i++) {
      dOld.setDate(dOld.getDate() + 1)
      let dOldDay = dOld.getDate(); //Current Date
      let dOldMonth = dOld.getMonth() + 1; //Current Month
      { dOldMonth == 1 ? dOldMonth = '01' : dOldMonth == 2 ? dOldMonth = '02' : dOldMonth == 3 ? dOldMonth = '03' : dOldMonth == 4 ? dOldMonth = '04' : dOldMonth == 5 ? dOldMonth = '05' : dOldMonth == 6 ? dOldMonth = '06' : dOldMonth == 7 ? dOldMonth = '07' : dOldMonth == 8 ? dOldMonth = '08' : dOldMonth == 9 ? dOldMonth = '09' : dOldMonth = dOldMonth }
      const dOldYear = dOld.getFullYear(); //Current Year
      { dOldDay == 1 ? dOldDay = '01' : dOldDay == 2 ? dOldDay = '02' : dOldDay == 3 ? dOldDay = '03' : dOldDay == 4 ? dOldDay = '04' : dOldDay == 5 ? dOldDay = '05' : dOldDay == 6 ? dOldDay = '06' : dOldDay == 7 ? dOldDay = '07' : dOldDay == 8 ? dOldDay = '08' : dOldDay == 9 ? dOldDay = '09' : dOldDay = dOldDay }
      const dOldDate = dOldYear + '-' + dOldMonth + '-' + dOldDay


      if (dOld.getDay() == 0 || dOld.getDay() == 6) {

      } else {
        dates.push(dOldDate)
      }

    }

    return dates

  }

  return (
    <View>
      {console.log(calculateBetween2Dates())}
      <View style={{
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        {calculateForDatePnl(30).map(item => (
          <View style={styles.cItems}>
            <Text style={styles.cDayItem}>
              {item['date']}
            </Text>
            <Text>
              {item['totalPrice'] + 'TL'}
            </Text>
            <Text>
              {item['percentPnl'] + '%'}
            </Text>
            <Text>
              {item['percentDailyPnl'] + '%'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cItems: {
    width: '19%',
    height: 100,
    backgroundColor: 'grey',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cDayItem: {
    position: 'absolute',
    left: 5,
    top: 5
  }
});


export default Deneme