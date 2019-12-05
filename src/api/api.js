import axios from "axios"
//登陆
export let login=(params)=>axios.post("/api/user/login",params)
//注册
export let regsitry=(params)=>axios.post("/api/user/registry",params)