<script setup lang="ts">
import { computed, ref } from 'vue'
import CompanionSprite from '~/components/retro/CompanionSprite.vue'
import MapNode from '~/components/retro/MapNode.vue'
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import { GLYPHS } from '~/utils/pixelArt'

interface DayNodeInfo {
  day: number
  region: string
  title: string
  state: 'cleared' | 'today' | 'partial' | 'missed' | 'locked'
  tasks: [string, string, string]
  calendarStatus: string
  googleTaskStatus: string
}

const mapDays: DayNodeInfo[] = [
  {
    day: 1,
    region: 'Vùng 1 · Rừng Từ Vựng Cốt Lõi',
    title: 'Khởi hành & Từ vựng Giao tiếp',
    state: 'cleared',
    tasks: [
      '10 từ cốt lõi Công việc & Thói quen (10p)',
      'Hội thoại công sở kèm tra từ 1 chạm (10p)',
      'Viết 3 câu giới thiệu — AI chấm điểm (10p)',
    ],
    calendarStatus: '20:30 – 21:00 · Đã xong đúng hẹn',
    googleTaskStatus: '☑ Day 1: Khởi hành & Từ vựng (Đã tự động tick)',
  },
  {
    day: 2,
    region: 'Vùng 1 · Rừng Từ Vựng Cốt Lõi',
    title: 'Cấu trúc Câu Phản xạ Nhanh',
    state: 'cleared',
    tasks: [
      'Hiện tại & Quá khứ trong báo cáo (10p)',
      'Bản tin công nghệ ngắn 200 từ (10p)',
      'Trắc nghiệm phản xạ ngữ cảnh (10p)',
    ],
    calendarStatus: '20:30 – 21:00 · Đã xong đúng hẹn',
    googleTaskStatus: '☑ Day 2: Câu Phản xạ (Đã tự động tick)',
  },
  {
    day: 3,
    region: 'Vùng 1 · Rừng Từ Vựng Cốt Lõi',
    title: 'Bẫy Từ Đồng Âm & Nghĩa Ngữ Cảnh',
    state: 'missed',
    tasks: [
      'Phân biệt cặp từ dễ nhầm trong email (10p)',
      'Đoạn văn ngắn kèm chú giải tiếng Việt (10p)',
      'Chế độ Học bù — Vẫn tính đủ phút mục tiêu (10p)',
    ],
    calendarStatus: 'Đã qua · Mở Học bù bất kỳ lúc nào để gỡ bài',
    googleTaskStatus: '☐ Day 3: Bẫy Từ Đồng Âm (Đang chờ Học bù)',
  },
  {
    day: 4,
    region: 'Vùng 1 · Rừng Từ Vựng Cốt Lõi',
    title: 'Đọc Hiểu Email & Phản Hồi Công Việc',
    state: 'today',
    tasks: [
      'Cụm từ email công việc chuyên nghiệp (10p)',
      'Đọc đề xuất dự án & chạm từ dịch nghĩa (10p)',
      'Viết phản hồi 60 từ — OpenAI chấm (10p)',
    ],
    calendarStatus: 'Hôm nay 20:30 – 21:00 · Nhắc qua Google Calendar & Web Push',
    googleTaskStatus: '☐ Day 4: Đọc Hiểu Email & Phản Hồi (Tự tick khi đủ 30p)',
  },
  {
    day: 5,
    region: 'Vùng 2 · Thung Lũng Ngữ Cảnh',
    title: 'Thuyết Trình Ý Tưởng Ngắn Gọn',
    state: 'partial',
    tasks: [
      'Từ nối mạch lạc (However, Therefore...) (10p)',
      'Bài phát biểu ngắn 200 từ (10p)',
      'Sắp xếp lập luận logic (10p)',
    ],
    calendarStatus: 'Lịch định kỳ RRULE 28 ngày giữ chỗ sẵn',
    googleTaskStatus: '☐ Day 5: Thuyết Trình Ý Tưởng',
  },
  {
    day: 6,
    region: 'Vùng 3 · Đỉnh Đọc Hiểu Chuyên Sâu',
    title: 'Phân Tích Bài Viết Chuyên Sâu',
    state: 'locked',
    tasks: [
      'Khoá: Tiến tới Vùng 3 để mở',
      'Khoá: Tiến tới Vùng 3 để mở',
      'Khoá: Tiến tới Vùng 3 để mở',
    ],
    calendarStatus: 'Đã lên lịch trước trên Google Calendar',
    googleTaskStatus: '☐ Day 6: Đọc Hiểu Chuyên Sâu',
  },
  {
    day: 7,
    region: 'Vùng 4 · Thành Trì Phản Xạ & Chốt Chặn Ngày 28',
    title: 'Tổng Duyệt Vùng 1 & Nhận Kho Báu',
    state: 'locked',
    tasks: [
      'Khoá: Mở vào ngày cuối tuần',
      'Khoá: Mở vào ngày cuối tuần',
      'Khoá: Mở vào ngày cuối tuần',
    ],
    calendarStatus: 'Đã lên lịch trước trên Google Calendar',
    googleTaskStatus: '☐ Day 7: Tổng Duyệt Vùng 1',
  },
]

