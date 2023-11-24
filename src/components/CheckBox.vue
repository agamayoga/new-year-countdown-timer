<script setup>
import { ref, computed } from "vue"
import { guid } from '@/common/helper.js'

const uniqueId = ref(guid());

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <div class="flex flex-row gap-4">
    <div class="relative size flex-0">
      <div class="square size" v-if="value">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-check" width="20px" height="20px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" style="fill:lime;" /></svg>
      </div>
      <div class="square size" v-if="!value">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-xmark" width="20px" height="20px" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" style="fill:red;" /></svg>
      </div>
      <input type="checkbox" :id="uniqueId" v-model="value" class="checkbox size" />
    </div>
    <label :for="uniqueId" :id="'label-for-' + uniqueId" class="label flex-1"><slot /></label>
  </div>
</template>

<style scoped>
.size {
  @apply w-8 h-8;
}

.square {
  @apply block aspect-square p-1 border-2 border-white
   hover:bg-blue-700 hover:border-blue-300
   cursor-pointer pointer-events-none
   absolute left-0 top-0;
}

.checkbox {
  @apply absolute left-0 top-0 opacity-0 cursor-pointer;
}

.label {
  @apply text-white;
}
</style>
