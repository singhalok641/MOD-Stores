import React from 'react';
import { Platform } from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import OrderRequestsScreen from '../screens/OrderRequestsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Links: {
      screen: OrderRequestsScreen,
    },
    Settings: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'? `bag${focused ? '' : '-outline'}`: 'bag';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios' ? `bag${focused ? '' : '-outline'}` : 'bag';
            break;
          case 'Settings':
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
);
