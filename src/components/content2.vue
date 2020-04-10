<template>
   <!-- 三张图片的 -->
   <router-link :to="`/post/${data.id}`">
          <div class="content3">
             <h4>{{data.title}}</h4>
             <div class="imgs">
              <img 
              v-for="(item,index) in data.cover" :key="index"
              :src="$axios.defaults.baseURL+ item.url" >
             </div>
               <p>{{data.user.nickname}}  {{data.comment_length}}跟帖</p>
          </div>
  </router-link>
</template>

<script>
export default {
    props:["data"],

}
</script>

<style lang="less" scoped>
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