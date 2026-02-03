const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV ?? 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: path.resolve(
          __dirname,
          'src/components/ui/bootstrap-reboot.min.css',
        ),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
    ],
  },
  externals: [nodeExternals({
    allowlist: [ /^@nivo/, /^lodash/, /^bootstrap/, '@popperjs/core', 'dompurify', 'marked', 'md5', 'pretty-bytes', 'prop-types', 'svg-url-loader', 'd3-shape']
  })],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/components/ui/bootstrap-reboot.min.css',
        to: '',
      },
    ]),
  ],
};
