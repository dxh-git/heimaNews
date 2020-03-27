<template>
  <div class="w">
     <div class="nev">
         <div class="left"><img src="../../public/u80.png"></div>
         <div class="right">
             <span class="iconfont iconxingbienan nan"></span>
             <span>火星网友</span><br>
             <p><span class="date"> 2020-3-26</span></p>
         </div>
     </div>
     <div class="comment">
         <!-- <div class="guanzhu">我的关注 <span class="right">关注的用户 <span class="iconfont iconjiantou1"></span> </span></div>
          <div class="guanzhu">我的跟帖 <span class="right">跟帖/回复 <span class="iconfont iconjiantou1"></span> </span></div>
           <div class="guanzhu">我的收藏 <span class="right">文章/视频 <span class="iconfont iconjiantou1"></span> </span></div>
            <div class="guanzhu">设置 </div> -->
         <Listbar v-for="(item,index) in rows" :key="index" 
         :label="item.label" 
          :tips="item.tips"
         ></Listbar>
     </div>
    
  </div>
</template>

<script>
import Listbar from "@/components/Listbar"
export default {
    //  当数据加载完开始请求数据  类似于window.onload
    mounted(){
        // 从本地获取token和id用来发请求
        const jsonStr = localStorage.getItem('userinfo')
        // 发起异步请求
        this.$axios({
            url:"/user",
        }).then(res=>{
            console.log(res);
        })
    },
    data() {
        return {
            rows:[
               { label: "我的关注", tips: "关注的用户" },
				{ label: "我的跟帖", tips: "跟帖回复" },
				{ label: "我的收藏", tips: "文章视频" },
				{ label: "设置", tips: "" },
            ]
        }
    },
        // 注册组件,导入的子组件都必须注册才可以在模板渲染
        components:{
            Listbar
        }
}
</script>

<style lang="less" scoped>
    .w{ 
        width: 360px;
       
    }
    .nev{
        display: flex;
        height: 100px;
        border-bottom: 2px solid #ccc;
         padding: 40/360*100vw 20/360*100vw;
          .left{
        width: 70px;
        height: 70px;
        margin-right: 20px;
    }
    .right{
        padding-top:10px ;
        .nan{
            font-size: 18px;
            color: #369;
            margin: 5px;
        }
        span{
            font-size: 16px;
        }
        .date{
            color: #b2b2b2;
        }
    }
    }
   
    

</style>