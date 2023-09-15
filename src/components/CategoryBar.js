import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const CategoryBar = () => {
    const [bar, setBar] = useState('Tümü')

    const categories = [
        'Tümü',
        'Hodl',
        'Kısa Vade',
        'Demir Çelik',
    ]

    return (
        <View
            style={{
                display: 'flex',
                alignSelf: 'center',
                position: 'absolute',
                top: -475,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#282644',
                height: 60,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'grey',
                    padding: 8,
                    borderRadius: 15,
                }}
            >
                {
                    categories.map((item, index) => (
                        <View style={[bar == item ? styles.activeItem : styles.normallyItem]} key={index}>
                            <TouchableOpacity
                                onPress={() => setBar(item)}
                            >
                                <Text style={[bar == item ? styles.activeItemText : null]}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
                

            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    activeItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#444',
        flex: 1,
        borderRadius: 10,
        padding: 3,
    },
    normallyItem: {
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        flex: 1
    },
    activeItemText: {
        color: '#fff'
    },

});

export default CategoryBar