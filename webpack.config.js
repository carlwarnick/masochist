var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3001/',
    path.resolve(__dirname, 'src', 'client', 'app.js'),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: 2,
                    targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
                    useBuiltIns: 'entry',
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-flow',
              ],
              plugins: [
                [
                  'minify-replace',
                  {
                    replacements: [
                      {
                        identifierName: '__DEV__',
                        replacement: {
                          type: 'booleanLiteral',
                          value: true,
                        },
                      },
                    ],
                  },
                ],
                'relay',
              ],
            },
          },
        ],
      },
      {
        type: 'javascript/esm',
        test: /\.mjs$/,
        resolve: {mainFields: ['module', 'main']},
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: 2,
                    targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
                    useBuiltIns: 'entry',
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-flow',
              ],
              plugins: [
                [
                  'minify-replace',
                  {
                    replacements: [
                      {
                        identifierName: '__DEV__',
                        replacement: {
                          type: 'booleanLiteral',
                          value: true,
                        },
                      },
                    ],
                  },
                ],
                'relay',
              ],
            },
          },
        ],
      },
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/highlight.js/styles'),
        ],
        loader: 'style-loader!css-loader!postcss-loader',
        test: /\.css$/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  output: {
    // For the dev server, we don't actually write out files to disk, but we
    // must declare a path otherwise Webpack will complain. Match the
    // "production" config for consistency.
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          // No arrow function, because we want `this` to be:
          // http://webpack.github.io/docs/loaders.html#loader-context
          return [autoprefixer];
        },
      },
    }),
  ],
};
