// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {},
    cssnano: { preset: 'default', autoprefixer: false }
  }
}
