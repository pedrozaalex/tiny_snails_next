/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {},
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['pastel'],
    },
};
