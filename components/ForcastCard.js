import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Card from './Card';

const ForcastCard = props => {
    return (
        <Card>
            <Text>{props.day}</Text>
            <Text style={styles.textDate}>{props.temp} </Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    textDate: {
        alignItems: 'center',
        textAlign: 'center',
      },
});


export default ForcastCard;
