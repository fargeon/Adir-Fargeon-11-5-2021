
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';


export const toggleFavorite = (data) => {
    
    //console.log('data: ');
    //console.log(data);
    //return { type: TOGGLE_FAVORITE, cityName: data.cityName,  temp: data.temp,  weatherId: data.weatherId, weatherPhrase: data.weatherPhrase  };
    return{ type: TOGGLE_FAVORITE, data: data};
};
