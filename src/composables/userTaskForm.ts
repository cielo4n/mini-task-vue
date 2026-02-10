import { ref } from "vue";
export function useTaskForm(){
    const error = ref<string | null>('');
    const validate = (value: string)=>{
        if(!value){
            error.value = '필수입력입니다';
        }
    }
    return { error, validate }
}