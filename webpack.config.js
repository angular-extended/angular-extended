const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.js", 
  output: {
    path: path.resolve(__dirname, "./dist/demo"),
    filename: "[name].[chunkhash].js"
  },
  // optimization: process.env.NODE_ENV === 'production' ? {
  //     minimize: true, 
  //     minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()] 
  //   } : undefined,
  node: {
    fs: 'empty'
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack 4 Starter",
      template: "./src/index.html",
      inject: true,
      minify: {
        collapseWhitespace: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.[chunkhash].css"
    }),
    new CopyWebpackPlugin([
      { from: "./src/assets", to: "assets" },
      { from: "./src/articles", to: "articles" },
      { from: "./src/components", to: "components" },
      { from: "./src/tools", to: "tools" },
      { from: "./src/*.html" },
    ]),
    // new CleanWebpackPlugin()
  ],
  resolve: { extensions: [".js", ".ts"] },
  module: {
    rules: [
      {
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/typescript"]
          }
        }
      },
      { // load as text file under lib/*/*.css
        test: [/.css$|.html$/],
        use: ['raw-loader']
      },
      { // extract as css file into html for these
        test: [/style.css$|app.scss$/],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      }
    ]
  }
};