//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来（JSON数据格式没有暴露但可以引入）
//webpack默认对外暴露的图片、JSON数据格式
import banners from './banners'
import floors from './floors'

//mock数据：第一个参数：请求地址 第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banners})
Mock.mock('/mock/floor',{code:200,data:floors})
