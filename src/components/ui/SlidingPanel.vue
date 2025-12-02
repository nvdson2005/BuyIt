<script setup lang="ts">
import { ref, onMounted } from 'vue'
const chosenPanelIndex = ref<number>(0)
const panels = ref<Array<{ title: string; content: string; gradientColor: string }>>([
  {
    title: 'Welcome to BuyIt',
    content: 'Welcome to BuyIt, the best place to buy and sell products online.',
    gradientColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
  },
  {
    title: 'The best place to buy and sell products online',
    content:
      'BuyIt is the best place to buy and sell products online. We have a wide range of products to choose from, and our prices are unbeatable.',
    gradientColor: 'bg-gradient-to-r from-green-500 to-blue-500',
  },
  {
    title: 'Enjoy the most simple and convenient shopping experience',
    content:
      'With BuyIt, you can enjoy the most simple and convenient shopping experience. We offer a wide range of products to choose from, and our prices are unbeatable.',
    gradientColor: 'bg-gradient-to-r from-red-500 to-orange-500',
  },
])

function switchPanel(index: number) {
  chosenPanelIndex.value = index
}

onMounted(() => {
  setInterval(() => {
    animatePanel()
  }, 5000)
})

function animatePanel() {
  chosenPanelIndex.value = (chosenPanelIndex.value + 1) % panels.value.length
}
</script>

<template>
  <div
    class="w-full h-full bg-white rounded-xl shadow-md shadow-gray-300 relative flex overflow-hidden"
  >
    <div
      v-for="panel in panels"
      :key="panel.title"
      class="w-full h-full flex flex-col items-center justify-center shrink-0 transition-all ease-in-out duration-700"
      :class="panel.gradientColor"
      :style="{ transform: `translateX(-${chosenPanelIndex * 100}%)` }"
    >
      <div class="w-full h-full flex flex-col items-center justify-center px-8 py-12 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
          {{ panel.title }}
        </h2>
        <p class="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
          {{ panel.content }}
        </p>
      </div>
    </div>
    <div class="w-full flex gap-3 items-center justify-center absolute bottom-6 left-0 z-10">
      <button
        v-for="(panel, index) in panels"
        :key="panel.title"
        @click="switchPanel(index)"
        class="transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        :class="
          index === chosenPanelIndex
            ? 'w-10 h-10 bg-white/90 shadow-lg scale-110'
            : 'w-3 h-3 bg-white/50 hover:bg-white/70 hover:scale-110'
        "
        :aria-label="`Go to slide ${index + 1}`"
      >
        <span
          v-if="index === chosenPanelIndex"
          class="text-slate-800 text-sm font-semibold flex items-center justify-center w-full h-full"
        >
          {{ index + 1 }}
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
