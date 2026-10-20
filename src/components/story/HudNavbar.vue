<script setup lang="ts">
import { computed } from 'vue'
import CompanionSprite from '~/components/retro/CompanionSprite.vue'
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import { useActiveSection } from '~/composables/useActiveSection'
import { PWA_LOGIN_URL } from '~/utils/config'
import { GLYPHS } from '~/utils/pixelArt'

const { activeSectionId, scrollProgress, sections } = useActiveSection()

const navItems = [
  { href: '#chuong-1', id: 'chuong-1', label: 'I. Gieo hạt' },
  { href: '#chuong-2', id: 'chuong-2', label: 'II. Phòng 30p' },
  { href: '#chuong-3', id: 'chuong-3', label: 'III. Mầm Non' },
  { href: '#chuong-4', id: 'chuong-4', label: 'IV. Bản đồ 28 ngày' },
  { href: '#quan-tro', id: 'quan-tro', label: 'Hỏi đáp FAQ' },
]

const currentSectionLabel = computed(() => {
  const found = sections.find(s => s.id === activeSectionId.value)
  return found ? `${found.chapter}: ${found.label}` : 'Ngôi đền khởi hành'
})

function openApp() {
  window.location.href = PWA_LOGIN_URL
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b-2 border-line-dim bg-ground-0/95">
    <div class="mx-auto flex max-w-[1880px] w-full flex-nowrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5">
      <!-- Brand Logo & Badge -->
      <a
        href="#ngoi-den"
        class="flex shrink-0 items-center gap-2.5 sm:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-line-lit bg-ground-1">
          <CompanionSprite crop="face" :size="32" stage="sprout" :health="100" />
        </div>
        <div class="flex items-center gap-2">
          <span class="font-display text-[22px] sm:text-[26px] leading-7 text-ink-0 whitespace-nowrap">HỌC 30 PHÚT</span>
          <span class="rounded-sm bg-torch px-1.5 sm:px-2 py-0.5 font-display text-[14px] sm:text-[16px] leading-5 tracking-wider text-ground-0 whitespace-nowrap">
            OPEN BETA
          </span>
        </div>
      </a>

      <!-- Live Chamber Depth Status (Shows active section in viewport) -->
      <div class="hidden xl:flex items-center gap-2 border border-line-lit bg-ground-2 px-3 py-1 font-display text-[15px] leading-5 text-torch">
        <PixelArt :rows="GLYPHS.flame" :size="12" class="retro-breath" />
        <span class="text-ink-1">TẦNG: <strong class="text-growth uppercase">{{ currentSectionLabel }}</strong></span>
      </div>

      <!-- Navigation Links with Active State Highlighting -->
      <nav aria-label="Các chương hành trình" class="hidden lg:block shrink">
        <ul role="list" class="flex items-center gap-2 xl:gap-3 font-display text-[17px] xl:text-[19px] leading-6 text-ink-1 whitespace-nowrap">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="flex items-center gap-1.5 px-2.5 py-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
              :class="activeSectionId === item.id
                ? 'border border-growth bg-ground-2 text-growth font-bold'
                : 'hover:text-growth hover:bg-ground-1 text-ink-1'
              "
              :aria-current="activeSectionId === item.id ? 'true' : undefined"
            >
              <span v-if="activeSectionId === item.id" class="text-torch animate-pulse">▶</span>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Primary Action Button -->
      <div class="flex shrink-0 items-center">
        <RetroButton variant="primary" @click="openApp">
          <span class="hidden sm:inline">Vào phòng hôm nay</span>
          <span class="sm:hidden">Vào học</span>
        </RetroButton>
      </div>
    </div>

    <!-- Retro Dungeon Descent Progress Bar (Visual feedback as user scrolls) -->
    <div class="h-1 w-full bg-ground-1 overflow-hidden" aria-hidden="true">
      <div
        class="h-full bg-growth transition-all"
        :style="{ width: scrollProgress + '%' }"
      />
    </div>
  </header>
</template>
