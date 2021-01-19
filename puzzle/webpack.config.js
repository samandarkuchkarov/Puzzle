

const webpack = require('webpack');


const path = require('path');



const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports =(env, options) =>{
     const isProdoction = options.mode === 'production';
     const config = {
entry: './src/index.js',
mode: isProdoction ? 'production' : 'development',


output: {
    path: path.join(__dirname,'/dist'),
    filename: 'script.js'
},
module:{
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
            test:/\.css$/,
            use: [
                MiniCssExtractPlugin.loader,'css-loader'
            ]
        },{

            test: /\.(png|mp4|svg|mp3|jpe?g|gif)$/i,
            use: {
                loader: 'file-loader',
            }

        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpg|gif)$/i,
  
              loader: 'url-loader',
              options: {
                limit: 8192,
              }
            }
   
      ]
},
plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
]
     }
     return config;
}