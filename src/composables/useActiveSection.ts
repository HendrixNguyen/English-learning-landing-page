import { ref, onMounted, onUnmounted } from 'vue'

export interface SectionMeta {
  id: string
  label: string
  chapter: string
}

export const SECTIONS: SectionMeta[] = [
  { id: 'ngoi-den', label: 'Ngôi đền khởi hành', chapter: 'Mở đầu' },
  { id: 'chuong-1', label: 'I. Gieo hạt', chapter: 'Chương I' },
  { id: 'chuong-2', label: 'II. Phòng 30p', chapter: 'Chương II' },
  { id: 'chuong-3', label: 'III. Mầm Non', chapter: 'Chương III' },
  { id: 'chuong-4', label: 'IV. Bản đồ 28 ngày', chapter: 'Chương IV' },
  { id: 'quan-tro', label: 'Hỏi đáp FAQ', chapter: 'Quán trọ' },
]

export function useActiveSection() {
  const activeSectionId = ref<string>('ngoi-den')
  const scrollProgress = ref<number>(0)

  let observer: IntersectionObserver | null = null

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (docHeight > 0) {
      scrollProgress.value = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
    }
  }

  function setupObserver() {
    updateScrollProgress()

    // IntersectionObserver to detect which section occupies the viewport center
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSectionId.value = entry.target.id
          }
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -50% 0px',
        threshold: 0.1,
      },
    )

    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    }
  }

  onMounted(() => {
    setupObserver()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    window.removeEventListener('scroll', updateScrollProgress)
  })

  return {
    activeSectionId,
    scrollProgress,
    sections: SECTIONS,
  }
}
