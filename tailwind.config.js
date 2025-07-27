
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [ "./src/**/*.{html,ts}"  ],
  theme: {
    extend: {},
    container:{center:true},
  },
  plugins: [ require('flowbite/plugin') ],
}


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,ts}",],
//   theme: {
//     extend: {},
//   },
//   plugins: [ "flowbite/plugin","./node_modules/flowbite/**/*.js"],
// }


