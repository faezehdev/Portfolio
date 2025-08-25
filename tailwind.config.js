/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1b1a1c',
        'text-white': '#e8e6eb',
        'grey-dark': '#414141',
        light: '#fff',
        mid: '#ededed',
        grey: '#989898',
        gray: '#989898', // هم‌معنی با grey
        green: '#28a92b',
        'green-dark': '#4e9815',
        'green-light': '#6fb936',
        blue: '#2c7ad2',
        purple: '#8d3dae',
        red: '#c82736',
        orange: '#e77614',
  
        // @theme values
        dark: '#1b1a1c',
        text: '#e8e6eb',
        primary: '#7464c9',
      },
      screens: {
        mo: '200px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '120rem',
      },
    },
  },
  plugins: [],
}
