module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>', '<rootDir>/src/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'vue'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  testEnvironment: 'jsdom',
  globals: {
    IS_STORYSHOT: true,
    IS_PRODUCTION: false,
    IS_SERVER: false,
  },
  verbose: true,
}
