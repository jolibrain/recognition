/*
Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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
    devtoolLineToLine: true,
    sourceMapFilename: "./bundle.js.map",
    pathinfo: true,
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
