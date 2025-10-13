<script setup lang="ts">
import '../assets/styles/Variables.css'
import NavBar from '@/components/layout/NavBar.vue'
import SlideNotification from '@/components/layout/SlideNotification.vue'
import MainPageHighlightPanel from '@/components/layout/MainPageHighlightPanel.vue'
import MainPageCategoryPanel from '@/components/layout/MainPageCategoryPanel.vue'
import MainPageFlashSalePanel from '@/components/layout/MainPageFlashSalePanel.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
</script>

<template>
  <div class="homeview">
    <NavBar />
    <div class="w-[80%] h-64 my-12">
      <SlideNotification />
    </div>
    <div class="w-[80%] h-64 my-12">
      <MainPageHighlightPanel />
    </div>
    <div class="w-[80%] h-64 my-8">
      <MainPageCategoryPanel />
    </div>
    <div class="w-[80%] h-98 my-8">
      <MainPageFlashSalePanel />
    </div>
    <div class="w-full">
      <PageFooter />
    </div>
  </div>
</template>
<style scoped>
.homeview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--light-pink);
}
</style>
