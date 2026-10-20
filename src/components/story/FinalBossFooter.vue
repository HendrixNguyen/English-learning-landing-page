<script setup lang="ts">
import Chest from '~/components/retro/Chest.vue'
import CompanionSprite from '~/components/retro/CompanionSprite.vue'
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import { PWA_LOGIN_URL } from '~/utils/config'
import { GLYPHS } from '~/utils/pixelArt'

const finalItems = [
  { icon: '🌱', label: 'Nhận ngay hạt giống Mầm Non của riêng cậu' },
  { icon: '🗺', label: 'Lộ trình 28 ngày chuẩn CEFR chấm bằng AI' },
]

function openApp() {
  window.location.href = PWA_LOGIN_URL
}
</script>

<template>
  <footer class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 pb-28 pt-10 md:pb-16">
    <RetroPanel tone="growth" speaker="CÁNH CỬA KHỞI HÀNH · PHÒNG HÔM NAY ĐÃ MỞ">
      <div class="flex flex-col items-center space-y-6 text-center">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <CompanionSprite stage="fruitful" :health="100" name="Mầm Non" :size="144" class="retro-breath" />
          <Chest :items="finalItems" :open="true" :reduced="true" />
        </div>

        <h2 class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
          "TỚ ĐANG ĐỢI CẬU Ở CĂN PHÒNG ĐẦU TIÊN. MÌNH CÙNG BẮT ĐẦU 30 PHÚT HÔM NAY NHÉ!"
        </h2>

        <!-- Visual Loot Summary Badges -->
        <div class="flex flex-wrap justify-center gap-3">
          <span class="flex items-center gap-2 border border-line-lit bg-ground-0 px-3 py-1 font-display text-[15px] text-growth">
            <PixelArt :rows="GLYPHS.potion" :size="16" /> Hạt Giống Mầm Non
          </span>
          <span class="flex items-center gap-2 border border-line-lit bg-ground-0 px-3 py-1 font-display text-[15px] text-torch">
            <PixelArt :rows="GLYPHS.compass" :size="16" /> Lộ Trình CEFR 28 Ngày
          </span>
          <span class="flex items-center gap-2 border border-line-lit bg-ground-0 px-3 py-1 font-display text-[15px] text-growth">
            <PixelArt :rows="GLYPHS.trophy" :size="16" /> Miễn Phí 100% Open Beta
          </span>
        </div>

        <p class="max-w-xl font-body text-[17px] leading-[26px] text-ink-1">
          Đăng nhập Google 1 chạm, nhận Mầm Non và làm 10 câu xếp lớp để mở bản đồ 28 ngày ngay.
        </p>

        <div class="w-full max-w-md pt-2">
          <RetroButton variant="primary" block @click="openApp">
            ▶ Đăng nhập Google &amp; Nhận Mầm Non Ngay
          </RetroButton>
        </div>

        <div class="w-full border-t-2 border-line-dim pt-4 font-display text-[16px] leading-5 text-ink-2">
          HỌC 30 PHÚT — ADAPTIVE ENGLISH LEARNING PWA · RETRO QUEST UI KIT V2
        </div>
      </div>
    </RetroPanel>

    <!-- Thumb-First Sticky Bottom Bar on Mobile (UI-KIT v2 Mobile-first rule) -->
    <div
      class="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line-lit bg-ground-0 p-3 md:hidden"
      style="padding-bottom: calc(12px + env(safe-area-inset-bottom))"
    >
      <RetroButton variant="primary" block @click="openApp">
        ▶ Vào phòng hôm nay (Miễn phí)
      </RetroButton>
    </div>
  </footer>
</template>
