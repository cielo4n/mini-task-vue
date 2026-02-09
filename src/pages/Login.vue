<script lang="ts" setup>
import { useTaskStore } from '@/stores/task';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const loginId = ref();
const password = ref();
const router = useRouter();

const handleClick = async () => {
    console.log(loginId.value, password.value);
    const taskStore = useTaskStore();
    const rst = await taskStore.login(loginId.value, password.value);
    if(rst == true){
        router.push('/tasks');
    }
}
</script>
<template>
    <div>
        Login...
    </div>
    <div style="width: 250px; display:flex; flex-direction: column; gap:5px;">
        <div style="display:flex; justify-content: space-between;">
            <div>아이디</div>
            <input type="text" v-model="loginId"/>
        </div>
        <div style="display:flex; justify-content: space-between;">
            <div>비밀번호</div>
            <input type="password" v-model="password"/>
        </div>
        <div style="display:flex; justify-content: end;">
            <button v-on:click="handleClick">로그인</button>
        </div>
    </div>
</template>