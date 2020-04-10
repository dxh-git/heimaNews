<template>
  <div>
      <Navbar title="精彩跟帖"/>


        <!-- 滑到底部触发函数组件 -->
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
               >
      <!-- 跟帖评论列表 -->
    <div class="comment" v-for="(item,index) in data" :key="index">
      <div class="comment-top">
        <div class="user">
            <img :src="$axios.defaults.baseURL + item.user.head_img" />
            <div class="user-info">
            <p>{{item.user.nickname}}</p>
          <span>{{moment(item.create_date).fromNow()}}</span>
         </div>
        </div>
        <span @click="handleReply(item)">回复</span>
      </div>
      <!-- 回复的列表 -->


     <CommentFloot v-if="item.parent"  :data="item.parent" @reply="handleReply"/>
      
      <div class="content">
        {{item.content}}
      </div>
     </div>
    </van-list>
    <!-- 底部的发布评论-->
    <div class="publist">
      <van-field
          v-model="message"
          :rows="rows"
          :autosize="!isFocus"
          type="textarea"
          :placeholder="reply.user ? '回复：@'+reply.user.nickname :'说点什么'" 
          class="textarea"
          :class="isFocus ? 'active':''"
           @focus="handleFocus"
          @blur="handleBlur"
          @keyup.enter="handleSubmit"
          ref="textarea"
          />
        <span class="submit" v-if="isFocus" @click="handleSubmit">发不</span>
    </div>
  </div>
</template>

<script>
// 日期转换工具库
import moment from "moment";
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
import Navbar from '@/components/Navbar'
import CommentFloot from '@/components/commentFloot'
export default {
  data(){
    return {
      // 文章id
      id:'',
      // 评论的列表
      data:[],
      moment,
      // 数据是否加载完毕
      finished:false,
      // 是否正在加载
      loading:false,
      // 评论的页数
      pageIndex:1,
      // 评论的每页的条数
      pageSize:5,
      // 发布评论的数据
      message:'',
      // 发布评论的输入框行数
      rows:1,
      // 当前输入框是否获取焦点
      isFocus:false,
      //回复评论的对象
      reply:{}
    }
  },
  components:{
    Navbar,
    CommentFloot
  },
  mounted(){
    const {id} = this.$route.params
    this.id = id
    // 调用请求评论列表数据
    this.getList()
  },
  methods: {
    // 请求评论列表数据
    getList(){
      this.$axios({
        url:"/post_comment/"+this.id,
        params:{
          // 请求的页数
          pageIndex:this.pageIndex,
          // 请求的每页的数据条数
          pageSize:this.pageSize
        },
      }).then(res=>{
        // 评论列表数据
        const{data} = res.data
        // 保存到datali 把后面请求的和之前的合并并且存到data里
        this.data = [...this.data,...data],
        // 请求完页数加一
        this.pageIndex += 1
        // 初始化分页相关的值，告诉van-list组件请求完毕
        this.loading = false;
        // 数据已经加载完毕判断
        if(data.length<this.pageSize){
            this.finished = true
        }
      })
    },
    onLoad(){
    //当滑到底部再次调用请求评论列表数据
    this.getList()
      console.log(222);
      this.finished=true
    },
    // 获取焦点触发的函数
    handleFocus(){
      // 修改评论框的高度
      this.isFocus = true
    },
    // 失取焦点事件
    handleBlur(){
      // 修改评论框的高度
      setTimeout(() => {
        this.isFocus = false
      }, 100);
      
    },
    // 发送评论
    handleSubmit(){
      console.log('发布');
      
      // 内容不能为空
      if(this.message.trim()===''){
        return;
      }
      // 用户能看到发布按钮说明肯定是登入状态
      const{token} = JSON.parse(localStorage.getItem('userInfo')).data||{}
      // 评论接口的参数
      console.log(token);
      
      const data ={
        content:this.message
      }
      // 如果reply有值，说明当前是一条回复评论
      if(this.reply.id){
        // parent_id就是回复评论的id
        data.parent_id = this.reply.id
      }
      // 发布评论的请求
      this.$axios({
        url:'/post_comment/'+this.id,
        method:'post',
        headers:{
           Authorization: token
        },
        data
      }).then(res=>{
      //  清空输入框的 数据
      this.message = "";
      // 弹框提示发布成功
      this.$toast.success('发布成功')
      // 重新请求数据就不用刷新才能看的到了
      this.data =[]   //必须要清空，如果不清空会合并之前的评论
      this.pageIndex =1
       this.getList()
      })
      console.log('发布2',this.message); 
    },

    // 点击回复按钮
    handleReply(item){
      // 因为点击时候失去焦点，已经触发了handleBlur事件
      setTimeout(() => {
        // 记录当前回复的评论信息
      this.reply = item
      // 弹起输入框
      this.isFocus = true
      // 获取焦点
      this.$refs.textarea.focus()
      }, 200);
    }



  },
}
</script>

<style scoped lang="less">
  .comment{
    padding: 20/360*100vw;
    border-bottom: 1px solid #eee;
    padding-bottom: 10/360*100vw;

    .comment-top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 15/360*100vw;
      .user{
        display: flex;
        align-items: center;
          img{
                width: 35/360*100vw;
                height:35/360*100vw;
                border-radius: 50%;
                margin-right: 5px;
              }
            span{
              font-size: 12px;
              color: #999;
            }
      }
    
    }
  }
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
.publist{
  padding: 5/360*100vw 15/360*100vw;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  justify-content: space-between;
  align-items: flex-end;
  // background: pink;
  .textarea{
    background: #ccc;
    border-radius: 50px;
    padding:5px 15px
  }
  .active{
    height: 82px !important;
    border-radius: 8px;
  }
  .submit{
   margin-left: 5px;
    padding: 3px 10px;
    color: #fff;
    background: red;
    border-radius: 50px;
    font-size: 12px;
    flex-shrink: 0;
  }
}

</style>