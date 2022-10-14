module.exports = {
  preset: 'jest-expo',

  testPathIgnorePatterns: [
    '/node_modules', 
    '/android', 
    '/ios',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native)'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', 
    'jest-styled-components'
  ],
  setupFiles: ["./setupFile.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx", 
    "!src/**/*.spec.tsx" 
  ],
  coverageReporters: [
  	"lcov"
  ]
};
