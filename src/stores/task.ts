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
        isLoggedIn: false,
        tasks: [] as Task[]
    }),
    actions: {
        async login(loginId: string, password: string): Promise<boolean> {
            const rst = await api.loginApi(loginId, password);
            if(rst == true) {
                this.isLoggedIn = true;
            }
            return new Promise((resolve, reject) => {
                resolve(rst);
            })
        },
        async fetchTasks(): Promise<void> {
            const rst = await api.fetchTasksApi();
            this.tasks = rst;
        },
        async createTaskApi(task: Task): Promise<void> {
            await api.createTaskApi(task);
            await this.fetchTasks();
        },
        async updateTaskApi(task: Task): Promise<void> {
            await api.updateTaskApi(task);
            await this.fetchTasks();
        },
        async deleteTaskApi(id: number): Promise<void> {
            await api.deleteTaskApi(id);
            await this.fetchTasks();
        }
    }
})