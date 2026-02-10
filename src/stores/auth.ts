import { defineStore } from 'pinia';
import { loginApi, logoutApi } from '@/api/mockApi';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: Boolean(localStorage.getItem('auth')),
    }),
    actions: {
        async login(loginId: string, password: string): Promise<boolean> {
            const rst = await loginApi(loginId, password);
            if(rst == true) {
                this.isLoggedIn = true;
                localStorage.setItem('auth', 'true');
            }
            return rst;
        },
        async loginout(): Promise<void> {
            const rst = await logoutApi();
            if(rst == true) {
                this.isLoggedIn = false;
                localStorage.removeItem('auth');
            }
        },
    }
})