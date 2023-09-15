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

const BudgetSummary = () => {

    const [budgets, setBudgets] = React.useState([]);

    const [categories, setCategories] = React.useState([]);

    const [budgetId, setBudgetId] = React.useState('');
    const [budgetCategoryId, setBudgetCategoryId] = React.useState('');
    const [budgetType, setBudgeType] = React.useState(0); // 0 çekme, 1 yatırma
    const [budgetDate, setBudgetDate] = React.useState('');
    const [budgetPrice, setBudgetPrice] = React.useState('');


    const [loading, setLoading] = useState(false)

    const [showcalendar, setShowCalendar] = useState(false)


    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;



    const bottomSheet = React.useRef();


    React.useEffect(() => {
        getBudgetsFromUserDevice();

    }, []);

    React.useEffect(() => {
        saveBudgetToUserDevice(budgets);
    }, [budgets]);

    const addBudget = () => {
        if (budgetDate == '' || budgetPrice == '' || date == '') {
            Alert.alert('Hata', 'Lütfen bütün alanları doldurun');
        } else {
            const newBudget = {
                budgetId: budgetId,
                budgetCategoryId: budgetCategoryId,
                budgetType: budgetType,
                budgetDate: budgetDate,
                budgetPrice: budgetPrice,
                date: addToTime,
            };
            setBudgets([...budgets, newBudget]);
            setBudgetDate('');
            setBudgetPrice('');
        }
    };

    const saveBudgetToUserDevice = async budgets => {
        try {
            const stringifyBudgets = JSON.stringify(budgets);
            await AsyncStorage.setItem('budgets', stringifyBudgets);
        } catch (error) {
            console.log(error);
        }
    };

    const getBudgetsFromUserDevice = async () => {
        try {
            const budgets = await AsyncStorage.getItem('budgets');
            if (budgets != null) {
                setBudgets(JSON.parse(budgets));
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

    const removeBudget = (id) => {
        const newTodosItem = budgets.filter(item => item.budgetId != id);
        setBudgets(newTodosItem);
    };

    const createNewBudgetId = () => {

        const getBigBudgetId = budgets.map(getBudgetsId => getBudgetsId.budgetId);
        let getList = getBigBudgetId.sort((a, b) => a - b).reverse();
        let newBudgetId = parseInt(getList[0]) + 1;
        if (isNaN(newBudgetId.toString())) {
            setBudgetId('1');
        } else {
            setBudgetId(newBudgetId.toString());
        }

    }

    const getFirstCategoryId = () => {

        const getFirstCategoryId = categories.map(cId => cId.categoryId);
        let getList = getFirstCategoryId.sort((a, b) => a - b);
        let newCategoryId = parseInt(getList[0]);
        if (isNaN(newCategoryId.toString())) {
            setBudgetCategoryId('1');
        } else {
            setBudgetCategoryId(newCategoryId.toString());
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






    const SmallAdd = () => { // budgetAdd
        return (
            <TouchableOpacity
                onPress={() => { bottomSheet.current.show(); createNewBudgetId(); getFirstCategoryId() }}
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
                onPress={() => removeBudget(id)}
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


    const BudgetLists = () => {
        let sortedLots = budgets.sort((a, b) => new Date(...a.budgetDate.split('/').reverse()) - new Date(...b.budgetDate.split('/').reverse()));
        return (
            <SwipeProvider>
                {sortedLots.map(budget => (
                    <SwipeItem
                        key={budget.budgetId}
                        style={styles.listItem}
                        swipeContainerStyle={styles.swipeContentContainerStyle}
                        rightButtons={rightButton(budget.budgetId)}
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
                                    {budget.budgetType == '0' ? 'Ç' : budget.budgetType == '1' ? 'Y' : 'T'}
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
                                    {getCategoryName(budget.budgetCategoryId)}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.Roboto.light
                                    }}
                                >
                                    {budget.budgetDate}
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
                                    style={[{
                                        fontSize: size.Title.title3,
                                        fontFamily: fonts.Roboto.medium,
                                        color: '#333',
                                    },
                                    budget.budgetType == 0 ? styles.negativeItem : budget.budgetType == 1 ? styles.positiveItem : null
                                    ]}
                                >{budget.budgetPrice} ₺</Text>
                            </View>
                        </View>
                    </SwipeItem>

                )).reverse()}</SwipeProvider>)
    };



    const BudgetListsBefore = () => {
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

            {console.log(categories)}

            <View>
                <View>
                    <Text
                        style={{
                            marginBottom: 20,
                            fontSize: size.Title.title5,
                            color: '#111',
                            fontFamily: fonts.Roboto.bold,
                        }}>
                        Para Yatırma ve Çekme
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'green',
                            display: 'flex',
                        }}
                    >
                        <BottomSheet hasDraggableIcon ref={bottomSheet} height={280} >
                            <Picker
                                selectedValue={budgetCategoryId}
                                onValueChange={(itemValue, itemIndex) =>
                                    setBudgetCategoryId(itemValue)
                                }>
                                {
                                    categories.map(c => {
                                        return <Picker.Item label={c.categoryName} value={c.categoryId} key={c.categoryId} />
                                    })
                                }

                            </Picker>

                            <Picker
                                selectedValue={budgetType}
                                onValueChange={(itemValue, itemIndex) =>
                                    setBudgeType(itemValue)
                                }>
                                <Picker.Item label={'Para Yatırma İşlemi'} value={1} key={1} />
                                <Picker.Item label={'Para Çekme İşlemi'} value={0} key={0} />
                            </Picker>

                            <TextInput
                                onChangeText={text => setBudgetPrice(text)}
                                value={budgetPrice}
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
                                <Text style={{ color: 'grey', fontSize: 14, fontWeight: '400' }}>{budgetDate ? budgetDate : 'Tarih Seçiniz'}</Text>
                            </TouchableOpacity>
                            <Modal visible={showcalendar} animationType='fade'>
                                <Calendar
                                    style={{
                                        elevation: 4,
                                        margin: 40,
                                    }}
                                    onDayPress={(date) => {
                                        setBudgetDate(date.dateString)
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
                                    addBudget(); bottomSheet.current?.close();
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


                    {loading == true ? <BudgetLists></BudgetLists> : <BudgetListsBefore></BudgetListsBefore>}



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
});


export default BudgetSummary