const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve('dist'),
		filename: 'bandle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/,                                   loader: 'babel-loader', exclude: /node_modules/ }, 
			{ test: /\.jsx$/,                                  loader: 'babel-loader', exclude: /node_modules/ } ,
            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: 'file-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html', 
			inject: 'body'
		})
	]
};