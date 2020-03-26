// vue构造函数
import Vue from 'vue'
// App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
// 引入vant ui
import Vant from 'vant';
// 注册
Vue.use(Vant);
// 导入axios
import axios from "axios"
// 把axios绑定到Vue原型上
Vue.prototype.$axios = axios;
// 给axios添加基地址"http://localhost:3000"
axios.defaults.baseURL = "http://localhost:3000"
// 上线环境是否提示信息(忽略)
Vue.config.productionTip = false

// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，（写法是固定的）
  render: h => h(App)
}).$mount('#app')
