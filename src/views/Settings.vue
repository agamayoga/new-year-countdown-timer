<script setup>
import { ref, watch, onMounted } from "vue"
import { $router } from '../router'
import { $bus } from '../common/events'
import { $global } from '../common/global'
import { $config } from '../common/config'
import Button from "../components/Button.vue";
import TextBox from "../components/TextBox.vue";
import CheckBox from "../components/CheckBox.vue";

const happyNewYearText = ref("Happy New Year!");
const isSoundEffectEnabled = ref(false);
const isFireworksEffectEnabled = ref(true);
const isHighlightTextEnabled = ref(true);
const isHeaderTitleVisible = ref(true);
const isCountryFlagVisible = ref(true);
const isSettingsButtonVisible = ref(true);
const isWorldClockVisible = ref(true);
const isProgramMode = ref(false);

let config = null;

function loadConfig() {
  try {
    let json = localStorage.getItem("config");
    if (typeof json == "string") {
      config = JSON.parse(json);
      return config;
    }
  }
  catch (err) {
    console.error(err);
  }
  config = new Proxy($config, { });
  return config;
}

function saveConfig() {
  try {
    let json = JSON.stringify(config);
    localStorage.setItem("config", json);
  }
  catch (err)  {
    console.error(err);
  }
}

onMounted(async () => {
  loadConfig();
  console.log(1);
  console.log(config.sound.enabled);
  happyNewYearText.value = config.happyNewYearText;
  isSoundEffectEnabled.value = config.sound.enabled;
  isFireworksEffectEnabled.value = config.fireworks.enabled;
  isHighlightTextEnabled.value = config.isHighlightTextEnabled;
  isHeaderTitleVisible.value = config.isHeaderTitleVisible;
  isCountryFlagVisible.value = config.isCountryFlagVisible;
  isSettingsButtonVisible.value = config.isSettingsButtonVisible;
  isWorldClockVisible.value = config.worldClock.enabled;
  isProgramMode.value = config.isProgramMode;
});

watch(happyNewYearText, (value, prev) => config.happyNewYearText = value);
watch(isSoundEffectEnabled, (value, prev) => config.sound.enabled = !!value);
watch(isFireworksEffectEnabled, (value, prev) => config.fireworks.enabled = !!value);
watch(isHighlightTextEnabled, (value, prev) => config.isHighlightTextEnabled = !!value);
watch(isHeaderTitleVisible, (value, prev) => config.isHeaderTitleVisible = !!value);
watch(isCountryFlagVisible, (value, prev) => config.isCountryFlagVisible = !!value);
watch(isSettingsButtonVisible, (value, prev) => config.isSettingsButtonVisible = !!value);
watch(isWorldClockVisible, (value, prev) => config.worldClock.enabled = !!value);
watch(isProgramMode, (value, prev) => config.isProgramMode = !!value);

function goBack() {
  saveConfig();
  $router.push({ name: "Index" });
}
</script>

