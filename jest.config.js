module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
}
