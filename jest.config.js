module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: [
    "<rootDir>/__test__/setup.ts"
  ],
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