<template>
  <div class="relative">

    <!-- Header -->
    <div class="flex flex-row gap-4 m-4">
      <Button accesskey="x" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-arrow-left" width="32px" height="32px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" style="fill:white;" /></svg>
      </Button>
      <h1 class="text-white text-2xl font-medium ml-4 mt-4">Settings</h1>
      <div class="absolute top-0 right-4">
        <a href="https://agama.day/github-new-year-project" target="_blank" class="github flex flex-row gap-4 outline-none" style="user-select: none;">
          <h1 class="text-white text-2xl font-medium ml-4 mt-4">GitHub</h1>
          <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-github" class="block aspect-square rounded-full border-4 border-white w-16 h-16 cursor-pointer outline-none" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" style="fill:white;"/></svg>
        </a>
      </div>
    </div>

    <!-- Settings -->
    <form autocomplete="off">
      <div class="mt-4 mb-8 mx-28">

        <!-- Happy new year text -->
        <div class="text-white mt-4">Celebration message</div>
        <TextBox v-model="happyNewYearText" class="mt-2" />
        <div class="text-gray-500 mt-2">Note: to be displayed at midnight</div>

        <!-- Sound effects -->
        <CheckBox v-model="isSoundEffectEnabled" class="mt-4">
          <div class="text-white mt-1">
            Sound effects are <span style="color: lime;" v-if="isSoundEffectEnabled">ON</span><span style="color: red;" v-if="!isSoundEffectEnabled">OFF</span>
          </div>
        </CheckBox>

        <!-- Fireworks effects -->
        <CheckBox v-model="isFireworksEffectEnabled" class="mt-4">
          <div class="text-white mt-1">
            Firework effects are <span style="color: lime;" v-if="isFireworksEffectEnabled">ON</span><span style="color: red;" v-if="!isFireworksEffectEnabled">OFF</span>
          </div>
        </CheckBox>
        <div class="text-gray-500 mt-2">Note: fireworks are CPU demanding</div>

        <!-- Higlight timer digits -->
        <CheckBox v-model="isHighlightTextEnabled" class="mt-4">
          <div class="text-white mt-1">
            Higlight timer digits is <span style="color: lime;" v-if="isHighlightTextEnabled">ON</span><span style="color: red;" v-if="!isHighlightTextEnabled">OFF</span> on new year
          </div>
        </CheckBox>
        <div class="text-gray-500 mt-2">Note: may have performance impact, turn off on slow CPU</div>

        <!-- Header text -->
        <CheckBox v-model="isHeaderTitleVisible" class="mt-4">
          <div class="text-white mt-1">
            Header text above timer is <span style="color: lime;" v-if="isHeaderTitleVisible">VISIBLE</span><span style="color: red;" v-if="!isHeaderTitleVisible">HIDDEN</span>
          </div>
        </CheckBox>

        <!-- Settings button on first page -->
        <CheckBox v-model="isSettingsButtonVisible" class="mt-4">
          <div class="text-white mt-1">
            Interactive buttons are <span style="color: lime;" v-if="isSettingsButtonVisible">VISIBLE</span><span style="color: red;" v-if="!isSettingsButtonVisible">HIDDEN</span> on countdown screen
          </div>
        </CheckBox>
        <div class="text-gray-500 mt-2">Note: you can still access settings via <span class="expr">/settings</span> route or access key <kbd class="expr">S</kbd>, e.g. ALT + SHIFT + S on Firefox</div>

        <!-- World clock -->
        <CheckBox v-model="isWorldClockVisible" class="mt-4">
          <div class="text-white mt-1">
            World clock is <span style="color: lime;" v-if="isWorldClockVisible">VISIBLE</span><span style="color: red;" v-if="!isWorldClockVisible">HIDDEN</span> on countdown page (footer)
          </div>
        </CheckBox>

        <!-- Navigate through countries -->
        <CheckBox v-model="isProgramMode" class="mt-4">
          <div class="text-white mt-1">
            Scheduled program is <span style="color: lime;" v-if="isProgramMode">ON</span><span style="color: red;" v-if="!isProgramMode">OFF</span> to highlight countries and time zones closer to midnight
          </div>
        </CheckBox>

        <!-- Country flag -->
        <CheckBox v-model="isCountryFlagVisible" class="mt-4">
          <div class="text-white mt-1">
            Country flags are <span style="color: lime;" v-if="isCountryFlagVisible">VISIBLE</span><span style="color: red;" v-if="!isCountryFlagVisible">HIDDEN</span> on scheduled program
          </div>
        </CheckBox>
        <div class="text-gray-500 mt-2">Note: may not work in all browsers, works on Firefox</div>

      </div>
    </form>

  </div>
</template>

<style scoped>
.expr {
  @apply bg-gray-700 text-gray-400 px-1 py-0.5 font-mono;
}

.github:hover h1 {
  @apply text-amber-300;
}

.github:hover svg {
  @apply bg-amber-600 border-amber-300;
}
</style>
