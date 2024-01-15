const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const path = require('path');

const webpackConfigPath = 'react-scripts/config/webpack.config';
const webpackConfig = require(webpackConfigPath);

/**
 * @returns {string}
 */
function getPublicPath() {
  let publicPath = 'auto';
  const providedPath = process.env.PUBLIC_URL;

  if (
    providedPath &&
    providedPath.length >= 0 &&
    providedPath.startsWith('http')
  ) {
    publicPath = providedPath.endsWith('/') ? providedPath : providedPath + '/';
  }
  return publicPath;
}

const override = (config) => {
  const projectDir = path.resolve(fs.realpathSync(process.cwd()));
  const mfConfigPath = path.resolve(projectDir, 'moduleFederation.config.js');

  if (fs.existsSync(mfConfigPath)) {
    const mfConfig = require(mfConfigPath);
    config.entry = "./src/index.js",
    config.module = {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
          options: {
            presets: [require.resolve('@babel/preset-react')],
          },
        },
      ],
    },
    config.cache = false,
    config.mode = 'development',
    config.devtool = 'source-map',
    config.optimization = {
      minimize: false,
    }
    config.plugins.push(new ModuleFederationPlugin(mfConfig));
    config.plugins.push(new HtmlWebpackPlugin({
      template: './public/index.html',
    }),)
    config.output.publicPath = getPublicPath();
  }

  return config;
};

require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
  override(webpackConfig(env));

module.exports = require(webpackConfigPath);
