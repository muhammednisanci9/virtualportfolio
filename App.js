import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/pages/Profile';
import TabBar from './src/components/TabBar';
import CoinDetail from './src/pages/CoinDetail';
import LotDetail from './src/pages/LotDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Process from './src/pages/Process';
import Analysis from './src/pages/Analysis';
import DayPnl from './src/components/DayPnl';
import CompoundPnl from './src/components/CompoundPnl';
import Deneme from './src/components/Deneme';
import Revenue from './src/pages/Revenue';
import LotAddTotal from './src/components/LotAddTotal';


const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();

const CoinStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CoinDetail" component={CoinDetail} options={{ headerShown: false }} />
      <Stack.Screen name="LotDetail" component={LotDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}



const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="CoinStack" component={CoinStack} options={{ headerShown: false }} />
        <Tab.Screen name="Process" component={Analysis} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Tab.Screen name="Analysis" component={Revenue} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App