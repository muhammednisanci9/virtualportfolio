import React, { useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from "react-native-gesture-bottom-sheet";

const Profile = () => {

  const [categories, setCategories] = React.useState([]);

  const [categoryId, setCategoryId] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');
  // Needed in order to use .show()
  const bottomSheet = React.useRef();

  React.useEffect(() => {
    getCategoriesFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveCategoryToUserDevice(categories);
  }, [categories]);


  const addCategory = () => {
    if (categoryName == '') {
      Alert.alert('Error', 'Please input word');
    } else {
      const newCategory = {
        categoryId: categoryId,
        categoryName: categoryName,
      };
      setCategories([...categories, newCategory]);
      setCategoryName('');
    }
  };

  const saveCategoryToUserDevice = async categories => {
    try {
      const stringifyCategories = JSON.stringify(categories);
      await AsyncStorage.setItem('categories', stringifyCategories);
    } catch (error) {
      console.log(error);
    }
  };




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


  const createNewCategoryId = () => {

    const getBigCategoryId = categories.map(getCategoriesId => getCategoriesId.categoryId);
    let getList = getBigCategoryId.sort((a, b) => a - b).reverse();
    let newCategoryId = parseInt(getList[0]) + 1;
    if (isNaN(newCategoryId.toString())) {
      setCategoryId('1');
    } else {
      setCategoryId(newCategoryId.toString());
    }

  }



  return (
    <View>
      <TouchableOpacity
        onPress={() => { bottomSheet.current.show(); createNewCategoryId() }}
        style={{
          backgroundColor: '#49B0AA',
          borderRadius: 50,
          padding: 15
        }}
      ><Text>Aç</Text></TouchableOpacity>
      
      {
        categories.map(item => (
          <View>
            <Text>{item.categoryId}</Text>
            <Text>{item.categoryName}</Text>
          </View>
        ))
      }
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={200} >
       
        <TextInput
          onChangeText={text => setCategoryName(text)}
          value={categoryName}
          placeholder="Kategori İsmi"
          style={{
            marginLeft: 10,
            marginRight: 10
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#49B0AA',
            padding: 10,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10
          }}
          onPress={() => { addCategory(); bottomSheet.current?.close() }}
        >
          <Text>Ekle</Text>
        </TouchableOpacity>

      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;