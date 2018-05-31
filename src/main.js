import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import HighchartsVue from 'highcharts-vue'

Vue.use(Vuetify)
Vue.use(HighchartsVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
