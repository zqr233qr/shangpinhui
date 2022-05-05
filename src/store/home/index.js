import {reqCategoryList, reqGetBannerList} from "@/api";
//home模块的小仓库
const state = {
    //state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组。都得根据接口返回值初始化的
    categoryList: [],
    bannerList: [],

};
const mutations = {
    //这里的categoryList只是一个名字，为commit提交的result.data
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
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
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
