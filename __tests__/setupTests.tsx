import '@testing-library/react-native/extend-expect';
const nodeCrypto = require('crypto');
// @ts-ignore
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  }
};
export {}
