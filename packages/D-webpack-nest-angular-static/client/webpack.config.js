require('core-js');
const {
    resolve
} = require('path');
const rxPaths = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const {
    AngularCompilerPlugin
} = require('@ngtools/webpack');
const {
    IndexHtmlWebpackPlugin
} = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');

module.exports = {

    mode: 'development',

    devtool: 'eval',

    entry: {
        main: './packages/D-webpack-nest-angular-static/client/src/main.ts',
        polyfills: './packages/D-webpack-nest-angular-static/client/src/polyfills.ts',
        styles: './packages/D-webpack-nest-angular-static/client/src/styles.css'
    },

    output: {
        path: resolve('./packages/D-webpack-nest-angular-static/build/dev/client/'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
        alias: rxPaths()
    },

    node: false,

    performance: {
        hints: false,
    },

    module: {
        rules: [{
                test: /\.ts$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.js$/,
                exclude: /(ngfactory|ngstyle).js$/,
                enforce: 'pre',
                use: 'source-map-loader'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [resolve('./packages/D-webpack-nest-angular-static/client/src/styles.css')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [resolve('./packages/D-webpack-nest-angular-static/client/src/styles.css')]
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: 'file-loader',
                options: {
                    name: `[name].[ext]`,
                    limit: 10000
                }
            },
            {
                test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                loader: 'url-loader',
                options: {
                    name: `[name].[ext]`,
                    limit: 10000
                }
            },

            // This hides some deprecation warnings that Webpack throws

            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {
                    system: true
                },
            }
        ]
    },

    plugins: [
        new IndexHtmlWebpackPlugin({
            input: './src/index.html',
            output: 'index.html',
            entrypoints: [
                'styles',
                'polyfills',
                'main'
            ]
        }),

        new AngularCompilerPlugin({
            mainPath: resolve('./packages/D-webpack-nest-angular-static/client/src/main.ts'),
            sourceMap: true,
            nameLazyFiles: true,
            tsConfigPath: resolve('./packages/D-webpack-nest-angular-static/client/tsconfig.app.json'),
            skipCodeGeneration: true
        }),

        new ProgressPlugin(),

        new CircularDependencyPlugin({
            exclude: /[\\\/]node_modules[\\\/]/
        }),

        new CopyWebpackPlugin([{
                from: 'packages/D-webpack-nest-angular-static/client/src/assets',
                to: 'assets'
            },
            {
                from: 'packages/D-webpack-nest-angular-static/client/src/favicon.ico'
            }
        ])
    ]
};