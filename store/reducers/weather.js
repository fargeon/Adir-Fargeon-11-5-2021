
import { TOGGLE_FAVORITE } from '../action/weather';

const initialState = {
    favoriteWeathers: [],
};

const weathersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const exisitingIndex = state.favoriteWeathers.findIndex(state => state.weatherId === action.data.weatherId);
            if (exisitingIndex >= 0) {
                const updatedFavWeathers = [...state.favoriteWeathers]
                updatedFavWeathers.splice(exisitingIndex, 1);
                return { ...state, favoriteWeathers: updatedFavWeathers };
            } else {
                return { ...state, favoriteWeathers: [...state.favoriteWeathers,
                    { cityName: action.data.cityName, temp: action.data.temp, weatherId: action.data.weatherId, weatherPhrase: action.data.weatherPhrase }] };
            }

        default:
            return state;
    }

    return state;
};


export default weathersReducer;
