// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import money from 'v-money'
import App from './App'
import router from './router'
import lightbox from 'vlightbox'
import colors from 'vuetify/es5/util/colors'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#017C50',
    secondary: '#12543D',
    accent: colors.indigo.accent1,
    modal: '#017C50',
    cinza: '#CCCCCC'
  }
})
Vue.use(VueFire)
Vue.use(lightbox)
Vue.use(money, {precision: 2})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
