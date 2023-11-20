<script setup>
import { ref, computed } from "vue"

const props = defineProps(["id", "name", "placeholder", "title", "accesskey", "modelValue"]);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
</script>

<template>
  <input type="text" :id="props.id" v-model="value" :placeholder="props.placeholder" :title="props.title" :accesskey="props.accesskey" class="textbox" :class="$attrs.class" />
</template>

<style scoped>
.textbox {
  @apply bg-transparent border-2 border-white block p-2.5 focus:bg-blue-700 focus:border-blue-300 focus:text-white focus:outline-none;
  color: lime;
}
</style>
