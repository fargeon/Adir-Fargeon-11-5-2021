import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import WeatherItem from './WeatherItem';

const WeatherFavoriteList = props => {
  const renderWeatherItem = itemData => {
    //console.log(itemData.item);    
    return (
          <WeatherItem
          weatherId={itemData.item.weatherId}
          cityName={itemData.item.cityName}
            temp={itemData.item.temp}
            weatherPhrase={itemData.item.weatherPhrase}
            onSelectFavorite={() => {
                props.navigation.navigate({
                  routeName: 'WeatherPage',
                  params: {
                    weatherId: itemData.item.weatherId,
                    cityName: itemData.item.cityName
                  }
                });
              }}
          />
        );
      };
    
    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.weatherId}
                renderItem={renderWeatherItem}
                style={{ width: '100%' }}
                numColumns={2}
                numRows={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
});

export default WeatherFavoriteList;