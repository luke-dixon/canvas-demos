import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    'devtool': 'inline-source-map',
    'entry': {
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
                        'loader': 'postcss-loader'
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
