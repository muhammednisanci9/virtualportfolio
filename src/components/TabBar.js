import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

function TabBar({ state, descriptors, navigation }) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 5,
            backgroundColor: 'transparent'
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 60,
                width: '95%',
                marginLeft: '2.5%',
                backgroundColor: '#292f34',
                marginBottom: 10,
                borderRadius: 10
            }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            key={index}
                            style={{
                                width: '25%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {
                                label == 'Process' ? <Image
                                    source={require('../../assets/images/process.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                /> : false
                            }
                            {
                                label == 'CoinStack' ? <Image
                                    source={require('../../assets/images/wallet.png')}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                /> : false
                            }
                            {
                                label == 'Profile' ? <Image
                                    source={require('../../assets/images/budget.png')}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                /> : false
                            }
                            {
                                label == 'Analysis' ? <Image
                                    source={require('../../assets/images/analysis.png')}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                /> : false
                            }
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default TabBar