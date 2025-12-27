import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/vue3-vite",
  viteFinal: async (config) => {
    // vite-plugin-vue-devtools와 vite-plugin-inspect 제외 (Storybook 10 호환성 문제)
    config.plugins = config.plugins?.filter((plugin) => {
      if (!plugin) return false;
      const name = (plugin as any).name;
      return name !== 'vite-plugin-inspect' &&
             name !== 'vite-plugin-vue-devtools' &&
             name !== 'VueDevToolsVite';
    });
    return config;
  },
};
export default config;