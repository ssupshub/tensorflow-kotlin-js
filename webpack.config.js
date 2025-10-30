const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/jsMain/typescript/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/distributions'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'src/jsMain/resources')
            },
            {
                directory: path.join(__dirname, 'python/model'),
                publicPath: '/model'
            }
        ],
        compress: true,
        port: 8080,
        hot: true,
        open: true
    },
    devtool: 'source-map'
};