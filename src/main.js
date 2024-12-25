import './style.css'
import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {createPinia} from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Datepicker from 'primevue/datepicker'

import Aura from '@primevue/themes/aura'
import routes from '@/routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(ToastService);
app.component('Toast', Toast);
app.component('DatePicker', Datepicker)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    options: {
        darkModeSelector: 'none',
    }
})
app.use(pinia)

app.mount('#app')
export default router