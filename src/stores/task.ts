import { defineStore } from "pinia";
import * as api from '@/api/mockApi';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[]
    }),
    actions: {
        async fetchTasks(): Promise<void> {
            this.tasks = await api.fetchTasksApi();
        },
        async createTask(task: Task): Promise<void> {
            await api.createTaskApi(task);
            this.fetchTasks();
        },
        async updateTask(task: Task): Promise<void> {
            await api.updateTaskApi(task);
            this.fetchTasks();
        },
        async deleteTask(id: number): Promise<void> {
            await api.deleteTaskApi(id);
            this.fetchTasks();
        }
    }
})