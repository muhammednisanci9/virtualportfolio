import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import MarketChart from './MarketChart'

const PortfolioSummary = () => {
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
        }
    }

    const pnl7day = [50, 10, 40, 95, -4, -24, 85]
    const pnl7day2 = [5, -2, 7, 4, 20, 10, 40]

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 175,
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: 30,
                minHeight: 500
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
                            fontSize: size.Title.title4,
                            color: '#111',
                            fontFamily: fonts.Montserrat.bold,
                        }}
                    >Borsalarım</Text>
                    <Image
                        source={require('../../assets/images/add.png')}
                        style={{
                            alignSelf: 'center',
                            width: 25,
                            height: 25,
                        }}
                    />
                </View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#f8f7fe',
                            borderRadius: 20,
                            width: 200,
                            height: 200,
                            paddingHorizontal: '3%',
                            paddingVertical: '5%',
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
                                    source={require('../../assets/images/binance.png')}
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
                                    color: '#111'
                                }}
                            >Binance</Text>
                            <View>
                                <Image
                                    source={require('../../assets/images/trend.png')}
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
                            >$1,905.95</Text>
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
                    <View
                        style={{
                            backgroundColor: '#f8f7fe',
                            borderRadius: 20,
                            width: 200,
                            height: 200,
                            paddingHorizontal: '3%',
                            paddingVertical: '5%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
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
                                    source={require('../../assets/images/gate.webp')}
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
                                    color: '#111'
                                }}
                            >Gate</Text>
                            <View>
                                <Image
                                    source={require('../../assets/images/trend.png')}
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
                            <MarketChart data={pnl7day2} height={200}></MarketChart>
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
                            >$1,905.95</Text>
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
                </View>

            </View>

            <View
                style={{
                    marginTop: 25
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: size.Title.title4,
                            marginBottom: 20,
                            color: '#111',
                            fontFamily: fonts.Montserrat.bold,
                            fontWeight: '700',
                        }}>
                        Varlıklarım
                    </Text>
                </View>
                <View
                    style={{
                        paddingBottom: 60
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/btc-logo.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/binance.png')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    BNB
                                </Text>
                                <Text>
                                    Binance
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>


                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/eth-logo.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/gate.webp')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    ETH
                                </Text>
                                <Text>
                                    Gate
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/sol-logo.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/mexc.png')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    GALA
                                </Text>
                                <Text>
                                    Mexc
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/binance.png')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    BNB
                                </Text>
                                <Text>
                                    Binance
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>


                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/gate.webp')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    ETH
                                </Text>
                                <Text>
                                    Gate
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#fbfbfb',
                                        top: -9,
                                        right: -9,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/mexc.png')}
                                        style={{
                                            width: 20,
                                            height: 20,

                                        }}
                                    />
                                </View>
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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    GALA
                                </Text>
                                <Text>
                                    Mexc
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />

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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    BNB
                                </Text>
                                <Text>
                                    Binance
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>


                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />

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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    ETH
                                </Text>
                                <Text>
                                    Gate
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }}
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
                                    width: 50,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/binance.png')}
                                    style={{
                                        width: 25,
                                        height: 25,

                                    }}
                                />

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
                                    paddingVertical: 3
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title6,
                                        color: '#111'
                                    }}
                                >
                                    GALA
                                </Text>
                                <Text>
                                    Mexc
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
                                            color: '#111',
                                            marginRight: 3,
                                            fontFamily: fonts.Montserrat.regular
                                        }}
                                    >+41.3</Text>
                                    <Text
                                        style={{
                                            fontSize: size.Title.title3,
                                            fontFamily: fonts.Montserrat.medium,
                                            color: '#111'
                                        }}
                                    >$412.35</Text>
                                </View>
                                <Text
                                    style={{
                                        color: '#a2cebf',
                                        fontWeight: '600'
                                    }}
                                >+3.59%</Text>
                            </View>
                        </View>
                    </View>



                </View>
            </View>
        </View>
    )
}


export default PortfolioSummary