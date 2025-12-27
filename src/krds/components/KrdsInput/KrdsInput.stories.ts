import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import KrdsInput from './KrdsInput.vue'

const meta: Meta<typeof KrdsInput> = {
  title: 'Components/KrdsInput',
  component: KrdsInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: '입력 필드 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '입력 필드 크기',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'information'],
      description: '유효성 검사 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    label: {
      control: 'text',
      description: '레이블 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    hint: {
      control: 'text',
      description: '도움말 텍스트',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'KRDS 입력 필드 컴포넌트. 다양한 상태와 크기를 지원합니다.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '레이블',
    placeholder: '플레이스홀더',
    hint: '도움말 텍스트',
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="default-input" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { KrdsInput },
    setup() {
      const values = ref({
        small: '',
        medium: '',
        large: '',
        xlarge: '',
      })
      return { values }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <KrdsInput size="small" label="Small" placeholder="Small 입력" v-model="values.small" id="small-input" />
        <KrdsInput size="medium" label="Medium" placeholder="Medium 입력" v-model="values.medium" id="medium-input" />
        <KrdsInput size="large" label="Large" placeholder="Large 입력" v-model="values.large" id="large-input" />
        <KrdsInput size="xlarge" label="XLarge" placeholder="XLarge 입력" v-model="values.xlarge" id="xlarge-input" />
      </div>
    `,
  }),
}

export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'email@example.com',
    state: 'error',
    errorMessage: '유효한 이메일 주소를 입력해주세요.',
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="error-input" />',
  }),
}

export const SuccessState: Story = {
  args: {
    label: '이메일',
    placeholder: 'email@example.com',
    state: 'success',
    successMessage: '사용 가능한 이메일입니다.',
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('valid@email.com')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="success-input" />',
  }),
}

export const Disabled: Story = {
  args: {
    label: '비활성화 필드',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('비활성화된 값')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="disabled-input" />',
  }),
}

export const Readonly: Story = {
  args: {
    label: '읽기 전용 필드',
    readonly: true,
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('읽기 전용 값')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="readonly-input" />',
  }),
}

export const Password: Story = {
  args: {
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    hint: '8자 이상 입력해주세요',
  },
  render: (args) => ({
    components: { KrdsInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<KrdsInput v-bind="args" v-model="value" id="password-input" />',
  }),
}

export const AllStates: Story = {
  render: () => ({
    components: { KrdsInput },
    setup() {
      const values = ref({
        default: '',
        error: 'invalid',
        success: 'valid',
        info: '',
      })
      return { values }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <KrdsInput
          label="기본 상태"
          placeholder="입력하세요"
          hint="도움말 텍스트"
          v-model="values.default"
          id="state-default"
        />
        <KrdsInput
          label="오류 상태"
          state="error"
          errorMessage="오류가 발생했습니다."
          v-model="values.error"
          id="state-error"
        />
        <KrdsInput
          label="성공 상태"
          state="success"
          successMessage="확인되었습니다."
          v-model="values.success"
          id="state-success"
        />
        <KrdsInput
          label="정보 상태"
          state="information"
          hint="추가 정보입니다."
          v-model="values.info"
          id="state-info"
        />
      </div>
    `,
  }),
}
