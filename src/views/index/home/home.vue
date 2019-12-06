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
          <img :src="item.image" alt />
        </div>
      </div>
    </div>
    <!-- 小图标 -->
    <!-- <div class="smallIcon">
      <dl v-for="(item,index) in smallArr" :key="index">
        <dt></dt>
        <dd>{{item}}</dd>
      </dl>
    </div>-->
    <!-- better-scroll -->
    <div class="scroll">
      <div class="wrapper">
        <ItemCom v-for="item in homeShopData" class="homeShopItem" :key="item.id" :item="item"></ItemCom>
        <div v-if="flag" class="foot">-----已经到底了-----</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swiper from "swiper";
import { banner, homeShop } from "@/api/api.js";
import ItemCom from "@/components/itemCom.vue"; //引入
import Bscroll from "better-scroll"; //better-scroll只有包没有样式
export default {
  data() {
    return {
      flag: false,
      pageid: 1,
      limit: 5,
      imgs: [],
      homeShopData: [],
      smallArr: [
        "蔬菜每日鲜",
        "肉蛋禽",
        "母婴天地",
        "进店必买",
        "美通卡",
        "早晚市",
        "品牌汇",
        "领券中心",
        "支付优惠",
        "直采品牌"
      ]
    };
  },
  components: {
    //注册
    ItemCom
  },
  methods:{
    async scrollEven(){
      let scrollfn=await homeShop({pageid:this.pageid,limit:this.limit})
      this.homeShopData=this.homeShopData.concat(scrollfn.data.data)
      if(scrollfn.data.data.length<=0){
        this.flag=true
      }

      this.myscroll.refresh()
      this.myscroll.finishPullUp()
      this.myscroll.finishPullDown()
    }
  },
  async mounted(){
    //轮播图
    let bannerfn=await banner()
    this.imgs=bannerfn.data.data
    this.$nextTick(()=>{
      new Swiper(".swiper-container",{
        loop:true
      })

      this.scrollEven()
      this.myscroll=new Bscroll(".scroll",{
        pullDownRefresh:{
          threshold:50
        },
        pullUpLoad:{
          threshold:-100
        }
      })
      this.myscroll.on("pullingUp",()=>{
        this.pageid++;
        if(!this.flag){
          this.scrollEven()
        }
      })
      this.myscroll.on("pullingDown",()=>{
        this.pageid=1
        this.homeShopData=[]
        this.flag=false
        this.scrollEven()
      })
    })
  }



  

  // async mounted() {
  //   // swiper 轮播图
  //   let bannerRes = await banner();
  //   this.imgs = bannerRes.data.data;
  //   this.$nextTick(() => {
  //     //解决生命周期函数只执行一次的问题，这样轮播图就可以动了
  //     new Swiper(".swiper-container", {
  //       loop: true
  //     });
  //   });
  // }

  // 一进页面调用列表加载的函数
  // this.getHomeShop();
  // 一进页面调用上拉下拉函数
  // this._scroll();

  // methods: {
  //   // 将整个上拉下拉逻辑封装函数
  //   _scroll() {
  //     this.myScroll = new Bscroll(".scroll", {
  //       pullDownRefresh: {
  //         //下拉是正数
  //         threshold: 50 //回弹停留的距离
  //       },
  //       pullUpLoad: {
  //         //上拉是负数
  //         threshold: -100
  //       }
  //     });

  //     //上拉
  //     this.myScroll.on("pullingUp", () => {
  //       this.pageid++; //页数++
  //       //再次调用会把最新的pageid的值传过去，只不过要做一个判断,没有数据了，容错处理
  //       if (!this.flag) {
  //         this.getHomeShop();
  //       }
  //     });

  //     //下拉
  //     this.myScroll.on("pullingDown",()=>{
  //       //下拉是回到初始页
  //       this.pageid=1;
  //       // 数组数据清空，恢复初始
  //       this.homeShopData=[],
  //       //让最下面的数据展示完成的提示隐藏
  //       this.flag=false;
  //       //调用最一开始页面列表数据
  //       this.getHomeShop()
  //     })
  //   },

  //   //封装一个列表加载的函数，用以调用
  //   async getHomeShop() {
  //     // better-scroll 数据调用 上拉下拉
  //     let scrollRes = await homeShop({
  //       pageid: this.pageid,
  //       limit: this.limit
  //     });
  //     console.log(scrollRes.data.data, "scrollRes.data.data");
  //     this.homeShopData = this.homeShopData.concat(scrollRes.data.data);

  //     if (scrollRes.data.data.length <= 0) {
  //       this.flag = true;
  //     }

  //     //这三句写在这里是因为调用的时候，会直接完成，这是最后一步
  //     this.myScroll.refresh(); //重新计算高度
  //     this.myScroll.finishPullDown(); //完成下拉刷新
  //     this.myScroll.finishPullUp(); //完成上拉加载
  //   }
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
.home .header {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.home .inp {
  width: 100%;
  height: 35px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.home input {
  width: 80%;
  height: 35px;
  padding-left: 10px;
  border: 0;
  outline: 0;
}
.home .swiper-container {
  width: 100%;
  height: 180px;
  margin-top: 10px;
}
.home .swiper-container img {
  width: 100%;
  height: 100%;
}
/* 小图标 */
.home .smallIcon {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.home .smallIcon dl {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.home .smallIcon dl dt {
  width: 50px;
  height: 50px;
  background: #eee;
}
.home .smallIcon dl dd {
  margin-top: 6px;
  font-size: 14px;
}
/* better-scroll 注意 */
.scroll {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
}
.foot {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
</style>