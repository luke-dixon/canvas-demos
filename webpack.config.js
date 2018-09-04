let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    'entry': {
        'home': './src/script.js',
        'tower-of-hanoi': './src/tower-of-hanoi/script.js'
    },
    'output': {
        'filename': '[name].bundle.js'
    },
    'module': {
        'rules': [
            {
                'test': /\.css$/,
                'use': [
                    'style-loader',
                    {
                        'loader': 'css-loader',
                        'options': { 'importLoaders': 1 }
                    },
                    {
                        'loader': 'postcss-loader',
                        'options': {
                            'ident': 'postcss',
                            'plugins': () => [
                                require('postcss-import'),
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            },
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    'plugins': [
        new HtmlWebpackPlugin({
            'chunks': ['home'],
            'filename': 'index.html',
            'hash': true,
            'template': 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            'chunks': ['tower-of-hanoi'],
            'filename': 'tower-of-hanoi/index.html',
            'hash': true,
            'template': 'src/tower-of-hanoi/index.html'
        })
    ]
};
