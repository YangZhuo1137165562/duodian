import axios from "axios"
//登陆
export let login=(params)=>axios.post("/api/user/login",params)
//注册
export let regsitry=(params)=>axios.post("/api/user/registry",params)
//carousel 不传参，并且为get请求
export let banner=()=>axios.get("/api/home/banner")
// better-scroll 
export let homeShop=(params)=>axios.get("/api/home/shop",{params})
//分类左侧数据 获取分类页面分类
export let typeLeft=()=>axios.get("/api/shop/shopType")
// 右侧具体列表，筛选分类页面商品
export let typeRight=(params)=>axios.get("/api/shop/selectType",{params})