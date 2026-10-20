<script setup lang="ts">
import { computed, ref } from 'vue'
import Badge from '~/components/retro/Badge.vue'
import CompanionSprite from '~/components/retro/CompanionSprite.vue'
import HpBar from '~/components/retro/HpBar.vue'
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import SpeechBox from '~/components/retro/SpeechBox.vue'
import { PWA_LOGIN_URL } from '~/utils/config'
import { GLYPHS } from '~/utils/pixelArt'
import type { PlantStage } from '~/utils/plant'

const heroStages: { stage: PlantStage, label: string, streak: number, hp: number, quote: string }[] = [
  {
    stage: 'sprout',
    label: 'Ngày 2 · Mầm non',
    streak: 2,
    hp: 70,
    quote: 'Mỗi ngày cậu học 30 phút, tớ lớn lên cùng cậu!',
  },
  {
    stage: 'flowering',
    label: 'Ngày 10 · Nở hoa',
    streak: 10,
    hp: 90,
    quote: 'Chuỗi 7 ngày liên tiếp! Tớ nở hoa và tặng cậu Khiên bảo vệ.',
  },
  {
    stage: 'fruitful',
    label: 'Ngày 21 · Sai quả',
    streak: 21,
    hp: 100,
    quote: '28 ngày hoàn thành! Tiếng Anh đã thành phản xạ tự nhiên của cậu.',
  },
]

const selectedIdx = ref(2)
const currentHero = computed(() => heroStages[selectedIdx.value])

function openApp() {
  window.location.href = PWA_LOGIN_URL
}

function scrollToChapterOne() {
  const el = document.getElementById('chuong-1')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="ngoi-den" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 md:pt-10">
    <RetroPanel tone="growth" speaker="NGÔI ĐỀN KHỞI HÀNH · NHẬT KÝ 28 NGÀY">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12 items-center">
        <!-- Left 5 Cols (4 Cols on XL): Central Shrine Pedestal & Companion Altar -->
        <div class="lg:col-span-5 xl:col-span-4 flex flex-col items-center space-y-4 border-2 border-line-lit bg-ground-0 p-6 text-center">
          <!-- Top Altar Status -->
          <div class="flex flex-wrap items-center justify-center gap-3 border-b-2 border-line-dim pb-3 w-full">
            <Badge kind="streak" :count="currentHero.streak" :earned="true" />
            <Badge kind="shield" :count="2" :earned="true" />
            <HpBar :value="currentHero.hp" :max="100" label="HP" />
          </div>

          <!-- Central Shrine Pedestal with Companion Sprite -->
          <div class="flex h-48 w-48 items-center justify-center border-2 border-line-dim bg-ground-1 p-2">
            <CompanionSprite
              :stage="currentHero.stage"
              :health="currentHero.hp"
              name="Mầm Non"
              :size="160"
            />
          </div>

          <!-- Stage Preview Switcher -->
          <div class="flex flex-col items-center space-y-2 w-full pt-1">
            <p class="font-display text-[16px] leading-5 text-ink-2 uppercase">
              BẤM XEM TIẾN HOÁ CỦA MẦM NON:
            </p>
            <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Xem trước sự phát triển của Mầm Non">
              <button
                v-for="(item, idx) in heroStages"
                :key="item.stage"
                type="button"
                class="min-h-[36px] rounded-sm border-2 px-3 py-1 font-display text-[17px] leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
                :class="selectedIdx === idx ? 'border-growth bg-ground-2 text-growth' : 'border-line-dim bg-ground-0 text-ink-1 hover:border-line-lit'"
                :aria-pressed="selectedIdx === idx ? 'true' : 'false'"
                @click="selectedIdx = idx"
              >
                {{ selectedIdx === idx ? '▶ ' : '' }}{{ item.label }}
              </button>
            </div>
          </div>

          <!-- Companion Dialogue (Directly anchored to the plant) -->
          <div class="w-full pt-2">
            <SpeechBox
              name="MẦM NON"
              :stage="currentHero.stage"
              :health="currentHero.hp"
              :line="currentHero.quote"
              :reduced="true"
            />
          </div>
        </div>

        <!-- Right 7 Cols (8 Cols on XL): Narrative, Dialogue & High-Conversion CTAs -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-6">
          <!-- Category Pill & Headline -->
          <div class="space-y-3">
            <span class="inline-block rounded-sm bg-ground-2 border border-line-lit px-2.5 py-1 font-display text-[15px] sm:text-[16px] leading-5 uppercase tracking-wider text-torch">
              [ HÀNH TRÌNH TIẾNG ANH THÍCH ỨNG AI · DÀNH RIÊNG CHO NGƯỜI VIỆT ]
            </span>
            <h1 class="font-display text-[32px] sm:text-[38px] lg:text-[44px] xl:text-[50px] leading-[36px] sm:leading-[44px] lg:leading-[50px] xl:leading-[56px] text-ink-0">
              HỌC TIẾNG ANH 30 PHÚT MỖI NGÀY.<br class="hidden sm:inline" />
              GIỮ CHO MẦM NON CỦA CẬU LUÔN SỐNG.
            </h1>
            <p class="font-body text-[16px] sm:text-[18px] text-ink-1">
              3 nhiệm vụ 10p/ngày · Tự động khoá lịch Google Calendar &amp; Tasks · Nuôi lớn bạn đồng hành 16-bit.
            </p>
          </div>

          <!-- 3 Feature Highlights (Duolingo/Forest standard with 32px crisp pixel art) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-0 p-3">
              <PixelArt :rows="GLYPHS.compass" :size="32" class="shrink-0" />
              <div>
                <p class="font-display text-[14px] text-torch uppercase">XẾP LỚP AI</p>
                <p class="font-display text-[16px] text-ink-0 leading-5">Chuẩn CEFR A1–C2</p>
              </div>
            </div>
            <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-0 p-3">
              <PixelArt :rows="GLYPHS.clock" :size="32" class="shrink-0" />
              <div>
                <p class="font-display text-[14px] text-growth uppercase">30 PHÚT/NGÀY</p>
                <p class="font-display text-[16px] text-ink-0 leading-5">3 nhiệm vụ 10 phút</p>
              </div>
            </div>
            <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-0 p-3">
              <PixelArt :rows="GLYPHS.potion" :size="32" class="shrink-0" />
              <div>
                <p class="font-display text-[14px] text-torch uppercase">BẢO VỆ MẦM NON</p>
                <p class="font-display text-[16px] text-ink-0 leading-5">Đồng bộ Calendar</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons (Positioned prominently above the fold) -->
          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <RetroButton variant="primary" @click="openApp">
              ▶ Bước vào căn phòng đầu tiên (Miễn phí 100%)
            </RetroButton>
            <RetroButton variant="secondary" @click="scrollToChapterOne">
              Đọc cuộn nhật ký 4 chương ▼
            </RetroButton>
          </div>

          <!-- Reassurance list -->
          <ul role="list" class="flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-line-dim pt-3 font-display text-[17px] leading-6 text-ink-2">
            <li>✓ Đăng nhập 1 chạm với Google</li>
            <li>✓ Miễn phí 100% trong Open Beta</li>
            <li>✓ Cài đặt PWA học cả khi Offline</li>
          </ul>
        </div>
      </div>
    </RetroPanel>
  </section>
</template>
