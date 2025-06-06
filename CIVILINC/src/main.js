import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LottieVuePlayer from '@lottiefiles/vue-lottie-player'
import 'leaflet/dist/leaflet.css'
import Chart from 'chart.js/auto'
import './assets/toast.css'

Vue.use(LottieVuePlayer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')