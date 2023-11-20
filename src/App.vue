<script setup>
import { ref, onMounted } from 'vue'
import { $bus } from './common/events'

onMounted(() => {
  //Delete hardcoded background
  document.body.style.background = null;

  //Update p5 canvas size on document resize
  document.body.onresize = function() {
    console.log("onresize", windowWidth, windowHeight);
    if (p5Renderer) {
      setTimeout(function() {
        p5Renderer.resize(windowWidth, windowHeight)
      }, 1);
    }
  };
});

$bus.on("midnight", (data) => {
  console.log("Happy New Year!");
});
</script>

<template>
  <router-view />
  <div id="mount-point"></div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
