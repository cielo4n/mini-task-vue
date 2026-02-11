import { ref } from "vue";

export function useTaskForm(){
    const error = ref<string | null>(null);

    const validate = (value: string) => {
        if(!value){
            error.value = '필수입력입니다';
            return false;
        }
        error.value = null;
        return true;
    }
    return { error, validate }
}