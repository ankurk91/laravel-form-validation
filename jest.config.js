module.exports = {
  setupFiles: [
    "<rootDir>/__test__/setup.ts"
  ],
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
