/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jcx,ts,tsx}"],
  theme: {
    extend:  {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'patua': ['Patua One', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
  },
  plugins: [require('@tailwindcss/typography'),],
}

}