import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, ToastAndroid } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ImageSwitch } from '../components/ImageSwitch';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import CustomHeaderButton from '../components/CustomHeaderButton';
import Card from '../components/Card';
import DropDownSelector from '../components/DropDownSelector';
import ForcastCard from '../components/ForcastCard';
import { toggleFavorite } from '../store/action/weather';


const WeatherScreen = props => {
  const { navigation } = props;
  const { state } = navigation;
  const favWeatherIdParam = state?.params?.weatherId;
  const favCityNameParam = state?.params?.cityName;
  const [dayWeather, setdayWeather] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ weatherId: 215854, cityName: 'tel aviv' });
  const currentFavoriteCity = useSelector(state => state.weathers.favoriteWeathers.some(weather => weather.weatherId === selectedCity.weatherId));

  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var date = new Date().getDay();

  const apiKey = "pdXJB2WJizbFKFLGqEgXG5u6lsg4W9z0";
  const apiKey2 = "oohkT8KGdGbWuDXNDiABsfLq6djmMmpI";
  const apiKey3 = "xtHGY3zNwoqKAkx00o5bG2wkwvheSMxf";
  const apiKey4 = "o406Q6cKje9ypzgv9gsSH6tPHO28QmnL";
  const apiKey5 = "TJgJzgGQ1ThTb1C9dB46p82d3MSjIF2F";


  const GetCurrentWeather = async (value) => {
    try {
      let list = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${value}?apikey=${apiKey5}`
      );

      const currCityWeather = []
      //console.log('getCurrentWeather');
      for (let weather of list.data) {

        let temp = weather.Temperature.Metric.Value;
        let unit = weather.Temperature.Metric.Unit;
        let icon = weather.WeatherIcon;
        let phrase = weather.WeatherText;
        currCityWeather.push({ Temperature: temp, Unit: unit, Icon: icon, weatherPhrase: phrase })
      }
      setdayWeather(currCityWeather[0]);
      setFavData({
        weatherId: selectedCity.weatherId,
        cityName: selectedCity.cityName,
        temp: currCityWeather[0].Temperature,
        weatherPhrase: currCityWeather[0].weatherPhrase
      });
    }
    catch (error) {
      if (error.response?.status === 503) {
        ToastAndroid.show("You Have Exceeded You're Daily Amount Of Tries", ToastAndroid.LONG, ToastAndroid.CENTER);
       
      } else {
        //ToastAndroid.show("Unexpected Error As Accoured Please Restart the App", ToastAndroid.LONG, ToastAndroid.CENTER);
      }
      return [];
    }
  };


  const getForecast = async (value) => {
    try {
      let list = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=${apiKey5}&metric=true`
      );
      //console.log('getForecast');
      var forcastArray = []
      for (let weather of list.data.DailyForecasts) {

        forcastArray.push(weather);
      }
      setWeatherForcast(forcastArray);
    }
    catch (error) {
      if (error.response?.status === 503) {
        ToastAndroid.show("You Have Exceeded You're Daily Amount Of Tries", ToastAndroid.LONG, ToastAndroid.CENTER);
      }
      else {
        //ToastAndroid.show("Unexpected Error As Accoured Please Restart the App", ToastAndroid.LONG, ToastAndroid.CENTER);
      }
      return [];
    }



  };


  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {

    dispatch(toggleFavorite({
      weatherId: selectedCity.weatherId,
      cityName: selectedCity.cityName,
      temp: dayWeather.Temperature,
      weatherPhrase: dayWeather.weatherPhrase
    }));
  }, [dispatch, selectedCity?.weatherId, dayWeather?.Temperature]);


  useEffect(() => {

    GetCurrentWeather(selectedCity.weatherId);
    getForecast(selectedCity.weatherId);
    props.navigation.setParams({ toggelFav: toggleFavoriteHandler });

  }, [selectedCity?.weatherId, toggleFavoriteHandler]);


  useEffect(() => {
    if (favWeatherIdParam) {
      setSelectedCity({ weatherId: favWeatherIdParam, cityName: favCityNameParam });
    }
  }, [favWeatherIdParam]);


  useEffect(() => {
    props.navigation.setParams({ isFav: currentFavoriteCity });
  }, [currentFavoriteCity]);


  return (

    <View style={styles.screen} >
      <DropDownSelector setSelectedCity={(value, cityName) => {
        setSelectedCity({ weatherId: value, cityName: cityName })
      }} />
      <View>
        <Card style={styles.weatherContainer}>
          {dayWeather
            ?
            <>
              <View style={styles.currentContainer}>
                <Card style={styles.currentWeather}>
                  <Image resizeMode='cover' source={ImageSwitch(dayWeather.Icon)} />
                </Card>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.text} >{selectedCity.cityName}</Text>
                  <Text style={styles.text} >{dayWeather.Temperature} c</Text>
                </View>
              </View>
              <Text style={styles.iconPhrase}>{dayWeather.weatherPhrase}</Text>
              <View style={styles.forcastCard} >
                <ForcastCard day={day[(date + 1) % 7]} temp={weatherForcast.length > 0 ? weatherForcast[0].Temperature.Maximum.Value + weatherForcast[0].Temperature.Maximum.Unit : ''} />
                <ForcastCard day={day[(date + 2) % 7]} temp={weatherForcast.length > 0 ? weatherForcast[1].Temperature.Maximum.Value + weatherForcast[1].Temperature.Maximum.Unit : ''} />
                <ForcastCard day={day[(date + 3) % 7]} temp={weatherForcast.length > 0 ? weatherForcast[2].Temperature.Maximum.Value + weatherForcast[2].Temperature.Maximum.Unit : ''} />
              </View>
              <View style={styles.forcastCard}>
                <ForcastCard day={day[(date + 4) % 7]} temp={weatherForcast.length > 0 ? weatherForcast[3].Temperature.Maximum.Value + weatherForcast[3].Temperature.Maximum.Unit : ''} />
                <ForcastCard day={day[(date + 5) % 7]} temp={weatherForcast.length > 0 ? weatherForcast[4].Temperature.Maximum.Value + weatherForcast[4].Temperature.Maximum.Unit : ''} />
              </View>
            </>
            : null}
        </Card>
      </View>
    </View>
  );
};

WeatherScreen.navigationOptions = navigationData => {
  const toggleFavorite = navigationData.navigation.getParam('toggelFav');
  const isFav = navigationData.navigation.getParam('isFav');


  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  inputContainer: {
    width: 200,
  },
  weatherContainer: {
    width: '90%',
    height: '90%',
    marginTop: 20,


  },
  text: {
    marginHorizontal: 14,
    fontSize: 17,
  },
  currentWeather: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPhrase: {
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 50,
    fontSize: 30
  },
  forcastCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentContainer: {
    flexDirection: 'row',

  },
  introText: {
    fontSize: 15,
    textAlign: 'center',
  },
  textDate: {
    alignItems: 'center',
    textAlign: 'center',
  },

});

export default WeatherScreen;