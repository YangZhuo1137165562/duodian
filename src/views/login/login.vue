<template>
  <div class="login-page">
    <div class="title">请登录</div>
    <div>
      <input type="text" v-model="phone" placeholder="请输入用户名" />
    </div>
    <div>
      <input type="text" v-model="password" placeholder="请输入密码" />
    </div>
    <div class="submit" @click="submit">登录</div>
    <div class="registry" @click="registry" v-show="flag">注册</div>
  </div>
</template>

<script>
// import axios from "axios";
import { login } from "@/api/api.js";
export default {
  data() {
    return {
      phone: "",
      password: "",
      flag:false
    };
  },
  methods: {
    registry(){//去注册
      this.$router.push("/regitry")
    },
    // 1、异步逻辑
    // submit(){
    //   axios.post("/api/user/login",{phone:this.phone,password:this.password}).then((res)=>{
    //     if(res.data.code==1){
    //       window.localStorage.token=res.data.data.token
    //       this.$router.push("/index/home")
    //     }
    //   }).catch((e)=>{//容错处理
    //     console.log(e);
    //   })
    // }

    // 2、解决链式调用
    // async submit() {
    //   try {
    //     let res = await axios.post("/api/user/login", {
    //       phone: this.phone,
    //       password: this.password
    //     });
    //     if (res.data.code == 1) {
    //       window.localStorage.token = res.data.data.token; //将用户信息存到本地存储
    //       this.$router.push("/index/home");
    //     }
    //   } catch (e) {
    //     console.log(e.response);
    //   }
    // }

    // 3、封装接口
    async submit() {//async 和 await 搭配使用
      try {
        let res = await login({ phone: this.phone, password: this.password });//调用解析出来的信息函数
        if (res.data.code == 1) {
          console.log(res.data,"res.data");
          window.localStorage.token = res.data.data.token; //将用户信息存到本地存储
          this.$router.push({path:this.$route.query.redirect})
        }
      } catch (e) {
        alert('请注册');
        this.flag=true
      }
    }
  }
};
</script>

<style>
.login-page .title {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #f5f5f5;
  text-align: center;
  line-height: 40px;
}
.login-page input {
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
.submit,.registry {
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