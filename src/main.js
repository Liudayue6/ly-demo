import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission'
import store from './store'
// import './utils/localStorage'

import './assets/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
