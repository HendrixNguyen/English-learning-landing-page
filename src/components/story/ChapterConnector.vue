<script setup lang="ts">
import PixelArt from '~/components/retro/PixelArt.vue'
import { GLYPHS } from '~/utils/pixelArt'

const props = withDefaults(defineProps<{
  chapter: string
  title: string
  tone?: 'growth' | 'torch' | 'ember'
  targetId?: string
}>(), { tone: 'growth', targetId: undefined })

function scrollToTarget() {
  if (!props.targetId) return
  const el = document.getElementById(props.targetId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="my-6 mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center gap-3 sm:gap-4 select-none" :aria-label="`Cổng chuyển tiếp đến ${chapter}: ${title}`">
    <!-- Left Dungeon Guide Line -->
    <div class="h-0.5 flex-1 bg-line-dim" />

    <!-- Left Animated Descent Chevron -->
    <div class="retro-stream-down text-torch hidden sm:block">
      <PixelArt :rows="GLYPHS.downChevron" :size="16" />
    </div>

    <!-- Center Glowing Chamber Gateway Pill (Clickable to smoothly descend) -->
    <button
      type="button"
      class="group relative flex items-center gap-2.5 border-2 bg-ground-1 px-4 sm:px-6 py-2 retro-gate-scan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch active:translate-y-[2px]"
      :class="{
        'border-growth text-growth': tone === 'growth',
        'border-torch text-torch': tone === 'torch',
        'border-ember text-ember': tone === 'ember',
      }"
      @click="scrollToTarget"
    >
      <PixelArt :rows="GLYPHS.flame" :size="16" class="retro-breath shrink-0" />
      <span class="font-display text-[16px] sm:text-[19px] leading-5 uppercase tracking-wider text-ink-0">
        {{ chapter }} · {{ title }}
      </span>
      <span class="font-display text-xs text-torch animate-pulse">▼</span>
      <PixelArt :rows="GLYPHS.flame" :size="16" class="retro-breath shrink-0" />
    </button>

    <!-- Right Animated Descent Chevron -->
    <div class="retro-stream-down text-growth hidden sm:block" style="animation-delay: 200ms;">
      <PixelArt :rows="GLYPHS.downChevron" :size="16" />
    </div>

    <!-- Right Dungeon Guide Line -->
    <div class="h-0.5 flex-1 bg-line-dim" />
  </div>
</template>
