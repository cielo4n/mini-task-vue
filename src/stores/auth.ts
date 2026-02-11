import { defineStore } from 'pinia';
import { loginApi, logoutApi } from '@/api/mockApi';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: Boolean(localStorage.getItem('auth')),
        isLoading: false,
    }),
    actions: {
        async login(loginId: string, password: string): Promise<boolean> {
            this.isLoading = true;
            const rst = await loginApi(loginId, password);
            if(rst == true) {
                this.isLoggedIn = true;
                localStorage.setItem('auth', 'true');
            }
            this.isLoading = false;
            return rst;
        },
        async logout(): Promise<void> {
            const rst = await logoutApi();
            if(rst == true) {
                this.isLoggedIn = false;
                localStorage.removeItem('auth');
            }
        },
    }
})