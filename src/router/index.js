import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件，把路由关联到vue。固定要加的
Vue.use(VueRouter)


// 路由配置
const routes = [
	{
		// 登入页面路由
		path: "/login",
		// 除了首页之外的页面都可以用懒加载,@符号代表的src这个目录
		// .vue这个扩展名可以忽略
		component: () => import("@/views/Login")
	},
	{
		// 注册页面路由
		path:'/Register',
		component: () => import("@/views/Register")
	},
	{
		// 编辑页面路由
		path:'/edit',
		component: () => import("@/views/EditProfile")
	},
	{
		// 个人中心页面路由
		path:'/personal',
		component: () => import("@/views/personal")
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	//路由配置
	routes
})

export default router
