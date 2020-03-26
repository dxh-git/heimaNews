<template>
  <div class="w">
    <!-- 退出 -->
    <div class="xx"><span class="iconfont iconicon-test"></span></div>
    <!-- 要显示阿里图标库的图标，必须要加上iconfont这个类名，第二类名就是你想要显示的那个图标 -->
    <!-- log -->
    <div class="log"><span class="iconfont iconnew"></span></div>
    <!-- 表单信息 -->
    <!-- <div class="form">
           <input type="text" placeholder="用户名/手机号" v-model="form.username"> <br>
           <input type="password" placeholder="密码"  v-model="form.password"><br>
           <button class="login" @click="handelClick">登入</button>
       </div> -->
    <!-- 复制vant的表单代码 -->
    <!-- @submit是变淡提交时间 van-field是表单的字段 rules是表单的字段的规则 required代表必填-->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="用户名/手机号"
        placeholder="用户名/手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="form.nickname"
        name="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="btn">
        <router-link to="./Login">
        <van-button round block >
          去登入
        </van-button>
        </router-link>
      </div>
  </div>
</template>

<script>
// vue组件
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname:''
      }
    };
  },
  methods: {
       // 提交表单时候触发的事件，该事件通过校验才会触发
        // values是表单返回的值，这里的values我们用不上，数据可以在this.form里面拿
    onSubmit(value) {
      this.$axios({
        url: "/register",
        method: "post",
        data: this.form
      }).then(res=>{
          console.log(res);
        // 获取到返回的信息
        let {message} = res.data
        // 使用vant的弹窗提示用，success表示成功的弹窗
        this.$toast.success(message)
          
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
    .w {
      width: 360px;
      padding: 20/360 * 100vw;
    }
    .xx span {
      font-size: 27px;
      padding: 1px;
    }
    .log {
      text-align: center;
    }
    .log span {
      font-size: 126px;
      color: #d81e06;
      padding: 20/360 * 100vw;
    }
    .form input {
      margin: 15px 0;
      color: #757575;
      width: 100%;
      height: 40px;
      border: none;
      border-bottom: 1px solid #ccc;
    }
    .login {
      width: 100%;
      height: 40px;
      color: #ffffff;
      line-height: 40px;
      margin-top: 40px;
      background: #cc3300;
      border: none;
      border-radius: 40px;
      outline: none;
      cursor: pointer;
    }
    .van-cell {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        
    }
    .btn{
        margin-top: 40px;
    }

</style>
