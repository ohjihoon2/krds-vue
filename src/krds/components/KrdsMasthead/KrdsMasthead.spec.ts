import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KrdsMasthead from './KrdsMasthead.vue'

describe('KrdsMasthead', () => {
  it('renders correctly', () => {
    const wrapper = mount(KrdsMasthead)
    expect(wrapper.find('#krds-masthead').exists()).toBe(true)
    expect(wrapper.text()).toContain('이 누리집은 대한민국 공식 전자정부 누리집입니다.')
  })

  it('renders icon', () => {
    const wrapper = mount(KrdsMasthead)
    expect(wrapper.findComponent({ name: 'KrdsIcon' }).exists()).toBe(true)
  })

  it('applies high-contrast class when mode is high-contrast', () => {
    const wrapper = mount(KrdsMasthead, {
      props: { mode: 'high-contrast' },
    })
    expect(wrapper.classes()).toContain('high-contrast')
  })
})
