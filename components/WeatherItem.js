import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Card from './Card';

const WeatherItem = props => {
  //console.log(props);
  return (

    <TouchableOpacity onPress={props.onSelectFavorite}>
      <Card style={styles.cardItem}>
        <Text style={styles.text} >{props.cityName}</Text>
        <Text style={styles.text} >{props.temp}C</Text>
        <Text style={styles.textPhrase} >{props.weatherPhrase}</Text>
      </Card>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  cardItem: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: 2,
  },
  textPhrase: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default WeatherItem;
