import Vue from 'vue'
import http from '@/api/index'
import App from './App'
// 添加埋点sdk
import spptMd from '@/common/spptMd';
// 挂在Vue全局对象
Vue.prototype.$spptMd = spptMd
Vue.prototype.$http = http

console.log(process.env);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
