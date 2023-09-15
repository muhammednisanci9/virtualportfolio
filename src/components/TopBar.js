import { View, Text, Image } from 'react-native'
import React from 'react'

const TopBar = ({ title }) => {

    const eTitle = 'Boş'

    return (
        <View
            style={{
                height: 60,
                backgroundColor: '#282644',
                zIndex: 9,
                paddingHorizontal: '3%',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Image
                source={require('../../assets/images/arrow.png')}
                style={{
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                }}
            />
            <Text
                style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    paddingBottom: 3,
                    marginLeft: 20,
                    color: '#fff'
                }}
            >{title ? title : eTitle}</Text>
        </View>
    )
}

export default TopBar