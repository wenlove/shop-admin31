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
import AccountList from './pages/AccountList.vue';
import OrderEdit from './pages/OrderEdit.vue';

//导入store仓库
import store from './store';


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
                { path: 'account-list', component: AccountList, meta: '会员列表' },
                { path: 'order-edit/:id', component: OrderEdit, meta: '编辑订单' },

            ]
        }
    ]
})

router.beforeEach((to, from, next) => {

    //请求接口判断是否登录
    axios({
        url: 'http://localhost:8899/admin/account/islogin',
        method: 'GET',
        // 处理session跨域
        withCredentials: true
    }).then(res => {
        const { code } = res.data;

        //访问登录页
        if (to.path == '/login') {
            // 判断是否登录
            if (code == 'logined') {
                next('/admin/goods-list');
            } else {
                next();
            }
        } else {
            //访问非登录页面
            if (code == 'logined') {
                next();
            } else {
                next('/login');
            }
        }
    })

})

Vue.config.productionTip = false;
//根实例
new Vue({
    render: h => h(App),
    //挂载路由
    router,
    store
}).$mount('#app')