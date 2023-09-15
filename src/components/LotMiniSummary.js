import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LotMiniSummary = ({ lotName }) => {


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

        haveLot.push([lotName, 5, qty.reduce((sum, current) => sum + current, 0), totalPrice.reduce((sum, current) => sum + current, 0), parseFloat(buyAverage).toFixed(2), averageSell])

        return haveLot
    }

    return (
        <View
            style={{
                backgroundColor: 'rgba(1, 1, 1, .2)',
                padding: 20,
                marginTop: 20
            }}
        >
            <View>
                <Text
                    style={{
                        marginBottom: 20,
                        fontSize: size.Title.title5,
                        color: '#fff',
                        fontFamily: fonts.Roboto.bold,
                    }}>
                    Varlık Özeti
                </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <View>
                    <Text
                        style={{
                            color: 'grey',
                            marginBottom: 10
                        }}
                    >Adet</Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 22
                        }}
                    >{getLotBuy()[0][2]}</Text>
                </View>
                <View>
                    <Text
                        style={{
                            color: 'grey',
                            marginBottom: 10
                        }}
                    >Maliyet</Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 22
                        }}
                    >₺{getLotBuy()[0][4]} </Text>
                </View>
                <View>
                    <Text
                        style={{
                            color: 'grey',
                            marginBottom: 10
                        }}
                    >Portföy Yüzdesi</Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 22
                        }}
                    >0%</Text>
                </View>
            </View>


        </View>
    )
}

export default LotMiniSummary