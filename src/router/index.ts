import { createWebHistory , createRouter } from "vue-router";

import App2 from '@/App2.vue'
import Login from '@/pages/Login.vue'
import Tasks from '@/pages/Tasks.vue'
import TaskDetail from '@/pages/TaskDetail.vue'
import { useTaskStore } from "@/stores/task";

const routes = [
    { path: '/login', component: Login },
    { path: '/tasks', component: Tasks },
    { path: '/tasks/:id', component: TaskDetail },
    { path: '/', component: App2 },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to)=>{
    const taskStore = useTaskStore();
    if(to.path !== '/login' && !taskStore.isLoggedIn){
        return '/login'
    }
})


export default router;