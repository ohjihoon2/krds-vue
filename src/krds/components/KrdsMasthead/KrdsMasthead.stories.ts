import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsMasthead from './KrdsMasthead.vue'

const meta: Meta<typeof KrdsMasthead> = {
  title: 'Components/KrdsMasthead',
  component: KrdsMasthead,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'high-contrast'],
      description: '테마 모드',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'KRDS 머스트헤드(Masthead) 컴포넌트. 공식 정부 누리집임을 알리는 배너입니다.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'light',
    text: '이 누리집은 대한민국 정부의 공식 웹사이트입니다.',
  },
}

export const HighContrast: Story = {
  args: {
    mode: 'high-contrast',
    text: '이 누리집은 대한민국 정부의 공식 웹사이트입니다.',
  },
}
