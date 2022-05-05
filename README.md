# app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


2.项目的其他配置

2.1项目运行的时候，打开浏览器
---package.json
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
      },
      
      
 2.2eslint校验工具的关闭
 ---vue.config.js
    module.exports = defineConfig({
      transpileDependencies: true,
    //  关闭eslint
      lintOnSave: false
    })
    
 2.3src文件夹的简写，配置别名
 ---jsconfig.json
 "compilerOptions": {
     "target": "es5",
     "module": "esnext",
     "baseUrl": "./",
     "moduleResolution": "node",
     "paths": {
       "@/*": [
         "src/*"
       ]
     },
     "exclude": [
       "node_modules",
       "dist"
     ],
    }
    
    
  3.路由
  前端路由：类似于kv键值对
  key:url
  value:相应的路由组件
  注意上中下结构
  路由中有一些非路由组件比如header、footer

  4.完成非路由组件Header与Footer业务
  项目不以HTML、css为主，主要搞业务
  在开发项目时
    1.书写静态页面（HTML、css）
    2.拆分组件
    3.获取服务器的数据动态展示
    4.完成相应的动态业务逻辑
    

    注意1：创建组件时，组件结构+组件样式+图片资源
    
    注意2,：采用less样式，浏览器不识别less样式，需要转换为css样式,安装less less-loader
            使用指令：npm install --save less less-loader@5
    注意3：在<style scoped lang="less">设置使用less

 5.路由组件的搭建
 vue-router 执行命令npm install --save vue-router
 在上面的分析，路由组件应该有4个：Home、Search、Login、Register
 -components文件夹：经常放置非路由组件（共有的全局组件）
 -pages|views文件夹：经常放置路由组件

 5.1配置路由
 项目中配置的路由一班配置在router文件夹中

 一些错误：vue-router版本太高和vue2起冲突了,虽然router4.X的大部分的 Vue Router API 都没有变化,但vue-router 3.x 只能结合 vue2 进行使用~
 将vue-router4.x卸载，下载3.x
 npm uninstall vue-router
 npm i vue-router@3

 5.2总结
 路由组件与非路由组件的区别
 1.路由组件一般放在pages|views文件夹中，非路由组件一般放在components中
 2.路由组件一般需要在router文件夹中注册（使用的即为组件的名字），非路由组件的使用一般是以标签的形式使用
 3.注册王路由，不管路由组件，还是非路由组件身上都有$route,$router属性

 $route:一般获取路由组件信息（路径，query，params等等）
 $router：一般进行编程式导航进行路由跳转（push|replace）

 5.3路由的跳转
 路由的跳转有两种形式
 声明式导航router-link,可以进行路由的跳转
 编程式导航push|replace，可以进行路由跳转

 编程式导航：声明式导航能做的，编程式都能做，但是编程式导航除了可以进行路由的跳转，还可以做一些其他业务逻辑

6.Footer组件的显示与隐藏
显示或者隐藏组件：v-if|v-show
Footer组件在Home、Search显示，在登录、注册时候隐藏

6.1我们可以根据组件身上的$route获取当前路由的信息，通过路径判断Footer的显示与隐藏（不推荐）
6.2配置路由的时候，可以给路由添加路由元信息meta,路由需要配置对象，他的key不能乱写

8.路由传参
params参数：在配置路由需要占位  ，程序就崩了，属于URL当中一部分
query参数： 在配置路由不需要占位，写法类似于ajax当中query参数   /home?k=v&k1=v1

                //路由传参：
                //第一种方式：字符串形式
                this.$router.push('/search/'+ this.keyword + '?k='+this.keyword.toUpperCase())
                
                <h1>params参数{{this.$route.params.keyword}}</h1>这个需要占位
                {
                            path: "/search/:keyword",
                            component: Search,
                            meta: {
                                show: true
                            },
                 },
                
                <h1>query参数{{this.$route.query.k}}</h1>不需要占位


​                
​                //第二种方式：模板字符串
​                //this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
​                类似于上一种方式
​                

                //第三种方式：对象形式
                this.$router.push({name: "search",params: {keyword:this.keyword},query:{k: this.keyword.toUpperCase()}})
                这个需要给路由起个名字path: "/search/:keyword",
                                       component: Search,
                                       meta: {
                                           show: true
                                       },
                                       name: 'search'


![image-20220503134045394](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20220503134045394.png)

![image-20220503134957381](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20220503134957381.png)

这里用布尔的只可以传params









***Day2***

编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.3，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；



![image-20220503140005439](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20220503140005439.png)

![image-20220503140011563](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20220503140011563.png)

在router文件夹下的index.js文件中配置如下可以治本解决该问题

![image-20220503141935279](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20220503141935279.png)

```js
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
```





2.将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件



3.三级联动组件的完成

---由于三级联动，在Home、Search、Detail都有使用事宜把三级联动组件注册为全局组件

好处：字需要注册一次，就可以在项目中的任意地方使用

main.js

```js
//三级联动组件---全局组件
import TypeNav from '@/pages/Home/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
```

Home/index.vue

```html
<template>
    <div>
        <TypeNav />
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>

```

4.在Home.vue中加入整理其他组件



5.测试接口

可用



6.axios二次封装

XMLHttpRequest、fetch、JQ、axios

6.1为什么需要进行二次封装axios？

请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回数据以后可以处理一些事情



6.2在项目当中经常API文件夹axios

接口当中：路径都带有/api

baseURL:"/api"

