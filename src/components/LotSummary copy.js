import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import MarketChart from './MarketChart'
import SingleChart from './SingleChart'

const LotSummary = () => {
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

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 445,
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: 30,
                minHeight: 500
            }}
        >






            <View>
                <View>
                    <Text
                        style={{
                            marginBottom: 20,
                            fontSize: size.Title.title5,
                            color: '#111',
                            fontFamily: fonts.Roboto.bold,
                        }}>
                        Geçmiş İşlemlerim
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
                                    A
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
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
                                    S
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
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
                                    S
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
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
                                    A
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
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
                                    S
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
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
                                    A
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
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    HKTM
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    Kısa Vade
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    alignSelf: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>12.01.2023</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#111'
                                    }}
                                >₺10.10</Text>
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
                                            fontFamily: fonts.Roboto.regular,
                                            fontSize: 13,
                                            paddingBottom: 1,
                                        }}
                                    >50</Text>
                                </View>
                            </View>
                        </View>
                    </View>



                </View>
            </View>
        </View>
    )
}


export default LotSummary