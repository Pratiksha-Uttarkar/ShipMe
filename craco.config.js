const cracoConfig = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return {
        ...jestConfig,
        setupFiles: [`${rootDir}/jest.polyfills`],
      };
    },
  },
};

module.exports = cracoConfig