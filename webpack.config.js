const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.tsx',
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]']
            },
            {
              test: /\.tsx?$/,
              use: ['awesome-typescript-loader']
            },
            // {
            //   test: /\.(jpe?g|png|gif|svg)$/i,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[name].[ext]',
            //         publicPath: '../'
            //       }
            //     }
            //   ]
            // },
            {
              enforce: 'pre',
              test: /\.js$/,
              use: 'source-map-loader'
            }
        ]
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },


    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' })
    ]
}