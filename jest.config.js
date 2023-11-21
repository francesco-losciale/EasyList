module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true,
  },
  testMatch: [ "**/?(*.)+(spec|test).[jt]s?(x)" ],
  transformIgnorePatterns: ['/node_modules/(?!(uuid|@react-native|react-native)/)'],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.tsx"],
};
