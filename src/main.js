import Vue from 'vue'
import App from './App.vue'
import CircularCountDownTimer from 'vue-circular-count-down-timer';



Vue.config.productionTip = false
Vue.use(CircularCountDownTimer);
new Vue({
  render: h => h(App),
}).$mount('#app')

