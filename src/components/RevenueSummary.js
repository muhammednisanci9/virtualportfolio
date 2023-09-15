import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { SwipeButtonsContainer, SwipeItem, SwipeProvider } from 'react-native-swipe-item';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import RevenueBalance from './RevenueBalance';

const RevenueSummary = () => {

    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = year + '-' + month + '-' + date;

    const [budgets, setBudgets] = React.useState([]);

    const [lots, setLots] = React.useState([]);

    const [categories, setCategories] = React.useState([]);

    const [category, setCategory] = useState()
    const [oldDate, setOldDate] = useState(addToTime)
    const [target, setTarget] = useState(0)


    const [budgetId, setBudgetId] = React.useState('');
    const [budgetCategoryId, setBudgetCategoryId] = React.useState('');
    const [budgetDate, setBudgetDate] = React.useState('');
    const [budgetPrice, setBudgetPrice] = React.useState('');


    const [loading, setLoading] = useState(false)

    const [showcalendar, setShowCalendar] = useState(false)


    const [summaryPnlTarget, setSummaryPnlTarget] = useState(0)
    const [summaryPnlPercent, setSummaryPnlPercent] = useState(0)
    const [summaryPnlPrice, setsummaryPnlPrice] = useState(0)
    const [summaryPercentTarget, setsummaryPercentTarget] = useState(0)
    const [totalDay, setTotalDay] = useState(0)

    const bottomSheet = React.useRef();

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


    React.useEffect(() => {
        getBudgetsFromUserDevice();

    }, []);



    const getBudgetsFromUserDevice = async () => {
        try {
            const budgets = await AsyncStorage.getItem('budgets');
            if (budgets != null) {
                setBudgets(JSON.parse(budgets));
                setLoading(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

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



    const getFirstCategoryId = () => {

        const getFirstCategoryId = categories.map(cId => cId.categoryId);
        let getList = getFirstCategoryId.sort((a, b) => a - b);
        let newCategoryId = parseInt(getList[0]);
        if (isNaN(newCategoryId.toString())) {
            setCategory('1');
        } else {
            setCategory(newCategoryId.toString());
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



    const getCategoryName = (id) => {

        const getCategoryName = categories.filter(getCategory => getCategory.categoryId == id).map(filteredCategory => filteredCategory.categoryName);
        return getCategoryName
    }






    const SmallAdd = () => { // budgetAdd
        return (
            <TouchableOpacity
                onPress={() => { bottomSheet.current.show(); getFirstCategoryId() }}
                style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 0,
                    borderRadius: 50,
                    padding: 15,
                    paddingRight: 0
                }}
            >
                <Image
                    style={{
                        width: 24,
                        height: 24
                    }}
                    source={require('../../assets/images/filter.png')}
                />
            </TouchableOpacity>
        )
    }




    const calculatePercentageOfChange = (x, y) => {
        const step1 = y - x;
        const step2 = step1 / x;
        let step3 = step2 * 100

        if (x == 0 && y == 0) {
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
            if (budget.budgetType == 0) {
                totalBudget.push(parseFloat(-budget.budgetPrice))
            } else if (budget.budgetType == 1) {
                totalBudget.push(parseFloat(budget.budgetPrice))
            }
        })
        return totalBudget.reduce((sum, current) => sum + current, 0)
    }

    const getBudgetPriceDate = (id, date) => {
        const totalBudget = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == id && fBudget.budgetDate == date).map(budget => {
            if (budget.budgetType == 0) {
                totalBudget.push(parseFloat(-budget.budgetPrice))
            } else if (budget.budgetType == 1) {
                totalBudget.push(parseFloat(budget.budgetPrice))
            }
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


    const calculateForDatePnl = () => {
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
            const yesterdayPnl = totalPrice - dailyPnl.reduce((sum, current) => sum + current, 0)
            dayPnl.push(
                {
                    'date': getDate,
                    'totalPrice': totalPrice,
                    'percentPnl': percentPnl,
                    'dailyPnl': dailyPnl.reduce((sum, current) => sum + current, 0),
                    'percentDailyPnl': calculatePercentageOfChange(yesterdayPnl, totalPrice),
                }
            )
        })

        return dayPnl
    }

    const calculateBetween2Dates = () => {
        const dates = []
        const d = new Date(); // bitiş zamanı şimdi otomatik
        const oldDates = oldDate.split('-')
        const dOld = new Date(oldDates[0], oldDates[1], oldDates[2]); // başlangıç zamanı



        dOld.setMonth(dOld.getMonth() - 1)
        const newDate = ((d - dOld) / 86400000).toFixed(0)

        dOld.setDate(dOld.getDate())
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



        for (let i = 0; i < newDate; i++) {
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

    const calculateBetween2DatesDay = () => {
        const dates = []
        let totalDay = 0
        let totalPercent = 100
        const d = new Date(); // bitiş zamanı şimdi otomatik
        const oldDates = oldDate.split('-')
        const dOld = new Date(oldDates[0], oldDates[1], oldDates[2]); // başlangıç zamanı



        dOld.setMonth(dOld.getMonth() - 1)
        const newDate = ((d - dOld) / 86400000)

        let newTarget = target
        { target == 1 ? newTarget = '01' : target == 2 ? newTarget = '02' : target == 3 ? newTarget = '03' : target == 4 ? newTarget = '04' : target == 5 ? newTarget = '05' : target == 6 ? newTarget = '06' : target == 7 ? newTarget = '07' : target == 8 ? newTarget = '08' : target == 9 ? newTarget = '09' : null }
        const targetPercent = '1.' + newTarget

        dOld.setDate(dOld.getDate())
        let dOldDay = dOld.getDate(); //Current Date
        let dOldMonth = dOld.getMonth() + 1; //Current Month
        { dOldMonth == 1 ? dOldMonth = '01' : dOldMonth == 2 ? dOldMonth = '02' : dOldMonth == 3 ? dOldMonth = '03' : dOldMonth == 4 ? dOldMonth = '04' : dOldMonth == 5 ? dOldMonth = '05' : dOldMonth == 6 ? dOldMonth = '06' : dOldMonth == 7 ? dOldMonth = '07' : dOldMonth == 8 ? dOldMonth = '08' : dOldMonth == 9 ? dOldMonth = '09' : dOldMonth = dOldMonth }
        const dOldYear = dOld.getFullYear(); //Current Year
        { dOldDay == 1 ? dOldDay = '01' : dOldDay == 2 ? dOldDay = '02' : dOldDay == 3 ? dOldDay = '03' : dOldDay == 4 ? dOldDay = '04' : dOldDay == 5 ? dOldDay = '05' : dOldDay == 6 ? dOldDay = '06' : dOldDay == 7 ? dOldDay = '07' : dOldDay == 8 ? dOldDay = '08' : dOldDay == 9 ? dOldDay = '09' : dOldDay = dOldDay }
        const dOldDate = dOldYear + '-' + dOldMonth + '-' + dOldDay

        let totalTargetPercent = getBudgetPriceDate(category, dOldDate)
        for (let i = 0; i < newDate; i++) {




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
                totalDay += 1

                if (getBudgetPriceDate(category, dOldDate) > 0 || getBudgetPriceDate(category, dOldDate) < 0) {
                    totalTargetPercent += getBudgetPriceDate(category, dOldDate)
                }

                totalTargetPercent = (totalTargetPercent * targetPercent)
            }

        }

        let price = calculateForDatePnlSummary()[0]['totalPrice']

        for (let i = 0; i < totalDay; i++) {
            price *= '1.' + newTarget
            totalPercent *= '1.' + newTarget
        }

        let totalWalletValue = calculateForDatePnlSummary()[totalDay]['totalPrice']

        setTotalDay(totalDay)
        setSummaryPnlTarget(totalTargetPercent.toFixed(2)) // ***
        setsummaryPnlPrice(totalWalletValue.toFixed(2))
        setsummaryPercentTarget(calculatePercentageOfChange(100, totalPercent.toFixed(2)))
        setSummaryPnlPercent(calculateTotalPercentPnl())

        return price

    }



    const calculateForDatePnlSummary = () => {
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
            const yesterdayPnl = totalPrice - dailyPnl.reduce((sum, current) => sum + current, 0)
            dayPnl.push(
                {
                    'date': getDate + 1,
                    'totalPrice': totalPrice,
                    'percentPnl': percentPnl,
                    'dailyPnl': dailyPnl.reduce((sum, current) => sum + current, 0),
                    'percentDailyPnl': calculatePercentageOfChange(yesterdayPnl, totalPrice),
                }
            )
        })

        return dayPnl
    }


    const calculateForDatePnlSummaryTotal = () => {
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
            const yesterdayPnl = totalPrice - dailyPnl.reduce((sum, current) => sum + current, 0)
            dayPnl.push(
                {
                    'date': getDate + 1,
                    'totalPrice': totalPrice,
                    'percentPnl': percentPnl,
                    'dailyPnl': dailyPnl.reduce((sum, current) => sum + current, 0),
                    'percentDailyPnl': calculatePercentageOfChange(yesterdayPnl, totalPrice),
                }
            )
        })

        return dayPnl
    }


    const calculateTotalPercentPnl = () => {
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
            const yesterdayPnl = totalPrice - dailyPnl.reduce((sum, current) => sum + current, 0)

            dayPnl.push(parseFloat(calculatePercentageOfChange(yesterdayPnl, totalPrice)))
        })

        return dayPnl.reduce((sum, current) => sum + current, 0)
    }

    const RevenueLists = () => {
        return (
            <SwipeProvider>
                {calculateForDatePnl().map((item, index) => (
                    <SwipeItem
                        key={index}
                        style={styles.listItem}
                        swipeContainerStyle={styles.swipeContentContainerStyle}
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
                                    {index}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    {item['percentDailyPnl'] > target ? 'Başarılı' : 'Başarısız'}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    {item['date']}
                                </Text>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺{item['totalPrice'].toFixed(2)}</Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Text
                                        style={item['percentDailyPnl'] > 0 ? styles.positiveItem : styles.negativeItem}
                                    >{item['percentDailyPnl']}%</Text>
                                    <Text
                                        style={{
                                            color: '#111',
                                            marginLeft: 3,
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 11,
                                            paddingBottom: 1,
                                        }}
                                    >{item['dailyPnl'].toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    </SwipeItem>

                ))}</SwipeProvider>)
    };



    const RevenueListsBefore = () => {
        const items = [1, 2, 3, 4, 5]
        return (
            <View>
                {items.map(item => (
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
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
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
                ))}
            </View>

        )
    };



    return (
        <View>

            <RevenueBalance percentTarget={summaryPercentTarget} percentPnl={summaryPnlPercent} pnlTarget={summaryPnlTarget} pnlPrice={summaryPnlPrice} totalDay={totalDay}></RevenueBalance>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        paddingLeft: '3%',
                        paddingRight: '3%',
                        paddingTop: 30,
                        minHeight: 1000,
                        marginTop: 340,
                        paddingBottom: 50
                    }}
                >
                    <View>
                        <Text
                            style={{
                                marginBottom: 20,
                                fontSize: size.Title.title5,
                                color: '#111',
                                fontFamily: fonts.Roboto.bold,
                            }}>
                            Bileşik Getiri
                        </Text>
                        <View
                            style={{
                                backgroundColor: 'green',
                                display: 'flex',
                            }}
                        >
                            <BottomSheet hasDraggableIcon ref={bottomSheet} height={220} >
                                <Picker
                                    selectedValue={category}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCategory(itemValue)
                                    }>
                                    {
                                        categories.map(c => {
                                            return <Picker.Item label={c.categoryName} value={c.categoryId} key={c.categoryId} />
                                        })
                                    }

                                </Picker>
                                <TextInput
                                    onChangeText={text => setTarget(text)}
                                    value={target}
                                    placeholder="Günlük Hedef (yüzde cinsinden)"
                                    keyboardType="numeric"
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowCalendar(true)}
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                        paddingLeft: 3,
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}
                                >
                                    <Text style={{ color: 'grey', fontSize: 14, fontWeight: '400' }}>{oldDate ? oldDate : 'Başlangıç Tarihi Seçiniz'}</Text>
                                </TouchableOpacity>
                                <Modal visible={showcalendar} animationType='fade'>
                                    <Calendar
                                        style={{
                                            elevation: 4,
                                            margin: 40,
                                        }}
                                        onDayPress={(date) => {
                                            setOldDate(date.dateString)
                                            setShowCalendar(false)
                                        }}
                                    />
                                </Modal>


                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#333',
                                        padding: 10,
                                        borderRadius: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 10
                                    }}
                                    onPress={() => {
                                        calculateBetween2DatesDay();
                                        bottomSheet.current?.close();
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>Hesapla</Text>
                                </TouchableOpacity>

                            </BottomSheet>
                            <SmallAdd></SmallAdd>

                        </View>
                    </View>
                    <View
                        style={{
                            paddingBottom: 60,

                        }}
                    >


                        {loading == true ? <RevenueLists></RevenueLists> : <RevenueListsBefore></RevenueListsBefore>}


                    </View>
                </View>
            </ScrollView>

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
    }
});


export default RevenueSummary