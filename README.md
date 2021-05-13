# Adir-Fargeon-11-5-2021
 weather-app
 
I have designed a Weather app with Accuweather API, And the help of Expo CLI.
My App is Navigating Between the Screen with the React-Navigation components.
I Passed data and arguments through-out the components with the help of Redux and React-Redux libraries.
My app has two screens:
1- home screen wwhich contains the cuurent city weather and forcast for the next 5 days'
I have fetching the data from the Accuweather API, the defualt city before using the search button is Tel-Aviv.
the main screen cotnain as well a Search Button that will open a window with a srearch field,
writting text into the search bar will trigger a autocomplete API that will give the available options for the letters that have been written.
as well as favrite button that saves the current location to the favorite screen.
 
2- the 2nd screen which is the Favorite screen contains a Flat List that hold the data of all the favorite cities.
pressing the favorite city in the screen will lead you to the current city weather data in the main screen.

to pass the data through the screens i have used redux and react redux to create a store that holds actions and reduces 
the actions passed the info o the reducers, and the reducers have the fit logic to filter the favorite array data.
