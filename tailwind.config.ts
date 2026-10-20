import type { Config } from 'tailwindcss'

/**
 * UI kit v2 palette (design §1; harness/UI-KIT.md). `tokens` stays a flat
 * `Record<string, string>` so `PixelArt.vue` and kit components can map
 * token role names directly to hex values.
 */
export const tokens = {
  'ground-0': '#0B0A1F',
  'ground-1': '#151434',
  'ground-2': '#1F1D4A',
  'line-lit': '#C9C4F4',
  'line-dim': '#3B3A78',
  'ink-0': '#F4F1FF',
  'ink-1': '#B7B3DC',
  'ink-2': '#8783B5',
  growth: '#3DE1B0',
  'growth-deep': '#178A69',
  torch: '#F2A83B',
  'torch-deep': '#B8641E',
  ember: '#FF5A4E',
  'ember-deep': '#B3261E',
} as const

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: tokens,
      fontFamily: {
        display: ['VT323', 'monospace'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config
