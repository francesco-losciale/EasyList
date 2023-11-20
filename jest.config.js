module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true,
  },
  transformIgnorePatterns: ['/node_modules/(?!(uuid|@react-native|react-native)/)'],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.tsx"],
};
