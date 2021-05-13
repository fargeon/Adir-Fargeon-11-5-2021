# Adir-Fargeon-11-5-2021
 Weather-app
 
The Weather mobile App is an app built with React-Native which calls the Accuweather API, With the help of Expo CLI.
The app uses React-Navigation components to navigate between the app screens
and uses Redux and React-Redux libraries to pass data throughout the components.



The app is composed of two screens:
  Screen 1- Weather screen:
    Displays the current city weather and forecast for the next 5 days.
    The main screen is composed with the following components:
      1. Search button- will open a window with a search field.
      2. Favorite button- saves the current location as favorite.
      3. Search bar- Writing a text into the text box will trigger an autocomplete API.
 
 
 Screen 2- Favorite Screen: 
    contains a List holding all your favorite saved cities.
    Selecting a city will redirect you to home screen with the city's weather screen.
