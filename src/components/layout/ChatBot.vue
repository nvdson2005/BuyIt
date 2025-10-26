<script lang="ts" setup>
import { MessageCircleMore, X, Send } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
const showPopup = ref(false)
const showChatPanel = ref(false)
onMounted(() => {
  setTimeout(() => {
    showPopup.value = true
  }, 1000)
})

const hidePopup = () => {
  setTimeout(() => {
    showPopup.value = false
  }, 3000)
}

const messages = ref([
  { from: 'bot', text: 'Hello! I am BuyIt Chat Bot. How can I assist you today?' },
])

// =======================================
// FOR CHATBOT IMPLEMENTATION
// =======================================
const input = ref('')
function sendMessage() {
  if (!input.value.trim()) return
  messages.value.push({ from: 'user', text: input.value })

  // Simulate bot reply, remove when integrating with real backend
  setTimeout(() => {
    messages.value.push({
      from: 'bot',
      text: 'Thank you for your message! We will assist you as soon as possible.',
    })
  }, 800)

  input.value = ''
}
</script>
<template>
  <div class="fixed bottom-8 right-8">
    <!-- Chat Bot Icon -->
    <transition name="scale-slide">
      <div
        v-if="showPopup"
        class="fixed bottom-28 right-12 z-50 flex flex-col items-end"
        v-on:mouseenter="hidePopup"
      >
        <div class="relative bg-white rounded-2xl shadow-lg px-6 py-4 text-slate-800 max-w-xs">
          <span>If you need assistance, feel free to use the BuyIt Chatbot!</span>
          <!-- Message tail -->
          <div
            class="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"
          ></div>
        </div>
      </div>
    </transition>
    <button
      class="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--red)] text-white shadow-lg hover:bg-[var(--orange)] focus:outline-none transition-all duration-200 cursor-pointer"
      aria-label="Open Chat Bot"
      title="Open BuyIt Chat Bot"
      v-on:click="showChatPanel = !showChatPanel"
    >
      <MessageCircleMore class="w-7 h-7" />
    </button>

    <!-- Chat Bot Popup -->
    <Transition name="scale-slide">
      <div v-if="showChatPanel" class="fixed bottom-8 right-28 z-50">
        <div
          class="w-96 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        >
          <div class="flex items-center justify-between w-full bg-[var(--red)]">
            <!-- Header -->
            <div class="flex flex-4 items-center gap-2 px-6 py-4 text-white font-semibold text-lg">
              <MessageCircleMore class="w-6 h-6 mr-2" />
              BuyIt Chat Bot
            </div>
            <div class="flex flex-1 justify-end px-6">
              <X
                v-on:click="showChatPanel = false"
                class="w-6 h-6 text-white hover:text-[var(--orange)] cursor-pointer"
              />
            </div>
          </div>
          <!-- Messages -->
          <div class="flex-1 px-4 py-3 overflow-y-auto bg-gray-50 z-50">
            <div
              v-for="(msg, idx) in messages"
              :key="idx"
              class="mb-3 flex"
              :class="msg.from === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="relative max-w-[70%] px-4 py-2 rounded-2xl text-sm"
                :class="
                  msg.from === 'bot'
                    ? 'bg-white text-slate-800 shadow border border-slate-100'
                    : 'bg-[var(--red)] text-white'
                "
              >
                {{ msg.text }}
              </div>
            </div>
          </div>
          <!-- Input -->
          <form
            class="flex items-center gap-2 px-4 py-3 bg-white border-t border-slate-200"
            @submit.prevent="sendMessage"
          >
            <input
              v-model="input"
              type="text"
              placeholder="Nhập tin nhắn..."
              class="flex-1 px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[var(--red)] text-slate-800"
            />
            <button
              type="submit"
              class="cursor-pointer bg-[var(--red)] text-white px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-[var(--orange)] transition"
            >
              <Send class="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.scale-slide-enter-active {
  animation: bounce-in 0.4s ease forwards;
}
.scale-slide-leave-active {
  animation: bounce-in 0.4s ease forwards reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
