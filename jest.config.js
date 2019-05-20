module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>', '<rootDir>/src/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'vue'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  }
}
