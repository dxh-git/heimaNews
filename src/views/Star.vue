<template>
  <div class="w">
      <Navbar title="我的收藏"/>
      <!-- 循环结构 -->
      <div v-for="(item,index) in star " :key="index">
          <!-- 一张图片 -->
          <div class="content1" v-if="item.cover.length < 3 && item.cover.length > 0">
              <div class="title">
                  <h4>{{item.title}}</h4>
                  <p>{{item.user.nickname}}  {{item.comments.length}}跟帖</p>
              </div>
              <img :src="$axios.defaults.baseURL+item.cover[0].url" >
          </div>
          <!-- 三张图片的 -->
          <div class="content3" v-if="item.cover.length > 3">
             <h4>{{item.title}}</h4>
             <div class="imgs">
              <img :src="$axios.defaults.baseURL+item.cover[0].url" alt="">
              <img :src="$axios.defaults.baseURL+item.cover[1].url" alt="">
              <img :src="$axios.defaults.baseURL+item.cover[3].url" alt="">
             </div>
               <p>{{item.user.nickname}}  {{item.comments.length}}跟帖</p>
          </div>
      </div>
  </div>
</template>

<script>
// 引入头部组件
import Navbar from "@/components/Navbar"
export default {
    // 注册组件
    components:{
        Navbar
    },
    data() {
        return {
            star:[]
        }
    },
    mounted(){
        // 获取本地的token
        const {token} = JSON.parse(localStorage.getItem("userInfo")).data
        this.$axios({
            url:'user_star',
            headers:{
                Authorization:token
            }
        }).then(res=>{
            console.log(res);
            this.star = res.data.data
            
        })
    }

}
</script>

<style lang="less" scoped>
    .content1{
        display: flex;
        padding: 20/360*100vw;
        justify-content: space-between;
        justify-items: center;
        border-bottom: 1px solid #ccc;
        .title{
            h4{
                margin-bottom: 10px;
                   // 文字超出两行出现省略号
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: normal;
              }
                p{
                   color: #999;
                }
        }
        img{
             width: 110/360*100vw;
             height: 75/360*100vw;
             margin-left: 10px;
             object-fit: cover;
             flex-shrink: 0;  //flex布局防止被挤压  指定了 flex 元素的收缩规则
        }
    }
    .content3{
        padding: 20/360*100vw;
        border-bottom: 1px solid #ccc;
        h4{
             margin-bottom: 10px;
                   // 文字超出两行出现省略号
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: normal;  
        }
        .imgs{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            img{
                width: 33%;
                 height: 75/360*100vw;
            }
        }
        p{
            color: #999;
        }
    }
</style>