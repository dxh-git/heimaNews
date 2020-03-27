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
// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
router.beforeEach((to,from,next)=>{
  if(to.path==='/personal'){
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJsom = JSON.parse(localStorage.getItem("userInfo")) ||{}
    // 有token就可以正常访问
    if(userJsom.token){
      next();
    }else{
       // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
       next("/login")
    }
  }else{
    // 非个人中心
    next();
  }
})
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，（写法是固定的）
  render: h => h(App)
}).$mount('#app')
