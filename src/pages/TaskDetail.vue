<script lang="ts" setup>
import { useRoute, RouterLink } from 'vue-router';
import { useTaskStore, type Task } from '@/stores/task';
import { onMounted, computed } from 'vue';

const route = useRoute();
const id = route.params.id;

const taskStore = useTaskStore();
const task = computed(()=>(taskStore.tasks.find(it=>(String)(it.id) == id)))

onMounted(()=>{
    if(taskStore.tasks.length == 0){
        taskStore.fetchTasks();
    }
});

const handleChange = async () => {
    console.log("handleChange")
    if(!task.value) return;

    await taskStore.updateTask({
        ...task.value,
        status: task.value.status
    } as Task);
}

</script>
<template>
    <div>Task Detail...</div>
    <template v-if="task">
        <div style="width:300px; display:flex; flex-direction: column; gap:10px; text-align:left;">
            <div>
                <div style="border-bottom:1px solid lightgray;">Title</div>
                <div>{{task.title}}</div>
            </div>
            <div>
                <div style="border-bottom:1px solid lightgray;">Description</div>
                <div>{{task.description}}</div>
            </div>
            <div>
                <div style="border-bottom:1px solid lightgray;">Status</div>
                <select v-model="task.status" v-on:change="handleChange">
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
            </div>
        </div>
    </template>
    <div style="text-align:right; font-size:0.7em;">
        <router-link to="/tasks">목록</router-link>
    </div>
</template>