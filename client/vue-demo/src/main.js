// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import VeeValidate from 'vee-validate'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuesax);
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VeeValidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000';

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});


axios.interceptors.request.use(function (config) {
  config.headers.authorization = localStorage.getItem("authorization");
  return config;
}, function (error) {
  return Promise.reject(error);
});


/* eslint-disable no-new */
const eventHub = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
