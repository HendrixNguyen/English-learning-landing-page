<script setup lang="ts">
import { computed, ref } from 'vue'
import Badge from '~/components/retro/Badge.vue'
import CompanionSprite from '~/components/retro/CompanionSprite.vue'
import HpBar from '~/components/retro/HpBar.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import SpeechBox from '~/components/retro/SpeechBox.vue'
import { useRetroToast } from '~/composables/useRetroToast'
import { PLANT_STAGES, speechLine, stageForStreak } from '~/utils/plant'
import type { PlantStage } from '~/utils/plant'

const { show: showToast } = useRetroToast()

const hp = ref(80)
const streak = ref(4)
const forcedStage = ref<PlantStage | null>(null)
const reactState = ref<'idle' | 'hit' | 'miss' | 'levelup' | 'down'>('idle')
const lastActionMet = ref(false)

const currentStage = computed<PlantStage>(() => {
  if (forcedStage.value) return forcedStage.value
  return stageForStreak(streak.value, hp.value)
})

const stageDescriptions: Record<PlantStage, { title: string, rule: string }> = {
  seed: { title: 'Hạt giống (Seed)', rule: 'Khởi đầu khi vừa nhận chậu cây' },
  sprout: { title: 'Mầm non (Sprout)', rule: 'Chuỗi 0–2 ngày hoặc vừa Hồi sinh' },
  sapling: { title: 'Cây non (Sapling)', rule: 'Đạt chuỗi 3–6 ngày liên tiếp' },
  flowering: { title: 'Nở hoa (Flowering)', rule: 'Đạt chuỗi 7–13 ngày liên tiếp' },
  fruitful: { title: 'Sai quả (Fruitful)', rule: 'Đạt chuỗi 14+ ngày liên tiếp' },
  wilted: { title: 'Héo úa (Wilted)', rule: '0 HP khi bỏ lỡ — Cần 15p Hồi sinh' },
}

const companionSpeech = computed(() => {
  if (forcedStage.value === 'seed') {
    return 'Tớ là hạt giống đầu tiên trong chậu! Bấm "+ Học đủ 30 phút" để tưới nước cho tớ lớn lên nhé.'
  }
  return speechLine({
    stage: currentStage.value,
    health: hp.value,
    targetMet: lastActionMet.value,
    streak: streak.value,
    name: 'Mầm Non',
  })
})

function simulateStudyDay() {
  if (hp.value <= 0) {
    simulateRevive()
    return
  }
  const prevStage = stageForStreak(streak.value, hp.value)
  forcedStage.value = null
  hp.value = Math.min(100, hp.value + 20)
  streak.value += 1
  lastActionMet.value = true
  const nextStage = stageForStreak(streak.value, hp.value)
  reactState.value = nextStage !== prevStage ? 'levelup' : 'hit'
}

function simulateMissDay() {
  forcedStage.value = null
  hp.value = Math.max(0, hp.value - 30)
  streak.value = 0
  lastActionMet.value = false
  reactState.value = hp.value === 0 ? 'down' : 'miss'
}

function simulateRevive() {
  if (hp.value > 0 && currentStage.value !== 'wilted') return
  forcedStage.value = null
  hp.value = 50
  streak.value = 0
  lastActionMet.value = true
  reactState.value = 'levelup'
  showToast('Mầm Non đã hồi sinh ở 50 HP! Chuỗi ngày bắt đầu lại từ hôm nay.', 'torch')
}

function selectStagePreview(stage: PlantStage) {
  forcedStage.value = stage
  lastActionMet.value = false
  if (stage === 'wilted') {
    hp.value = 0
    streak.value = 0
    reactState.value = 'down'
  } else if (stage === 'seed') {
    hp.value = 60
    streak.value = 0
    reactState.value = 'idle'
  } else if (stage === 'sprout') {
    hp.value = 70
    streak.value = 1
    reactState.value = 'idle'
  } else if (stage === 'sapling') {
    hp.value = 80
    streak.value = 4
    reactState.value = 'idle'
  } else if (stage === 'flowering') {
    hp.value = 90
    streak.value = 8
    reactState.value = 'idle'
  } else if (stage === 'fruitful') {
    hp.value = 100
    streak.value = 15
    reactState.value = 'idle'
  }
}

function onSpriteReacted() {
  if (reactState.value !== 'down') {
    reactState.value = 'idle'
  }
}
</script>

