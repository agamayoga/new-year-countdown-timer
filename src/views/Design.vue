<script setup>
import { ref, onMounted } from "vue"
import { $router } from '../router'
import { $bus } from '../common/events'
import { $config } from '../common/config'
import Button from "../components/Button.vue";

/* This page is used for screenshots only */

//Design-time
/*
const clocks = ref([
  { name: "Honolulu", time: "06:59" },
  { name: "Brasilia", time: "13:59" },
  { name: "London", time: "16:59" },
  { name: "Koh Phangan", time: "23:59", highlight: true },
  { name: "Tokyo", time: "01:59" },
  { name: "Kiribati", time: "06:59" },
]);
*/

const clocks = ref([
  { name: "Honolulu", time: "07:00" },
  { name: "Brasilia", time: "14:00" },
  { name: "London", time: "17:00" },
  { name: "Koh Phangan", time: "00:00", highlight: true },
  { name: "Tokyo", time: "02:00" },
  { name: "Kiribati", time: "07:00" },
]);

displayFireworks = true;
</script>

<template>
  <div>

    <!-- Title -->
    <div class="title fixed left-0 top-0 w-full mt-24">
      <div class="grid place-items-center text-center">
        <h1>Happy New Year!!!</h1>
        <!-- <h1>New Year starts in</h1> -->
        <!-- <h1>Thailand 🇹🇭</h1> -->
      </div>
    </div>

    <!-- Countdown timer -->
    <div class="countdown">
      <div class="grid place-items-center text-center">
        <div class="clock w-full py-40 highlight"><!-- happy-new-year highlight -->
          <span class="num">00</span><span class="colon">:</span><span class="num">00</span><span class="colon">:</span><span class="num">03</span>
        </div>
      </div>
    </div>

    <!-- World clocks -->
    <div class="world-clocks">
      <div class="flex flex-row justify-between text-center px-20">
        <div class="timezone-item" :class="{ 'timezone-highlight': clock.highlight }" v-for="clock in clocks">
          <span class="timezone-name">{{ clock.name }}</span>
          <span class="timezone-clock">{{ clock.time }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Hide world clock if window width less than 1500px */
@media only screen and (max-width: 1500px) {
  .world-clocks {
    display: none;
  }
}
</style>
