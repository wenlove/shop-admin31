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

//注册组件
Vue.use(ElementUI);
Vue.use(VueRouter);

//全局注册，使用方法为:this.$axios
Vue.prototype.$axios = axios;

//配置与创建路由实例
const router = new VueRouter({
    routes: [
        { path: '/', component: Admin },
        { path: '/login', component: Login }
    ]
})

Vue.config.productionTip = false;
//根实例
new Vue({
    render: h => h(App),
    //挂载路由
    router,
}).$mount('#app')