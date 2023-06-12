/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        // ...
        backdropFilter: true, // ensure this line is present and set to true
    },
};
