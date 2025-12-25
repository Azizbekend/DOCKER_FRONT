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
      keyframes: {
        droplet: {
          '0%': { transform: 'scale(0.3)', opacity: '1' },
          '70%': { transform: 'scale(1.6)', opacity: '.5' },
          '100%': { transform: 'scale(2.3)', opacity: '0' },
        }
      },
      animation: {
        droplet: 'droplet .6s ease-out forwards',
      }
    }
  },
  plugins: [

  ],
};
