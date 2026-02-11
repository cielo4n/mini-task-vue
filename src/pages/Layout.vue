<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { logout }  = authStore;
const router = useRouter();

const handleLogout = ()=>{
    logout();
    router.replace('/login')
}
</script>

<template>
    <div>
        <div style="font-size:0.8em; text-align:right">
            <button v-on:click="handleLogout">로그아웃</button>
        </div>
        <router-view/>
    </div>
</template>