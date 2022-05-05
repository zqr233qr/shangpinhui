<template>
  <div>
    <Header />
<!--    路由组件出口的地方-->
    <router-view></router-view>
<!--    在Home、Search、显示，在登录、注册隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index";
import Footer from "./components/Footer/index"
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted() {
    //派发一个action|获取商品分类的三级列表数据
    this.$store.dispatch( 'categoryList');
  }
}
</script>

<style>

</style>
