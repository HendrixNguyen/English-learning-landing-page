import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mount } from '@vue/test-utils'
import PixelArt from '@/components/retro/PixelArt.vue'
import { PALETTE, GLYPHS } from '@/utils/pixelArt'

const FORBIDDEN_CLASS_REGEX =
  /\b(rounded-(?:md|lg|xl|2xl|3xl|full)|backdrop-blur|blur-(?:sm|md|lg|xl|2xl|3xl)|bg-gradient-to|scale-\d+|ease-(?:in|out|in-out)|dark:)/

function collectVueFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectVueFiles(fullPath))
    } else if (entry.name.endsWith('.vue')) {
      files.push(fullPath)
    }
  }
  return files
}

describe('Retro Quest UI Kit v2 Compliance', () => {
  it('contains no forbidden non-retro utility classes across all Vue components', () => {
    const srcComponentsDir = join(process.cwd(), 'src', 'components')
    const vueFiles = collectVueFiles(srcComponentsDir)
    expect(vueFiles.length).toBeGreaterThan(15)

    for (const file of vueFiles) {
      const content = readFileSync(file, 'utf-8')
      const match = content.match(FORBIDDEN_CLASS_REGEX)
      expect(match, `Forbidden class "${match?.[0]}" found in ${file}`).toBeNull()
    }
  })

  it('defines all required --px-* palette variables on PixelArt SVG', () => {
    const wrapper = mount(PixelArt, {
      props: {
        rows: GLYPHS.check,
        size: 32,
        label: 'Check',
      },
    })

    const svgStyle = wrapper.find('svg').attributes('style') ?? ''
    for (const char of Object.keys(PALETTE)) {
      expect(svgStyle).toContain(`--px-${char}:`)
    }
  })
})
