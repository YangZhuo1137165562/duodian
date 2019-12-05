<template>
  <div class="home">
    <!-- 标题 -->
    <div class="header">
      <h3>校园超市</h3>
    </div>
    <!-- 搜索框 -->
    <div class="inp">
      <input type="text" placeholder="地址" />
      <span class="icon iconfont icon-fangdajing"></span>
    </div>
    <!-- carousel 轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in imgs" :key="item.id">
          <img :src="item.image" alt="">
        </div>
      </div>
    </div>
    <!-- 小图标 -->
    <div class="smallIcon">
      <dl v-for="(item,index) in smallArr" :key="index">
        <dt></dt>
        <dd>{{item}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swiper from "swiper"
export default {
  data(){
    return{
      imgs:[],
      smallArr:["蔬菜每日鲜","肉蛋禽","母婴天地","进店必买","美通卡","早晚市","品牌汇","领券中心","支付优惠","直采品牌"]
    }
  },
  mounted(){//生命周期
     axios.get("/api/home/banner").then((res)=>{
      this.imgs=res.data.data
      this.$nextTick(()=>{//解决生命周期函数只执行一次的问题，这样轮播图就可以动了
        new Swiper(".swiper-container",{
          loop:true,
          autoplay:true
        })
      })
    })
  }
  // mounted(){
  //   axios.get("/api/home/banner").then((res)=>{
  //     this.imgs=res.data.data
  //   },()=>{
  //     new Swiper(".swiper-container",{
  //       loop:true
  //     })
  //   })
  // }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.home .header{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.home .inp{
  width: 100%;
  height: 35px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.home input{
  width: 80%;
  height: 35px;
  padding-left: 10px;
  border:0;
  outline: 0;
}
.home .swiper-container{
  width: 100%;
  height: 180px;
  margin-top: 10px;
}
.home .swiper-container img{
  width: 100%;
  height: 100%;
}
/* 小图标 */
.home .smallIcon{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.home .smallIcon dl{
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.home .smallIcon dl dt{
  width: 50px;
  height: 50px;
  background: #eee;
}
.home .smallIcon dl dd{
  margin-top: 6px;
  font-size: 14px;
}
</style>