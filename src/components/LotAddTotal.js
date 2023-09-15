import { View, Text, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LotAddTotal = () => {

    const [lots, setLots] = React.useState([]);
    const [lotId, setLotId] = React.useState('');
    const [lotCategoryId, setLotCategoryId] = React.useState('');
    const [lotName, setLotName] = React.useState('');
    const [lotQty, setLotQty] = React.useState('');
    const [lotPrice, setLotPrice] = React.useState('');
    const [lotCommission, setLotCommission] = React.useState('');
    const [lotStatus, setLotStatus] = React.useState(false);
    const [lotDate, setLotDate] = React.useState('');

    React.useEffect(() => {
        getLotsFromUserDevice();
    }, []);
    React.useEffect(() => {
        saveLotToUserDevice(lots);
    }, [lots]);


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

    const addLot = () => {
        if (lotName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newLot = {
                lotId: lotId,
                lotCategoryId: lotCategoryId,
                lotName: lotName.toUpperCase(),
                lotQty: lotQty,
                lotPrice: lotPrice,
                lotCommission: lotCommission,
                lotStatus: lotStatus,
                lotDate: lotDate
            };
            setLots([...lots, newLot]);
            setLotName('');
            setLotQty('');
            setLotPrice('');
        }
    };

    const addLotTotal = (lotId, lotCategoryId, lotName, lotQty, lotPrice, lotCommission, lotStatus, lotDate) => {
        if (lotName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newLot = {
                lotId: lotId,
                lotCategoryId: lotCategoryId,
                lotName: lotName.toUpperCase(),
                lotQty: lotQty,
                lotPrice: lotPrice,
                lotCommission: lotCommission,
                lotStatus: lotStatus,
                lotDate: lotDate
            };
            setLots([...lots, newLot]);
            setLotName('');
            setLotQty('');
            setLotPrice('');
        }
    };


    const saveLotToUserDevice = async lots => {
        try {
            const stringifyLot = JSON.stringify(lots);
            await AsyncStorage.setItem('lots', stringifyLot);
        } catch (error) {
            console.log(error);
        }
    };


    const createBigLotId = () => {
        const lotIds = []
        lots.map(lot => {
            lotIds.push(lot.lotId)
        })
        const shortIdList = lotIds.sort((a, b) => a - b).reverse()
        let biggestId = parseInt(shortIdList[0]) + 1

        if (lots.length == 0) {
            biggestId = 0
        }
        return biggestId
    }

    // {
    //     'lotId': 1,
    //         'lotCategoryId': 1,
    //             'lotName': 'ASELS',
    //                 'lotQty': 12,
    //                     'lotPrice': 22,
    //                         'lotCommission': 15,
    //                             'lotStatus': 0,
    //                                 'lotDate': 2022 - 12 - 30
    // }

    const toplu = [
        [1111, 1, 'ASELS', 12, 22, 15, true, '2022-12-30'],
        [1111, 1, 'EGGUB', 11, 44, 15, true, '2022-12-28'],
        [1111, 1, 'SA', 20, 66, 15, false, '2022-12-27'],
        [1111, 1, 'ISDMR', 13, 33, 15, false, '2022-12-29']
    ]

    const topluEkle = () => {
        console.log(toplu.length)

        const startValue = createBigLotId()
        const lastValue = createBigLotId() + toplu.length

        const newLots = []

        for (let i = startValue; i <= lastValue; i++) (
            setLotId(i),
            setLotCategoryId(toplu[0][1]),
            setLotName(toplu[0][2]),
            setLotQty(toplu[0][3]),
            setLotPrice(toplu[0][4]),
            setLotCommission(toplu[0][5]),
            setLotStatus(toplu[0][6]),
            setLotDate(toplu[0][7]),

            // const newLot = {
            //     lotId: i,
            //     lotCategoryId: toplu[0][1],
            //     lotName: toplu[0][2].toUpperCase(),
            //     lotQty: toplu[0][3],
            //     lotPrice: toplu[0][4],
            //     lotCommission: toplu[0][5],
            //     lotStatus: toplu[0][6],
            //     lotDate: toplu[0][7]
            // };



            console.log(toplu[0][2])
        )
        console.log('bitti')
    }

    return (
        <View>
            <Text style={{ backgroundColor: 'orange' }}>
                {
                    lots.map(lot => (
                        lot.lotId
                    ))
                }
                {topluEkle()}
                {createBigLotId()}
            </Text>
        </View>
    )
}

export default LotAddTotal