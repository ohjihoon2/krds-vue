import type { Preview } from '@storybook/vue3-vite'
import '../src/krds/styles/tokens/krds_tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;