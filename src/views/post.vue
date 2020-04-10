<template>
  <div class="main">
    <!-- 头部 -->
    <div class="nav">
      <div class="div">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <span
        class="attention"
        :class="data.has_follow ?'active': ''"
        @click="handlefollow"
      >{{data.has_follow ? "已关注":"关注"}}</span>
    </div>
    <!-- 标题 -->
    <div class="title">
      <h2>{{data.title}}</h2>
      <p>{{data.user.nickname}} {{moment(data.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
    </div>
    <!-- 文章 -->
    <div class="post" v-html="data.content"></div>
    <!-- 按钮 -->
    <div class="btn">
      <!-- 点赞 -->
      <div class="action" @click="handlelick">
        <span class="iconfont icondianzan" :class="data.has_like ?'active': ''"></span>
        {{data.like_length}}
      </div>
      <div class="action">
        <span class="iconfont iconweixin"></span> 微信
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <router-link :to="`/postComment/${id}`" class="comment-input" >
      写跟帖
      </router-link>
      <div class="icons">
        <router-link :to="`/postComment/${id}`">
        <span class="iconfont iconpinglun-"></span>
            <i>{{data.comment_length}}</i>
        </router-link>
      </div>
      <!-- 收藏 -->
      <div class="icons" @click="hendlestar">
        <span class="iconfont iconshoucang" :class="data.has_star? 'active' :''"></span>
      </div>
      <div class="icons">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入moment处理时间格式
import moment from "moment";
export default {
  data() {
    return {
      id: "",
      token: "",
      moment,
      data: {
        // 为什么要加这个默认值，因为模板需要访问data.user.nickname
        user: {}
      }
    };
  },
  mounted() {
    // // 获取地址的id
    const { id } = this.$route.params;
    this.id = id;
    const { token } = JSON.parse(localStorage.getItem("userInfo")).data || {};
    // 保存一份到data
    this.token = token;
    // const config = {
    //     url: "/post/" + id
    // }
    // // 如果token有值给头信息加上token
    // if(token){
    //     config.headers = { Authorization: token }
    // };
    // // 请求文章的详情
    // this.$axios(config).then(res => {
    //     // data是文章的详情res.data;
    //     this.data = res.data.data;
    //     console.log(res);

    // })
    this.$axios({
      url: "/post/" + this.id,
      headers: {
        Authorization: this.token
      }
    }).then(res => {
      console.log(res);
      this.data = res.data.data;
    });
  },
  methods: {
    // 点击关注
    handlefollow() {
      let url = "";
      // 判断当前状态是关注的还是未关注
      if (this.data.has_follow) {
        // 当前是关注状态点击取消关注
        url = "/user_unfollow/" + this.data.user.id;
      } else {
        // 当前是未关注状态点击关注
        url = "/user_follows/" + this.data.user.id;
      }

      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res);

        // 关注和未关注的状态起反
        this.data.has_follow = !this.data.has_follow;
        // 弹框
        this.$toast.success(this.data.has_follow ? "关注成功" : "取消关注成功");
      });
      console.log(this.data);
    },
    // 点赞
    handlelick() {
      this.$axios({
        url: "/post_like/" + this.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 判断是否已点赞
        if (this.data.has_like) {
          // 修改点在的状态
          this.data.has_like = !this.data.has_like;
          // 点赞加一
          this.data.like_length -= 1;
        } else {
          // 修改点在的状态
          this.data.has_like = !this.data.has_like;
          // 取消加一
          this.data.like_length += 1;
        }
      });
    },
    // 点击收藏
    hendlestar() {
      this.$axios({
        url: "/post_star/" + this.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 判断是否也收藏
        if (this.data.has_star) {
          // 修改点在的状态
          this.data.has_star = !this.data.has_star;
        } else {
          // 修改点在的状态
          this.data.has_star = !this.data.has_star;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.main {
  border-bottom: 5px solid #ccc;
  padding-bottom: 200/360 * 100vw;
}
.nav {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .iconnew {
    display: inline-block; //只有块级元素才能放大
    transform: scale(3.5); // 方大3.5倍
    margin-left: 25/360 * 100vw;
  }
  .active {
    background: red;
    color: #fff;
  }
  .attention {
    //    height: 30/360*10vw;
    border: 1px solid #ccc;
    padding: 5px 10/360 * 100vw;
    border-radius: 15px;
    font-size: 14px;
  }
}
.title {
  padding: 0 20/360 * 100vw;
  h2 {
    font-size: 18px;
    font-weight: 900;
  }
  p {
    color: #ccc;
    font-size: 15px;
    margin-top: 5px;
  }
}
.post {
  padding: 20/360 * 100vw;
}
.btn {
  display: flex;
  justify-content: space-around;
  padding: 20/360 * 100vw;
  .action {
    border: 1px solid #999;
    padding: 5px 10/360 * 100vw;
    border-radius: 25px;
    .iconweixin {
      color: #00c800;
      margin-right: 5px;
    }
  }
  .active {
    color: red;
  }
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10/360 * 100vw 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 100/360 * 100vw;
  background: #fff;
  .comment-input {
    flex: 1;
    margin-right: 20/360 * 100vw;
    background: #ccc;
    height: 30/360 * 100vw;
    line-height: 30/360 * 100vw;
    padding: 0 20/360 * 100vw;
    border-radius: 30/360 * 100vw;
  }
  .icons {
    position: relative;
    span {
      margin: 8px;
      font-size: 20/360 * 100vw;
    }
    i {
      position: absolute;
      top: -8px;
      left: -1px;
      background: red;
      padding: 0 5px;
      border-radius: 10px;
      font-size: 12px;
      color: #fff;
    }
  }
  .active {
    color: red;
  }
}
</style>