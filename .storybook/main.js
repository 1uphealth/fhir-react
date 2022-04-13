module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  framework: '@storybook/react',
  babel: async options => ({
    // Update your babel configuration here
    ...options,
  }),
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },
};
