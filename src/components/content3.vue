<template>
  <div class="video">
          <h4>{{data.title}}</h4>
             <div class="imgs">
                 <!-- 封面图 -->
              <img :src="$axios.defaults.baseURL+data.cover[0].url" >
              <!-- 封面按钮 -->
              <div class="btn">
                  <span class="iconfont iconshipin"></span>
              </div>
             </div>
               <p>{{data.user.nickname}}  {{data.comment_length}}跟帖</p>
          </div>
</template>

<script>
export default {
    props:["data"]

}
</script>

<style lang="less" scoped>
 .video{
     padding: 20/360*100vw;
     border-bottom: 1px #ccc solid;
     h4{
           // 文字超出两行出现省略号
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: normal; 
     }
     .imgs{
         width: 100%;
         height: 170/360*100vw;
         position: relative;
         margin: 20/360*100vw 0;
         img{
             display: block;
             width: 100%;
             height: 100%;
             object-fit: cover;
         }
         .btn{
             width: 55/360*100vw;
             height: 55/360*100vw;
             line-height:55/360*100vw;
             text-align: center;
             background: rgba(0,0,0,.3);
             border-radius: 50%;
             position: absolute;
             left: 50%;
             top: 50%;
             transform: translateX(-27/360*100vw) translateY(-27/360*100vw);
             span{
                 color: #fff;
                 font-size: 50px;
             }
         }
     }
      p{
            color: #999;
        }
 }

</style>