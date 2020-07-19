import { shallowMount } from '@vue/test-utils'
import Index from '@/pages'

describe('Index', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.element).toMatchSnapshot()
  })
})
