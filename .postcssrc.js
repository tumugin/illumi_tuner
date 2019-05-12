// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
    },
    cssnano: { preset: 'default', autoprefixer: false }
  }
}
