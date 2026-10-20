<script setup lang="ts">
import { computed, ref } from 'vue'
import Chest from '~/components/retro/Chest.vue'
import DayBar from '~/components/retro/DayBar.vue'
import PixelArt from '~/components/retro/PixelArt.vue'
import QuestNode from '~/components/retro/QuestNode.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import { useRetroToast } from '~/composables/useRetroToast'
import { PWA_LOGIN_URL } from '~/utils/config'
import type { QuestTask } from '~/utils/config'
import { GLYPHS } from '~/utils/pixelArt'

const { show: showToast } = useRetroToast()

interface GlossWord {
  key: string
  word: string
  phonetic: string
  pos: string
  meaning: string
  example: string
}

const glossDictionary: Record<string, GlossWord> = {
  consistent: {
    key: 'consistent',
    word: 'consistent',
    phonetic: '/kənˈsɪs.tənt/',
    pos: 'adj',
    meaning: 'Đều đặn, kiên định và giữ vững nhịp độ ngày qua ngày',
    example: 'Consistent daily practice beats cramming once a week.',
  },
  momentum: {
    key: 'momentum',
    word: 'momentum',
    phonetic: '/məˈmen.təm/',
    pos: 'noun',
    meaning: 'Đà tiến triển, quán tính giúp tiếp tục tiến lên dễ dàng',
    example: 'Completing three 10-minute quests builds strong momentum.',
  },
  burnout: {
    key: 'burnout',
    word: 'burnout',
    phonetic: '/ˈbɜːn.aʊt/',
    pos: 'noun',
    meaning: 'Sự kiệt sức, quá tải tinh thần do ép bản thân học quá lâu một lúc',
    example: 'Short 30-minute sessions protect busy learners from burnout.',
  },
}

const activeGlossKey = ref<string>('consistent')
const activeGloss = computed(() => glossDictionary[activeGlossKey.value])

function selectGloss(key: string) {
  if (glossDictionary[key]) {
    activeGlossKey.value = key
  }
}

interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  correct: boolean
  explanation: string
}

const options: QuizOption[] = [
  {
    id: 'A',
    text: 'Cramming for four hours every Sunday night',
    correct: false,
    explanation: 'Học dồn gây kiệt sức (burnout), không tạo được thói quen.',
  },
  {
    id: 'B',
    text: 'Practising consistently for 30 minutes each day',
    correct: true,
    explanation: 'Chính xác! 30 phút mỗi ngày tạo đà tiến bộ (momentum) bền vững.',
  },
  {
    id: 'C',
    text: 'Memorising an entire dictionary before speaking',
    correct: false,
    explanation: 'Học vẹt từ điển không bằng nhịp độ luyện tập hàng ngày.',
  },
  {
    id: 'D',
    text: 'Waiting until you have a free week off work',
    correct: false,
    explanation: 'Chờ rảnh rỗi sẽ luôn bị hoãn; 30 phút mỗi ngày mới là chìa khoá.',
  },
]

const selectedOptionId = ref<'A' | 'B' | 'C' | 'D' | null>(null)
const selectedOption = computed(() => options.find(o => o.id === selectedOptionId.value) ?? null)
const isSolved = computed(() => selectedOption.value?.correct === true)

const daySeconds = computed(() => (isSolved.value ? 1800 : 1200))

const sampleTasks = computed<{ task: QuestTask, state: 'done' | 'current' | 'open', connector: 'lit' | 'dim' | 'none' }[]>(() => [
  {
    task: { id: 'q-vocab', task_type: 'vocabulary', title: 'Từ vựng Cốt lõi & Ngữ pháp', duration_minutes: 10 },
    state: 'done',
    connector: 'lit',
  },
  {
    task: { id: 'q-reading', task_type: 'reading', title: 'Đọc hiểu & Chạm từ dịch nghĩa', duration_minutes: 10 },
    state: isSolved.value ? 'done' : 'current',
    connector: isSolved.value ? 'lit' : 'dim',
  },
  {
    task: { id: 'q-practice', task_type: 'practice', title: 'Thực hành Viết câu cùng AI', duration_minutes: 10 },
    state: isSolved.value ? 'done' : 'open',
    connector: 'none',
  },
])

const chestRewards = [
  { icon: '★', label: 'Phòng hôm nay đã xong (30/30 phút)' },
  { icon: '♥', label: '+20 HP cho Mầm Non' },
  { icon: '🔥', label: '+1 Chuỗi ngày liên tiếp' },
]

