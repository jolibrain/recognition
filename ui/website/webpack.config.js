module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8101',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
        {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
        {test: /\.css$/, loader: 'style!css'},
        {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
        {test: /\.woff[2]?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8101
  }
};
