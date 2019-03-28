import './firebaseConfig'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(Vuetify)

// eslint-disable-next-line no-new
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