<template>
  <section id="chuong-3" aria-labelledby="ch3-heading" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">
    <!-- Section Header (Clean on bg-ground-0, no nested box) -->
    <div class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-display text-[16px] sm:text-[18px] text-growth uppercase tracking-wider">
          CHƯƠNG III · SINH TỒN GIỮA HẦM NGỤC &amp; CƠ CHẾ HỒI SINH
        </span>
        <div class="flex flex-wrap items-center gap-3 font-display text-[15px]">
          <span class="text-growth font-bold">+ Học 30p: +20 HP</span>
          <span class="text-ink-2">|</span>
          <span class="text-ember font-bold">- Nghỉ 1 ngày: -30 HP</span>
          <span class="text-ink-2">|</span>
          <span class="text-torch font-bold">0 HP: Thử thách 15p Hồi sinh (50 HP)</span>
        </div>
      </div>
      <h2 id="ch3-heading" class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
        MỘT NGÀY NGHỈ LÀ LÝ DO ĐỂ QUAY LẠI CỨU CÂY — KHÔNG PHẢI LÝ DO ĐỂ BỎ CUỘC
      </h2>
    </div>

    <!-- Interactive Companion Sandbox -->
    <RetroPanel :tone="currentStage === 'wilted' ? 'ember' : 'plain'" speaker="TRẠM TƯƠNG TÁC · GIẢ LẬP NUÔI MẦM NON">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12 items-center">
        <!-- Left 5 Cols (4 on XL): Live Companion Stage -->
        <div class="lg:col-span-5 xl:col-span-4 flex flex-col items-center space-y-4 border-2 border-line-lit bg-ground-0 p-6 text-center">
          <div class="flex w-full flex-wrap items-center justify-between gap-2 border-b-2 border-line-dim pb-3">
            <span data-sandbox-stage class="font-display text-[20px] leading-6 text-growth uppercase">
              {{ stageDescriptions[currentStage].title }}
            </span>
            <Badge kind="streak" :count="streak" :earned="streak > 0" />
          </div>

          <div class="flex h-44 w-44 items-center justify-center">
            <CompanionSprite
              :stage="currentStage"
              :health="hp"
              name="Mầm Non"
              :size="144"
              :react="reactState"
              @reacted="onSpriteReacted"
            />
          </div>

          <div class="w-full flex flex-col items-center space-y-2">
            <HpBar :value="hp" :max="100" label="HP" />
            <p class="font-body text-sm text-ink-1">
              {{ stageDescriptions[currentStage].rule }}
            </p>
          </div>
        </div>

        <!-- Right 7 Cols (8 on XL): Controls + SpeechBox + 6-Stage Selector -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-6">
          <SpeechBox
            name="MẦM NON"
            :stage="currentStage"
            :health="hp"
            :line="companionSpeech"
            :reduced="true"
          />

          <div class="space-y-2">
            <p class="font-display text-[18px] leading-6 text-ink-1 uppercase">
              ▶ BẤM THỬ CÁC TÌNH HUỐNG HÀNG NGÀY:
            </p>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <RetroButton
                data-btn-study
                variant="primary"
                block
                @click="simulateStudyDay"
              >
                + Học 30p (+20 HP)
              </RetroButton>
              <RetroButton
                data-btn-miss
                variant="danger"
                block
                @click="simulateMissDay"
              >
                - Nghỉ 1 ngày (-30 HP)
              </RetroButton>
              <RetroButton
                data-btn-revive
                variant="secondary"
                block
                :disabled="hp > 0 && currentStage !== 'wilted'"
                @click="simulateRevive"
              >
                Hồi sinh (50 HP)
              </RetroButton>
            </div>
          </div>

          <!-- 6-Stage Pixel Art Illustrated Gallery Selector -->
          <div class="space-y-3 border-t-2 border-line-dim pt-4">
            <div class="flex items-center justify-between">
              <p class="font-display text-[18px] leading-6 text-torch uppercase">
                ▶ TIẾN TRÌNH TIẾN HOÁ 6 CẤP ĐỘ CỦA MẦM NON:
              </p>
              <span class="font-display text-xs text-ink-2">BẤM VÀO TỪNG HÌNH THÁI ĐỂ XEM THỰC TẾ</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5" role="group" aria-label="Chọn hình thái Mầm Non">
              <button
                v-for="st in PLANT_STAGES"
                :key="st"
                type="button"
                :data-stage-btn="st"
                class="flex flex-col items-center gap-2 rounded-sm border-2 p-2.5 font-display text-[16px] leading-5 uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
                :class="
                  currentStage === st
                    ? st === 'wilted'
                      ? 'border-ember bg-ground-2 text-ember'
                      : 'border-growth bg-ground-2 text-growth'
                    : 'border-line-dim bg-ground-0 text-ink-1 hover:border-line-lit'
                "
                :aria-pressed="currentStage === st ? 'true' : 'false'"
                @click="selectStagePreview(st)"
              >
                <div class="flex h-12 w-12 items-center justify-center border border-line-dim bg-ground-1">
                  <CompanionSprite :stage="st" :health="st === 'wilted' ? 0 : 100" :size="36" />
                </div>
                <span class="whitespace-nowrap">{{ currentStage === st ? '▶ ' : '' }}{{ st }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </RetroPanel>
  </section>
</template>
