const { dependencies } = require('./package.json');

module.exports = {
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './RemoteApp': './src/RemoteApp',
  },
  remotes: {
    host: 'host@http://localhost:3000/remoteEntry.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: 'react',
      shareScope: 'default',
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
