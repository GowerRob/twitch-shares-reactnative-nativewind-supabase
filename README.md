# Twitch Shares Project
## Overview
Twitch Shares is a full-stack JavaScript project developed by Team 451.

Team 451 developed Twitch-Shares to utilise viewship data from Twitch, using their public API, to create a competative stock-market trading game.  We sythesis a stock-market analog by equating viewships totals of game titles to market value and allowing users to buy and sell those stocks as the viewership, and as such the value, fluctuates throughout the week.

The App features:
- user registration and signing features,for which Supabase funcationality was utilised
- dynamic search of available games, pulled directly from our backend, which in turn pulsls from the Twitch API
- visualisation of stock and portfolio value data over time, using Victory Charts
- responsive design for web and mobile, using React-Native and Tailwind (NativeWind)
- REST API utilisation for interaction with our user, transactions and stock-market database

For a full list of tech used, please see below.

To try the App out yourself, after cloning and running, feel free to register with a dummy account and use the 1000 credits granted to buy and selling shares.


## Frontend
The frontend component is built with React Native and can be found at [Twitch Shares Frontend](https://github.com/GowerRob/twitch-shares-reactnative-nativewind-supabase). To set up the frontend, follow these steps:
1. Clone the repository:
```
git clone https://github.com/GowerRob/twitch-shares-reactnative-nativewind-supabase.git cd twitch-shares-reactnative-nativewind-supabase
```
2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root directory and add the following variables:
```
EXPO_PUBLIC_REACT_APP_SUPABASE_URL=<your_supabase_url> EXPO_PUBLIC_REACT_APP_ANON_KEY=<your_supabase_anon_key>
```
4. Run the application:
```
npm start
//Start the web app
npm web
//Deploy for mobile
npm android
npm ios
```
## Backend
The backend component is implemented using Express.js and can be found at [Twitch Shares Backend](https://github.com/Howling-Techie/Twitch-Shares-Backend). To set up the backend, follow these steps:
1. Clone the repository:
```
git clone https://github.com/Howling-Techie/Twitch-Shares-Backend.git cd Twitch-Shares-Backend
```
2. Install dependencies:
```
npm install
```
3. Create a ```.env``` file in the root directory and add the following variables:
```
SERVICE_KEY=<your_supabase_service_key> SUPABASE_URL=<your_supabase_url> TWITCH_CLIENT_ID=<your_twitch_client_id> TWITCH_CLIENT_SECRET=<your_twitch_client_secret>
```
4. Run the application:
```
npm start
```

## Important Notes
- Ensure that you have valid Supabase and Twitch API credentials to populate the `.env` files for both frontend and backend.
- For Supabase, the `SERVICE_KEY` is required for backend authentication.
- For Twitch, both `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` are necessary for authentication.

## Tech Stack
We used React Native, the industry standard for making apps in react, with Nativewind to allow easy integration of Tailwind. Expo was used on top of React Native to allow for easy cross-platform development and publishing to mobile, desktop and web. Finally Victory was used for generating charts due to its popularity in the industry and built in support for React Native.

On the other side, Supabase was the core of our backend due to previous experience with the service by people on the team, with an Express.js server for data refreshing (using Axios for making API calls, which simplifies the data fetching process) and websocket management, using Socket.io on both the server and client side over built in alternatives due to its simplicity and ease to set up.




# Team 451 Links (to relevant githubs/profiles???)



# Short App Demo (no audio)


https://github.com/GowerRob/twitch-shares-reactnative-nativewind-supabase/assets/121888459/97ad8d41-b417-4589-98c7-2d57557d6264



# Versions



# Table of technologies - 
| Technology | Project uses |
|------------|--------------|
| Node.js | please complete |












# Starter Setup- React-Native/Expo, Tailwindcss/Nativewind and supabase configured

 Please change the api key and url for supabase in the .env file

 Routes need to be added the the app folder eg href='/login' will end a file called login.js in app

 Components should go in the component folder



