import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/tailwind.css'
import { useOnboardingStore } from './stores/onboarding'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// charge la préférence d'onboarding dès le boot
const onboardingStore = useOnboardingStore()
onboardingStore.loadFromStorage()

app.use(router)
app.mount('#app')
