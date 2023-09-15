import { View, Text, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const AnalysisGraphic = ({ category }) => {

    const [budgets, setBudgets] = React.useState([]);

    const [lots, setLots] = React.useState([]);


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
        const step3 = step2 * 100
        return step3.toFixed(2)
    }


    const getLotBuySell = () => {
        const haveLot = []
        const totalPnl = []
        let sortedLots = lots.sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        const qty = []
        const sellQty = []
        const price = []
        const sellPrice = []
        const totalPrice = []
        const buyAverage = []
        const averageSell = []
        const sellSummary = []
        sortedLots.map(lot => {
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
                totalPnl.push(pnl)
                sellSummary.push([setAverageSell, setSellQty, setSellPrice, lot.lotDate, lot.lotCategoryId, buyAverage, pnl, totalBuyPrice])
            }
            if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                buyAverage.splice(0)
                totalPrice.splice(0)
            }
        })
        const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)
        haveLot.push(sellSummary)

        return parseFloat(totalPnl.reduce((sum, current) => sum + current, 0))
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

    const getLotBuy = () => {
        const haveLot = []
        const qty = []
        const pnl = []
        let sortedLots = lots.sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        getLotNames().map(l => {
            const qty = []
            const price = []
            const totalPrice = []
            const totalBuyPrice = []
            const totalSellPrice = []
            sortedLots.filter(FLot => FLot.lotName == l).map(lot => {
                if (lot.lotStatus == true) {
                    qty.push(parseFloat(lot.lotQty))
                    price.push(parseFloat(lot.lotPrice))
                    totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalBuyPrice.push(parseFloat(lot.lotQty * lot.lotPrice))
                } else {
                    qty.push(-parseFloat(lot.lotQty))
                    price.push(-parseFloat(lot.lotPrice))
                    totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalSellPrice.push(parseFloat(lot.lotQty * lot.lotPrice))
                }
                if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                    totalPrice.splice(0)
                }
            })
            const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)

            pnl.push(totalSellPrice.reduce((sum, current) => sum + current, 0) - totalBuyPrice.reduce((sum, current) => sum + current, 0))

            haveLot.push([l, 1, qty.reduce((sum, current) => sum + current, 0).toFixed(2), totalPrice.reduce((sum, current) => sum + current, 0).toFixed(2), parseFloat(average).toFixed(2), totalBuyPrice.reduce((sum, current) => sum + current, 0).toFixed(2), totalSellPrice.reduce((sum, current) => sum + current, 0).toFixed(2)])
        })
        return pnl.reduce((sum, current) => sum + current, 0)
    }

    const getLotBuySellNew = () => {
        const haveLot = []
        const sellSummary = []
        const commission = []
        getLotNames().map(lName => {
            let sortedLots = lots.filter(lot => lot.lotName == lName && lot.lotCategoryId == category).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
            const qty = []
            const sellQty = []
            const price = []
            const sellPrice = []
            const totalPrice = []
            const buyAverage = []
            const averageSell = []

            sortedLots.map(lot => {
                if (lot.lotStatus == true) {
                    qty.push(parseFloat(lot.lotQty))
                    price.push(parseFloat(lot.lotPrice))
                    totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    if (buyAverage.reduce((sum, current) => sum + current, 0) > 0) {
                        buyAverage.splice(0)
                    }
                    buyAverage.push(totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0))
                    commission.push((parseFloat(lot.lotQty) * parseFloat(lot.lotPrice) * parseFloat('0.' + lot.lotCommission)) / 100)
                } else {
                    qty.push(-parseFloat(lot.lotQty))
                    const setSellQty = -parseFloat(lot.lotQty)
                    price.push(-parseFloat(lot.lotPrice))
                    const setSellPrice = -parseFloat(lot.lotPrice)
                    totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    const setAverageSell = calculatePercentageOfChange(buyAverage.reduce((sum, current) => sum + current, 0), parseFloat(lot.lotPrice))
                    const totalSellPrice = parseFloat(lot.lotPrice) * parseFloat(lot.lotQty)
                    const totalBuyPrice = buyAverage.reduce((sum, current) => sum + current, 0) * parseFloat(lot.lotQty)
                    const pnl = parseFloat(totalSellPrice) - parseFloat(totalBuyPrice)
                    sellSummary.push(parseFloat(pnl))
                    commission.push((parseFloat(lot.lotQty) * parseFloat(lot.lotPrice) * parseFloat('0.' + lot.lotCommission)) / 100)
                }
                if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                    buyAverage.splice(0)
                    totalPrice.splice(0)
                }
            })
            const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)
        })

        const totalEarn = sellSummary.reduce((sum, current) => sum + current, 0) - commission.reduce((sum, current) => sum + current, 0)

        return totalEarn
    }



    const getCash = () => {
        const haveLot = []
        const qty = []
        const pnl = []
        let sortedLots = lots.sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        getLotNames().map(l => {
            const qty = []
            const price = []
            const totalPrice = []
            const totalBuyPrice = []
            const totalSellPrice = []
            sortedLots.filter(FLot => FLot.lotName == l).map(lot => {
                if (lot.lotStatus == true) {
                    qty.push(parseFloat(lot.lotQty))
                    price.push(parseFloat(lot.lotPrice))
                    totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalBuyPrice.push(parseFloat(lot.lotQty * lot.lotPrice))
                } else {
                    qty.push(-parseFloat(lot.lotQty))
                    price.push(-parseFloat(lot.lotPrice))
                    totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalSellPrice.push(parseFloat(lot.lotQty * lot.lotPrice))
                }
                if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                    totalPrice.splice(0)
                }
            })
            const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)

            pnl.push(totalSellPrice.reduce((sum, current) => sum + current, 0) - totalBuyPrice.reduce((sum, current) => sum + current, 0))

            haveLot.push([l, 1, qty.reduce((sum, current) => sum + current, 0).toFixed(2), totalPrice.reduce((sum, current) => sum + current, 0).toFixed(2), parseFloat(average).toFixed(2), totalBuyPrice.reduce((sum, current) => sum + current, 0).toFixed(2), totalSellPrice.reduce((sum, current) => sum + current, 0).toFixed(2)])
        })
        return pnl.reduce((sum, current) => sum + current, 0)
    }


    const budgetCount = () => {
        const totalBudget = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == category).map(b => (
            totalBudget.push(parseFloat(b.budgetPrice))
        ))

        return parseFloat(totalBudget.reduce((sum, current) => sum + current, 0))
    }


    const getDayName = (dayIndex) => {
        let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysArray[dayIndex];
    }

    const dates = (ago) => {
        const dates = []

        const d = new Date();

        let getAgo = ago
        if (d.getDay() == 1 || d.getDay() == 2 || d.getDay() == 3 || d.getDay() == 4) {
            getAgo += 2
        } else if (d.getDay() == 5) {
            getAgo += 1
        }

        const dDay = d.getDate(); //Current Date
        const dMonth = d.getMonth() + 1; //Current Month
        const dYear = d.getFullYear(); //Current Year
        const dDate = dYear + '-' + dMonth + '-' + dDay

        dates.push(dDate)
        for (let i = 0; i < getAgo; i++) {
            d.setDate(d.getDate() - 1)
            const dDay = d.getDate(); //Current Date
            const dMonth = d.getMonth() + 1; //Current Month
            const dYear = d.getFullYear(); //Current Year
            const dDate = dYear + '-' + dMonth + '-' + dDay


            if (d.getDay() == 0 || d.getDay() == 6) {

            } else {
                dates.push(dDate)
            }

        }
        return dates.reverse()
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
        dates(day).map(getDate => {
            const totalPnlDay = []
            getLotPnl().filter(fLot => fLot[0][0] == getDate).map(lot => {
                totalPnlDay.push(lot[0][2])

            })
            dayMonts.push(getDate.slice(5))
            totalPnl.push(totalPnlDay.reduce((sum, current) => sum + current, 0))
        })

        return {
            labels: dayMonts,
            datasets: [
                {
                    data: totalPnl
                }
            ]
        }
    }





    const screenWidth = Dimensions.get("window").width;



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
        }
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: '3%',
                paddingRight: '3%',
                backgroundColor: '#282644',
                paddingTop: 20,
                paddingBottom: 150,
                marginBottom: -25,
                position: 'absolute',
                top: 120,
                left: 0
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 2.5
                }}

            >
                <View
                    style={{
                        marginBottom: 12
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontFamily: fonts.Roboto.medium
                        }}
                    >
                        Toplam Değer
                    </Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 20
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 30,
                                fontFamily: fonts.Montserrat.regular,
                                color: '#fff'
                            }}
                        >₺{parseFloat(budgetCount() + getLotBuySellNew()).toFixed(2)}</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignSelf: 'center'
                        }}
                    >

                        <Image
                            source={require('../../assets/images/up.png')}
                            style={[{
                                alignSelf: 'center',
                                width: 15,
                                height: 15,
                                marginLeft: 6,
                                marginRight: 1,
                            },
                            calculatePercentageOfChange(budgetCount(), budgetCount() + getLotBuySellNew()) < 0 ? { transform: [{ rotate: "180deg" }] } : null
                            ]}
                        />
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >
                            {calculatePercentageOfChange(budgetCount(), budgetCount() + getLotBuySellNew())}%
                        </Text>
                    </View>
                </View>
                <BarChart
                    data={calculateForDate(5)}
                    width={screenWidth - ((screenWidth / 100) * 6)}
                    height={300}
                    yAxisLabel="₺"
                    chartConfig={{
                        backgroundGradientFrom: '#282644',
                        backgroundGradientTo: '#282644',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {

                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                />
            </View>
            {/* <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1.5,
                    width: 20
                }}
            >
                <View
                    style={{
                        marginBottom: -18
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '600',
                            color: '#fff'
                        }}
                    >
                        Son 7 Gün
                    </Text>
                </View>
                <View>
                    <CoinChart></CoinChart>
                </View>
            </View> */}
        </View>
    )
}



export default AnalysisGraphic