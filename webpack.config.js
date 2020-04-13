const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function (env, argv) {
    const isDev = argv.mode === 'development';
    return {
        entry: isDev ? './examples/index.js' : './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [ '.ts', '.js' ],
        },
        output: {
            library: 'microApp',
            libraryTarget: 'umd',
            filename: 'es5.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: isDev ? [
            new HtmlWebpackPlugin({
                template: './examples/index.html',
            }),
            new webpack.DefinePlugin({
                MICRO_NAME: JSON.stringify('demo'),
            }),
        ] : undefined,
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        }
    };
};