<script setup lang="ts">
import PixelArt from '~/components/retro/PixelArt.vue'
import RetroButton from '~/components/retro/RetroButton.vue'
import RetroPanel from '~/components/retro/RetroPanel.vue'
import { PWA_LOGIN_URL } from '~/utils/config'
import { GLYPHS } from '~/utils/pixelArt'

const faqs = [
  {
    q: 'Ứng dụng có thực sự miễn phí 100% trong đợt Open Beta không?',
    a: 'Hoàn toàn miễn phí 100%! Mở toàn bộ tính năng: test xếp lớp, lộ trình 28 ngày, chấm viết AI, nuôi Mầm Non và đồng bộ Google mà không cần thẻ tín dụng.',
  },
  {
    q: 'Mất gốc hoặc mới ở mức A1–A2 có theo được không?',
    a: 'Rất phù hợp! Giao diện và Mầm Non đều dùng tiếng Việt. Chạm từ để tra nghĩa tức thì, và bấm "Khó quá / Dễ quá" để đổi bài tập vừa sức.',
  },
  {
    q: 'Tại sao lại là 30 phút mỗi ngày?',
    a: '5 phút quá ngắn để tạo phản xạ, 2 tiếng lại dễ nản. 30 phút (3 chặng 10p) là ngưỡng vàng vừa vặn lịch làm việc và đem lại tiến bộ rõ rệt.',
  },
  {
    q: 'Nếu bận nghỉ 1–2 ngày thì có mất tiến độ không?',
    a: 'Không hề! Tiến độ luôn giữ nguyên. Cậu có thể "Học bù" bất kỳ lúc nào; nếu Mầm Non về 0 HP, chỉ cần 1 thử thách 15p là hồi sinh ngay.',
  },
  {
    q: 'Có cần tải ứng dụng từ App Store hay Google Play không?',
    a: 'Không cần! Đây là Web App (PWA). Đăng nhập Google 1 chạm và chọn "Thêm vào màn hình chính" để dùng mượt như app cài sẵn.',
  },
]

function openApp() {
  window.location.href = PWA_LOGIN_URL
}
</script>

<template>
  <section id="quan-tro" aria-labelledby="inn-heading" class="mx-auto max-w-[1880px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-4 space-y-6">
    <!-- Section Header (Clean on bg-ground-0) -->
    <div class="space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="font-display text-[16px] sm:text-[18px] text-torch uppercase tracking-wider">
          QUÁN TRỌ HÀNH TRANG · HỎI ĐÁP &amp; OPEN BETA
        </span>
        <span class="rounded-sm bg-growth px-2.5 py-0.5 font-display text-[15px] text-ground-0 uppercase font-bold">
          0Đ / TRỌN VẸN TÍNH NĂNG
        </span>
      </div>
      <h2 id="inn-heading" class="font-display text-[28px] sm:text-[34px] leading-[32px] sm:leading-[40px] text-ink-0">
        MIỄN PHÍ 100% TRONG GIAI ĐOẠN OPEN BETA — KHÔNG CẦN THẺ TÍN DỤNG
      </h2>
    </div>

    <!-- Sleek Open Beta Announcement Banner -->
    <div class="border-2 border-growth bg-ground-1 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3.5 max-w-2xl">
        <PixelArt :rows="GLYPHS.trophy" :size="32" class="shrink-0" />
        <p class="font-body text-[16px] sm:text-[17px] leading-6 text-ink-0">
          <strong class="text-growth">Kho Báu Mở Cửa Tự Do:</strong> Trọn bộ tính năng xếp lớp AI, lộ trình 28 ngày, chấm bài viết AI và đồng bộ Google Calendar &amp; Tasks đều miễn phí cho người học tiên phong.
        </p>
      </div>
      <RetroButton variant="primary" @click="openApp">
        ▶ Bắt đầu học miễn phí ngay
      </RetroButton>
    </div>

    <!-- The Inn FAQ (Mutually Exclusive <details name="inn-faq"> per modern-web-guidance: search-hidden-content) -->
    <RetroPanel speaker="CÂU HỎI THƯỜNG GẶP (FAQ)">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
        <details
          v-for="(item, idx) in faqs"
          :key="idx"
          name="inn-faq"
          class="group border-2 border-line-dim bg-ground-0 p-4 open:border-line-lit"
          :open="idx === 0"
        >
          <summary
            class="cursor-pointer list-none font-display text-[19px] sm:text-[21px] leading-6 text-ink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-torch"
          >
            <span class="text-growth group-open:text-torch">▶</span> {{ item.q }}
          </summary>
          <p class="mt-3 border-t border-line-dim pt-3 font-body text-[16px] leading-[26px] text-ink-1">
            {{ item.a }}
          </p>
        </details>
      </div>
    </RetroPanel>
  </section>
</template>
