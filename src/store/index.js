// 导入
import Vuex from 'vuex';
import Vue from 'vue';


// 注册插件
Vue.use(Vuex);

const store = new Vuex.Store({
    //数据位置
    state: {
        //读取本地存储的数据
        user: JSON.parse(localStorage.getItem('user')) || {}
    },

    //设置仓库数据的方法
    mutations: {
        //设置用户数据
        //所有mutations下的方法第一个参数都是state
        setUser(state, data) {
            state.user = data;

            //保存到本地
            localStorage.setItem('user', JSON.stringify(data));
        }
    }
});

export default store;