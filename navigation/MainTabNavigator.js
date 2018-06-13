import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {SimpleLineIcons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import OrderRequestsScreen from '../screens/OrderRequestsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `bag${focused ? '' : '-outline'}`
          : 'bag'
      }
    />
  ),
};

const RequestsStack = createStackNavigator({
  Requests: OrderRequestsScreen,
});

RequestsStack.navigationOptions = {
  tabBarLabel: 'Order Requests',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `list${focused ? '' : '-outline'}` : 'list'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Account: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `user${focused ? '' : '-outline'}` : 'user'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  RequestsStack,
  ProfileStack
});



/*export default TabNavigator(

  {
    Orders: {
      screen: HomeScreen,
    },
    Requests: {
      screen: OrderRequestsScreen,
    },
    Account: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Orders':
            iconName = Platform.OS === 'ios'? `bag${focused ? '' : '-outline'}`: 'bag';
            break;
          case 'Requests':
            iconName = Platform.OS === 'ios' ? `list${focused ? '' : '-outline'}` : 'list';
            break;
          case 'Account':
            iconName = Platform.OS === 'ios' ? `user${focused ? '' : '-outline'}` : 'user';
        }
        return (
          <SimpleLineIcons
            name={iconName}
            size={22}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }

);*/