```js
//对于axios进行二次封装
import axios from "axios";

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
    return confing;
});
//响应拦截器，服务器相应数据回来后，响应拦截器可以检测可以做一些事情
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：
    return res.data;
},(error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests;

```

7.统一接口管理

项目很小：完全可以在组件的生命周期函数中发请求

项目大：axios.get('xxx')



7.1跨域问题

什么是跨域问题：协议、域名、端口号不同的请求，就是跨域



解决方案：

JSONP、CROS、代理

这里用的方案是webpack代理

vue.config.js

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
//  关闭eslint
  lintOnSave: false,

  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api': ''},
      }
    }
  }
})

```

8.nprogress进度条的使用

安装：npm i nprogress

start:进度条开始

done:进度条结束

进度条样式可以修改在css

使用

request.js

```js
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

```



9.vuex状态管理库

9.1vuex是什么

vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件公用的数据

切记，并不是全部的项目都需要vuex，如果项目很小，完全不需要用vuex，如果项目大组件多数据，使用vuex 

state

mutations

actions

getters

modules

安装：npm i vuex@3

9.2vuex基本使用

在store\index.js中配置

```js
import Vue from "vue";
import Vuex from 'vuex';
//需要使用一次插件
Vue.use(Vuex);
//stare:仓库存储数据的地方
const state = {};
//mutations:修改state的唯一手段
const mutations = {};
//action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {};
//getters:理解为计算属性，用于简化仓库数据，组件获取仓库的数据更加方便
const getters = {};

//对外暴露Store类的一个实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

```

在main.js中注册

```js
import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'

//引入仓库
import store from '@/store'

//三级联动组件---全局组件
import TypeNav from '@/pages/Home/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
//测试
import {reqCategoryList} from "@/api";
reqCategoryList();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由：底下的写法kv一致忽略v  (router小写)
  //注册路由信息：当这里书写router时，组件身上就都有了$route,$router属性
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')

```

9.3vuex实现模块式开发

如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块化开发

模拟state存储数据

```js
{
    count:1,
    search:{a:1},
    detail:{sss},
    pay:{}
}
```

在store文件夹下创建home/index.js和search/index.js

```js
//search模块的小仓库
const state = {};
const mutations = {};
const actions = {};
const getters = {};
//对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}

```

store/index.js

```js
import Vue from "vue";
import Vuex from 'vuex';
//需要使用一次插件
Vue.use(Vuex);
//引入小仓库
import home from './home';
import search from './search';
// //stare:仓库存储数据的地方
// const state = {};
// //mutations:修改state的唯一手段
// const mutations = {};
// //action：处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// //getters:理解为计算属性，用于简化仓库数据，组件获取仓库的数据更加方便
// const getters = {};

//对外暴露Store类的一个实例
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// });

export default new Vuex.Store({
    modules: {
        home,
        search,
    }
});

```

同样需要在main.js中引入，上篇已经引入



10.完成三级联动

在store/home/index.js

```js
import {reqCategoryList} from "@/api";
//home模块的小仓库
const state = {
    //state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组。都得根据接口返回值初始化的
    categoryList: [],
};
const mutations = {
    //这里的categoryList只是一个名字，为commit提交的result.data
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}

```

在组件TypeNav/index.vue中

```html
<script>
    import {mapState} from 'vuex'
    export default {
        name: "TypeNav",
        //组件挂载完毕：可以向服务器发请求
        mounted() {
            //通知vuex发请求，获取数据，存储在仓库中
            this.$store.dispatch( 'categoryList');
        },
        computed: {
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
            ...mapState({
                //注入一个参数state，其实即为大仓库中的数据
                categoryList: state=>state.home.categoryList
            })
        }
    }
</script>
```

这样获取到了服务器返回的数据



11.完成样式



12.函数防抖与节流*******面试题

正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

home/index.vue

```js
    //节流，引入lodash（按需引入）
    import throttle from 'lodash/throttle'
	methods: {
            //鼠标进入修改响应式数据currentIndex属性
            //es6写法，不适应于写节流
            // changeIndex(index){
            //     this.currentIndex = index
            // },

            //es5写法，throttle回调函数别用箭头函数，可能会出现上下文this问题
            changeIndex:throttle(function (index) {
                this.currentIndex = index
            },50),

            leaveIndex(){
                this.currentIndex = -1
            }
        }
```



***Day4***

1开发Search中的TypeNav

1.1过渡动画：前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画

1.2对商品分类的三级列表进行优化

​		在App根组件当中发送请求（根组件mounted）执行一次

1.3合并params与query参数



1.4开发Home首页当中的ListContainer组件与Floor组件？

但是这里需要知道一件事情：服务器返回的数据（接口）只有商品分类菜单分类数据，没有这个相关的数据提供，所以这里所有mock

mock数据（模拟）：如果你想mock数据，需要用到一个插件mockjs

安装mockjs：npm i mockjs

使用步骤：

1）在项目当中src文件夹中创建mock文件夹

2）第二步准备JSON数据（mock文件夹中创建相应的JSON文件（.json））--不能有空格

3）把mock数据需要的图片放置早public文件夹中（public文件夹在打包的时候，会把相应的资源打包到dist文件夹中）

4）创建mockServer.js通过mockjs插件实现模拟数据

mockServer.js

```js
//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来（JSON数据格式没有暴露但可以引入）
//webpack默认对外暴露的图片、JSON数据格式
import banners from './banners'
import floors from './floors'

//mock数据：第一个参数：请求地址 第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banners})
Mock.mock('/mock/floor',{code:200,data:floors})

```



5）mockServer.js文件在入口文件中引入（至少需要执行一次才能模拟数据）