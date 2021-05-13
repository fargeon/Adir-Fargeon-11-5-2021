
import React, { useState } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import weatherReducer from './store/reducers/weather'
import WeatherAppNavigator from './navigator/WeatherAppNavigator';

const rootReducer = combineReducers({
  weathers: weatherReducer,
});

const store = createStore(rootReducer);

export default function App() {

  
  return (
      <Provider store={store} >
        <WeatherAppNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({

});