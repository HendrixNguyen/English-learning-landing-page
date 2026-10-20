<script setup lang="ts">
import { computed } from 'vue'
import { useRetroToast } from '~/composables/useRetroToast'
import RetroPanel from './RetroPanel.vue'

const { queue } = useRetroToast()
const head = computed(() => queue.value[0])
</script>

<template>
  <div
    v-if="head"
    role="status"
    class="retro-rise fixed inset-x-4 z-50 mx-auto max-w-md"
    style="bottom: calc(80px + env(safe-area-inset-bottom))"
  >
    <RetroPanel :tone="head.tone ?? 'plain'">
      {{ head.line }}
    </RetroPanel>
  </div>
</template>
