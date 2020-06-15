// Webpack uses this to work with directories
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = (env) => {
  const resolve = (src) => path.resolve(__dirname, src);
  const config = {
    // Path to your entry point. From this file Webpack will begin his work
    entry: {
      site: resolve("src/scss/site.scss"),
      app: resolve("src/js/app.js"),
    },

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
      filename: "js/[name].min.js",
      chunkFilename: "js/chunks/[name]-[chunkhash].js",
      path: resolve("build/"),
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          // Apply rule for .sass, .scss or .css files
          test: /\.(sa|sc|c)ss$/,

          // Set loaders to transform files.
          // Loaders are applying from right to left(!)
          // The first loader will be applied after others
          use: [
            {
              // After all CSS loaders we use plugin to do his work.
              // It gets all transformed CSS and extracts it into separate
              // single bundled file
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/site.css",
      }),
    ],
  };

  return config;
};
