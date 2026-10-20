import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChapterTwoQuestRoom from '@/components/story/ChapterTwoQuestRoom.vue'

describe('ChapterTwoQuestRoom', () => {
  it('switches Vietnamese vocabulary gloss when tapping underlined English words', async () => {
    const wrapper = mount(ChapterTwoQuestRoom)

    expect(wrapper.find('[data-gloss-panel]').text()).toContain('consistent')

    const momentumWordBtn = wrapper.find('[data-gloss-word="momentum"]')
    await momentumWordBtn.trigger('click')

    const glossPanelText = wrapper.find('[data-gloss-panel]').text()
    expect(glossPanelText).toContain('momentum')
    expect(glossPanelText).toContain('Đà tiến triển')
  })

  it('displays Trượt… feedback on wrong option and Trúng! + opens Chest + fills DayBar on correct option', async () => {
    const wrapper = mount(ChapterTwoQuestRoom)

    // Initially 20/30 (66%) and chest closed
    expect(wrapper.text()).toContain('20/30')
    expect(wrapper.text()).toContain('66%')

    // Click wrong option A
    const optionA = wrapper.find('[data-option="A"]')
    await optionA.trigger('click')
    expect(wrapper.find('[data-quiz-feedback]').text()).toContain('Trượt…')
    expect(wrapper.text()).toContain('66%')

    // Click correct option B
    const optionB = wrapper.find('[data-option="B"]')
    await optionB.trigger('click')
    expect(wrapper.find('[data-quiz-feedback]').text()).toContain('Trúng!')
    expect(wrapper.text()).toContain('30/30')
    expect(wrapper.text()).toContain('Phòng hôm nay đã xong')
    expect(wrapper.text()).toContain('Nhận lộ trình thật của cậu →')
  })
})
