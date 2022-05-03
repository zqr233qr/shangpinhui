//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";

//1.利用axios对象的方法create，去创建一个axios实例
//2.requests就是axios，只不过稍微配置了一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径会出现api
    baseURL: 'api',
    //代表请求超时时间5s
    timeout: 5000,

});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前去做一些事
requests.interceptors.request.use((confing)=>{
    //config：哦诶之对象，对象里面有一个属性很重要，headers请求头
    //进度条开始
    nprogress.start()
    return confing;
});
//响应拦截器，服务器相应数据回来后，响应拦截器可以检测可以做一些事情
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：
    //进度条结束
    nprogress.done()
    return res.data;
},(error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests;
