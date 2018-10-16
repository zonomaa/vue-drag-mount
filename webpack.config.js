const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const plugins = [];

// ページ単位で指定が必要
const entry = {
  "index": "./src/ts/index.ts"
};

Object.keys(entry).forEach(e => {
  const hwp = new htmlWebpackPlugin({
    inject: false,
    minify: false,
    title: e,
    template: `./src/${e}.html`,
    filename: `./${e}.html`
  });
  plugins.push(hwp);
});

module.exports = (env, argv) => ({
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: entry,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'assets/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      { test: /(\.css$)/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use:
            [
              // CSSをバンドルするための機能
              {
                loader: 'css-loader',
                options: {
                  // オプションでCSS内のurl()メソッドの取り込みを禁止する
                  url: false,
                  // ソースマップの利用有無
                  sourceMap: (argv.mode === 'development'),

                  // 0 => no loaders (default);
                  // 1 => postcss-loader;
                  // 2 => postcss-loader, sass-loader
                  importLoaders: 2
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  // ソースマップの利用有無
                  sourceMap: (argv.mode === 'development'),
                }
              }
            ]
        }),
      },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    modules: ['node_modules', path.join(__dirname, "src")],
    extensions: [
      '.ts', '.js', '.vue', '.woff', 'woff2', '.ttf', '.eot', '.svg'
    ],
    // Webpackで利用するときの設定
    alias: {
      'vue': 'vue/dist/vue.js',
      'vue$': 'vue/dist/vue.esm.js'
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    ...plugins,
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep",
        "**/.DS_Store",
        "**/Thumbs.db"
      ],
      "debug": "warning"
    })
  ],
  devServer: {
    contentBase: `${__dirname}/src`,
    open: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
});
