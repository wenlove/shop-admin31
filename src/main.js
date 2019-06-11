import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';


//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
import GoodsList from './pages/GoodsList.vue';
import CategoryList from './pages/CategoryList.vue';
import GoodsAdd from './pages/GoodsAdd.vue';
import GoodsEdit from './pages/GoodsEdit.vue';


//注册组件
Vue.use(ElementUI);
Vue.use(VueRouter);

//全局注册，使用方法为:this.$axios
Vue.prototype.$axios = axios;

//配置与创建路由实例
const router = new VueRouter({
    routes: [
        //访问/重定向
        { path: '/', redirect: '/admin/goods-list', meta: '首页' },
        { path: '/login', component: Login, meta: '登录' },
        {
            path: '/admin',
            component: Admin,
            meta: '后台管理',
            children: [
                { path: 'goods-list', component: GoodsList, meta: '商品列表' },
                { path: 'category-list', component: CategoryList, meta: '栏目列表' },
                { path: 'goods-add', component: GoodsAdd, meta: '添加商品' },
                { path: 'goods-edit/:id', component: GoodsEdit, meta: '编辑商品' },
            ]
        }
    ]
})

Vue.config.productionTip = false;
//根实例
new Vue({
    render: h => h(App),
    //挂载路由
    router,
}).$mount('#app')