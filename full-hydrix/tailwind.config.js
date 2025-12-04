/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./app/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    ".node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      borderColor: {
        accent: {
          DEFAULT: '',
        },
      }

    },
  },
  plugins: [

  ],
};
