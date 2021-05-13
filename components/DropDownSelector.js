import React,  { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Platform, ToastAndroid} from 'react-native';
import { ModalSelectList } from 'react-native-modal-select-list';
import axios from 'axios';
import Colors from '../constants/Colors';



const DropDownSelector = props => {
    const apiKey = "pdXJB2WJizbFKFLGqEgXG5u6lsg4W9z0";
    const apiKey2 = "oohkT8KGdGbWuDXNDiABsfLq6djmMmpI";
    const apiKey3 = "xtHGY3zNwoqKAkx00o5bG2wkwvheSMxf";
    const apiKey4 = "o406Q6cKje9ypzgv9gsSH6tPHO28QmnL";
    const apiKey5 = "TJgJzgGQ1ThTb1C9dB46p82d3MSjIF2F";
    
    let modalRef;

    const [filteredList, setfilteredList] = useState([]);

    const openModal = () => modalRef.show();
    const saveModalRef = ref => modalRef = ref;


    const autocomplete = async (value) => {
        try {
            let list = await axios.get(
                `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey5}&q=${value ? value.text : '' }`
            );
            const cityList = []
            for (let city of list.data) {
                let cityName = city.LocalizedName;
                let cityKey = city.Key;
                cityList.push({ label: cityName, value: cityKey })
            };
            setfilteredList(cityList);

            return (cityList);
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


    return (
        <>
            <SafeAreaView >
                <Button title="SEARCH"
                    onPress={openModal}
                    color={Platform.OS === 'android'
                        ? Colors.seconderyColor
                        : Colors.seconderyColor} />
            </SafeAreaView>
            <ModalSelectList

                ref={saveModalRef}
                placeholder={"Enter City"}
                closeButtonText={"Close"}
                options={[]}
                onSelectedOption={value => {
                    props.setSelectedCity(value, filteredList.find(
                        (element) => element.value == value).label)
                }}
                disableTextSearch={false}
                provider={autocomplete}
                filter={autocomplete}
                numberOfLines={3}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default DropDownSelector;