<template>
  <div class="type">
    <div class="left">
      <ul>
        <li
          v-for="(item,index) in oneTitleList"
          :key="index"
          @click="oneClick(index)"
          :class="{'oneActive':oneIndex==index}"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="right">
      <!-- 对ol进行操作 先判断一级列表里有没有数据，有的话  li里，从一级列表下的子元素渲染-->
      <ol v-if="oneTitleList[oneIndex]&&oneTitleList[oneIndex].children.length>0">
        <li
          v-for="(item,index) in oneTitleList[oneIndex].children"
          :key="index"
          @click="twoClick(index)"
          :class="{'twoActive':index==twoIndex}"
        >{{item.name}}</li>
      </ol>
      <div class="right-list">
        <!-- 针对没有id的列表做的容错处理 -->
        <div v-if="twoList&&twoList.length==0" class="none">暂无数据</div>
        <Item v-for="(item,index) in twoList" :key="index" :item="item"></Item>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/itemCom.vue";
import { typeLeft, typeRight } from "@/api/api.js";
export default {
  data() {
    return {
      oneIndex: 0,
      twoIndex: 0,
      oneTitleList: [],
      // twoTitleList: [],
      twoList: []
    };
  },
  components: {
    Item
  },
  methods: {
    oneClick(index) {
      //左侧切换
      this.oneIndex = index;
      this.twoIndex=0//每次点击完一级以后，让二级的下标从0 开始，也就是页面上点击左侧列表每一个，其对应的右侧列表标题显示左侧第一个标题
      this.renderEven();
    },
    twoClick(index) {
      //右侧切换
      this.twoIndex = index;
      this.renderEven();
    },
    // 右侧二级列表,封装
    async renderEven() {
      let type_id = this.oneTitleList[this.oneIndex].id; //一级路由的id
      let category_id = this.oneTitleList[this.oneIndex].children.length>0&&this.oneTitleList[this.oneIndex].children[this.twoIndex]
        .id; //二级路由的id
      let typeRightListfn = await typeRight({ type_id, category_id });
      this.twoList = typeRightListfn.data.data;
    }
  },
  async mounted() {
    //一级左侧
    let typeLeftfn = await typeLeft();
    this.oneTitleList = typeLeftfn.data.data;

    //右侧二级
    // let typeRightfn = await typeLeft();
    // this.twoTitleList = typeRightfn.data.data[this.oneIndex].children;

    // 一进页面调用渲染右侧列表
    this.renderEven();
  }
};
</script>

<style>
.type {
  width: 100%;
  height: 100%;
  display: flex;
}
.type .left {
  width: 30%;
  height: 100%;
  border-right: 1px solid #ccc;
  overflow: hidden;
}
.type .left li {
  width: 100%;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.type .left li.oneActive {
  color: red;
}
.type .right {
  width: 70%;
  height: 100%;
  overflow: hidden;
}
.type .right ol {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type .right li.twoActive {
  color: lightskyblue;
}
.type .right .right-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.type .none{
  text-align: center;
  margin-top: 50px;
}
</style>