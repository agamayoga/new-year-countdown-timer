<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "blue"
  },
  accesskey: {
    type: String,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["click"]);
</script>

<template>
  <a href="#" class="button" :class="{ 'button-blue': props.color == 'blue', 'button-yellow': props.color == 'yellow' }"
    :title="props.title" :accesskey="props.accesskey" @click.prevent="() => emit('click')">
    <slot />
  </a>
</template>

<style scoped>
.button {
  @apply block aspect-square rounded-full border-4 border-white p-3 w-16 h-16 cursor-pointer outline-none;
}

.button-blue {
  @apply hover:bg-blue-700 hover:border-blue-300;
}

.button-yellow {
  @apply hover:bg-amber-600 hover:border-amber-300;
}
</style>
