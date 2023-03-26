module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/*.story.{js,jsx}',
    '!src/*/RbGenerated*/*.{js,jsx}',
    '!src/index.js',
    '!src/global-styles.js',
    '!src/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    // global: {
    //   statements: 70,
    //   branches: 70,
    //   functions: 70,
    //   lines: 70,
    // },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/jest/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/mocks/image.js',
  },
  // testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
};
