import { defineStore } from "pinia";

export type ToastType = 'success' | 'error' | 'info';


export const useToastStore = defineStore('toast', {
    state: ()=> ({
        isVisible: false,
        message: '',
        timeoutId: null as ReturnType<typeof setTimeout> | null,
        type: 'info' as ToastType
    }),
    actions: {
        show(message: string, type: ToastType, duration: number=1500){
            this.message = message;
            this.isVisible = true;
            this.type = type;

            if(this.timeoutId){
                clearTimeout(this.timeoutId);
            }

            this.timeoutId = setTimeout(()=>{
                this.hide();
            }, duration);
            
        },
        hide(){
            this.isVisible = false;
        }
    }
})