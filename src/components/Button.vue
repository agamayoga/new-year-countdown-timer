<script setup>
const props = defineProps(["id", "name", "title", "accesskey", "modelValue"]);
const emit = defineEmits(["click"]);
</script>

<template>
  <a href="#" class="button hover:bg-blue-700 hover:border-blue-300" :title="props.title" :accesskey="props.accesskey" @click.prevent="() => emit('click')">
    <slot />
  </a>
</template>

<style scoped>
.button {
  @apply block aspect-square rounded-full border-4 border-white p-3 w-16 h-16 cursor-pointer;
}
</style>
