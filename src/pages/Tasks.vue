<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import TaskItem from '@/components/TaskItem.vue'


const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchTasks, createTask, deleteTask } = taskStore;

const inputTitle = ref();
const selectedFilter = ref('ALL');

onMounted(async()=>{
    await fetchTasks();
});

const handleDelete = async (id: number)=>{
    console.log("handleDelete", id)
    await deleteTask(id);
}

const handleAdd = async ()=>{
    console.log("handleAdd", inputTitle.value);
    await createTask({
        id: Date.now(),
        description: '',
        title: inputTitle.value,
        status: 'TODO'
    });
    inputTitle.value = '';
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
            <template v-for="task in tasks" v-bind:key="task.id" >
                <template v-if="selectedFilter == 'ALL' || task.status == selectedFilter">
                    <TaskItem :task="task" @handleDelete="handleDelete"/>
                </template>
            </template>
        </div>
    </div>
</template>