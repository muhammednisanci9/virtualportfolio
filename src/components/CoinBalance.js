import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const CoinBalance = () => {

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
            let sortedLots = lots.filter(lot => lot.lotName == lName).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
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
        budgets.map(budget => {
            if (budget.budgetType == 1) {
                totalBudget.push(parseFloat(budget.budgetPrice))
            }
        })

        return parseFloat(totalBudget.reduce((sum, current) => sum + current, 0))
    }

    const getBudgetPriceWithdrawal = () => {
        const totalBudget = []
        budgets.map(budget => {
            if (budget.budgetType == 0) {
                totalBudget.push(parseFloat(-budget.budgetPrice))
            }
        })
        return totalBudget.reduce((sum, current) => sum + current, 0)
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
        }
    }

    return (
        <View
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
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
                        flexDirection: 'row'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 30,
                                fontFamily: fonts.Montserrat.regular,
                                color: '#fff'
                            }}
                        >₺{parseFloat(budgetCount() + getLotBuySellNew() + getBudgetPriceWithdrawal()).toFixed(2)}</Text>
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
                            calculatePercentageOfChange(budgetCount(), budgetCount() + getLotBuySellNew() + getBudgetPriceWithdrawal()) < 0 ? { transform: [{ rotate: "180deg" }] } : null
                            ]}
                        />
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >
                            {calculatePercentageOfChange(budgetCount(), budgetCount() + getLotBuySellNew() + getBudgetPriceWithdrawal()) == 'NaN' ? 0 : calculatePercentageOfChange(budgetCount(), budgetCount() + getLotBuySellNew() + getBudgetPriceWithdrawal())}%
                        </Text>
                    </View>
                </View>
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



export default CoinBalance