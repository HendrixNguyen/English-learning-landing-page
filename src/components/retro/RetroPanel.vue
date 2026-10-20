<script setup lang="ts">
import { computed, useId } from 'vue'
import { tokens } from '~/tailwind.config'

const props = withDefaults(defineProps<{
  speaker?: string
  tone?: 'plain' | 'growth' | 'torch' | 'ember'
  band?: boolean
  fog?: boolean
}>(), { speaker: undefined, tone: 'plain', band: false, fog: false })

const headingId = useId()

const outerColor = computed(() => (props.tone === 'plain' ? tokens['line-dim'] : tokens[props.tone]))
const ringStyle = computed(() => ({
  boxShadow: `0 0 0 2px ${tokens['ground-0']}, 0 0 0 4px ${outerColor.value}`,
}))
</script>

<template>
  <section
    class="relative border-2 border-line-lit bg-ground-1 text-ink-0"
    :class="[band ? 'p-2 w-full' : 'p-4 md:p-6', speaker ? 'pt-2' : '']"
    :style="ringStyle"
    :aria-labelledby="speaker ? headingId : undefined"
    :aria-live="speaker ? 'polite' : undefined"
  >
    <div v-if="speaker" class="-mt-6 mb-3 inline-block max-w-full">
      <h2
        :id="headingId"
        class="border border-line-lit bg-ground-1 px-2.5 py-0.5 font-display text-[17px] sm:text-[20px] leading-5 sm:leading-6 text-torch inline-block"
      >
        {{ speaker }}
      </h2>
    </div>
    <div class="relative flex gap-4">
      <div v-if="$slots.portrait" class="shrink-0">
        <slot name="portrait" />
      </div>
      <div class="min-w-0 flex-1">
        <slot />
      </div>
    </div>
    <div v-if="fog" class="pointer-events-none absolute inset-0 bg-ground-2/60" />
  </section>
</template>
