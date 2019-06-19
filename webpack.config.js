var path = require("path");

module.exports={
	entry:  "./src/pages/app.js",
	output: {
		path: path.join(__dirname,"./public/js"),
		filename: "bundle.js",
	},
	module: {
        loaders: [{
        	test: /\.js$/, 
        	loader: "babel-loader",
        	query: {
        		presets: ['react','es2015']
        	}
        },{
        	test: /\.jsx$/,
        	loader: 'babel-loader', 
        	query: {
        		presets: ['react', 'es2015']
        	}
        },{
        	test: /\.css$/, 
        	loader: "style-loader!css-loader"
        },{
        	test: /\.(svg|jpg|png|otf)$/, 
        	use: "file-loader?name=[name].[ext]?[hash]"
        },{
        	test: /\.scss$/,
        	loader: "style!css!sass"
				},{
					test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				},{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      		loader: 'url-loader?mimetype=application/font-woff'
				}]
    }
};