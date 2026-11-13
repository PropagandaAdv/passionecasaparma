/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E30613', // primario: CTA, parole chiave, linee, numeri
          'red-dark': '#B8050F', // hover CTA (contrasto 6.9:1 con il bianco)
          black: '#000000', // secondario: testi, sezioni scure, footer
          gray: '#8A8A8F', // solo testo grande (>=18px), decorativo o su nero
          muted: '#5C5C61', // body secondario su bianco/neutro caldo (>=6:1)
          white: '#FFFFFF',
          warm: '#F5F4F2', // scelta di design: neutro caldo per alternare le sezioni
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionDuration: { 900: '900ms' },
    },
  },
  plugins: [],
}
