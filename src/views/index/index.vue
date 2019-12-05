<template>
  <div class="index-page">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <!-- tag 可以更改标签名 -->
      <router-link tag='dl' v-for="(item,index) in footerArr" :key="index" :to="item.path">
        <dt :class="['icon','iconfont',item.icon]"></dt>
        <dd>{{item.name}}</dd>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      footerArr:[
        {
          icon:"icon-zhuye",
          path:'/index/home',
          name:"主页"
        },
        {
          icon:"icon-fenlei",
          path:'/index/type',
          name:"分类"
        },
        {
          icon:"icon-icon22fuzhi",
          path:'/index/cart',
          name:"购物车"
        },
         
         {
          icon:"icon-wode",
          path:'/index/my',
          name:"我的"
        },
         
      ]
    }
  }
};
</script>

<style>
.index-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.index-page .main{
  flex:1;
  overflow: auto;
}
.index-page .footer{
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.index-page .footer dl{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 图标 */
.index-page .footer .iconfont{
  font-size: 18px;
}
/* 字体 */
.index-page .footer dd{
  font-size: 14px;
}
.index-page .footer dl.router-link-active{
  color: red;
}
</style>