import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * The OS `prefers-reduced-motion` setting (design amend A4). One owner
 * for the media query — kit components read this instead of wiring their
 * own `matchMedia`.
 */
let osReduced: Ref<boolean> | null = null

export function useReducedMotion(): Readonly<Ref<boolean>> {
  if (!osReduced) {
    osReduced = ref(false)
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
      osReduced.value = mql.matches
      mql.addEventListener('change', (e) => {
        if (osReduced) osReduced.value = e.matches
      })
    }
  }
  return osReduced
}
