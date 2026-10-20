import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChapterThreeCompanion from '@/components/story/ChapterThreeCompanion.vue'

describe('ChapterThreeCompanion', () => {
  it('increments HP (+20) and streak (+1) when clicking + Học 30p', async () => {
    const wrapper = mount(ChapterThreeCompanion)

    // Initial state: HP 80/100, Streak x4
    expect(wrapper.text()).toContain('80/100')
    expect(wrapper.text()).toContain('x4')

    const studyBtn = wrapper.find('[data-btn-study]')
    await studyBtn.trigger('click')

    expect(wrapper.text()).toContain('100/100')
    expect(wrapper.text()).toContain('x5')
  })

  it('decrements HP (-30 per missed day) down to 0 HP wilted and revives to 50 HP sprout', async () => {
    const wrapper = mount(ChapterThreeCompanion)

    const missBtn = wrapper.find('[data-btn-miss]')

    // 80 -> 50 -> 20 -> 0
    await missBtn.trigger('click')
    expect(wrapper.text()).toContain('50/100')
    expect(wrapper.text()).toContain('x0')

    await missBtn.trigger('click')
    expect(wrapper.text()).toContain('20/100')

    await missBtn.trigger('click')
    expect(wrapper.text()).toContain('0/100')
    expect(wrapper.find('[data-sandbox-stage]').text()).toContain('Héo úa (Wilted)')

    // Revive button should now be enabled
    const reviveBtn = wrapper.find('[data-btn-revive]')
    await reviveBtn.trigger('click')

    expect(wrapper.text()).toContain('50/100')
    expect(wrapper.find('[data-sandbox-stage]').text()).toContain('Mầm non (Sprout)')
  })

  it('allows inspecting any of the 6 plant stages directly from the gallery', async () => {
    const wrapper = mount(ChapterThreeCompanion)

    const fruitfulStageBtn = wrapper.find('[data-stage-btn="fruitful"]')
    await fruitfulStageBtn.trigger('click')

    expect(wrapper.find('[data-sandbox-stage]').text()).toContain('Sai quả (Fruitful)')
    expect(wrapper.text()).toContain('x15')
  })
})
