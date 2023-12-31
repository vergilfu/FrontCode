import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 设置 axios 默认配置
axios.defaults.baseURL = process.env.VUE_APP_CONFIG_API // 设置基本URL
axios.defaults.withCredentials = false // 允许发送带有凭据的跨域请求

// 添加请求拦截器（可选）
axios.interceptors.request.use(config => {
  config.headers['Referrer-Policy'] = 'no-referrer-when-downgrade' // 设置请求头部的 Referrer Policy
  return config
})
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
