const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Note to self: using craco allow imports from outside src directory
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      if (scopePluginIndex !== -1) {
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      }

      return webpackConfig;
    },
  },
};
