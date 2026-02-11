<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useTaskForm } from '@/composables/useTaskForm';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore);
const { error, validate } = useTaskForm();

const router = useRouter();

// UI데이터 : const input = ref('') // ref + v-model
// DOM제어 : const inputRef = ref<HTMLInputElement | null>(null) // ref + template ref

const loginId = ref();
const password = ref();

const handleClick = async () => {
    console.log(loginId.value, password.value);

    if(!validate(loginId.value)){
        return;
    }
    if(!validate(password.value)){
        return;
    }

    const rst = await authStore.login(loginId.value, password.value);
    if(rst == true){
        router.push('/tasks');
    }
}

</script>
<template>
    <div>
        Vue Login...
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
        <div style="font-size:0.7em;">
            <span style="color:blue;">{{ isLoading ? '로딩중...' : '' }}</span>
            <span style="color:red;">{{ error ? error : '' }}</span>
        </div>
        <div style="display:flex; justify-content: end;">
            <button v-on:click="handleClick">로그인</button>
        </div>
    </div>
</template>