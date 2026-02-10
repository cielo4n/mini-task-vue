import { createWebHistory , createRouter } from "vue-router";
import Login from '@/pages/Login.vue'
import Tasks from '@/pages/Tasks.vue'
import TaskDetail from '@/pages/TaskDetail.vue'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/login', component: Login },
        { path: '/tasks', component: Tasks, meta: {requiresAuth: true} },
        { path: '/tasks/:id', component: TaskDetail, meta: {requiresAuth: true} },
    ],
});

router.beforeEach((to)=>{
    const authStore = useAuthStore();
    if(to.meta.requiresAuth && !authStore.isLoggedIn){
        return '/login'
    }
})

export default router;