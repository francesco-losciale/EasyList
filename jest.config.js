module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true,
  },
  testMatch: [ "**/__tests__/?(*.)+(spec|test).[jt]s?(x)" ],
  transformIgnorePatterns: ['/node_modules/(?!(uuid|@react-native|react-native|@react-navigation)/)'],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.tsx"],
};