const selectedDayNum = ref(4)
const selectedDay = computed(() => mapDays.find(d => d.day === selectedDayNum.value) ?? mapDays[3])

function handleSelectDay(day: number) {
  const found = mapDays.find(d => d.day === day)
  if (!found || found.state === 'locked') return
  selectedDayNum.value = day
}
</script>

<template>
  <section id="chuong-4" aria-labelledby="ch4-heading" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">
    <!-- Section Header (Clean on bg-ground-0, no nested box) -->
    <div class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-display text-[16px] sm:text-[18px] text-torch uppercase tracking-wider">
          CHƯƠNG IV · HÀNH TRÌNH 28 NGÀY &amp; ĐỒNG BỘ GOOGLE
        </span>
        <span class="rounded-sm bg-ground-2 border border-torch px-2.5 py-0.5 font-display text-[15px] text-torch uppercase">
          4 TUẦN · 84 NHIỆM VỤ
        </span>
      </div>
      <h2 id="ch4-heading" class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
        BẢN ĐỒ 4 VÙNG ĐẤT &amp; SỰ HIỆN DIỆN TỰ ĐỘNG TRONG GOOGLE CALENDAR
      </h2>

      <!-- 4 Biomes Visual Infographic Cards (32px crisp pixel art) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
        <div class="border-2 border-line-dim bg-ground-1 p-3 flex items-center gap-3">
          <PixelArt :rows="GLYPHS.scroll" :size="32" class="shrink-0" />
          <div>
            <p class="font-display text-[14px] text-growth uppercase">TUẦN 1 (NGÀY 1–7)</p>
            <p class="font-display text-[16px] text-ink-0 leading-5">Rừng Từ Vựng Cốt Lõi</p>
          </div>
        </div>

        <div class="border-2 border-line-dim bg-ground-1 p-3 flex items-center gap-3">
          <PixelArt :rows="GLYPHS.compass" :size="32" class="shrink-0" />
          <div>
            <p class="font-display text-[14px] text-torch uppercase">TUẦN 2 (NGÀY 8–14)</p>
            <p class="font-display text-[16px] text-ink-0 leading-5">Thung Lũng Ngữ Cảnh</p>
          </div>
        </div>

        <div class="border-2 border-line-dim bg-ground-1 p-3 flex items-center gap-3">
          <PixelArt :rows="GLYPHS.mountain" :size="32" class="shrink-0" />
          <div>
            <p class="font-display text-[14px] text-growth uppercase">TUẦN 3 (NGÀY 15–21)</p>
            <p class="font-display text-[16px] text-ink-0 leading-5">Đỉnh Đọc Hiểu Sâu</p>
          </div>
        </div>

        <div class="border-2 border-line-dim bg-ground-1 p-3 flex items-center gap-3">
          <PixelArt :rows="GLYPHS.castle" :size="32" class="shrink-0" />
          <div>
            <p class="font-display text-[14px] text-torch uppercase">TUẦN 4 (NGÀY 22–28)</p>
            <p class="font-display text-[16px] text-ink-0 leading-5">Thành Trì Phản Xạ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive World Map & Google Sync Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 xl:gap-8 items-start">
      <!-- Left 7 Cols: Interactive MapNodes + Day Inspector -->
      <div class="lg:col-span-7">
        <RetroPanel speaker="BẢN ĐỒ HÀNH TRÌNH (BẤM VÀO Ô NGÀY 1–5 ĐỂ XEM CHI TIẾT)">
          <div class="space-y-5">
            <!-- Map Legend -->
            <div class="flex flex-wrap gap-4 border-b-2 border-line-dim pb-3 font-display text-[16px] leading-5 text-ink-1">
              <span class="flex items-center gap-1.5 text-torch">★ Đã xong</span>
              <span class="flex items-center gap-1.5 text-growth">▶ Hôm nay</span>
              <span class="flex items-center gap-1.5 text-ember">○ Bỏ lỡ (Học bù)</span>
              <span class="flex items-center gap-1.5 text-ink-2">🔒 Đang khoá</span>
            </div>

            <!-- Interactive MapNode Strip -->
            <div class="flex flex-wrap items-center justify-center gap-3 py-2 sm:justify-start">
              <MapNode
                v-for="node in mapDays"
                :key="node.day"
                :day="node.day"
                :state="node.state"
                :title="node.title"
                :expanded="selectedDayNum === node.day"
                @select="handleSelectDay"
              >
                <template v-if="node.state === 'today'" #sprite>
                  <span class="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2">
                    <CompanionSprite crop="face" :size="24" stage="sprout" :health="80" />
                  </span>
                </template>
              </MapNode>
            </div>

            <!-- Selected Day Detail Box -->
            <div
              data-map-detail
              aria-live="polite"
              class="border-2 border-growth bg-ground-0 p-4 space-y-3"
            >
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line-dim pb-2">
                <span class="font-display text-[18px] leading-6 text-torch">
                  {{ selectedDay.region }}
                </span>
                <span class="rounded-sm bg-ground-2 px-2 py-0.5 font-display text-[16px] leading-5 text-growth uppercase">
                  NGÀY {{ selectedDay.day }} / 28
                </span>
              </div>

              <h3 data-selected-day-title class="font-display text-[24px] leading-7 text-ink-0">
                Ngày {{ selectedDay.day }}: {{ selectedDay.title }}
              </h3>

              <ul role="list" class="space-y-1.5 font-body text-[16px] leading-6 text-ink-1">
                <li v-for="(t, i) in selectedDay.tasks" :key="i" class="flex items-start gap-2">
                  <span class="font-display text-growth">0{{ i + 1 }}.</span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>
          </div>
        </RetroPanel>
      </div>

      <!-- Right 5 Cols: Google Calendar + Google Tasks Live Sync Preview -->
      <div class="lg:col-span-5 space-y-5">
        <RetroPanel tone="torch" speaker="ĐỒNG BỘ GOOGLE CALENDAR & TASKS">
          <div class="space-y-4">
            <p class="font-body text-[16px] leading-6 text-ink-1">
              Tự động giữ chỗ lịch học và tick hoàn thành nhiệm vụ mà không cần mở app trước:
            </p>

            <!-- Calendar Event Preview -->
            <div class="border-2 border-growth bg-ground-0 p-3.5 space-y-1.5">
              <div class="flex items-center justify-between font-display text-[18px] leading-6 text-growth">
                <span>GOOGLE CALENDAR</span>
                <span>RRULE × 28 NGÀY</span>
              </div>
              <p class="font-body text-[16px] font-bold text-ink-0">
                English practice — Học 30 phút
              </p>
              <p data-calendar-status class="font-body text-sm text-ink-1">
                {{ selectedDay.calendarStatus }}
              </p>
            </div>

            <!-- Google Tasks Checklist Preview -->
            <div class="border-2 border-torch bg-ground-0 p-3.5 space-y-1.5">
              <div class="flex items-center justify-between font-display text-[18px] leading-6 text-torch">
                <span>GOOGLE TASKS</span>
                <span>TỰ ĐỘNG ĐỒNG BỘ</span>
              </div>
              <p data-task-status class="font-body text-[16px] text-ink-0">
                {{ selectedDay.googleTaskStatus }}
              </p>
              <p class="font-body text-xs text-ink-2">
                * Mã xác thực Google OAuth được mã hoá AES-256-GCM bảo mật tuyệt đối.
              </p>
            </div>

            <!-- AI Router Architecture Pill -->
            <div class="flex items-center gap-3 border-2 border-line-dim bg-ground-2 p-3">
              <PixelArt :rows="GLYPHS.shield" :size="32" class="shrink-0" />
              <p class="font-body text-sm text-ink-1">
                <strong class="text-ink-0">AI Router Đa Mô Hình:</strong> Gemini (Lộ trình) + DeepSeek (Bài tập) + OpenAI (Chấm viết).
              </p>
            </div>
          </div>
        </RetroPanel>
      </div>
    </div>
  </section>
</template>
