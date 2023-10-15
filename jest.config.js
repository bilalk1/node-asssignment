module.exports = {
  preset: 'ts-jest',
  roots: [
    "./tests"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/"
  ],
  collectCoverage: true,
  testEnvironment: 'node',
  testResultsProcessor: "jest-sonar-reporter",
  setupFiles: ['dotenv/config'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json'], // Add 'json' for a JSON report
};