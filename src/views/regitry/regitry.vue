<template>
  <div class="regitry-page">
      <div class="title">请注册</div>
    <div>
      <input type="text" v-model="phone" placeholder="请输入用户名" />
    </div>
    <div>
      <input type="text" v-model="password" placeholder="请输入密码" />
    </div>
    <div class="registry" @click="registryfn">注册</div>
  </div>
</template>

<script>
import {regsitry} from "@/api/api.js"
export default {
  data(){
    return{
      phone:"",
      password:""
    }
  },
  methods:{
    async registryfn(){
      try{
        //注册的时候调用函数传参，返回登录页,注册的时候有数据格式的要求
        let res=await regsitry({phone:this.phone,password:this.password})
        if(res.data.code==1){
          this.$router.go(-1)
        }
      }catch(e){
        console.log(e.response);
      }
    }
  }
}
</script>

<style>
.regitry-page .title {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #f5f5f5;
  text-align: center;
  line-height: 40px;
}
.regitry-page input {
  width: 90%;
  margin-left: 2%;
  border-radius: 15px;
  height: 40px;
  background: #f5f5f5;
  outline: 0;
  border: 0;
  margin-bottom: 20px;
  padding-left: 20px;
}
.registry {
  width: 50%;
  margin-left: 25%;
  border-radius: 15px;
  height: 40px;
  background: lightskyblue;
  text-align: center;
  line-height: 40px;
  color: #fff;
  margin-bottom: 20px;
}

</style>