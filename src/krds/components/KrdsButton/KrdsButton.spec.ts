import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import KrdsButton from './KrdsButton.vue'

describe('KrdsButton', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(KrdsButton, {
        slots: { default: 'Click me' },
      })
      expect(wrapper.text()).toBe('Click me')
      expect(wrapper.classes()).toContain('krds-btn')
      expect(wrapper.classes()).toContain('primary')
      expect(wrapper.classes()).toContain('large')
    })

    it('renders as button element by default', () => {
      const wrapper = mount(KrdsButton)
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('renders as anchor element when href is provided', () => {
      const wrapper = mount(KrdsButton, {
        props: { href: '/test' },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('/test')
    })
  })

  describe('size variants', () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const wrapper = mount(KrdsButton, {
          props: { size },
        })
        expect(wrapper.classes()).toContain(size)
      })
    })
  })

  describe('variant types', () => {
    const variants = ['primary', 'secondary', 'tertiary'] as const

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const wrapper = mount(KrdsButton, {
          props: { variant },
        })
        expect(wrapper.classes()).toContain(variant)
      })
    })
  })

  describe('disabled state', () => {
    it('applies disabled attribute and class', () => {
      const wrapper = mount(KrdsButton, {
        props: { disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.classes()).toContain('disabled')
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(KrdsButton, {
        props: { disabled: true },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('loading state', () => {
    it('shows loading indicator when loading', () => {
      const wrapper = mount(KrdsButton, {
        props: { loading: true },
      })
      expect(wrapper.find('.krds-btn__loading').exists()).toBe(true)
    })

    it('is disabled when loading', () => {
      const wrapper = mount(KrdsButton, {
        props: { loading: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('interactions', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(KrdsButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('link behavior', () => {
    it('adds target and rel attributes for external links', () => {
      const wrapper = mount(KrdsButton, {
        props: {
          href: 'https://example.com',
          target: '_blank',
        },
      })
      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('icon button', () => {
    it('applies icon class when iconOnly is true', () => {
      const wrapper = mount(KrdsButton, {
        props: { iconOnly: true },
      })
      expect(wrapper.classes()).toContain('icon')
    })
  })
})
