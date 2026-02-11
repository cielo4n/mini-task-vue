<script setup lang="ts">
import type { Task } from '@/stores/task';
const props = defineProps<{
                task: Task
            }>();
const emit = defineEmits<{
                handleDelete: [id: number]
            }>();
const { task } = props;

</script>
<template>
    <div style="display:flex; flex-direction: row; justify-content: space-between;">                    
        <!-- 슬롯, 없으면 기본 UI 보여줌 -->
        <slot name="task-item-sl" v-bind:task="task">
            <div>
                <span>{{task.title}}</span> <span>({{task.status}}) </span>
                <span style="font-size: 0.7em">
                    <router-link v-bind:to="`/tasks/${task.id}`">상세</router-link>
                </span>
            </div>
        </slot>

        <div style="display:flex; gap:5px; font-size: 0.7em; margin-top:3px;">
            <button v-on:click="emit('handleDelete', task.id)">삭제</button>
        </div>
    </div>
</template>
