<script setup lang="ts">
import { useToastStore } from './stores/toast';
import { storeToRefs } from 'pinia';

const toast = useToastStore();
const { message, isVisible, type }  = storeToRefs(toast);

</script>

<template>
    <RouterView/>
    <Transition name="fade">
        <div v-if="isVisible" v-bind:class="['toast', type]">
            {{ message }}
        </div>
    </Transition>
</template>

<style>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 20px;
  border-radius: 15px;
  color: white;
  opacity: 0.9;
  font-size: 0.8em;
}

.success { background: #4caf50; }
.error { background: #f44336; }
.info { background: #2196f3; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>