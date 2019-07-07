/* eslint-env node */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCssImport = require('postcss-import');
const postCssPresetEnv = require('postcss-preset-env');

module.exports = {
    'devtool': 'inline-source-map',
    'entry': {
        'graph-traversal': [
            'regenerator-runtime/runtime',
            './src/graph-traversal/script.js'
        ],
        'home': ['./src/script.js'],
        'tower-of-hanoi': [
            'regenerator-runtime/runtime',
            './src/tower-of-hanoi/script.js'
        ]
    },
    'mode': 'development',
    'module': {
        'rules': [
            {
                'test': /\.css$/u,
                'use': [
                    'style-loader',
                    {
                        'loader': 'css-loader',
                        'options': {'importLoaders': 1}
                    },
                    {
                        'loader': 'postcss-loader',
                        'options': {
                            'ident': 'postcss',
                            'plugins': () => [
                                postCssImport,
                                postCssPresetEnv
                            ]
                        }
                    }
                ]
            },
            {
                'exclude': /node_modules/u,
                'test': /\.js$/u,
                'use': {
                    'loader': 'babel-loader',
                    'options': {
                        'presets': [
                            [
                                '@babel/preset-env',
                                {
                                    'corejs': 3,
                                    'targets': 'defaults',
                                    'useBuiltIns': 'entry'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    'output': {
        'filename': '[name].bundle.js'
    },
    'plugins': [
        new HtmlWebpackPlugin({
            'chunks': ['graph-traversal'],
            'filename': 'graph-traversal/index.html',
            'hash': true,
            'template': 'src/graph-traversal/index.html'
        }),
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
