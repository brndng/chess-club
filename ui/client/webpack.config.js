const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Dotenv()
  ],
};

// const Dotenv = require('dotenv-webpack');
// const env = process.env.NODE_ENV;

// module.exports = {
//   ...
//   plugins: [
//     new Dotenv({
//       path: `./.env.${env === "production" : "prd" : "dev"}`,
//     })
//   ]
//   ...
// };