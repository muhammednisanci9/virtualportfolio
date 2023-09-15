import { View, Text, Image } from 'react-native'
import React from 'react'
import LotChart from './LotChart'
import LotMiniSummary from './LotMiniSummary'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LotBalance = ({ lotName }) => {


    const [lots, setLots] = React.useState([]);


    const [loading, setLoading] = React.useState(false)


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



    const calculatePercentageOfChange = (x, y) => {
        const step1 = y - x;
        const step2 = step1 / x;
        const step3 = step2 * 100
        return step3.toFixed(2)
    }

    const getLotBuy = () => {
        const haveLot = []
        let sortedLots = lots.filter(lot => lot.lotName == lotName).sort((a, b) => new Date(...a.lotDate.split('/').reverse()) - new Date(...b.lotDate.split('/').reverse()));
        const qty = []
        const price = []
        const totalPrice = []
        const buyAverage = []
        const averageSell = []
        const totalBuyPrice = []


        sortedLots.map(lot => {
            if (lot.lotStatus == true) {
                qty.push(parseFloat(lot.lotQty))
                price.push(parseFloat(lot.lotPrice))
                totalPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                totalBuyPrice.push(parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))

                if (buyAverage.reduce((sum, current) => sum + current, 0) > 0) {
                    buyAverage.splice(0)
                }
                buyAverage.push(totalBuyPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0))

            } else {
                qty.push(-parseFloat(lot.lotQty))
                price.push(-parseFloat(lot.lotPrice))
                totalPrice.push(-parseFloat(lot.lotPrice) * parseFloat(lot.lotQty))
                averageSell.push(calculatePercentageOfChange(buyAverage.reduce((sum, current) => sum + current, 0), -totalPrice))
                totalBuyPrice.push(-parseFloat(lot.lotQty) * buyAverage)
            }
            if (qty.reduce((sum, current) => sum + current, 0) == 0) {
                buyAverage.splice(0)
                totalPrice.splice(0)
            }
        })
        const average = totalPrice.reduce((sum, current) => sum + current, 0) / qty.reduce((sum, current) => sum + current, 0)

        const totalBalance = buyAverage.reduce((sum, current) => sum + current, 0) * qty.reduce((sum, current) => sum + current, 0)



        return totalBalance
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
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: '3%',
                paddingRight: '3%',
                backgroundColor: '#282644',
                paddingTop: 20,
                paddingBottom: 350,
                marginBottom: -35,
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
                        >₺{getLotBuy().toFixed(2)}</Text>
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
                            style={{
                                alignSelf: 'center',
                                width: 15,
                                height: 15,
                                marginLeft: 6,
                                marginRight: 1,
                            }}
                        />
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >
                            0%
                        </Text>
                    </View>
                </View>
                <LotMiniSummary lotName={lotName}></LotMiniSummary>

            </View>
        </View>
    )
}

export default LotBalance