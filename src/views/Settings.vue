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
</style>
