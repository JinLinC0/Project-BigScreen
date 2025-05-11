import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {// 首页界面
        path: '/',   //根据path进行界面的先后跳转，/表示打开浏览器就打开的界面
        name: 'home',
        component: () => import('@/screen/home/index.vue'),
    },
]

const router = createRouter({  // 创建路由器
    history: createWebHistory(),  //路由的表现方式 
    routes  // 路由规则
})

export default router