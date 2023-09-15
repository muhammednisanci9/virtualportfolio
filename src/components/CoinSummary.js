import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import MarketChart from './MarketChart'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { SwipeButtonsContainer, SwipeItem, SwipeProvider } from 'react-native-swipe-item';
import { RadioButton } from 'react-native-paper';

const CoinSummary = ({ navigation }) => {

    const [budgets, setBudgets] = React.useState([]);

    const [categories, setCategories] = React.useState([]);
    const [categoryId, setCategoryId] = React.useState('');
    const [categoryName, setCategoryName] = React.useState('');

    const [lots, setLots] = React.useState([]);
    const [lotId, setLotId] = React.useState('');
    const [lotCategoryId, setLotCategoryId] = React.useState('');
    const [lotName, setLotName] = React.useState('');
    const [lotQty, setLotQty] = React.useState('');
    const [lotPrice, setLotPrice] = React.useState('');
    const [lotCommission, setLotCommission] = React.useState('');
    const [lotStatus, setLotStatus] = React.useState(false);
    const [lotDate, setLotDate] = React.useState('');

    const [categoryBar, setCategoryBar] = useState(0)

    const [showcalendar, setShowCalendar] = useState(false)

    const [loading, setLoading] = useState(false)

    const [loadingCategory, setLoadingCategory] = useState(false)

    LocaleConfig.locales['tr'] = {
        monthNames: [
            'Ocak',
            'Şubat',
            'Mart',
            'Nisan',
            'Mayıs',
            'Haziran',
            'Temmuz',
            'Ağustos',
            'Eylül',
            'Ekim',
            'Kasım',
            'Aralık'
        ],
        monthNamesShort: ['Ocak.', 'Şub.', 'Mart', 'Nisan', 'Mayıs', 'Haz', 'Tem.', 'Ağ', 'Tem.', 'Eylül.', 'Ekim.', 'Kasım'],
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi',],
        dayNamesShort: ['Paz.', 'Ptesi.', 'Salı', 'Çarş.', 'Perş.', 'Cuma', 'Ctesi.'],
        today: "Tarih"
    };
    LocaleConfig.defaultLocale = 'tr';

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

    const pnl7day = [50, 10, 40, 95, -4, -24, 85]
    const pnl7day2 = [5, -2, 7, 4, 20, 10, 40]


    const bottomSheet = React.useRef();
    const lotsBS = React.useRef();

    React.useEffect(() => {
        getCategoriesFromUserDevice();
    }, []);
    React.useEffect(() => {
        saveCategoryToUserDevice(categories);
        setLoadingCategory(true)
    }, [categories]);

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

    const addCategory = () => {
        if (categoryName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newCategory = {
                categoryId: categoryId,
                categoryName: categoryName,
            };
            setCategories([...categories, newCategory]);
            setCategoryName('');
        }
    };

    const saveCategoryToUserDevice = async categories => {
        try {
            const stringifyCategories = JSON.stringify(categories);
            await AsyncStorage.setItem('categories', stringifyCategories);
        } catch (error) {
            console.log(error);
        }
    };

    const createNewCategoryId = () => {

        const getBigCategoryId = categories.map(getCategoriesId => getCategoriesId.categoryId);
        let getList = getBigCategoryId.sort((a, b) => a - b).reverse();
        let newCategoryId = parseInt(getList[0]) + 1;
        if (isNaN(newCategoryId.toString())) {
            setCategoryId('1');
        } else {
            setCategoryId(newCategoryId.toString());
        }

    }



    React.useEffect(() => {
        getLotsFromUserDevice();
        setLoading(true)
    }, []);
    React.useEffect(() => {
        saveLotToUserDevice(lots);
    }, [lots]);


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

    const addLot = () => {
        if (lotName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newLot = {
                lotId: lotId,
                lotCategoryId: lotCategoryId,
                lotName: lotName.toUpperCase(),
                lotQty: lotQty,
                lotPrice: lotPrice,
                lotCommission: lotCommission,
                lotStatus: lotStatus,
                lotDate: lotDate
            };
            setLots([...lots, newLot]);
            setLotName('');
            setLotQty('');
            setLotPrice('');
        }
    };

    const saveLotToUserDevice = async lots => {
        try {
            const stringifyLot = JSON.stringify(lots);
            await AsyncStorage.setItem('lots', stringifyLot);
        } catch (error) {
            console.log(error);
        }
    };

    const createNewLotId = () => {

        const getBigLotId = lots.map(getLotsId => getLotsId.lotId);
        let getList = getBigLotId.sort((a, b) => a - b).reverse();
        let newLotId = parseInt(getList[0]) + 1;
        if (isNaN(newLotId.toString())) {
            setLotId('1');
        } else {
            setLotId(newLotId.toString());
        }

    }

    const removeLot = (id) => {
        const newTodosItem = lots.filter(item => item.lotId != id);
        setLots(newTodosItem);
    };

    const getFirstCategoryId = () => {

        const getFirstCategoryId = categories.map(cId => cId.categoryId);
        let getList = getFirstCategoryId.sort((a, b) => a - b);
        let newCategoryId = parseInt(getList[0]);
        if (isNaN(newCategoryId.toString())) {
            setLotCategoryId('1');
        } else {
            setLotCategoryId(newCategoryId.toString());
        }

    }



    const getCategoryName = (id) => {

        const getCategoryName = categories.filter(getCategory => getCategory.categoryId == id).map(filteredCategory => filteredCategory.categoryName);
        return getCategoryName
    }

    const GetBasketsOld = () => {
        return (
            categories.map(items => (
                <View
                    style={{
                        backgroundColor: '#f8f7fe',
                        borderRadius: 20,
                        width: 200,
                        height: 200,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: 20,
                        overflow: 'hidden'
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 7,
                                backgroundColor: '#fff',
                                borderRadius: 8
                            }}
                        >
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: size.Title.title4,
                                color: '#111',
                                fontFamily: fonts.Roboto.medium
                            }}
                        >{items.categoryName}</Text>
                        <View>
                            <Image
                                source={require('../../assets/images/trendup.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: 200,
                            top: 30
                        }}
                    >
                        <MarketChart data={pnl7day} height={200}></MarketChart>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: size.Title.title7,
                                fontFamily: fonts.Montserrat.medium
                            }}
                        >₺1,905.95</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(0, 0, 0, .3)',
                                borderRadius: 30,
                                paddingVertical: 3,
                                paddingHorizontal: 6
                            }}
                        >
                            <Image
                                source={require('../../assets/images/up.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                }}
                            />
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontFamily: fonts.Montserrat.light,
                                    marginLeft: 5
                                }}
                            >5.71%</Text>
                        </View>
                    </View>
                </View>
            ))
        )
    }

    const getBudgetPrice = (id) => {
        const totalBudget = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == id).map(budget => {
            if (budget.budgetType == 1) {
                totalBudget.push(parseFloat(budget.budgetPrice))
            }
        })
        return totalBudget.reduce((sum, current) => sum + current, 0)
    }

    const getBudgetPriceWithdrawal = (id) => {
        const totalBudget = []
        budgets.filter(fBudget => fBudget.budgetCategoryId == id).map(budget => {
            if (budget.budgetType == 0) {
                totalBudget.push(parseFloat(-budget.budgetPrice))
            }
        })
        return totalBudget.reduce((sum, current) => sum + current, 0)
    }

    const GetBasketsNew = () => {
        const totalCategoryPrice = []

        categories.map(category => {
            const totalBudget = getBudgetPrice(category.categoryId)
            const haveLot = []
            const sellSummary = []
            const commission = []
            getLotNames().map(lName => {
                let sortedLots = lots.filter(lot => lot.lotName == lName && lot.lotCategoryId == category.categoryId).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
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
            const totalPrice = totalEarn + totalBudget + getBudgetPriceWithdrawal(category.categoryId)
            totalCategoryPrice.push([category.categoryName, totalPrice.toFixed(2), calculatePercentageOfChange(totalBudget, totalPrice)])
        })

        return totalCategoryPrice
    }

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
                    <TouchableOpacity
                        key={0}
                        onPress={() => setCategoryBar(0)}
                        style={categoryBar == 0 ? styles.activeGetCategory : styles.normalGetCategory}
                    >
                        <Text style={{ color: '#fff' }}>{'Hepsi'}</Text>
                    </TouchableOpacity>
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


    const GetBaskets = () => {
        return (
            GetBasketsNew().map(items => (
                <View
                    key={items[0]}
                    style={{
                        backgroundColor: '#f8f7fe',
                        borderRadius: 20,
                        width: 200,
                        height: 200,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: 20,
                        overflow: 'hidden'
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 7,
                                backgroundColor: '#fff',
                                borderRadius: 8
                            }}
                        >
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: size.Title.title4,
                                color: '#111',
                                fontFamily: fonts.Roboto.medium
                            }}
                        >{items[0]}</Text>
                        <View>
                            <Image
                                source={require('../../assets/images/trendup.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: 200,
                            top: 30
                        }}
                    >
                        <MarketChart data={pnl7day} height={200}></MarketChart>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: size.Title.title6,
                                fontFamily: fonts.Montserrat.medium
                            }}
                        >₺{items[1]}</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(0, 0, 0, .3)',
                                borderRadius: 30,
                                paddingVertical: 3,
                                paddingHorizontal: 6
                            }}
                        >
                            <Image
                                source={require('../../assets/images/up.png')}
                                style={[{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                },
                                items[2] < 0 ? { transform: [{ rotate: "180deg" }] } : null
                                ]}
                            />
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 10,
                                    fontFamily: fonts.Montserrat.light,
                                    marginLeft: 5
                                }}
                            >{items[2] == 'NaN' ? 0 : items[2]}%</Text>
                        </View>
                    </View>
                </View>
            ))
        )
    }

    const GetBasketsBefore = () => {
        return (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <View
                    key={1}
                    style={{
                        backgroundColor: '#f8f7fe',
                        borderRadius: 20,
                        width: 200,
                        height: 200,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: 20,
                        overflow: 'hidden'
                    }}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '35%',
                            color: 'red',
                            borderWidth: 2,
                            padding: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: 'red',
                            zIndex: 9,
                            transform: [{ rotate: "-45deg" }]
                        }}
                    >
                        Örnek
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 7,
                                backgroundColor: '#fff',
                                borderRadius: 8
                            }}
                        >
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: size.Title.title4,
                                color: '#111',
                                fontFamily: fonts.Roboto.medium
                            }}
                        >{'Portföy 1'}</Text>
                        <View>
                            <Image
                                source={require('../../assets/images/trendup.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: 200,
                            top: 30
                        }}
                    >
                        <MarketChart data={pnl7day} height={200}></MarketChart>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: size.Title.title6,
                                fontFamily: fonts.Montserrat.medium
                            }}
                        >₺{'1000'}</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(0, 0, 0, .3)',
                                borderRadius: 30,
                                paddingVertical: 3,
                                paddingHorizontal: 6
                            }}
                        >
                            <Image
                                source={require('../../assets/images/up.png')}
                                style={[{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                },
                                5 < 0 ? { transform: [{ rotate: "180deg" }] } : null
                                ]}
                            />
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 10,
                                    fontFamily: fonts.Montserrat.light,
                                    marginLeft: 5
                                }}
                            >{'sa' == 'NaN' ? 0 : '20'}%</Text>
                        </View>
                    </View>
                </View>

                <View
                    key={2}
                    style={{
                        backgroundColor: '#f8f7fe',
                        borderRadius: 20,
                        width: 200,
                        height: 200,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: 20,
                        overflow: 'hidden'
                    }}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '35%',
                            color: 'red',
                            borderWidth: 2,
                            padding: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: 'red',
                            zIndex: 9,
                            transform: [{ rotate: "-45deg" }]
                        }}
                    >
                        Örnek
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 7,
                                backgroundColor: '#fff',
                                borderRadius: 8
                            }}
                        >
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: size.Title.title4,
                                color: '#111',
                                fontFamily: fonts.Roboto.medium
                            }}
                        >{'Portföy 2'}</Text>
                        <View>
                            <Image
                                source={require('../../assets/images/trendup.png')}
                                style={{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: 200,
                            top: 30
                        }}
                    >
                        <MarketChart data={pnl7day} height={200}></MarketChart>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: size.Title.title6,
                                fontFamily: fonts.Montserrat.medium
                            }}
                        >₺{'2000'}</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgba(0, 0, 0, .3)',
                                borderRadius: 30,
                                paddingVertical: 3,
                                paddingHorizontal: 6
                            }}
                        >
                            <Image
                                source={require('../../assets/images/up.png')}
                                style={[{
                                    alignSelf: 'center',
                                    width: 15,
                                    height: 15,
                                },
                                5 < 0 ? { transform: [{ rotate: "180deg" }] } : null
                                ]}
                            />
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 10,
                                    fontFamily: fonts.Montserrat.light,
                                    marginLeft: 5
                                }}
                            >{'sa' == 'NaN' ? 0 : '20'}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    const calculatePercentageOfChange = (x, y) => {
        const step1 = y - x;
        const step2 = step1 / x;
        const step3 = step2 * 100
        return step3.toFixed(2)
    }

    const rightButton = (id) => (
        <SwipeButtonsContainer
            style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
            }}

        >
            <TouchableOpacity
                onPress={() => removeLot(id)}
                style={{
                    marginLeft: 10,
                    backgroundColor: '#FA7070',
                    padding: 10,
                }}
            >
                <Image
                    style={{
                        width: 24,
                        height: 24
                    }}
                    source={require('../../assets/images/add.png')}
                />
            </TouchableOpacity>
        </SwipeButtonsContainer>
    );



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

        let sortedLots = lots.filter(fLot => fLot.lotCategoryId == categoryBar).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        if (categoryBar == 0) {
            sortedLots = lots.sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        } else {
            sortedLots = lots.filter(fLot => fLot.lotCategoryId == categoryBar).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        }
        getLotNames().map(l => {
            const qty = []
            const price = []
            const totalPrice = []
            const totalBuyPrice = []
            const totalSellPrice = []
            const lotCategoryIds = []
            const buyAverage = []
            const averageSell = []

            sortedLots.filter(fLot => fLot.lotName == l).map(lot => {
                lotCategoryIds.splice(0)
                if (lot.lotStatus == true) {
                    qty.push(parseFloat(lot.lotQty))
                    price.push(parseFloat(lot.lotPrice))
                    totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalBuyPrice.push(parseFloat(lot.lotQty * lot.lotPrice))

                    if (buyAverage.reduce((sum, current) => sum + current, 0) > 0) {
                        buyAverage.splice(0)
                    }
                    buyAverage.push(totalBuyPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0))

                } else {
                    qty.push(-parseFloat(lot.lotQty))
                    price.push(-parseFloat(lot.lotPrice))
                    totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                    totalSellPrice.push(parseFloat(lot.lotQty * lot.lotPrice))
                    averageSell.push(calculatePercentageOfChange(buyAverage.reduce((sum, current) => sum + current, 0), -totalPrice))
                    totalBuyPrice.push(-parseFloat(lot.lotQty) * buyAverage)
                }
                if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                    buyAverage.splice(0)
                    totalPrice.splice(0)
                }
                lotCategoryIds.push(lot.lotCategoryId)
            })
            const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)
            const totalBalance = buyAverage.reduce((sum, current) => sum + current, 0) * qty.reduce((sum, current) => sum + current, 0)
            if (qty.reduce((sum, current) => sum + current, 0)) {
                haveLot.push([l, lotCategoryIds, qty.reduce((sum, current) => sum + current, 0).toFixed(2), totalBalance.toFixed(2), parseFloat(buyAverage).toFixed(2), totalBuyPrice.reduce((sum, current) => sum + current, 0).toFixed(2), totalSellPrice.reduce((sum, current) => sum + current, 0).toFixed(2)])
            }
        })
        return haveLot
    }
    // .reduce((sum, current) => sum + current, 0)



    const LotLists = () => {
        return (
            <SwipeProvider>
                {getLotBuy().map(lot => (
                    <SwipeItem
                        key={lot[0]}
                        style={styles.listItem}
                        swipeContainerStyle={styles.swipeContentContainerStyle}

                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            onPress={() =>
                                navigation.navigate('LotDetail', { lotName: lot[0], getLotCategoryId: lot[1] })
                            }
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
                                    <Image
                                        source={require('../../assets/images/logo.png')}
                                        style={{
                                            alignSelf: 'center',
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                    {/* <Text
                                        style={{
                                            fontSize: 22,
                                            fontFamily: fonts.Kalam.bold
                                        }}
                                    >
                                        {lot.lotStatus ? 'A' : 'S'}
                                    </Text> */}
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
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#111',
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Roboto.medium,
                                        }}
                                    >
                                        {lot[0]}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.Roboto.light
                                        }}
                                    >
                                        {getCategoryName(lot[1])}
                                    </Text>
                                </View>
                                {/* <View
                                    style={{
                                        width: 100
                                    }}
                                >
                                    <SingleChart></SingleChart>
                                </View> */}
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        paddingVertical: 3,
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: size.title8,
                                                fontFamily: fonts.Roboto.thin,
                                                color: '#111',
                                                marginRight: 5
                                            }}
                                        >₺{lot[4] == 'NaN' ? 0 : lot[4]}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: size.Title.title3,
                                                fontFamily: fonts.Roboto.medium,
                                                color: '#111'
                                            }}
                                        >₺{lot[3]}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#111',
                                                marginLeft: 3,
                                                fontFamily: fonts.Roboto.regular,
                                                fontSize: 11,
                                                paddingBottom: 1,
                                            }}
                                        >{lot[2] == 'NaN' ? 0 : lot[2]} Ad.</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SwipeItem>

                )).reverse()}</SwipeProvider>)
    };





    const LotListsBefore = () => {
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
            {categories.length > 0 ? <GetCategoryBar></GetCategoryBar> : <GetCategoryBarBefore></GetCategoryBarBefore>}
            <ScrollView >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        marginTop: 115,
                        paddingLeft: '3%',
                        paddingRight: '3%',
                        paddingTop: 30,
                        paddingBottom: 170,
                        minHeight: 600,
                    }}
                >
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size.Title.title5,
                                    color: '#111',
                                    fontFamily: fonts.Roboto.bold,
                                }}
                            >Sepetlerim</Text>
                            <TouchableOpacity
                                onPress={() => { bottomSheet.current.show(); createNewCategoryId() }}>
                                <Image
                                    source={require('../../assets/images/add.png')}
                                    style={{
                                        alignSelf: 'center',
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 0,
                                margin: 0
                            }}
                        >
                            {loadingCategory == true && categories.length > 0 ? <GetBaskets></GetBaskets> : <GetBasketsBefore></GetBasketsBefore>}
                        </ScrollView>

                    </View>

                    <View
                        style={{
                            marginTop: 25
                        }}
                    >
                        <View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title5,
                                        color: '#111',
                                        fontFamily: fonts.Roboto.bold,
                                    }}>
                                    Varlıklarım
                                </Text>
                                <TouchableOpacity
                                    onPress={() => { lotsBS.current.show(); createNewLotId(); getFirstCategoryId() }}>
                                    <Image
                                        source={require('../../assets/images/add.png')}
                                        style={{
                                            alignSelf: 'center',
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'green',
                                    display: 'flex',
                                }}
                            >
                                <BottomSheet hasDraggableIcon ref={lotsBS} height={360} >
                                    <Picker
                                        selectedValue={lotCategoryId}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setLotCategoryId(itemValue)
                                        }>
                                        {
                                            categories.map(c => {
                                                return <Picker.Item label={c.categoryName} value={c.categoryId} key={c.categoryId} />
                                            })
                                        }

                                    </Picker>
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <View
                                                style={{ width: '49%', backgroundColor: lotStatus ? '#333' : '#6666', borderRadius: 30 }}
                                            >
                                                <RadioButton
                                                    value="buy"
                                                    status={lotStatus ? 'checked' : 'unchecked'}
                                                    onPress={() => setLotStatus(1)}
                                                />
                                                <View
                                                    pointerEvents='none'
                                                    style={{
                                                        position: 'absolute',
                                                        left: 40,
                                                        marginTop: 7,

                                                    }}
                                                >
                                                    <Text style={{ color: lotStatus ? '#fff' : '#111' }}>Alış</Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{ width: '49%', backgroundColor: !lotStatus ? '#333' : '#6666', borderRadius: 30 }}
                                            >
                                                <RadioButton
                                                    value="sell"
                                                    status={lotStatus === false ? 'checked' : 'unchecked'}
                                                    onPress={() => setLotStatus(false)}
                                                />
                                                <View
                                                    pointerEvents='none'
                                                    style={{
                                                        position: 'absolute',
                                                        left: 40,
                                                        marginTop: 7,

                                                    }}
                                                >
                                                    <Text style={{ color: !lotStatus ? '#fff' : '#111' }}>Satış</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <TextInput
                                            onChangeText={text => setLotName(text)}
                                            value={lotName}
                                            placeholder="Lot Adı"
                                            style={{
                                                marginLeft: 10,
                                                marginRight: 10,
                                                width: '49%',
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
                                        <TextInput
                                            onChangeText={text => setLotPrice(text)}
                                            keyboardType="numeric"
                                            value={lotPrice}
                                            placeholder="Birim Fiyatı"
                                            style={{
                                                width: '49%'
                                            }}
                                        />
                                        <TextInput
                                            onChangeText={text => setLotQty(text)}
                                            keyboardType="numeric"
                                            value={lotQty}
                                            placeholder="Toplam Adet"
                                            style={{
                                                width: '49%',
                                            }}
                                        />
                                    </View>

                                    <TextInput
                                        onChangeText={text => setLotCommission(text)}
                                        keyboardType="numeric"
                                        value={lotCommission}
                                        placeholder="Komisyon Oranı(Onbinde)"
                                        style={{
                                            width: '100%',
                                            marginHorizontal: '3%'
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
                                        <Text style={{ color: 'grey', fontSize: 14, fontWeight: '400' }}>{lotDate ? lotDate : 'Tarih Seçiniz'}</Text>
                                    </TouchableOpacity>
                                    <Modal visible={showcalendar} animationType='fade'>
                                        <Calendar
                                            style={{
                                                elevation: 4,
                                                margin: 40,
                                            }}
                                            onDayPress={(date) => {
                                                setLotDate(date.dateString)
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
                                            addLot(); lotsBS.current?.close(); ({
                                                type: 'success',
                                                text1: 'Başarıyla Eklendi',
                                            });
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>Ekle</Text>
                                    </TouchableOpacity>

                                </BottomSheet>

                            </View>
                        </View>
                        <View
                            style={{
                                paddingBottom: 60
                            }}
                        >




                            {loading == true && lots.length > 0 ? <LotLists></LotLists> : <LotListsBefore></LotListsBefore>}




                        </View>
                    </View>
                    <BottomSheet hasDraggableIcon ref={bottomSheet} height={140} >

                        <TextInput
                            onChangeText={text => setCategoryName(text)}
                            value={categoryName}
                            placeholder="Kategori İsmi"
                            style={{
                                marginLeft: 10,
                                marginRight: 10
                            }}
                        />

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
                            onPress={() => { addCategory(); bottomSheet.current?.close() }}
                        >
                            <Text style={{ color: '#fff' }}>Ekle</Text>
                        </TouchableOpacity>

                    </BottomSheet>
                </View>
            </ScrollView>

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
    }
});


export default CoinSummary