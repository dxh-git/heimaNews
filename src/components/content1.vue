<template>
  <router-link :to="`/post/${data.id}`">
      <div class="content1">
              <div class="title">
                  <h4>{{data.title}}</h4>
                  <p>{{data.user.nickname}}  {{data.comment_length}}跟帖</p>
              </div>
              <img :src="$axios.defaults.baseURL+data.cover[0].url" >
        </div>
  </router-link>
</template>

<script>
export default {
    props:["data"],

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
</style>