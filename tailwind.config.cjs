/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        sxs: "18rem",
      },
      backgroundImage: {
        'mybackground': "url('https://img.freepik.com/premium-photo/isolated-shopping-trolley-cart-blue-background-copy-space-online-shopping-e-commerce-concept_50039-2338.jpg?w=2000')"
      },
      textColor: {
        primary: "#415161",
      },
    },
  },
  plugins: [],
};
