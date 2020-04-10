<template>
  <div class="w">
      <div class="nav">
          <span class="iconfont iconnew"></span>
          <router-link to="#" class="search">
                  <span class="iconfont iconsearch"></span>
                  搜索新闻 
          </router-link>
          <router-link to="personal">
              <span class="iconfont iconwode"></span>
          </router-link>
      </div>
      <!-- 导入teb栏组件 -->
      <van-tabs>
          <van-tab v-for="(item,index) in title_teb" :title=item.name :key="index"> 
          </van-tab>
     </van-tabs>
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >  
      <!-- 循环的结构 -->
     <div class="fo" v-for="(item,index) in list" :key="index">
     <!-- 一张图片的 -->
     <content1 v-if="item.type ===1 && item.cover.length < 3 " :data="item"/>
         <!-- 三张的 -->
     <content2 v-if="item.type ===1 && item.cover.length >=3 " :data="item"/>
         <!-- 视频的 -->
     <content3 v-if="item.type ===2  " :data="item"/>

     </div>
     
</van-list>
  </div>
</template>

<script>
// 引入
import content1 from "@/components/content1"
import content2 from "@/components/content2"
import content3 from "@/components/content3"
export default {
    components:{
        content1,
        content2,
        content3,
    },
    data() {
        return {
            title_teb:[],
            list:[],
            loading: false,
            finished: false,
            finished:false
          
        }
    },
    mounted(){
        const {data} = JSON.parse(localStorage.getItem("userInfo")) || {}
        // 头部请求
        if(data){
         this.$axios({
            url:'/category',
            headers:{
                Authorization :data.token
            }
        }).then(res=>{
            console.log(res);
            res.data.data.push({name:"V"})
            localStorage.setItem("title_teb",JSON.stringify(res.data.data))
            this.title_teb =JSON.parse(localStorage.getItem('title_teb'))
            
        })
        }else{
            this.$axios({
            url:'/category',
        }).then(res=>{
            // console.log(res);
            this.title = res.data.data
            this.title.push({name:"V"})
            
        })
        }
        
        // 文章请求
        this.$axios({
            url:'/post'
        }).then(res=>{
            console.log(res);
            this.list = res.data.data
            
        })
        

    },
    methods:{
            onLoad() {
                console.log('底部');
                
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(1);
        // console.log('底部');
        
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 5000);
    }
}
}
</script>

<style lang="less" scoped>
    .nav{
        background: red;
        height: 50/360*100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20/360*100vw;
        color: #fff;
        .iconnew{
            transform: scale(3);   //放大3倍
            font-size:20px;
            position: relative;  //相对自身定位
            left: 20/360*100vw;
        }
      .search{
         flex: 1;
        height: 32/360*100vw;
        margin: 0 50/360*100vw;
        background: rgba(255,255,255,0.5);
        display: flex;
        justify-content: center;
        align-items:center;
        border-radius: 50px;
        font-size: 13px;
        line-height: 1;
        vertical-align: middle;
        span{
            margin-right:5px ;
        }
      }
      .iconwode{
          font-size: 20px;
      }
    }
   // 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav{
    background: #eee;
}

/deep/ .van-tab{
    flex-basis: 15%!important;
}

/deep/ .van-tab:nth-last-child(2){
    background: #eee;
    width: 20px!important;
    position: absolute;
    right:0; 
    top: 0;
    box-sizing:unset;
}

  /deep/ .van-tabs__wrap{
      padding-right: 20px;
  }
  
  /deep/ .van-tabs__nav{
      position: static;
  }
  
  /deep/ .van-tabs__line{
      display: none;
  }
  
  /deep/ .van-tab--active{
      border-bottom: 1px #ff0000 solid;
  }
</style>