/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "react-leaflet": "<rootDir>/__mocks__/reactLeafletMock.js",
    "\\.png": "<rootDir>/__mocks__/pngMock.js",
  },
};
