<template>
  <div>
       <div class="comment-floor">
         <!-- 当他还有评论的时候 通过name属性自己调用自己 -->
         <commentFloor v-if="data.parent" :data="data.parent" @reply="handleReply"/>
        <div class="floor-top">
          <div class="user">
            <!-- <span>{{count}}</span> -->
            <em>{{data.user.nickname}}</em>
            <span>{{moment(data.create_date).fromNow()}}</span>
          </div>
          <span @click="handleReply(data)"> 回复</span>
        </div>
        <div class="content">
          {{data.content}}
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    // 声明当前的组件名，在当前组件里面，name的值可以用于调用组件自己
    name:"commentFloor",
    data(){
        return {
            moment
        }
    },
    // 声明组件可以接收数据
    props:["data","count"],
    methods: {
      // 组件内部的回复事件
      handleReply(data){
        // 触发父组件传递过来的reply函数
        this.$emit('reply')
      }
    },
}
</script>

<style scoped lang="less"> 
.comment-floor{
  border: 1px solid #ccc;
  padding: 5/360*100vw;
  margin-bottom: 5/360*100vw ;
  .floor-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10/360*100vw;
   .user span{
      color: #999;
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>