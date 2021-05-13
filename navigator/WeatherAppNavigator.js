import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import WeatherScreen from '../screen/WeatherScreen';
import FavoriteScreen from '../screen/FavoriteScreen';


const defaultStackNavOpt = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android'
            ? Colors.primaryColor
            : ''
    },

    headerTintColor: Platform.OS === 'android'
        ? 'white'
        : Colors.primaryColor
};

const WeatherAppNavigator = createStackNavigator({
    WeatherPage: {
        screen: WeatherScreen,
    },

}, 
{
    defaultNavigationOptions: defaultStackNavOpt
}
);

const favNavigator = createStackNavigator({
    Favorite: FavoriteScreen,
    WeatherDetail: WeatherScreen,
},
    {
        defaultNavigationOptions: defaultStackNavOpt
    }
);

const tabScreenConfig = {

    Weather: {
        screen: WeatherAppNavigator,
        navigationOptions: {
            tabBarLabel: 'Weather Page',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="home"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>Weather</Text> : 'Weather'
        }
    },
    Favorite: {
        screen: favNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.seconderyColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>Favorite</Text> : 'Favorite'

        }
    }


};

const WeatherFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.seconderyColor
        }
    });

export default createAppContainer(WeatherFavTabNavigator);


