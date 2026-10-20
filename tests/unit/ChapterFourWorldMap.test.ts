import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChapterFourWorldMap from '@/components/story/ChapterFourWorldMap.vue'

describe('ChapterFourWorldMap', () => {
  it('updates day detail and Google Calendar/Tasks statuses when selecting unlocked MapNodes', async () => {
    const wrapper = mount(ChapterFourWorldMap)

    // Default selected day is Day 4 (Hôm nay)
    expect(wrapper.find('[data-selected-day-title]').text()).toContain('Ngày 4')
    expect(wrapper.find('[data-calendar-status]').text()).toContain('Hôm nay 20:30 – 21:00')

    // Click Day 1 (cleared)
    const day1Btn = wrapper.find('button[aria-label^="Ngày 1"]')
    await day1Btn.trigger('click')

    expect(wrapper.find('[data-selected-day-title]').text()).toContain('Ngày 1')
    expect(wrapper.find('[data-task-status]').text()).toContain('Đã tự động tick')

    // Click Day 3 (missed)
    const day3Btn = wrapper.find('button[aria-label^="Ngày 3"]')
    await day3Btn.trigger('click')

    expect(wrapper.find('[data-selected-day-title]').text()).toContain('Ngày 3')
    expect(wrapper.find('[data-task-status]').text()).toContain('Đang chờ Học bù')
  })

  it('prevents selecting locked MapNodes (Day 6 and Day 7)', async () => {
    const wrapper = mount(ChapterFourWorldMap)

    expect(wrapper.find('[data-selected-day-title]').text()).toContain('Ngày 4')

    const day6Btn = wrapper.find('button[aria-label^="Ngày 6"]')
    expect(day6Btn.attributes('aria-disabled')).toBe('true')
    await day6Btn.trigger('click')

    // Still Day 4
    expect(wrapper.find('[data-selected-day-title]').text()).toContain('Ngày 4')
  })
})
