import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KrdsInput from './KrdsInput.vue'

describe('KrdsInput', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(KrdsInput)
      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('input').classes()).toContain('krds-input')
    })

    it('renders label when provided', () => {
      const wrapper = mount(KrdsInput, {
        props: { label: 'Email' },
        attrs: { id: 'email-input' },
      })
      expect(wrapper.find('label').text()).toBe('Email')
      expect(wrapper.find('label').attributes('for')).toBe('email-input')
    })

    it('renders hint message when provided', () => {
      const wrapper = mount(KrdsInput, {
        props: { hint: 'Enter your email' },
      })
      expect(wrapper.find('.form-hint').text()).toBe('Enter your email')
    })
  })

  describe('size variants', () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'] as const

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const wrapper = mount(KrdsInput, {
          props: { size },
        })
        expect(wrapper.find('input').classes()).toContain(size)
      })
    })
  })

  describe('states', () => {
    it('applies error state', () => {
      const wrapper = mount(KrdsInput, {
        props: {
          state: 'error',
          errorMessage: 'Invalid input',
        },
      })
      expect(wrapper.find('.form-conts').classes()).toContain('is-error')
      expect(wrapper.find('.form-hint-invalid').text()).toBe('Invalid input')
    })

    it('applies success state', () => {
      const wrapper = mount(KrdsInput, {
        props: {
          state: 'success',
          successMessage: 'Valid input',
        },
      })
      expect(wrapper.find('.form-conts').classes()).toContain('is-success')
      expect(wrapper.find('.form-hint-success').text()).toBe('Valid input')
    })

    it('applies disabled state', () => {
      const wrapper = mount(KrdsInput, {
        props: { disabled: true },
      })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies readonly state', () => {
      const wrapper = mount(KrdsInput, {
        props: { readonly: true },
      })
      expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })
  })

  describe('v-model', () => {
    it('updates value on input', async () => {
      const wrapper = mount(KrdsInput, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
        },
      })

      await wrapper.find('input').setValue('test value')
      expect(wrapper.props('modelValue')).toBe('test value')
    })

    it('displays initial value', () => {
      const wrapper = mount(KrdsInput, {
        props: { modelValue: 'initial value' },
      })
      expect(wrapper.find('input').element.value).toBe('initial value')
    })
  })

  describe('events', () => {
    it('emits focus event', async () => {
      const wrapper = mount(KrdsInput)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(KrdsInput)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits input event', async () => {
      const wrapper = mount(KrdsInput)
      await wrapper.find('input').trigger('input')
      expect(wrapper.emitted('input')).toBeTruthy()
    })
  })

  describe('type variants', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url'] as const

    types.forEach((type) => {
      it(`renders ${type} input`, () => {
        const wrapper = mount(KrdsInput, {
          props: { type },
        })
        expect(wrapper.find('input').attributes('type')).toBe(type)
      })
    })
  })
})
