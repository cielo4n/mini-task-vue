import { createWebHistory , createRouter } from "vue-router";
import Login from '@/pages/Login.vue'
import Tasks from '@/pages/Tasks.vue'
import TaskDetail from '@/pages/TaskDetail.vue'
import { useAuthStore } from "@/stores/auth";
import Layout from "@/pages/Layout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/tasks',
            component: Layout,
            children: [
                { path: '', component: Tasks, meta: {requiresAuth: true} },
                { path: ':id', component: TaskDetail, meta: {requiresAuth: true} },
            ]
        },
    ],
});

router.beforeEach((to)=>{
    const authStore = useAuthStore();
    if(to.meta.requiresAuth && !authStore.isLoggedIn){
        return '/login'
    }
})

export default router;