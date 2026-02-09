<script lang="ts" setup>
import { useRouter , useRoute} from 'vue-router';
import { useTaskStore, type Task } from '@/stores/task';
import { onMounted, computed } from 'vue';

const router = useRouter();
const route = useRoute();

const taskStore = useTaskStore();

const id = route.params.id;
const task = computed(()=>{
    return useTaskStore().tasks.find((it)=>(String)(it.id) == id)
})

onMounted(()=>{
    if(taskStore.tasks.length == 0){
        taskStore.fetchTasks();
    }
});

const handleChange = async () => {
    console.log("handleChange")

    if(!task.value) return;

    await taskStore.updateTaskApi({
        ...task.value,
        status: task.value.status
    } as Task);
}
const handleClick = () => {
    router.push('/tasks');
}

</script>
<template>
    <div>Task Detail... {{ $route.params.id }}</div>
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
                <div style="border-bottom:1px solid lightgray;">Status</div>{{ task.status }}
                <select v-model="task.status" v-on:change="handleChange">
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
            </div>
        </div>
    </template>
    <div style="text-align:right;">
        <button style="font-size:0.7em;" @click="handleClick">목록</button>
    </div>
</template>