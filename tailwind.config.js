module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "red",
      },
      height: {
        imgFull: "85vh",
      },
      fontFamily: {
        body: ["Montserrat"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
