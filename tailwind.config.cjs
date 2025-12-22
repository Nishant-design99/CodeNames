/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '375px',
            },
            minHeight: {
                'touch': '44px',
            },
            minWidth: {
                'touch': '44px',
            },
        },
    },
    plugins: [],
}
