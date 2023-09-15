import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeButtonsContainer, SwipeItem, SwipeProvider } from 'react-native-swipe-item'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

const ProcesSummary = ({ navigation }) => {

    const [lots, setLots] = React.useState([]);

    const [lotCategory, setLotCategory] = useState('Satışlar')

    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = React.useState([]);


    React.useEffect(() => {
        getLotsFromUserDevice();
        setLoading(true)
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
    React.useEffect(() => {
        saveLotToUserDevice(lots);
    }, [lots]);

    const saveLotToUserDevice = async lots => {
        try {
            const stringifyLot = JSON.stringify(lots);
            await AsyncStorage.setItem('lots', stringifyLot);
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


    const removeLot = (id) => {
        const newTodosItem = lots.filter(item => item.lotId != id);
        setLots(newTodosItem);
    };



    const calculatePercentageOfChange = (x, y) => {
        const step1 = y - x;
        const step2 = step1 / x;
        const step3 = step2 * 100
        return step3.toFixed(2)
    }

    const calculatePercentageOfPlus = (x, y) => {
        const step1 = x * y;
        const step2 = step1 / 100;
        const step3 = x + step2
        return step3.toFixed(2)
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

    const pnl7day = [50, 10, 40, 95, -4, -24, 85]
    const pnl7day2 = [5, -2, 7, 4, 20, 10, 40]


    const getCategoryName = (id) => {

        const getCategoryName = categories.filter(getCategory => getCategory.categoryId == id).map(filteredCategory => filteredCategory.categoryName);
        return getCategoryName
    }

    // const getLotBuy = () => {
    //     const haveLot = []
    //     let sortedLots = lots.filter(lot => lot.lotName == lotName).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
    //     const qty = []
    //     const price = []
    //     const totalPrice = []
    //     const buyAverage = []
    //     const averageSell = []
    //     sortedLots.map(lot => {
    //         if (lot.lotStatus == true) {
    //             qty.push(parseFloat(lot.lotQty))
    //             price.push(parseFloat(lot.lotPrice))
    //             totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
    //             buyAverage.push(totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0))
    //         } else {
    //             qty.push(-parseFloat(lot.lotQty))
    //             price.push(-parseFloat(lot.lotPrice))
    //             totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
    //             averageSell.push(calculatePercentageOfChange(buyAverage.reduce((sum, current) => sum + current, 0), -totalPrice))
    //         }

    //     })
    //     const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)
    //     haveLot.push([lotName, 5, qty.reduce((sum, current) => sum + current, 0), totalPrice.reduce((sum, current) => sum + current, 0), parseFloat(average).toFixed(2), averageSell])

    //     return haveLot
    // }



    const getLotBuySell = () => {
        const haveLot = []
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
                sellSummary.push([setAverageSell, setSellQty, setSellPrice, lot.lotDate, lot.lotCategoryId, buyAverage, pnl, totalBuyPrice, lot.lotName])
            }
            if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                buyAverage.splice(0)
                totalPrice.splice(0)
            }
        })
        const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)
        haveLot.push(sellSummary)

        return sellSummary
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

    const getLotBuySellNew = () => {
        const haveLot = []
        getLotNames().map(lName => {
            let sortedLots = lots.filter(lot => lot.lotName == lName).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
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
                    sellSummary.push([setAverageSell, setSellQty, setSellPrice, lot.lotDate, lot.lotCategoryId, buyAverage, pnl, totalBuyPrice, lName, lot.lotId, lot.lotCategoryId])
                }
                if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                    buyAverage.splice(0)
                    totalPrice.splice(0)
                }
                sellSummary.length > 0 ? haveLot.push(sellSummary) : null
            })


        })
        let haveLotSorted = haveLot.sort((a, b) => new Date(...a[0][3].split('/').reverse()) - new Date(...b[0][3].split('/').reverse()));

        return haveLotSorted


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
                    source={require('../../assets/images/trash.png')}
                />
            </TouchableOpacity>
        </SwipeButtonsContainer>
    );


    const LotListsSell = () => {
        let sortedLots = lots.sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        return (
            <SwipeProvider>
                {
                    sortedLots.map(lot => (
                        <SwipeItem
                            key={lot.lotId}
                            style={styles.listItem}
                            swipeContainerStyle={styles.swipeContentContainerStyle}
                            rightButtons={rightButton(lot.lotId)}
                        >
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flex: 1
                                }}
                                onPress={() =>
                                    navigation.navigate('LotDetail', { lotName: lot.lotName, getLotCategoryId: lot.lotCategoryId })
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
                                        <Text
                                            style={{
                                                fontSize: 22,
                                                fontFamily: fonts.Kalam.bold
                                            }}
                                        >
                                            {lot.lotStatus ? 'A' : 'S'}
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
                                            {lot.lotName}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: fonts.Roboto.light
                                            }}
                                        >
                                            {lot.lotDate}
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

                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: size.title8,
                                                    fontFamily: fonts.Roboto.thin,
                                                    color: '#111',
                                                    marginRight: 5
                                                }}
                                            >₺{parseFloat(lot.lotPrice).toFixed(2)}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: size.Title.title3,
                                                    fontFamily: fonts.Roboto.medium,
                                                    color: '#111'
                                                }}
                                            >₺{parseFloat(lot.lotPrice * lot.lotQty).toFixed(2)}
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
                                            >{parseFloat(lot.lotQty).toFixed(2)} Ad.</Text>
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

    const LotLists = () => {
        return (
            <SwipeProvider>
                {getLotBuySellNew().map((lot, index) => (
                    <SwipeItem
                        key={index}
                        style={styles.listItem}
                        swipeContainerStyle={styles.swipeContentContainerStyle}
                        rightButtons={rightButton(lot[0][9])}
                    >
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1
                            }}
                            onPress={() =>
                                navigation.navigate('LotDetail', { lotName: lot[0][8], getLotCategoryId: lot[0][10] })
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
                                        {lot[0][8]}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.Roboto.light
                                        }}
                                    >
                                        {lot[0][3]}
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
                                    >₺{parseFloat(lot[0][7]).toFixed(2)}</Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Text
                                            style={lot[0][0] > 0 ? styles.positiveItem : styles.negativeItem}
                                        >{lot[0][0]}%</Text>
                                        <Text
                                            style={{
                                                color: '#111',
                                                marginLeft: 3,
                                                fontFamily: fonts.Roboto.regular,
                                                fontSize: 11,
                                                paddingBottom: 1,
                                            }}
                                        >{parseFloat(lot[0][6]).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SwipeItem>

                )).reverse()}</SwipeProvider>)
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: 30,
                minHeight: 1000
            }}
        >






            <View>
                <View>
                    <Text
                        style={{
                            marginBottom: 10,
                            fontSize: size.Title.title5,
                            color: '#111',
                            fontFamily: fonts.Roboto.bold,
                        }}>
                        Bütün İşlemlerim
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'grey',
                            padding: 5,
                            marginBottom: 10,
                            borderRadius: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setLotCategory('Hepsi')}
                            style={lotCategory == 'Hepsi' ? styles.activeCategory : styles.normalCategory}
                        >
                            <Text style={{ color: '#fff' }}>Hepsi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setLotCategory('Satışlar')}
                            style={lotCategory == 'Satışlar' ? styles.activeCategory : styles.normalCategory}
                        >
                            <Text style={{ color: '#fff' }}>Satışlarım</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        paddingBottom: 60
                    }}
                >
                    {
                        loading == true ?
                            lotCategory == 'Satışlar' ? <LotLists></LotLists> :
                                lotCategory == 'Hepsi' ? <LotListsSell></LotListsSell> : null : <LotListsBefore></LotListsBefore>
                    }



                </View>
            </View>
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
        width: '50%',
        alignItems: 'center',
        borderRadius: 20,
        padding: 5
    },
    normalCategory: {
        width: '50%',
        alignItems: 'center',
        borderRadius: 20,
        padding: 5
    }
});


export default ProcesSummary