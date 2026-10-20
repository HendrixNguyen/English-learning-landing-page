<script setup lang="ts">
import RetroToast from '~/components/retro/RetroToast.vue'
import ChapterConnector from '~/components/story/ChapterConnector.vue'
import ChapterFourWorldMap from '~/components/story/ChapterFourWorldMap.vue'
import ChapterOneSeed from '~/components/story/ChapterOneSeed.vue'
import ChapterThreeCompanion from '~/components/story/ChapterThreeCompanion.vue'
import ChapterTwoQuestRoom from '~/components/story/ChapterTwoQuestRoom.vue'
import FinalBossFooter from '~/components/story/FinalBossFooter.vue'
import HeroShrine from '~/components/story/HeroShrine.vue'
import HudNavbar from '~/components/story/HudNavbar.vue'
import TheInnFaq from '~/components/story/TheInnFaq.vue'
</script>

<template>
  <div class="min-h-screen bg-ground-0 text-ink-0">
    <!-- Accessible Skip Link (modern-web-guidance: accessibility) -->
    <a
      href="#main-quest-scroll"
      class="visually-hidden fixed left-3 top-3 z-50 border-2 border-line-lit bg-torch px-4 py-2 font-display text-[20px] leading-6 text-ground-0"
    >
      Bỏ qua điều hướng để tới nội dung chính
    </a>

    <!-- Sticky Retro HUD Navbar -->
    <HudNavbar />

    <!-- Main Story-Driven Dungeon Scroll (Option 3) -->
    <main id="main-quest-scroll" tabindex="-1" class="outline-none">
      <!-- Prologue: Center Stage Shrine -->
      <HeroShrine />

      <!-- Chapter I: Seed & AI CEFR Calibration -->
      <ChapterConnector chapter="CHƯƠNG I" title="GIEO HẠT & ĐỊNH VỊ BẢN ĐỒ" tone="growth" target-id="chuong-1" />
      <ChapterOneSeed />

      <!-- Chapter II: Interactive 30-Minute Quest Room Preview -->
      <ChapterConnector chapter="CHƯƠNG II" title="CĂN PHÒNG 30 PHÚT & KHO BÁU" tone="torch" target-id="chuong-2" />
      <ChapterTwoQuestRoom />

      <!-- Chapter III: Interactive Plant Companion Sandbox -->
      <ChapterConnector chapter="CHƯƠNG III" title="SINH TỒN & HỒI SINH MẦM NON" tone="growth" target-id="chuong-3" />
      <ChapterThreeCompanion />

      <!-- Chapter IV: Interactive 28-Day World Map & Google Calendar/Tasks Sync -->
      <ChapterConnector chapter="CHƯƠNG IV" title="BẢN ĐỒ 4 VÙNG & LỊCH GOOGLE" tone="torch" target-id="chuong-4" />
      <ChapterFourWorldMap />

      <!-- The Inn: Open Beta 100% Free & FAQ Accordion -->
      <ChapterConnector chapter="QUÁN TRỌ" title="HÀNH TRANG & HỎI ĐÁP" tone="growth" target-id="quan-tro" />
      <TheInnFaq />
    </main>

    <!-- Final Boss CTA & Mobile Sticky Bottom Bar -->
    <FinalBossFooter />

    <!-- Global One-at-a-Time Retro Toast -->
    <RetroToast />
  </div>
</template>
