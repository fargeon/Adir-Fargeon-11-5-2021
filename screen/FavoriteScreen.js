import React from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WeatherFavoriteList from '../components/WeatherFavoriteList'
import { WEATHER } from '../data/DummyData'
import { toggleFavorite } from '../store/action/weather';

const FavoriteScreen = props => {

    const availableWeathers = useSelector(state => state.weathers.favoriteWeathers);
    //console.log(availableWeathers);


    return (
            <WeatherFavoriteList listData={availableWeathers} navigation={props.navigation} />
    );


};

FavoriteScreen.navigationOptions = {
    headerTitle: 'Your Favorites'

};



export default FavoriteScreen;