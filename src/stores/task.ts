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
        async login(loginId: string, password: string): Promise<void> {
            const rst = await api.loginApi(loginId, password);
            if(rst == true) {
                this.isLoggedIn = true;
            }
        },
        async logout(): Promise<void> {
            const rst = await api.logoutApi();
            if(rst == false){
                this.isLoggedIn = false;
            }
        },
        async fetchTasks(): Promise<void> {
            const rst = await api.fetchTasksApi();
            this.tasks = rst;
        },
        async createTaskApi(task: Task): Promise<void> {
            await api.createTaskApi(task);
            this.fetchTasks();
        },
        async updateTaskApi(task: Task): Promise<void> {
            await api.updateTaskApi(task);
            this.fetchTasks();
        },
        async deleteTaskApi(id: number): Promise<void> {
            await api.deleteTaskApi(id);
            this.fetchTasks();
        }
    }
})