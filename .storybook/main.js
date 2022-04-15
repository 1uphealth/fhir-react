module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  framework: '@storybook/react',
};
