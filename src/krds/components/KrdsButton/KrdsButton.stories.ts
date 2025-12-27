import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsButton from './KrdsButton.vue'

const meta: Meta<typeof KrdsButton> = {
  title: 'Components/KrdsButton',
  component: KrdsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    iconOnly: {
      control: 'boolean',
      description: '아이콘만 표시',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'KRDS 버튼 컴포넌트. 다양한 크기와 스타일 변형을 지원합니다.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">Primary 버튼</KrdsButton>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">Secondary 버튼</KrdsButton>',
  }),
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">Tertiary 버튼</KrdsButton>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <KrdsButton variant="primary">Primary</KrdsButton>
        <KrdsButton variant="secondary">Secondary</KrdsButton>
        <KrdsButton variant="tertiary">Tertiary</KrdsButton>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <KrdsButton size="xsmall">XSmall</KrdsButton>
        <KrdsButton size="small">Small</KrdsButton>
        <KrdsButton size="medium">Medium</KrdsButton>
        <KrdsButton size="large">Large</KrdsButton>
        <KrdsButton size="xlarge">XLarge</KrdsButton>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">비활성화 버튼</KrdsButton>',
  }),
}

export const Loading: Story = {
  args: {
    loading: true,
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">로딩 중...</KrdsButton>',
  }),
}

export const AsLink: Story = {
  args: {
    href: 'https://www.gov.kr',
    target: '_blank',
    size: 'large',
  },
  render: (args) => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">링크 버튼</KrdsButton>',
  }),
}
