import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsIdentifier from './KrdsIdentifier.vue'

const meta: Meta<typeof KrdsIdentifier> = {
  title: 'Components/KrdsIdentifier',
  component: KrdsIdentifier,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { KrdsIdentifier },
    setup() {
      return { args }
    },
    template: '<KrdsIdentifier v-bind="args" />',
  }),
}