function pickOption(opt: QuizOption) {
  selectedOptionId.value = opt.id
  if (opt.correct) {
    showToast('Trúng! Cậu vừa mở kho báu phòng hôm nay (+20 HP)', 'growth')
  }
}

function resetRoom() {
  selectedOptionId.value = null
}

function openApp() {
  window.location.href = PWA_LOGIN_URL
}
</script>

<template>
  <section id="chuong-2" aria-labelledby="ch2-heading" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">
    <!-- Section Header (Clean on bg-ground-0, no nested box) -->
    <div class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-display text-[16px] sm:text-[18px] text-torch uppercase tracking-wider">
          CHƯƠNG II · CĂN PHÒNG 30 PHÚT &amp; KHO BÁU MỖI NGÀY
        </span>
        <span class="rounded-sm bg-ground-2 border border-torch px-2.5 py-0.5 font-display text-[15px] text-torch uppercase">
          PHÒNG MẪU: LEVEL CEFR B1
        </span>
      </div>
      <h2 id="ch2-heading" class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
        TRẢI NGHIỆM THỬ 1 PHÒNG HỌC: CHẠM TỪ DỊCH NGHĨA &amp; MỞ RƯƠNG KHO BÁU
      </h2>

      <!-- Visual Loot Badges Bar (32px crisp pixel art icons) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-1 p-3">
          <PixelArt :rows="GLYPHS.gem" :size="32" class="shrink-0" />
          <p class="font-display text-[16px] text-ink-0 leading-5">Chạm từ tiếng Anh dịch nghĩa tức thì</p>
        </div>
        <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-1 p-3">
          <PixelArt :rows="GLYPHS.heart" :size="32" class="shrink-0" />
          <p class="font-display text-[16px] text-ink-0 leading-5">Đúng đáp án: +20 HP cho Mầm Non</p>
        </div>
        <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-1 p-3">
          <PixelArt :rows="GLYPHS.chestClosed" :size="32" class="shrink-0" />
          <p class="font-display text-[16px] text-ink-0 leading-5">Đạt 30/30 phút: Mở Rương nhận kho báu</p>
        </div>
      </div>
    </div>

    <!-- Interactive 2-Column Quest Arena -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 xl:gap-8 items-start">
      <!-- Left 5 Cols (4 on XL): Hub DayBar + 3 QuestNodes + Chest -->
      <div class="lg:col-span-5 xl:col-span-4 space-y-6">
        <RetroPanel speaker="TIẾN ĐỘ PHÒNG HÔM NAY">
          <div class="space-y-4">
            <DayBar :value-seconds="daySeconds" :met="isSolved" />
            <ul role="list" class="pt-2">
              <QuestNode
                v-for="(item, idx) in sampleTasks"
                :key="item.task.id"
                :task="item.task"
                :index="idx"
                :state="item.state"
                :connector="item.connector"
              />
            </ul>
          </div>
        </RetroPanel>

        <RetroPanel :tone="isSolved ? 'torch' : 'plain'" speaker="KHO BÁU PHÒNG HÔM NAY">
          <div class="flex flex-col items-center space-y-3 py-2 text-center">
            <Chest :items="chestRewards" :open="isSolved" />
            <p v-if="!isSolved" class="font-body text-sm text-ink-1">
              Chọn đáp án đúng bên cạnh để mở rương!
            </p>
            <div v-else class="flex flex-wrap justify-center gap-2 pt-2">
              <RetroButton variant="primary" @click="openApp">
                Nhận lộ trình thật của cậu →
              </RetroButton>
              <RetroButton variant="secondary" @click="resetRoom">
                Thử lại câu hỏi
              </RetroButton>
            </div>
          </div>
        </RetroPanel>
      </div>

      <!-- Right 7 Cols (8 on XL): Interactive Reading Passage (Tap-a-word Gloss) + Quiz Question -->
      <div class="lg:col-span-7 xl:col-span-8">
        <RetroPanel :tone="isSolved ? 'growth' : 'plain'" speaker="NHIỆM VỤ 2/3 · ĐỌC HIỂU & TRA TỪ 1 CHẠM (CEFR B1)">
          <div class="space-y-5">
            <!-- Tap-a-word Reading Passage -->
            <div class="space-y-3 border-2 border-line-dim bg-ground-0 p-4">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line-dim pb-2">
                <span class="font-display text-[18px] leading-6 text-torch">
                  ▶ CHẠM VÀO TỪ GẠCH CHÂN ĐỂ XEM NGHĨA TIẾNG VIỆT
                </span>
                <span class="font-display text-[18px] leading-6 text-ink-2">10 PHÚT</span>
              </div>

              <p lang="en" class="font-body text-[18px] leading-[30px] text-ink-0">
                Building a lasting English habit does not require exhausting marathon lessons. Instead,
                <button
                  type="button"
                  data-gloss-word="consistent"
                  class="rounded-sm border-b-2 border-dotted border-growth px-1 font-bold text-growth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
                  :class="activeGlossKey === 'consistent' ? 'bg-ground-2' : ''"
                  @click="selectGloss('consistent')"
                >
                  consistent
                </button>
                daily practice of thirty minutes creates strong
                <button
                  type="button"
                  data-gloss-word="momentum"
                  class="rounded-sm border-b-2 border-dotted border-torch px-1 font-bold text-torch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
                  :class="activeGlossKey === 'momentum' ? 'bg-ground-2' : ''"
                  @click="selectGloss('momentum')"
                >
                  momentum
                </button>
                while protecting busy adult learners from mental
                <button
                  type="button"
                  data-gloss-word="burnout"
                  class="rounded-sm border-b-2 border-dotted border-ember px-1 font-bold text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
                  :class="activeGlossKey === 'burnout' ? 'bg-ground-2' : ''"
                  @click="selectGloss('burnout')"
                >
                  burnout
                </button>.
              </p>

              <!-- Active Gloss Card -->
              <div
                v-if="activeGloss"
                data-gloss-panel
                aria-live="polite"
                class="border-2 border-line-lit bg-ground-1 p-3 space-y-1"
              >
                <div class="flex flex-wrap items-baseline gap-2">
                  <span lang="en" class="font-body text-[17px] font-bold text-growth">{{ activeGloss.word }}</span>
                  <span class="font-body text-sm text-ink-2">{{ activeGloss.phonetic }}</span>
                  <span class="rounded-sm bg-ground-2 px-1.5 py-0.5 font-display text-[16px] leading-5 text-torch">
                    {{ activeGloss.pos }}
                  </span>
                </div>
                <p class="font-body text-[16px] leading-6 text-ink-0">
                  {{ activeGloss.meaning }}
                </p>
                <p lang="en" class="font-body text-sm text-ink-1">
                  Ví dụ: "{{ activeGloss.example }}"
                </p>
              </div>
            </div>

            <!-- Interactive Multiple-Choice Question -->
            <div class="space-y-3">
              <p lang="en" class="font-body text-[17px] font-bold leading-[26px] text-ink-0">
                Question: According to the passage, what builds strong learning momentum without causing burnout?
              </p>

              <div role="radiogroup" aria-label="Chọn đáp án đúng" class="space-y-2.5">
                <button
                  v-for="opt in options"
                  :key="opt.id"
                  type="button"
                  role="radio"
                  :data-option="opt.id"
                  :aria-checked="selectedOptionId === opt.id ? 'true' : 'false'"
                  class="flex min-h-[56px] w-full items-center gap-3 border-2 px-4 py-3 text-left font-body text-[17px] leading-[26px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch active:translate-y-[2px]"
                  :class="[
                    selectedOptionId === opt.id && opt.correct
                      ? 'border-growth bg-ground-2 text-ink-0'
                      : selectedOptionId === opt.id && !opt.correct
                        ? 'border-ember bg-ground-2 text-ink-0'
                        : 'border-line-lit bg-ground-1 text-ink-0 hover:bg-ground-2',
                  ]"
                  @click="pickOption(opt)"
                >
                  <span class="w-4 shrink-0" aria-hidden="true">
                    <PixelArt v-if="selectedOptionId === opt.id" :rows="GLYPHS.cursor" :size="16" />
                  </span>
                  <span lang="en" class="flex-1">{{ opt.id }}. {{ opt.text }}</span>
                </button>
              </div>

              <!-- Hit / Miss Feedback Banner (Glyph + Label + Vietnamese Explanation) -->
              <div
                v-if="selectedOption"
                data-quiz-feedback
                aria-live="polite"
                class="flex items-start gap-3 border-2 bg-ground-0 p-3"
                :class="selectedOption.correct ? 'border-growth text-growth' : 'border-ember text-ember'"
              >
                <PixelArt :rows="selectedOption.correct ? GLYPHS.check : GLYPHS.cross" :size="32" class="shrink-0" />
                <div class="space-y-1">
                  <p class="font-display text-[22px] leading-6">
                    {{ selectedOption.correct ? 'Trúng! (+10 XP)' : 'Trượt…' }}
                  </p>
                  <p class="font-body text-[16px] leading-6 text-ink-0">
                    {{ selectedOption.explanation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RetroPanel>
      </div>
    </div>
  </section>
</template>
