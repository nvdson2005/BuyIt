<script lang="ts" setup>
import { MessageCircleMore, X, Send } from 'lucide-vue-next'
import { onMounted, ref, watch, nextTick } from 'vue'
const showPopup = ref(false)
const showChatPanel = ref(false)

// LINK PORT OF CHATBOT ON CODESPACE
const API_URL = "https://terrible-spooky-corpse-jj9wg97g9w443g54-5005.app.github.dev/webhooks/rest/webhook"

const chatContainer = ref<HTMLElement | null>(null)
const userId = localStorage.getItem('id')

// ChatMessage type definition
interface ChatMessage {
  from: 'user' | 'bot'
  text: string
  buttons?: { title: string; payload: string }[]
}

const messages = ref<ChatMessage[]>([
])

onMounted(async() => {
  setTimeout(() => {
    showPopup.value = true
  }, 1000)
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: userId,
        message: "/start", // gửi intent start
      }),
    });

    const data = await response.json();
    if (data && data.length > 0) {
      data.forEach((msg) => {
        messages.value.push({
          from: "bot",
          text: msg.text,
          buttons: msg.buttons || [],
        });
      });
    }
  } catch (err) {
    console.error("Error sending button payload:", err);
  }
})


// AUTO SCROLL TO THE CURRENT MESSAGE
watch(messages, async () => {
  await nextTick()
  const el = chatContainer.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}, { deep: true })


const hidePopup = () => {
  setTimeout(() => {
    showPopup.value = false
  }, 3000)
}

// =======================================
//      FOR CHATBOT IMPLEMENTATION
// =======================================


const input = ref('')

// BUTTON CLICK
async function handleButtonClick(button: { title: string; payload: string }) {

  messages.value.push({ from: 'user', text: button.title });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: userId,
        message: button.payload,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((msg) => {
        if (msg.text) {
          messages.value.push({
            from: "bot",
            text: msg.text,
            buttons: msg.buttons || [],
          });
        }
      });
    }
  } catch (error) {
    console.error("Error sending button payload:", error);
    messages.value.push({
      from: "bot",
      text: "⚠️ No connection to the chatbot! Try later",
    });
  }
}


async function sendMessage() {
  if (!input.value.trim()) return
  messages.value.push({ from: 'user', text: input.value })
  const userMessage = input.value
  input.value = ''

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: userId,
        message: userMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((msg) => {
        if (msg.text) {
          messages.value.push({
            from: "bot",
            text: msg.text,
            buttons: msg.buttons || [],
          });
        }
      });
    } else {
      messages.value.push({
        from: "bot",
        text: " Sorry, I receive no response from the server!😅",
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    messages.value.push({
      from: "bot",
      text: "⚠️ No connection to the chatbot! Try later",
    });
  }

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
          <div ref="chatContainer" class="flex-1 px-4 py-3 overflow-y-auto bg-gray-50 z-50 scroll-smooth">
            <div
              v-for="(msg, idx) in messages"
              :key="idx"
              class="mb-3"
              :class="msg.from === 'user' ? 'flex justify-end' : 'flex justify-start'"
            >
              <div
                class="relative max-w-[70%]"
                :class="msg.from === 'user' ? 'text-right' : 'text-left'"
              >
                <!-- Message bubble -->
                <div
                  class="px-4 py-2 rounded-2xl text-sm mb-1"
                  :class="msg.from === 'bot'
                    ? 'bg-white text-slate-800 shadow border border-slate-100'
                    : 'bg-[var(--red)] text-white'"
                  v-html="msg.text"
                ></div>

                <!-- Buttons (only for bot messages) -->
                <div
                  v-if="msg.from === 'bot' && msg.buttons && msg.buttons.length > 0"
                  class="flex flex-wrap gap-2 mt-2"
                >
                  <button
                    v-for="(button, btnIdx) in msg.buttons"
                    :key="btnIdx"
                    @click="handleButtonClick(button)"
                    class="px-3 py-2 bg-white text-slate-700 text-xs rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 shadow-sm cursor-pointer"
                  >
                    {{ button.title }}
                  </button>
                </div>
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
              placeholder="Enter message..."
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
