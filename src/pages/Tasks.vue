<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import TaskItem from '@/components/TaskItem.vue'
import { useTaskForm } from '@/composables/useTaskForm';
import { useToastStore } from '@/stores/toast';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchTasks, createTask, deleteTask } = taskStore;

const toastStore = useToastStore();
const { show } = toastStore;

const inputTitle = ref();
const selectedFilter = ref('ALL');

const { error, validate } = useTaskForm(); 

onMounted(async()=>{
    await fetchTasks();
});

const handleDelete = async (id: number)=>{
    console.log("handleDelete", id)

    try{
        await deleteTask(id);
        show('삭제성공', 'success')
    }catch(e){
        show('삭제실패', 'error')
        console.log(e)
    }
}

const handleAdd = async ()=>{
    console.log("handleAdd", inputTitle.value);

    if(!validate(inputTitle.value)){
        return;
    }
    try{
        await createTask({
            id: Date.now(),
            description: '',
            title: inputTitle.value,
            status: 'TODO'
        });
        inputTitle.value = '';
        show('추가성공', 'success')
    } catch(e){
        show('추가실패', 'error')
        console.log(e);
    }
}

const handleFilter = (text: 'ALL'|'TODO'|'IN_PROGRESS'|'DONE') => {
    console.log(text);
    selectedFilter.value = text;
}

</script>
<template>
    <div>Vue Tasks...</div>
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
        <div style="font-size:0.7em;">
            <span style="color:red;">{{ error ? error : '' }}</span>
        </div>
        <div>
            <div style="text-align:left">Task List</div>
            <template v-for="task in tasks" v-bind:key="task.id" >
                <template v-if="selectedFilter == 'ALL' || task.status == selectedFilter">
                    <!--TaskItem에 슬롯 적용-->
                    <TaskItem :task="task" @handleDelete="handleDelete">
                        <!--<template #task-item="{task}"> #은 슬롯 문법-->
                        <!--<template #task-item="task">는 { task: { id, title, ... } } 의미. 사용시 task.task.title 처럼 써야함-->
                        <template v-slot:task-item-sl="{ task }">
                            <div>
                                <span>{{task.title}}</span> - <span>{{task.status}} </span>
                                <span style="font-size: 0.7em">
                                    <router-link v-bind:to="`/tasks/${task.id}`"> detail</router-link>
                                </span>
                            </div>
                        </template>
                    </TaskItem>
                </template>
            </template>
        </div>
    </div>
</template>

