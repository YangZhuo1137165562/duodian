<template>
  <div class="item-com">
    <dl>
          <dt>
            <img :src="item.cover" alt="">
          </dt>
          <dd>
            <h4>{{item.name}}</h4>
            <p>￥:{{item.price}}</p>
          </dd>
        </dl>
  </div>
</template>

<script>
export default {
  props:{//
      item:Object
  }
};
</script>

<style>
.item-com dl{
  width: 100%;
  height: 110px;
  border-bottom: 1px solid #ccc;
  display: flex;
  /* padding-left: 20px; */
}
.item-com dl dt{ 
  width: 100px;
  height: 100%;
}
.item-com dl dt img{ 
  width: 100%;
  height: 100%;
}
.item-com dl dd{
  display: flex;
  flex-direction: column;
  /* padding-left: 20px; */
  justify-content: center;
}
</style>