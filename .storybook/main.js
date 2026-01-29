module.exports = {
  stories: ['../src/**/*.stories.@(js|ts|jsx|tsx|mdx)'],
  addons: ['@storybook/preset-scss', '@storybook/addon-controls'],
  framework: '@storybook/react',
  typescript: { reactDocgen: false },
};
