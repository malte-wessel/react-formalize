var webpack = require('webpack');

module.exports = function karmaConf(config) {
    config.set({

        browserNoActivityTimeout: 30000,

        browsers: [ 'Chrome' ],

        singleRun: false,

        frameworks: [ 'mocha' ],

        files: [
            'tests.webpack.js'
        ],

        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },

        reporters: [ 'mocha' ],

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },

        webpackServer: {
            noInfo: true
        }

    });
};
