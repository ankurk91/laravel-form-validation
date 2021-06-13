module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testURL: "http://localhost",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testRegex: "^.+\\.test\\.tsx?$"
};
