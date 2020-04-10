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
		component: () => import("@/views/EditProfile"),
		meta:{
			// 自定义一个变量代表时候需要授权访问
			authorization:true
		},
	},
	{
		// 个人中心页面路由
		path:'/personal',
		component: () => import("@/views/personal"),
		meta:{
			// 自定义一个变量代表时候需要授权访问
			authorization:true
		},
	},
	{
		// 我的关注页
		path:'/follow',
		component: () => import("@/views/Follow"),
		meta:{
			// 自定义一个变量代表时候需要授权访问
			authorization:true
		},
	},
	{
		// 我的跟帖页
		path:'/comment',
		component: () => import("@/views/Comment"),
		meta:{
			// 自定义一个变量代表时候需要授权访问
			authorization:true
		},
	},
	{
		// 我的收藏页
		path:'/star',
		component: () => import("@/views/Star"),
		meta:{
			// 自定义一个变量代表时候需要授权访问
			authorization:true
		},
	},
	{
		// 首页路由
		path:'/index',
		component: () => import("@/views/index")
	},
	{
		// 首页路由
		path:'/indextow',
		component: () => import("@/views/index2")
	},
	{
		// 栏目管理路由
		path:'/title',
		component: () => import("@/views/Title_teb")
	},
	{
		// 栏目管理路由
		path:'/search',
		component: () => import("@/views/search")
	},
	{
		// 新闻详情页
		path:'/post/:id',
		component: () => import("@/views/post")
	},
	{
		// 精彩跟帖
		path:'/postComment/:id',
		component: () => import("@/views/postComment")
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	//路由配置
	routes
})

export default router
