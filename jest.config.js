module.exports = {
  verbose: true,
  bail: true,
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '\\.(ts)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  testRegex: 'src/.*\\.spec\\.(ts|js)$',
  collectCoverageFrom: ['src/lib/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
};
