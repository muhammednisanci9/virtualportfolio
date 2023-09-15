import { View, Text, processColor } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DayPnl = () => {

    const [lots, setLots] = React.useState([]);

    const [categories, setCategories] = React.useState([]);

    const [budgets, setBudgets] = React.useState([]);

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

    const getLots = (id) => {
        let lotList = []
        lots.filter(fLot => fLot.lotCategoryId == 1).map(lot => {
            lotList.push(
                {
                    totalPrice: lot.lotPrice * lot.lotQty,
                    date: lot.lotDate
                }
            )
        })

        return lotList
    }

    const getBudgets = (id) => {
        let budgetList = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == 1).map(budget => {
            budgetList.push(
                {
                    budgetPrice: budget.budgetPrice,
                    date: budget.budgetDate
                }
            )
        })

        return budgetList
    }

    const pnl = () => {
        const process = []
        process.push(getBudgets())
        return process
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

    const calculatePercentageOfChange = (x, y) => {
        const step1 = y - x;
        const step2 = step1 / x;
        const step3 = step2 * 100
        return step3.toFixed(2)
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

    const getBudgetPrice = (id, date) => {
        const totalBudget = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == id && fBudget.budgetDate <= date).map(budget => {
            totalBudget.push(parseFloat(budget.budgetPrice))
        })
        return totalBudget.reduce((sum, current) => sum + current, 0)
    }


    const GetBasketsNew = (ago) => {
        const totalCategoryPrice = []

        categories.map(category => {
            const totalCategoryDatePrice = []
            dates(ago).map(getDate => {
                const totalBudget = getBudgetPrice(category.categoryId, getDate)
                const haveLot = []
                const sellSummary = []
                const commission = []
                getLotNames().map(lName => {
                    let sortedLots = lots.filter(lot => lot.lotName == lName && lot.lotCategoryId == category.categoryId && lot.lotDate <= getDate).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
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
                const totalPrice = totalEarn + totalBudget
                totalCategoryDatePrice.push([category.categoryName, totalPrice.toFixed(2), calculatePercentageOfChange(totalBudget, totalPrice), getDate])
            })
            totalCategoryPrice.push(totalCategoryDatePrice)
        })

        return totalCategoryPrice
    }



    return (
        <View>
            <Text>{GetBasketsNew(10)}</Text>
            {console.log(GetBasketsNew(10))}
        </View>
    )
}

export default DayPnl