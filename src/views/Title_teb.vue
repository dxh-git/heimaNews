<template>
  <div>
      <Navbar title="栏目管理"/>
      <div class="delete">
          <p>点击删除一下频道</p>
          <div class="delete-item">
          <span v-for="(item,index) in deleteList" :key="index" 
          :class="['头条','关注'].includes(item.name) ? 'active':''"
          @click="handleDelete(item,index)">
              {{item.name}}
          </span>
          </div>
         
      </div>
      <div class="add">
          <p>点击添加一下频道</p>
          <div class="add-item">
          <span v-for="(item,index) in addList" :key="index"
           @click="handleadd(item,index)">
              {{item.name}}
          </span>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
        components:{
            Navbar
        },
        data() {
            return {
                list:[],
                deleteList:[],
                addList:[]
            }
        },
        // 页面加载完执行
        mounted(){
            this.list = JSON.parse(localStorage.getItem('title_teb'))
            // 拆分两个数组
            this.deleteList = this.list.filter(v=>{
                return v.is_top ===1;
            })
             this.addList = this.list.filter(v=>{
                return v.is_top ===0;
            })
        },
             // 摧毁（离开）页面时执行的函数
      destroyed(){
        // 把栏目的数据保存到本地
        this.list = [
            ...this.deleteList, 
            ...this.addList, 
            this.list[this.list.length - 1]
        ]
        localStorage.setItem("title_teb",JSON.stringify(this.list));
    },
        methods:{
            handleDelete(item,index){
                // 关注和推荐不能删除
                if(['头条','关注'].includes(item.name)){
                    return     //return后面的代码不执行
                }
                // 删除deleteList里的这个数据并且把他的is_top改为0存到addList里
                this.deleteList.splice(index,1)
                item.is_top=0
                this.addList.push(item)
        
                
            },
            // 点击添加栏目下的数据
            handleadd(item,index){
                this.addList.splice(index,1)
                item.is_top=1
                this.deleteList.push(item)
            }
        },
   
}
</script>

<style scoped lang="less">
    .delete,.add{
        padding: 5/360*100vw 20/360*100vw;
        box-sizing: border-box;
        p{
            color: #999;
        }
        .delete-item,.add-item{
            display:flex;
            flex-wrap: wrap;
            
            // justify-content: space-between;
            span{
                padding: 5/360*100vw 10/360*100vw;
                margin: 5/360*100vw 10/360*100vw;
                border: 1px solid #ccc;
            }
        }
    }
    .active{
        background: #ccc;
        color: #eee;
    }
</style>