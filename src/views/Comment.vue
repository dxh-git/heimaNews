<template>
  <div class="w">
    
      <Navbar title="我的跟帖" />
      <!-- 需要循环的结构 -->
      <div class="content-item" v-for="(item,index) in data" :key="index">
        <p>{{moment(item.create_date).format('YYYY-MM-DD, hh:mm:ss')}}</p>
        <!-- 我回复了谁 -->
        <div class="parent" v-if="item.parent">
          <div class="parent-user">回复：{{item.parent.user.nickname}}</div>
          <div class="parernt-content">
           {{item.parent.content}}
          </div>
        </div>
        <!-- 自己发布的内容 -->
        <div class="comment-content">
         {{item.content}}
        </div>
        <!-- 回复的文章标题 -->
        <router-link to="#"  class="link-post">
          <div>原文：{{item.post.title}} </div>
          <span class="iconfont iconjiantou1"></span>
        </router-link>
      </div>
  </div>
</template>

<script>
// 导入头部组件
import Navbar from "@/components/Navbar"
// 处理日期格式的工具
import moment from "moment"
export default {
      data() {
        return {
          data:[],
          moment,
        }
      },
    components:{
      Navbar
    },
    mounted(){
      // 获取本地的用户数据用里面的token来验证请求
      const locaUser = JSON.parse(localStorage.getItem("userInfo"))
      this.$axios({
        url:'/user_comments',
        headers:{
          Authorization:locaUser.data.token
        },
        }).then(res=>{
          console.log(res);
          // 把数据存到data里用来渲染
          const {data} = res.data
          this.data = data

      })
    }
}
</script>

<style lang="less" scoped>
  .content-item{
    padding: 20/360*100vw;
    border-bottom: 1px solid #999;
    p{
      color: #999;
    }
    .parent{
      background: #eee;
      padding: 10/360*100vw;
      margin: 10/360*100vw 0;
    }
    .comment-content{
      padding: 10/360*100vw 0;

    }
    .link-post {
     display: flex;
     justify-content: space-between;
     justify-items: center;
     div{
       text-overflow: ellipsis;/*这就是省略号喽*/
      overflow: hidden;/*设置超过的隐藏*/
      white-space: nowrap;/*设置不折行*/
      padding-right: 20/360*100vw;
      color: #999;
     }
     span{
       color: #999;
     }
    }
  }
</style>