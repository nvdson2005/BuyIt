import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import './assets/styles/Variables.css'
import './assets/styles/tailwind.css'
import './index.css'
import '@/utils/enum'
import 'vue3-toastify/dist/index.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
