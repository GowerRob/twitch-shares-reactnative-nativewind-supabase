/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.js","./app/registration.js","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      'text': {
        light:'#232127',
        dark:'#DAD8DE'
      },
      'background': {
        light: '#D8D4E3',
        dark: '#201C2B'
      },
      'primary': {
        light:'#7D5BBE',
        dark:'#6441A4'
      },
      'secondary': {
        light:'#EFEFF1',
        dark:'#0E0E10'
      },
      'accent':{
        light:'#772CE8',
        dark:'#6317D3'
      },
    }},
  },
  plugins: [],
}

