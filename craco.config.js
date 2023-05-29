const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@core': path.resolve(__dirname, 'src/modules/core'),
      '@workflow': path.resolve(__dirname, 'src/modules/workflow'),
    },
  },
};
