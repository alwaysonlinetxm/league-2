var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeJsPlugin = require('optimize-js-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var px2rem = require('postcss-px2rem');

module.exports = function makeWebpackConfig(env) {
	var plugins = []; // 开发环境和生成环境不同的插件
	var appPath = path.resolve(__dirname, 'src/containers'); // js文件路径
	var distPath = path.join(__dirname, '/dist'); // 打包路径
	var indexEntries = [appPath];
	var devServer = {}; // 采用服务方式时相关信息的配置
	var devtool = false;
	var outputFilename = 'js/[name]-[chunkhash].js';
	// 区分生产环境 开发环境
	if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
		// 生成rev.json
		plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10 })); // 10000
		plugins.push(new webpack.optimize.UglifyJsPlugin({
	      // sourceMap: false,  // default false in 2
	      compress: {
	        sequences: true,
	        dead_code: true,
	        conditionals: true,
	        booleans: true,
	        unused: true,
	        if_return: true,
	        join_vars: true,
	        drop_console: true,
					warnings: false,
					loops: true,
					evaluate: true,
	      },
	      mangle: {
	        except: [ 'exports', 'require' ]
	      },
	      output: {
	        comments: false
	      }
	    }));
		plugins.push(new OptimizeJsPlugin({ sourceMap: false }));
	} else {
		devtool = 'eval';
		distPath = path.join(__dirname, '/static');
		outputFilename = 'js/[name]-[hash].js'
		plugins.push(new webpack.HotModuleReplacementPlugin());
		// 起服务的方式
		if (env.e && env.e === 'server') {
			indexEntries.push('webpack-dev-server/client?http://localhost:5000/');
			indexEntries.push('webpack/hot/dev-server');
			devServer = {
				port: 5000,
				inline: true,
				historyApiFallback: false,
				stats: 'normal',
				contentBase: distPath,
				host: '0.0.0.0'
			};
		}
	}

	return {
	  entry: {
	    index: indexEntries,
			vendor: [ 'inferno', 'inferno-component', 'redux', 'inferno-redux', 'redux-actions', 'redux-saga' ],
	  },
	  output: {
	    path: distPath,
	    filename: outputFilename,
	    chunkFilename: 'js/[chunkhash].chunk.js',
			sourceMapFilename: 'js/[name].map'
	  },
	  devtool: devtool,
		devServer: devServer,
		resolve: {
	    alias: {
				'react': 'inferno-compat',
      	'react-dom': 'inferno-compat'
	    }
	  },
	  module: {
	    rules: [{
	      test: /\.js$/,
				enforce: 'pre',
	      use: [{
					loader: 'eslint-loader',
					options: {
				    configFile: '.eslintrc',
				    emitWarning: false,
				    emitError: true,
				    formatter: require('eslint-friendly-formatter'),
				    quiet: true
				  }
				}]
	    }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
	    }, {
	      test: /\.scss$/,
	      exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: () => [
									autoprefixer({
										browsers: [ '> 5%', 'last 2 versions' ]
									}),
									px2rem({ remPrecision: 8 })
                ]
							}
						},
						'sass-loader?outputStyle=compact'
					],
					publicPath: '../'
				})
	    }, {
	      test: /\.(png|jpg|gif)$/,
	      exclude: /node_modules/,
	      use: 'url-loader?limit=8192&name=images/[name]-[hash:8].[ext]'
	    }, {
	      test: /\.(woff|svg|eot|ttf)$/,
	      exclude: /node_modules/,
	      use: 'url-loader?limit=10000&name=fonts/[name]-[hash:8].[ext]'
	    }]
	  },
	  plugins: [
			...plugins,
			new WebpackMd5Hash(),
			new CleanWebpackPlugin(distPath, {
	      root: __dirname,
	      verbose: true,
	      dry: false
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
	        names: ['vendor', 'manifest'], // manifest for runtime code
	        minChunks: Infinity,
	    }),
			// new ChunkManifestPlugin({
			// 	filename: "chunk-manifest.json",
			// 	manifestVariable: "webpackManifest"
			// }),
			new ExtractTextPlugin({
				filename: 'css/index-[contenthash:8].css',
			  allChunks: true
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: 'index.html',
				minify: {
					minifyJS: true,
					collapseWhitespace: true,
					removeComments: true
				}
			})
	  ]
	};
}
