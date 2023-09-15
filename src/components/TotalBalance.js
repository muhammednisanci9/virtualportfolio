import { View, Text, Image } from 'react-native'
import React from 'react'

const TotalBalance = () => {

    const montserrat = {
        regular : 'Montserrat-Regular',
        medium : 'Montserrat-Medium'
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
                            fontWeight: '600',
                            color: '#fff'
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
                                fontFamily: montserrat.regular,
                                color: '#fff'
                            }}
                        >$3,975.21</Text>
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
                            20%
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1.5
                }}
            >
                <View
                    style={{
                        marginBottom: 12
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '600',
                            color: '#fff'
                        }}
                    >
                        Günün Karı
                    </Text>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: 25,
                            fontFamily: montserrat.regular,
                            color: '#fff'
                        }}
                    >
                        $1,205
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default TotalBalance