<template>
  <div>
      <div class="nav">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <div class="search">
              <span class="iconfont iconsearch"></span>
              <input type="text" autofocus placeholder="通灵兽消失术" 
              v-model="value"
              @keyup.enter="handleSearch">
          </div>
          <span @click="handleSearch">搜索</span>
      </div>
      <div class="lishi">
          <div class="title">
              <strong>历史记录</strong>
              <!-- 清空所有的搜索记录 -->
              <span class="iconfont iconicon-test" @click="handleDelete"></span>
          </div>
          <!-- 历史记录列表 -->
          <div class="lishi-list">
              <span v-for="(item,index) in history" :key="index" 
              @click="handleRecord(item)">
             {{item}}
              </span>
          </div>
      </div>
      <!-- 遮罩层 -->
      <div class="layer" v-if="showLayer">
          <!-- 渲染文章列表数据 -->
          <div class="layer-item" v-for="(item,index) in list" :key="index">
             <!-- 一张图片的 -->
        <content1 v-if="item.type ===1 && item.cover.length < 3 " :data="item"/>
         <!-- 三张的 -->
        <content2 v-if="item.type ===1 && item.cover.length >=3 " :data="item"/>
         <!-- 视频的 -->
         <content3 v-if="item.type ===2  " :data="item"/>
          </div>
          <div class="empty" v-if="list.length===0">
             没有找到你想要的内容
         </div>
      </div>
  </div>
</template>

<script>
// 引入文章展示组件
import content1 from "@/components/content1"
import content2 from "@/components/content2"
import content3 from "@/components/content3"
export default {
    data(){
        return{
            value:'',
            // 历史记录，先获取本地的搜索记录
            history:JSON.parse(localStorage.getItem("history")) ||[],
            // 是非显示浮层
            showLayer:false,
            // 文章列表
            list:[]
        }
    },
    
    components:{
            content1,content2,content3
        },
    methods:{
        handleSearch(){
            // 添加搜索里的数据到data里
           this.history.unshift(this.value)
            //去重放到data里
            this.history = [...new Set(this.history)]
           // 存到本地
           localStorage.setItem("history",JSON.stringify(this.history))
           // 调用搜索接口函数
            this.getList()
           //清空输入框里的内容
           this.value = ''
           
 
        },
        handleRecord(item){
            this.value = item
            // 调用接口
            this.getList()
        },
        // 清除搜索记录
        handleDelete(){
            this.history = []
            localStorage.setItem("history",'')
        },
        // 封装搜索的接口
        getList(){
            this.$axios({
                url:'post_search',
                params:{
                  keyword:this.value  
                }
            }).then(res=>{
                console.log(res);
                // 显示浮层
                this.showLayer = true
                // 把文章列表保存到data里
                this.list = res.data.data
            })
        }
    }

}
</script>

<style scoped lang="less">
    .nav{
        height: 50/360*100vw;
        background: #eee;
        padding: 0 20/360*100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search{
            flex: 1;
            height: 35/360*100vw;
            line-height: 35/360*100vw;
            padding-left: 10/360*100vw;
            margin: 0 20/360*100vw;
            border:1px solid #ccc ;
            border-radius: 35px;
            input{
                border: none;
                background: none;
                margin-left: 5px;
            }
        }
    }
    .lishi{
        padding: 20/360*100vw;
        .title{
            display: flex;
            justify-content: space-between;
           margin-bottom: 5px;
        }
        .lishi-list{
            display: flex;
            flex-wrap: wrap;
        }
        .lishi-list span{
            border: 1px solid #ccc;
            padding: 5px 10/360*100vw;
            margin: 10px;
        }
        
    }
    .layer{
        position: fixed;
        width: 100%;
        top: 50/360*100vw;
        bottom: 0;
        padding: 20/360*100vw;
        background: #fff;
        // opacity: 0.8;
        box-sizing: border-box;
    }
    .empty{
        padding-top: 50/360*100vw;
        text-align: center;
        color: #ccc;
    }
</style>