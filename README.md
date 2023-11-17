# Twitch Shares Project
## Overview
Twitch Shares is a full-stack JavaScript project developed by Team 451.
--APP DESCRIPTION HERE--
# Detailed description of App features...


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



# Embed our presentation video


# Versions



# Table of technologies - 













# Starter Setup- React-Native/Expo, Tailwindcss/Nativewind and supabase configured

 Please change the api key and url for supabase in the .env file

 Routes need to be added the the app folder eg href='/login' will end a file called login.js in app

 Components should go in the component folder



