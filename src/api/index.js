//当前这个模块：API进行统一管理
import requests from "@/api/request";
import mockRequests from '@/api/mockAjax'
//三级联动接口
//  /api/product/getBaseCategoryList  get  无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url: '/product/getBaseCategoryList',method: 'get'});

//获取banner（Home首页轮播图接口）
//export const reqGetBannerList = ()=>mockRequests({url: '/banner',method: 'get'});
export const reqGetBannerList = ()=>mockRequests.get('/banner');
