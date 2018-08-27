var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    'entry': {
        'tower-of-hanoi': './src/tower-of-hanoi/script.js'
    },
    'output': {
        'filename': '[name].bundle.js'
    },
    'module': {
        'rules': [
            {
                'test': /\.css/,
                'use': ['style-loader', 'css-loader']
            }
        ]
    },
    'plugins': [
        new HtmlWebpackPlugin({
            'filename': 'index.html',
            'hash': true,
            'template': 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            'filename': 'tower-of-hanoi/index.html',
            'hash': true,
            'template': 'src/tower-of-hanoi/index.html'
        })
    ]
};
