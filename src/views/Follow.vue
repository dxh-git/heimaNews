<template>
  <div class="w">
    <Navbar title="我的关心" />
    <div class="comment" v-for="(item,index) in follow" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" />
      <div class="user-info">
        <div>{{item.nickname}}</div>
        <p>{{moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
      </div>
      <span class="cancel" @click="handleCancel(item.id,index)">取消关心</span>
    </div>
  </div>
</template>

<script>
// 导入组件
import Navbar from "@/components/Navbar";
// 引入第三方的日期格式处理的工具库
import moment from "moment";
export default {
  data() {
    return {
      follow: [],
      // 处理时间格式的插件
      moment,
      token: ""
    };
  },
  components: {
    Navbar
  },
  mounted() {
    // 获取本地的的id
    // 只要进入这页面就便是已经登入了
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 把获取的用户信息保存到data里
    this.token = userJson.data.token;
    console.log(userJson.data.user.id);
    this.$axios({
      url: `/user_follows/`,
      // 添加头部信息
      headers: {
        Authorization: userJson.data.token
      }
    }).then(res => {
      console.log(res);
      // data就是我的关注的用户列表
      const { data } = res.data;
      console.log(data);
      //   把请求来的数据存到data里好渲染到页面
      this.follow = data;
    });
  },
  methods: {
    // 点击取消是的函数
    handleCancel(id,index) {
      // 提示用户是否取消关注
      this.$dialog.confirm({
          title: "提示",
          message: "确定取消关注么"
        }).then(() => {
          this.$axios({
            method: "get",
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功")
            // 删除data里的数据就不用出阿信页面才消失
            this.follow.splice(index,1)
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  padding: 10/360 * 100vw 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-radius: 1px solid #ccc;
  img {
    width: 50/360 * 100vw;
    height: 50/360 * 100vw;
    display: block;
    margin-right: 20/360 * 100vw;
    border-radius: 50%;
  }
  .user-info {
    flex: 1;
    margin-right: 20/360 * 100vw;
    p {
      font-size: 14px;
      color: #999;
    }
  }
  .cancel {
    padding: 5px 15px;
    font-size: 14px;
    border-radius: 50px;
    background: #ccc;
  }
}
</style>