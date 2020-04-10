// vue构造函数
import Vue from 'vue'
// App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
// 引入vant ui组件库
import Vant, { Toast } from 'vant';
// 注册
Vue.use(Vant);
// 导入axios
import axios from "axios"
// 保存app跟实例对象
let app;
// 把axios绑定到Vue原型上
Vue.prototype.$axios = axios;
// 给axios添加基地址"http://localhost:3000"
// axios.defaults.baseURL = "http://localhost:3000"
// axios.defaults.baseURL = "http://192.168.3.144:3000"

axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"  //线上地址
// 上线环境是否提示信息(忽略)
Vue.config.productionTip = false
// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
router.beforeEach((to, from, next) => {
  // 需要验证的页面
  if (to.meta.authorization) {
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJsom = JSON.parse(localStorage.getItem("userInfo")).data || {}
    // 有token就可以正常访问
    if (userJsom.token) {
      next();
    } else {
      // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
      next("/Login")
    }
  } else {
    // 非个人中心
    next();
  }
})
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
// 添加 response 拦截器  处理登入错误时的情况
// axios的响应拦截器 文档地址：https://github.com/axios/axios#interceptors
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 如果请求返回的结果是错误的，会进入到错误的处理函数中
  // error是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
  const { statusCode, message } = error.response.data
  if (statusCode === 400) {
    // 弹框
    Toast.fail(message);
  }
  // 如果状态码是403就表示没带token或是错误的token就让用户跳转到登入页
  if (statusCode === 403) {
    // 弹框提示
    Toast.fail(massage);
    //  因为在main里面没有this所以不能用this.$router方法所以要用根实例app
    // 跳转到登录页, push方法的参数除了可以直接写一个字符串还可以写一个对象
    // 对象里面的path属性表示路径，query表单问号的参数
    // 比如这完整的路径其实 /login?return_url=/posts/8
    app.$router.push({
      path: "/login",
      query: {
        return_url: app.$route.path
      }
    });
  }
  return Promise.reject(error)

});
// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
app = new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，（写法是固定的）
  render: h => h(App)
}).$mount('#app')
