import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import IyiOlusScreen from '../screens/IyiOlus/IyiOlusScreen';
import GuvenlikScreen from '../screens/Guvenlik/GuvenlikScreen';
import SikayetScreen from '../screens/Sikayet/SikayetScreen';
import IletisimScreen from '../screens/Iletisim/IletisimScreen';
import SonucScreen from '../screens/Sonuc/SonucScreen';
import RuhsalScreen from '../screens/IyiOlus/RuhsalScreen';
import FizikselScreen from '../screens/IyiOlus/FizikselScreen';
import StresAzaltmaScreen from '../screens/IyiOlus/StresAzaltmaScreen';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1.5,
          borderTopColor: '#fce4ec',
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          shadowColor: '#c2185b',
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 12,
        },
        tabBarIcon: ({focused, color}) => {
          const icons = {
            Home:      {active: 'home',           inactive: 'home-outline'},
            IyiOlus:   {active: 'heart-circle',   inactive: 'heart-circle-outline'},
            Sikayet:   {active: 'create',          inactive: 'create-outline'},
            Iletisim:  {active: 'chatbubble',      inactive: 'chatbubble-outline'},
            Guvenlik:  {active: 'person-circle',   inactive: 'person-circle-outline'},
          };
          const icon = icons[route.name];
          return (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <IonIcon
                name={focused ? icon.active : icon.inactive}
                size={focused ? 26 : 23}
                color={color}
              />
            </View>
          );
        },
        tabBarActiveTintColor:   '#c2185b',
        tabBarInactiveTintColor: '#f48fb1',
      })}>

      <Tab.Screen name="Home"     component={HomeScreen}     />
      <Tab.Screen name="IyiOlus"  component={IyiOlusScreen}  />
      <Tab.Screen name="Sikayet"  component={SikayetScreen}  />
      <Tab.Screen name="Iletisim" component={IletisimScreen} />
      <Tab.Screen name="Guvenlik" component={GuvenlikScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login"        component={LoginScreen}        />
        <Stack.Screen name="Main"         component={TabNavigator}       />
        <Stack.Screen name="Ruhsal"       component={RuhsalScreen}       />
        <Stack.Screen name="Fiziksel"     component={FizikselScreen}     />
        <Stack.Screen name="StresAzaltma" component={StresAzaltmaScreen} />
        <Stack.Screen name="Sonuc"        component={SonucScreen}        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    width: 44, height: 36, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#fce4ec',
  },
});

export default AppNavigator;