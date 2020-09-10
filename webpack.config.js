const path = require('path');
const runScript = require('runscript');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {

    env = env || {};

    return {
        entry: [
            path.resolve(__dirname, 'src/js'),
            path.resolve(__dirname, 'src/css/styles.css')
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js',
            publicPath: '/'
        },
        devtool: argv.mode !== 'production' ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            esmodules: true
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                proxy: 'localhost',
                // server: false,
                port: 8080,
                notify: false,
                reloadDebounce: 2000,
                reloadThrottle: 2,
                logSnippet: true,
                logLevel: 'info',
                open: false,
                files: [{
                    match: ['./_includes/**/*.*', './src/css/**/*.*.css', './src/js/**/*.*.js', './src/**/*.*'],
                    fn() {

                        runScript('eleventy').then(() => this.reload());

                    }
                }]
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['css/*.css', 'css/*.map', '*.js', '*.js.map']
            }),
            new MiniCssExtractPlugin({
                filename: 'css/styles.[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                templateContent(params) {

                    return `${params.htmlWebpackPlugin.files.css.map(
                        (file) => `<link rel="stylesheet" type="text/css" href="${file}">`
                    )}`;

                },
                filename: '../_includes/partials/cssAssets.njk',
                inject: false
            }),
            new HtmlWebpackPlugin({
                templateContent(params) {

                    return `${params.htmlWebpackPlugin.files.js.map(
                        (file) => `<script src="${file}"></script>`
                    )}`;

                },
                filename: '../_includes/partials/jsAssets.njk',
                inject: false
            })

        ]

    };

};
