<template>
       <div class="listbar">
         <router-link :to="path || '#'">
              <div>{{left}}  </div>
          <div><span>{{right}}</span>
          <span class="iconfont iconjiantou1"></span></div>
         </router-link>
      </div>
</template>

<script>
export default {
    props:["left","right","path"]
}
</script>

<style lang="less" scoped>
 .listbar{
           padding:0 20/360*100vw;
           height: 48/360*100vw;
           line-height:48/360*100vw ;
          a{
             display: flex;
              justify-content:space-between;
              border-bottom: 1px solid #ccc;
              align-items: center;
           span{
               color: #ccc;
           }
          }
       }
</style>