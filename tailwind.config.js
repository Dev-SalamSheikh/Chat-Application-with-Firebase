/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        registerBg: "#151C28",
        buttonBg: "#7b96ec",
        navbarBg: "#2f2d52",
        sidebarBg: "#3e3c61",
      },
      colors: {
        logoColor: "#5d5b8d",
        inputBorder: "#a7bcff",
        placeholder: "rgb(175, 175, 175)",
        avatarUpload: "#8da4f1",
        navbartext: "#ddddf7",
        chatColor: "#d3d3d3",
        sendInputColor: "#2f2d52",
      },
    },
  },
  plugins: [],
};
