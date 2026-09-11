module.exports = {
  content: ['./index.html', './assets/app.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#FF4D38', coralHover: '#E03B26', gold: '#D9A036',
          goldHover: '#B88228', dark: '#0B0F17', card: '#131A26',
          border: '#232D3F', textMuted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'Times New Roman', 'serif']
      }
    }
  },
  plugins: []
};
