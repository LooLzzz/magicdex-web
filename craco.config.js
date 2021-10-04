const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1'
      }
    },
  },
  // babel: {
  //   plugins: [
  //     ["@babel/plugin-proposal-decorators", { legacy: true }]
  //   ]
  // }
};