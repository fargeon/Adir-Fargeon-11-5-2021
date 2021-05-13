# Adir-Fargeon-11-5-2021
 Weather-app
 
I have designed a Weather app with Accuweather API, And the help of Expo CLI.
My App is Navigating Between the Screen with the React-Navigation components.
I Passed data and arguments throughout the components with the help of Redux and React-Redux libraries.

My app has two screens:

1- home screen which contains the current city weather and forecast for the next 5 days,
I Am fetching the data from the Accuweather API.
the default city before using the search button is Tel-Aviv.
The main screen contains a search button that will open a window with a search field,
Writing text into the search bar will trigger a autocomplete API that will give the available options for the letters that have been written.
As well as a favorite button that saves the current location to the favorite screen.
 
2- the 2nd screen which is the Favorite screen contains a Flat List that holds the data of all the favorite cities.
Pressing the favorite city icon on the screen will lead you to the current city weather data on the main screen.

To pass the data through the screens I have used redux and react-redux to create a store that holds actions and reduces.
The action function passes the info to the reducers, and the reducers have the fit logic to filter the favorite array data.
