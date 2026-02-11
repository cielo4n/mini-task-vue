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
            const prev = this.tasks;
            this.tasks = [...this.tasks, task];

            try {
                await api.createTaskApi(task);
            } catch(e) {
                this.tasks = prev;
                throw e;
            }
        },
        async updateTask(task: Task): Promise<void> {
            const prev = this.tasks;
            this.tasks = this.tasks.map(t=> t.id === task.id ? task : t);

            try {
                await api.updateTaskApi(task);
            } catch(e) {
                this.tasks = prev;
                throw e;
            }
        },
        async deleteTask(id: number): Promise<void> {
            const prev = this.tasks;
            this.tasks = this.tasks.filter(t=>t.id !== id);
            try {
                await api.deleteTaskApi(id);
            } catch(e) {
                this.tasks = prev;
                throw e;
            }
        }
    }
})