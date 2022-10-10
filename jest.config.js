module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testEnvironmentOptions: {
    testURL: 'http://localhost',
    customExportConditions: [
      'node',
      'node-addons',
    ],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testRegex: "^.+\\.test\\.tsx?$"
};
