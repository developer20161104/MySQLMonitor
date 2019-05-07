// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import './assets/css/icon.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$echart = echarts

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost/time'
axios.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('errors', 'fail')
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
