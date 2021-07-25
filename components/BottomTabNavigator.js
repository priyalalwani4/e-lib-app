import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TransactionScreen from '../screens/BookTransactionScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              var iconName;
              if (route.name === "Transaction") {
                iconName = "book";
              } else if (route.name === "Search") {
                iconName = "search";
              }

              return (
              <Ionicons name={iconName} color={color} size={size} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            style: {
              height: 130,
              borderTopWidth: 0,
              backgroundColor: "aqua"
            },
            labelStyle: {
              fontSize: 20,
              fontFamily: "Rajdhani"
           },
           labelPosition: "beside-icon",
           tabStyle: {
             marginTop: 25,
             marginLeft: 10,
             marginRight: 10,
             borderRadius: 30,
             borderWidth: 2,
             alignItems: "center",
             justifyContent: "center",
             backgroundColor: "pink"
           }
          }}>
          <Tab.Screen name="Transaction" component={TransactionScreen}></Tab.Screen>
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
