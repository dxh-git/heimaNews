<template>
  <div class="w">
      <!-- 调用头部组件 -->
  <Navbar title="编辑" showHome=''></Navbar>
   <div class="avater">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" >
        <!-- 引入组件 -->
        <!-- <van-uploader file-list="{{ fileList }}" bind:after-read="afterRead" /> -->
         <!-- 添加上传的组件 -->
        <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <!-- 调用列表组件 -->
    <Listbar left="昵称" :right="userInfo.nickname"  @click.native="show=true"/>
    <!-- vant里的弹框  编辑组件 -->
  <van-dialog v-model="show" title="编辑昵称" show-cancel-button @confirm="handleNicknaem">
    <van-field v-model="nickname" placeholder="请输入昵称" />
  </van-dialog>

    <Listbar left="密码" right="***" @click.native="showPassword=true"/>
   <!-- vant里的弹框  编辑组件 -->
  <van-dialog v-model="showPassword" title="编辑密码" show-cancel-button @confirm="handlePassword">
    <van-field v-model="password" placeholder="输入密码" />
  </van-dialog>

    <Listbar left="性别" :right="['女','男'][userInfo.gender]" @click.native="showGender=true"/>
   <!-- vant里的弹框  编辑组件 -->

    <van-action-sheet v-model="showGender" close-on-click-action  :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
// 导入组件
import Navbar from "@/components/Navbar";
import Listbar from "@/components/Listbar";
export default {
    data() {
        return {
            // 用户信息
            userJson:{},
            // 新请求的数据用来渲染页面
            userInfo:{} ,
            // 是否显示编辑昵称弹窗
            show:false,
            // 是否显示编辑密码弹窗
            showPassword:false,
            // 是否显示编辑性别弹窗
            showGender:false,
            // 性别弹框的内容
            actions: [
                { name: '女', value: '0' },
                { name: '男', value: '1' },
             ],
            nickname:'',
            password:''
        }
    },
    components:{
        Navbar,
        Listbar
    },
    mounted(){
        // 只要进入这页面就便是已经登入了
        const userJson = JSON.parse(localStorage.getItem('userInfo'))
        // 把获取的用户信息保存到data里
        console.log(userJson.data.user.id);
        
        this.userJson = userJson
        // 请求用户信息渲染到页面上  （本地的信息可以修改不安全所以要从新请求）
        this.$axios({
            url:'/user/'+userJson.data.user.id,
            headers:{
               Authorization: userJson.data.token
            }
        }).then(res=>{
            // console.log(res);
            // 把请求的数据添加到data里用来渲染页面
            this.userInfo = res.data.data
            console.log(this.userInfo);
            // 单独把昵称存到data里
            this.nickname = this.userInfo.nickname
            

        })
    },
    methods: {
        // 图片上传的方法，file是对象
        afterRead(file){
            const formData = new FormData();
            formData.append('file',file.file)
            // 上传文件
            this.$axios({
                method:'post',
                url:"/upload",
                headers:{
                    Authorization:this.userJson.data.token
                },
                data:formData
            }).then(res=>{
            //   获取图片的路径
             const{url} = res.data.data 
            // 再替换掉data里的路径
             this.userInfo.head_img = url
            //  调用编辑信息的接口的函数（下面封装好的）
           this.handleEdit({head_img:url})
              
            })
            
        } ,
        // 封装编辑用户信息的函数
        handleEdit(data){
              return this.$axios({
               url:'/user_update/'+ this.userJson.data.user.id,
               method:"post",
               headers:{
                    Authorization:this.userJson.data.token
                },
               data:data
            }).then(res=>{
                // vant里的成功后的提示
                this.$toast.success("修改成功")
            })
        },
        // 点击确认是执行的函数(编辑昵称)
        handleNicknaem(){
            // 调用封装的函数
           const request = this.handleEdit({nickname:this.nickname})
        //    修改成功后执行的方法
           request.then(()=>{
            // 修改成功后的名字存到data里就不用了刷新才显示了
            this.userInfo.nickname = this.nickname
           })
        },
        //修改密码的函数
        handlePassword(){
            // 调用封装的函数
            this.handleEdit({password:this.password})
        },
        //修改性别的函数
        onSelect(item){
            console.log(item.value);
              // 调用封装的函数
            const request = this.handleEdit({gender:item.value})
            //    修改成功后执行的方法
           request.then(()=>{
            // 修改成功后的名字存到data里就不用了刷新才显示了
            this.userInfo.gender = item.value
           })
        }
    },
}
</script>

<style scoped lang="less">
    .avater{
        display: flex;
        padding: 20/360*100vw;
        justify-content: center;
        align-items: center;
        position: relative;

        img{
            width: 100/360*100vw;
            height: 100/360*100vw;
            border-radius: 50%;
        }
    }
    .uploader{
        position: absolute;
        width: 100/360*100vw;
        height:100/360*100vw;
        left: 50%;
        top: 50%;
        // margin-left:-50/360*100vw ;
        // margin-top:-50/360*100vw ;
        transform: translateX(-40/360*100vw) translateY(-40/360*100vw);
        opacity: 0;

    }
</style>

</style>