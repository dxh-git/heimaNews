<template>
  <div class="w">
   <div class="nev">
      <!-- $router.back()是实例下的属性，可以直接使用 点击返回上一步-->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>{{title}}</strong>
      <!-- $router.push()是实例下的属性，点击去首页 -->
      <span class="iconfont iconshouye" v-if="showHome" @click="$router.push('/')"></span>
      <span v-else class="iconfont iconshouye" style="opacity: 0"></span>
    </div>
   
</div>
</template>

<script>
export default {
    props:["title","showHome"]
}
</script>

<style lang="less" scoped>
   .nev {
    display: flex;
    justify-content: space-between;
    background: #cccccc;
    color: #369;
    align-items: center;
    padding: 10px 20px;
  }
</style>