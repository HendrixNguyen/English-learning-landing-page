<script setup lang="ts">
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import { GLYPHS } from '~/utils/pixelArt'

const pillars = [
  {
    step: 'BƯỚC 01 · XẾP LỚP CEFR BẰNG AI',
    title: 'Đúng trình độ ngay phút đầu tiên',
    diagramType: 'cefr',
    footer: 'Gemini 3.8 Flash định vị trình độ',
    glyph: GLYPHS.book,
  },
  {
    step: 'BƯỚC 02 · LỘ TRÌNH 28 NGÀY (84 NHIỆM VỤ)',
    title: 'Mỗi ngày đúng 3 nhiệm vụ × 10 phút',
    diagramType: 'questLoop',
    footer: 'Đổi bài vừa sức ngay lập tức',
    glyph: GLYPHS.scroll,
  },
  {
    step: 'BƯỚC 03 · GIỮ CHỖ TRÊN LỊCH CÁ NHÂN',
    title: 'Tự động vào Google Calendar & Tasks',
    diagramType: 'googleSync',
    footer: 'Tự động tick hoàn thành khi đủ 30p',
    glyph: GLYPHS.sword,
  },
]
</script>

<template>
  <section id="chuong-1" aria-labelledby="ch1-heading" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">
    <!-- Section Header (Clean on bg-ground-0, no nested box) -->
    <div class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-display text-[16px] sm:text-[18px] text-torch uppercase tracking-wider">
          CHƯƠNG I · TẠI SAO CẬU HAY BỎ CUỘC SAU TUẦN ĐẦU?
        </span>
        <span class="rounded-sm bg-ground-2 border border-growth px-2.5 py-0.5 font-display text-[15px] text-growth uppercase">
          VÒNG LẶP THÓI QUEN 30 PHÚT
        </span>
      </div>
      <h2 id="ch1-heading" class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
        NGƯỜI TỰ HỌC KHÔNG THẤT BẠI VÌ THIẾU TÀI LIỆU. HỌ THẤT BẠI VÌ DỪNG LẠI.
      </h2>
    </div>

    <!-- Visual Comparison Infographic (Images & Badges replace long text) -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <!-- Old Way -->
      <div class="border-2 border-ember bg-ground-1 p-5 space-y-3">
        <div class="flex items-center gap-3 border-b border-line-dim pb-3">
          <PixelArt :rows="GLYPHS.skull" :size="32" class="shrink-0" />
          <div>
            <p class="font-display text-[22px] leading-6 text-ember uppercase">✖ LỐI MÒN CŨ (BURNOUT TRAP)</p>
            <p class="font-body text-xs text-ink-2">95% người tự học bỏ cuộc sau 7–14 ngày</p>
          </div>
        </div>
        <ul role="list" class="space-y-2 font-body text-[16px] text-ink-1">
          <li class="flex items-center gap-2">
            <span class="text-ember font-bold">✖</span>
            <span>Lệch trình độ CEFR</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-ember font-bold">✖</span>
            <span>Không có giờ cố định trên lịch</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-ember font-bold">✖</span>
            <span>Nghỉ 1 hôm là bỏ cuộc luôn</span>
          </li>
        </ul>
      </div>

      <!-- New Engine -->
      <div class="border-2 border-growth bg-ground-1 p-5 space-y-3">
        <div class="flex items-center gap-3 border-b border-line-dim pb-3">
          <PixelArt :rows="GLYPHS.potion" :size="32" class="shrink-0 retro-breath" />
          <div>
            <p class="font-display text-[22px] leading-6 text-growth uppercase">✓ CỖ MÁY HỌC 30 PHÚT</p>
            <p class="font-body text-xs text-ink-2">Bền bỉ, thích ứng, có đồng đội nhắc nhở</p>
          </div>
        </div>
        <ul role="list" class="space-y-2 font-body text-[16px] text-ink-1">
          <li class="flex items-center gap-2">
            <span class="text-growth font-bold">✓</span>
            <span>Lộ trình AI 28 ngày chuẩn CEFR đúng sức</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-growth font-bold">✓</span>
            <span>Khóa 30p trên Google Calendar &amp; Tasks</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-growth font-bold">✓</span>
            <span>Mầm Non 16-bit: Có thử thách Hồi Sinh</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 3 Subgrid Cards with Rich Visual Infographics -->
    <div class="chapter-subgrid-cards">
      <article
        v-for="item in pillars"
        :key="item.step"
        class="chapter-subgrid-card border-2 border-line-lit bg-ground-1 p-5 space-y-3"
      >
        <div class="flex items-center justify-between gap-2 border-b-2 border-line-dim pb-3">
          <span class="font-display text-[18px] leading-6 text-torch">{{ item.step }}</span>
          <PixelArt :rows="item.glyph" :size="32" />
        </div>

        <div class="space-y-3 py-1">
          <h3 class="font-display text-[22px] leading-6 text-ink-0">{{ item.title }}</h3>

          <!-- Visual Graphic Container per Pillar -->
          <div v-if="item.diagramType === 'cefr'" class="border border-line-dim bg-ground-0 p-3 space-y-1.5">
            <p class="font-display text-xs text-torch uppercase tracking-wider">THANG NĂNG LỰC CEFR CHÂU ÂU:</p>
            <div class="flex items-center gap-1 font-display text-[14px] text-ink-1">
              <span class="rounded-sm border border-line-dim px-1.5 py-0.5 bg-ground-2">A1</span>
              <span>→</span>
              <span class="rounded-sm border border-growth text-growth px-1.5 py-0.5 bg-ground-2 font-bold">A2–B1</span>
              <span>→</span>
              <span class="rounded-sm border border-line-dim px-1.5 py-0.5 bg-ground-2">B2</span>
              <span>→</span>
              <span class="rounded-sm border border-torch text-torch px-1.5 py-0.5 bg-ground-2">C1</span>
            </div>
          </div>

          <div v-else-if="item.diagramType === 'questLoop'" class="border border-line-dim bg-ground-0 p-3 space-y-1.5">
            <p class="font-display text-xs text-growth uppercase tracking-wider">3 CHẶNG 10 PHÚT MỖI NGÀY:</p>
            <div class="grid grid-cols-3 gap-1.5 text-center font-display text-[13px] leading-4 text-ink-0">
              <div class="border border-line-dim bg-ground-2 p-1.5">
                <span class="text-torch block">10p</span>
                <span>Từ vựng</span>
              </div>
              <div class="border border-growth bg-ground-2 p-1.5">
                <span class="text-growth block">10p</span>
                <span>Đọc hiểu</span>
              </div>
              <div class="border border-line-dim bg-ground-2 p-1.5">
                <span class="text-ember block">10p</span>
                <span>Viết AI</span>
              </div>
            </div>
          </div>

          <div v-else-if="item.diagramType === 'googleSync'" class="border border-line-dim bg-ground-0 p-3 space-y-1.5">
            <p class="font-display text-xs text-torch uppercase tracking-wider">TỰ ĐỘNG ĐỒNG BỘ HAI CHIỀU:</p>
            <div class="flex items-center justify-between text-xs font-display text-ink-0">
              <span class="flex items-center gap-1.5 text-growth">
                <PixelArt :rows="GLYPHS.check" :size="12" /> Google Calendar
              </span>
              <span class="text-ink-2">|</span>
              <span class="flex items-center gap-1.5 text-torch">
                <PixelArt :rows="GLYPHS.check" :size="12" /> Google Tasks
              </span>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-line-dim pt-3 font-display text-[16px] leading-5 text-growth">
          ▶ {{ item.footer }}
        </div>
      </article>
    </div>
  </section>
</template>
