const { RspackZipPlugin } = require('../dist');
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new RspackZipPlugin({
      destPath: "./build.zip"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
    ],
  },
};
