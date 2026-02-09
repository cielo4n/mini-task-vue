<script lang="ts" setup>
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { Fragment, onMounted, ref, VueElement } from 'vue';
import { useRouter } from 'vue-router';
import type { Task } from '@/stores/task';

const taskStore = useTaskStore();
//const { tasks } = storeToRefs(taskStore);
const router = useRouter();
const inputTitle = ref();
const selectedFilter = ref('ALL');

onMounted(async()=>{
    await taskStore.fetchTasks();
 //   tasks = taskStore.tasks;
});

const handleDelete = async (id: number)=>{
    console.log("handleDelete", id)
    await taskStore.deleteTaskApi(id);
}

const handleDetail = (id: number)=>{
    console.log("handleDetail", id)
    router.push(`/tasks/${id}`);
}

const handleAdd = async ()=>{
    console.log("handleAdd", inputTitle.value);
    await taskStore.createTaskApi({
        id: Date.now(),
        title: inputTitle.value,
        status: 'TODO'
    } as Task)
}

const handleFilter = (text: 'ALL'|'TODO'|'IN_PROGRESS'|'DONE') => {
    console.log(text);
    selectedFilter.value = text;
}

</script>
<template>
    <div>Tasks...</div>
    <div style="width: 400px; display:flex; flex-direction: column; gap:5px;">
        <div style="display:flex; justify-content: center; gap: 5px;">
            <button @click="handleFilter('ALL')">ALL</button>
            <button @click="handleFilter('TODO')">TODO</button>
            <button @click="handleFilter('IN_PROGRESS')">IN_PROGRESS</button>
            <button @click="handleFilter('DONE')">DONE</button>
        </div>
        <div style="display:flex; justify-content: space-between; gap:5px;">
            <!--flex-grow:1; flex-shrink: 1; flex-basis:0%;-->
            <input  style="flex-grow:1;" type="text" v-model="inputTitle"/>
            <button style="width:60px;" v-on:click="handleAdd">추가</button>
        </div>
        <div>
            <div style="text-align:left">Task List</div>
            <template v-for="task in taskStore.tasks" v-bind:key="task.id" >
                <template v-if="selectedFilter == 'ALL' || task.status == selectedFilter">
                    <div style="display:flex; flex-direction: column; align-items: flex-start;">                    
                        <div><span>{{task.title}}</span> <span>({{task.status}})</span></div>
                        <div style="display:flex; gap:5px; font-size: 0.7em; margin-left:15px;">
                            <button v-on:click="handleDetail(task.id)">상세</button>
                            <button v-on:click="handleDelete(task.id)">삭제</button>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>