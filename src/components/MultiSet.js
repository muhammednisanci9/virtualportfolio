import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { SwipeButtonsContainer, SwipeItem, SwipeProvider } from 'react-native-swipe-item';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

const MultiSet = () => {

    const [msets, setMsets] = React.useState([]);

    const [categories, setCategories] = React.useState([]);

    const [msetId, setMsetId] = React.useState('');
    const [msetCategoryId, setMsetCategoryId] = React.useState('');
    const [msetDate, setMsetDate] = React.useState('');
    const [msetPrice, setMsetPrice] = React.useState('');


    const [loading, setLoading] = useState(false)

    const [showcalendar, setShowCalendar] = useState(false)


    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;

    const bottomSheet = React.useRef();


    React.useEffect(() => {
        getMsetsFromUserDevice();

    }, []);

    React.useEffect(() => {
        saveMsetToUserDevice(msets);
    }, [msets]);

    const addMset = () => {
        if (msetDate == '' || msetPrice == '' || date == '') {
            Alert.alert('Hata', 'Lütfen bütün alanları doldurun');
        } else {
            const newMset = {
                msetId: msetId,
                msetCategoryId: msetCategoryId,
                msetDate: msetDate,
                msetPrice: msetPrice,
                date: addToTime,
            };
            setMsets([...msets, newMset]);
            setMsetDate('');
            setMsetPrice('');
        }
    };

    const multiData = [
        [11, 2, '2022-11-10', 100],
        [12, 3, '2022-11-11', 101],
        [13, 3, '2022-11-12', 102]
    ]

    const multiData2 = [...msets,
        {
            msetId: 12,
            msetCategoryId: 1,
            msetDate: 2,
            msetPrice: 2,
        },
        {
            msetId: 13,
            msetCategoryId: 1,
            msetDate: 2,
            msetPrice: 2,
        }
    ]

    const addMsetMulti = () => {
        AsyncStorage.setItem("msets", JSON.stringify(multiData2))
    };

    const saveMsetToUserDevice = async msets => {
        try {
            const stringifyMsets = JSON.stringify(msets);
            await AsyncStorage.setItem('msets', stringifyMsets);
        } catch (error) {
            console.log(error);
        }
    };

    const getMsetsFromUserDevice = async () => {
        try {
            const msets = await AsyncStorage.getItem('msets');
            if (msets != null) {
                setMsets(JSON.parse(msets));
                setLoading(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getCategoriesFromUserDevice();
    }, []);

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

    const removeMset = (id) => {
        const newTodosItem = msets.filter(item => item.msetId != id);
        setMsets(newTodosItem);
    };

    const createNewMsetId = () => {

        const getBigMsetId = msets.map(getMsetsId => getMsetsId.msetId);
        let getList = getBigMsetId.sort((a, b) => a - b).reverse();
        let newMsetId = parseInt(getList[0]) + 1;
        if (isNaN(newMsetId.toString())) {
            setMsetId('1');
        } else {
            setMsetId(newMsetId.toString());
        }

    }

    const getFirstCategoryId = () => {

        const getFirstCategoryId = categories.map(cId => cId.categoryId);
        let getList = getFirstCategoryId.sort((a, b) => a - b);
        let newCategoryId = parseInt(getList[0]);
        if (isNaN(newCategoryId.toString())) {
            setMsetCategoryId('1');
        } else {
            setMsetCategoryId(newCategoryId.toString());
        }

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



    const getCategoryName = (id) => {

        const getCategoryName = categories.filter(getCategory => getCategory.categoryId == id).map(filteredCategory => filteredCategory.categoryName);
        return getCategoryName
    }






    const SmallAdd = () => { // msetAdd
        return (
            <TouchableOpacity
                onPress={() => { bottomSheet.current.show(); createNewMsetId(); getFirstCategoryId() }}
                style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 0,
                    borderRadius: 50,
                    padding: 15,
                    paddingRight: 0
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
        )
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
                onPress={() => removeMset(id)}
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


    const MsetLists = () => {
        return (
            <SwipeProvider>
                {msets.map(mset => (
                    <SwipeItem
                        key={mset.msetId}
                        style={styles.listItem}
                        swipeContainerStyle={styles.swipeContentContainerStyle}
                        rightButtons={rightButton(mset.msetId)}
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
                                    {mset.msetId}
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
                                    alignSelf: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#111',
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                    }}
                                >
                                    {getCategoryName(mset.msetCategoryId)}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    {mset.msetDate}
                                </Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingVertical: 3,
                                    alignSelf: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#333'
                                    }}
                                >{mset.msetPrice} ₺</Text>
                            </View>
                        </View>
                    </SwipeItem>

                )).reverse()}</SwipeProvider>)
    };



    const MsetListsBefore = () => {
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
                            marginBottom: 20,
                            fontSize: size.Title.title5,
                            color: '#111',
                            fontFamily: fonts.Roboto.bold,
                        }}>
                        Bütçe
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'green',
                            display: 'flex',
                        }}
                    >
                        <BottomSheet hasDraggableIcon ref={bottomSheet} height={220} >
                            <Picker
                                selectedValue={msetCategoryId}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMsetCategoryId(itemValue)
                                }>
                                {
                                    categories.map(c => {
                                        return <Picker.Item label={c.categoryName} value={c.categoryId} key={c.categoryId} />
                                    })
                                }

                            </Picker>
                            <TextInput
                                onChangeText={text => setMsetPrice(text)}
                                value={msetPrice}
                                placeholder="Bütçe"
                                keyboardType="numeric"
                                style={{
                                    marginLeft: 10,
                                    marginRight: 10
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
                                <Text style={{ color: 'grey', fontSize: 14, fontWeight: '400' }}>{msetDate ? msetDate : 'Tarih Seçiniz'}</Text>
                            </TouchableOpacity>
                            <Modal visible={showcalendar} animationType='fade'>
                                <Calendar
                                    style={{
                                        elevation: 4,
                                        margin: 40,
                                    }}
                                    onDayPress={(date) => {
                                        setMsetDate(date.dateString)
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
                                    addMset(); bottomSheet.current?.close();
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Ekle</Text>
                            </TouchableOpacity>

                        </BottomSheet>
                        <SmallAdd></SmallAdd>

                    </View>
                </View>
                <View
                    style={{
                        paddingBottom: 60,

                    }}
                >


                    {loading == true ? <MsetLists></MsetLists> : <MsetListsBefore></MsetListsBefore>}

                    <TouchableOpacity
                        onPress={() => addMsetMulti()}
                    >
                        <Text>sa</Text>
                    </TouchableOpacity>


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
    }
});


export default MultiSet