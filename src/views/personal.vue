<template>
  <div class="w">
    <div class="nev">
      <!-- $router.back()是实例下的属性，可以直接使用 点击返回上一步-->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>个人中心</strong>
      <!-- $router.push()是实例下的属性，点击去首页 -->
      <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>
    <div class="header">
      <div class="img">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="头像" />
      </div>
      <div class="name">
        <!-- 判断性别来显示男的图标 -->
        <span
          class="iconfont iconxingbienan"
          v-if="userInfo.gender === 1"
        ></span>
        <!-- 判断性别来显示女的图标 -->
        <span
          class="iconfont iconxingbienan"
          v-if="userInfo.gender === 0"
        ></span
        >{{ userInfo.nickname }}
        <p>{{ moment(userInfo.create_date).format("YYYY-MM-DD") }}</p>
      </div>
    </div>
    <!-- <div class="listbar">
          <div>我的关注  </div>
          <div><span>关注的用户</span>
          <span class="iconfont iconjiantou1"></span></div>
      </div> -->
    <!-- 引入组件 -->
    <Listbar
      v-for="(item, index) in rows"
      :key="index"
      :left="item.left"
      :right="item.right"
    ></Listbar>
    <!-- <Listbar @click.native="handleClick" left="退出" /> -->
    <div class="tuichu" @click="handleClick">退出</div>
  </div>
</template>

<script>
// 导入组件
import Listbar from "@/components/Listbar";
// 引入第三方的日期格式处理的工具库
import moment from "moment";
export default {
  // mounted()类似于window.onload  当数据加载完后执行的函数
  mounted() {
    // 获取本地的token和id
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let id = userInfo.data.user.id;
    let token = userInfo.data.token;
    // console.log(id);
    // console.log(token);
    this.$axios({
      url: `/user/` + id,
      // 添加头部信息
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res);
      this.userInfo = res.data.data;
      console.log(this.userInfo);
    });
  },
  data() {
    return {
      rows: [
        { left: "我的关注", right: "关注的用户" },
        { left: "我的跟帖", right: "跟帖/回复" },
        { left: "我的收藏", right: "文章/视频" }
      ],
      userInfo: {},
      // moment是日期处理的工具库，为了在模板中可以使用，所以需要绑定在data中
      moment
    };
  },
  methods: {
    // 退出事件
    handleClick() {
      this.$dialog.confirm({
        title: "提示",
        message: "确定退出吗？"
      })
        .then(() => {
          // 点击是触发的函数   删除本地的token
          localStorage.removeItem('userInfo');
        //   跳转到登入页必须用replace,因为不能返回
        this.$router.replace('/login')

        })
        .catch(() => {
          // 点击取消
        });
    }
  },
  components: {
    Listbar
  }
};
</script>

<style lang="less" scoped>
.w {
  .nev {
    display: flex;
    justify-content: space-between;
    background: #cccccc;
    color: #369;
    align-items: center;
    padding: 10px 20px;
  }
  .header {
    display: flex;
    padding: 20/360 * 100vw;
    justify-content: center;
    align-items: center;
    border-bottom: 5px solid #eeeeee;
  }
  .img {
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .name {
    flex: 1;
    padding-left: 20/360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }
  }
  .tuichu{
      width: 20%;
      padding: 20/360*100vw;
      color: red;
    //   background: #24acf2;
  }
}
</style>
