import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '@/assets/css/reset.less'

import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
