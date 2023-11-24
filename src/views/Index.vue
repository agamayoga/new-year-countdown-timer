<script setup>
import { ref, onMounted } from "vue"
import { $router } from '../router'
import { $bus } from '../common/events'
import { $config } from '../common/config'
import Button from "../components/Button.vue";

let config = null;
let audio1, audio2;

let headerTimer = null;
let clockInterval = null;

let today = new Date();
let oldyear = today.getFullYear();
if (today.getMonth() == 0 && today.getDate() == 1) {
  oldyear -= 1; //Some tolerance, on 1st Jan display the previous year
};
let newyear = oldyear + 1;

const days = ref(null);
const hours = ref(null);
const mins = ref(null);
const secs = ref(null);

const isReady = ref(false);
const isDone = ref(false);
const isLast10s = ref(false);
const isLastMinute = ref(false);
const isHappyNewYear = ref(false);

const happyNewYearText = ref(null);
const isSoundEffectEnabled = ref(false);
const isFireworksEffectEnabled = ref(true);
const isHighlightTextEnabled = ref(true);
const isHeaderTitleVisible = ref(true);
const isCountryFlagVisible = ref(true);
const isSettingsButtonVisible = ref(true);
const isWorldClockVisible = ref(true);
const isProgramMode = ref(false);

let idleTimer = null;
const isUserActive = ref(false);
const preventInstantSlide = ref(false);

const clocks = ref([ ]);

/*
//Design-time
const clocks = ref([
  { name: "Honolulu", time: "00:00" },
  { name: "Brasilia", time: "00:00" },
  { name: "London", time: "00:00" },
  { name: "Koh Phangan", time: "00:00", highlight: true },
  { name: "Tokyo", time: "00:00" },
  { name: "Kiribati", time: "00:00" },
]);
*/

/******************************************************************************************
 * Load configuration from local storage or use default
 ******************************************************************************************/
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

/******************************************************************************************
 * Show fireworks
 ******************************************************************************************/
function showFireworks() {
  let canvas = document.getElementById("defaultCanvas0");
  if (canvas) {
    canvas.style.display = "block";
  }

  if (typeof displayFireworks != "undefined") {
    displayFireworks = true; //Render draw()
  }
}

/******************************************************************************************
 * Hide fireworks
 ******************************************************************************************/
function hideFireworks() {
  if (typeof displayFireworks != "undefined") {
    displayFireworks = false; //Render draw()
  }

  let canvas = document.getElementById("defaultCanvas0");
  if (canvas) {
    canvas.style.display = "none";
  }
}

/******************************************************************************************
 * Refresh time at world clock
 ******************************************************************************************/
function refreshWorldClocks() {
  if (!clocks.value || clocks.value.length == 0) {
    return;
  }

  let now = new Date(); //Local time
  for (let i = 0; i < clocks.value.length; i++) {
    let clock = clocks.value[i];

    //Convert to the specific time zone, formatted as "HH:mm"
    clock.time = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: clock.timezone });
  }
}

/******************************************************************************************
 * Calculates the time to the target moment
 ******************************************************************************************/
function timeLeft(endtime) {
  var now = Date.parse(new Date());
  var et = endtime instanceof Date ? endtime : Date.parse(endtime);
  var expired = now >= et;
  var t = expired ? now - et : et - now + 1000;
  var seconds = Math.floor((t/1000) % 60);
  var minutes = Math.floor((t/1000/60) % 60);
  var hours = Math.floor((t/(1000*60*60)) % 24);
  var days = Math.floor(t/(1000*60*60*24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
    'expired': expired
  };
}

/******************************************************************************************
 * Stop the countdown timer
 ******************************************************************************************/
function stopClock() {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }
}

/******************************************************************************************
 * Set the target goal moment
 ******************************************************************************************/
function setClock(dt) {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }

  //Cleanup
  isDone.value = false;
  isLast10s.value = false;
  isLastMinute.value = false;
  isHappyNewYear.value = false;

  //Update digits and trigger effects
  function update() {
    //Update world clocks
    refreshWorldClocks();

    //Calculate seconds left to the hiatus moment (or seconds after)
    let t = timeLeft(dt);
    days.value = t.days;
    hours.value = ('0' + t.hours).slice(-2); //2 digits
    mins.value = ('0' + t.minutes).slice(-2); //2 digits
    secs.value = ('0' + t.seconds).slice(-2); //2 digits

    //Target moment
    if (t.expired && t.total < 10 * 1000) {
      if (isDone.value) {
        return;
      }
      isDone.value = true;
      isLast10s.value = false;
      isLastMinute.value = false;
      isHappyNewYear.value = true;

      //Update title
      happyNewYearText.value = config.happyNewYearText || "Happy New Year!!!";

      //Play sound effect
      if (config.sound.enabled) {
        audio2.currentTime = 0;
        audio2.play();
      }

      //Show fireworks if enabled
      if (config.fireworks.enabled) {
        showFireworks();
        setTimeout(function() {
          hideFireworks();
          isHappyNewYear.value = false;
          happyNewYearText.value = null;
        }, config.fireworks.duration || 60 * 1000);
      }
    }

    //3 seconds before the moment - ring a bell
    else if (!t.expired && 3 * 1000 <= t.total && t.total <= 4 * 1000) {
      if (config.sound.enabled) {
        audio1.currentTime = 0;
        audio1.play();
      }
    }

    //5 seconds before the moment - ring a bell
    /*else if (!t.expired && 5 * 1000 <= t.total && t.total <= 6 * 1000) {
      if (config.sound.enabled) {
        audio1.currentTime = 0;
        audio1.play();
      }
    }*/

    //10 seconds before the moment
    else if (!t.expired && t.total <= 11 * 1000) {
      //Ring a bell
      if (10 * 1000 <= t.total && t.total <= 11 * 1000) {
        if (config.sound.enabled) {
          audio1.currentTime = 0;
          audio1.play();
        }
      }
      if (isLast10s.value) {
        return;
      }
      isHappyNewYear.value = false;
      isLastMinute.value = false;
      setTimeout(function() {
        isLast10s.value = true;
      }, 500);
    }

    //1 minute before the moment
    else if (t.total <= 60 * 1000) {
      if (isLastMinute.value) {
        return;
      }
      isLast10s.value = false;
      isLastMinute.value = true;
      isHappyNewYear.value = false;
    }

    //Show the countdown screen
    isReady.value = true;
  }

  //Set the timer update interval
  clockInterval = setInterval(update, 1000); //Every secondary
  update();
};

/******************************************************************************************
 * Start the countdown timer
 ******************************************************************************************/
function setupClock(deadline) {
  if (!deadline) {
    deadline = 'January 1 ' + (today.getFullYear() + 1) + " 00:00:00";
    if (today.getMonth() == 0 && today.getDate() == 1) {
      deadline = 'January 1 ' + (today.getFullYear()) + " 00:00:00";
    };
  }

  //Turn off fireworks effect
  hideFireworks();

  //Start the timer
  setClock(deadline);
}

/******************************************************************************************
 * Start the scheduled program
 ******************************************************************************************/
function startProgram() {
  let now = new Date();

  let shouldStartNow = null;
  for (let item of config.program) {

    if (item.start && now < item.start) {
      //Calculate start time for the time zone
      let ms = item.start - now;
      let name = item.name;
      let names = item.names;
      let midnight = item.midnight;

      //Show the countdown for the time zone and countries
      setTimeout(function() {
        if (headerTimer) {
          clearInterval(headerTimer);
        }

        //In case time zone has many countries - rotate country names
        if (names && names.length) {
          let index = 0;
          headerTimer = setInterval(function() {
            if (index >= names.length) index = 0;
            happyNewYearText.value = names[index++];
          }, config.rotateTitleInterval || 5 * 1000);
        }

        //Trim country flag char
        if (!isCountryFlagVisible.value) {
          name = name.replace(/[^\w\d\s]+/g, "").trim();
        }

        //Update title
        happyNewYearText.value = name;

        //Set countdown timer
        setupClock(midnight);
      }, ms);

    }

    if (item.start && now >= item.start) {
      shouldStartNow = item;
    }

  }

  if (shouldStartNow) {
    happyNewYearText.value = shouldStartNow.name;
    setupClock(shouldStartNow.midnight);
  }
}

/******************************************************************************************
 * Test the celebration moment
 ******************************************************************************************/
function startTest() {
  let now = new Date();
  if (config.isProgramMode) {
    let offset = 100;
    for (let item of config.program) {
      item.start = new Date(now.getTime() + offset); offset += config.testTimerInterval || 15000;
      item.midnight = new Date(now.getTime() + offset); offset += config.testNextInterval || 12000;
    }
    startProgram();
  }
  else {
    let milliseconds = config.testTimerInterval || 15000; //15 seconds
    let time = new Date(now.getTime() + milliseconds);
    setClock(time);
  }
}

/******************************************************************************************
 * Test fireworks effect
 ******************************************************************************************/
function toggleFireworks() {
  if (!displayFireworks) {
    showFireworks();
  }
  else {
    hideFireworks();
  }
}

/******************************************************************************************
 * Test the celebration moment
 ******************************************************************************************/
function showSettings() {
  stopClock();
  hideFireworks();
  $router.push({ name: "Settings" });
}

/******************************************************************************************
 * Page ready
 ******************************************************************************************/
onMounted(() => {
  loadConfig();

  //Sound effect playback
  audio1 = document.getElementById('audio1');
  audio2 = document.getElementById('audio2');

  //Apply configuration
  clocks.value = config.clocks;
  isSoundEffectEnabled.value = config.sound.enabled;
  isFireworksEffectEnabled.value = config.fireworks.enabled;
  isHighlightTextEnabled.value = config.isHighlightTextEnabled;
  isHeaderTitleVisible.value = config.isHeaderTitleVisible;
  isCountryFlagVisible.value = config.isCountryFlagVisible;
  isSettingsButtonVisible.value = config.isSettingsButtonVisible;
  isWorldClockVisible.value = config.worldClock.enabled;
  isProgramMode.value = config.isProgramMode;

  //Prevent instant slide-out animation on reload
  if (isSettingsButtonVisible.value) {
    preventInstantSlide.value = true;
    setTimeout(() => preventInstantSlide.value = false, 500);
  }

  //Hide the background fireworks effect
  hideFireworks();

  //Update countdown digits on interval
  setupClock();

  //Scheduled program
  if (config.isProgramMode) {
    startProgram();
  }

  //Update p5 canvas size on document resize
  document.body.onmousemove = function() {
    isUserActive.value = true;
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
    idleTimer = setTimeout(function() {
      isUserActive.value = false;
    }, 1000);
  };
});
</script>

<template>
  <div class="fixed left-0 top-0 w-full h-full overflow-hidden">

    <!-- Title -->
    <div class="title" v-if="isReady && isHeaderTitleVisible">
      <div class="grid place-items-center text-center">
        <h1 v-if="!happyNewYearText">New Year starts in<span v-if="days > 0">&nbsp;{{ days }}&nbsp;days</span></h1>
        <h1 v-if="happyNewYearText">{{ happyNewYearText }}</h1>
      </div>
    </div>

    <!-- Countdown timer -->
    <div class="countdown" v-if="isReady">
      <div class="grid place-items-center text-center">
        <div class="clock w-full py-40" :class="{ 'last-10s': isLast10s, 'last-minute': isLastMinute, 'happy-new-year': isHappyNewYear, 'highlight': isHappyNewYear && isHighlightTextEnabled, 'done': isDone }">
          <span class="num">{{ hours }}</span><span class="colon">:</span><span class="num">{{ mins }}</span><span class="colon">:</span><span class="num">{{ secs }}</span>
        </div>
      </div>
    </div>

    <!-- World clocks -->
    <div class="world-clocks" v-if="isReady && isWorldClockVisible && clocks.length">
      <div class="flex flex-row justify-between text-center px-20">
        <div class="timezone-item" :class="{ 'timezone-highlight': clock.highlight }" v-for="clock in clocks">
          <span class="timezone-name">{{ clock.name }}</span>
          <span class="timezone-clock">{{ clock.time }}</span>
        </div>
      </div>
    </div>

    <!-- Control buttons -->
    <div class="controls fixed top-0 right-0 flex flex-col gap-4 m-6" :class="{ 'slide-in': isUserActive, 'slide-out': !isUserActive, 'slide-far': preventInstantSlide }" v-show="isSettingsButtonVisible">
      <Button accesskey="s" title="Settings" color="blue" @click="showSettings">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-gear" width="32px" height="32px" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" style="fill:white;" /></svg>
      </Button>
      <Button accesskey="t" title="Launch test" color="yellow" @click="startTest">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-rocket" width="32px" height="32px" style="margin-left: -2px; margin-top: 2px;"  viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" style="fill:white;" /></svg>
      </Button>
      <Button accesskey="f" title="Toggle fireworks" color="yellow" @click="toggleFireworks">
        <svg xmlns="http://www.w3.org/2000/svg" data-icon="fa-wand-magic-sparkles" width="32px" height="32px" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" style="fill:white;"/></svg>
      </Button>
    </div>

    <!-- Audio effects -->
    <audio id="audio1" preload="auto" src="/audio/gong-short.mp3"></audio>
    <audio id="audio2" preload="auto" src="/audio/gong-long.mp3"></audio>

  </div>
</template>

<style scoped>
.title h1 {
  @apply fixed left-0 top-0 w-full;
  font-family: 'Source Sans Pro', sans-serif;
  font-variant-numeric: tabular-nums; /* Monospace */
  font-weight: 700;
  font-size: 120px;
  letter-spacing: .1rem;
  font-size: 5vw;
  top: 4vw;
}

.title h1, span {
  outline: none;
  user-select: none;
}

.countdown {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.world-clocks {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  font-family: 'Source Sans Pro', sans-serif;
  font-variant-numeric: tabular-nums; /* Monospace */
  font-weight: 700;
  font-size: 24px;
  letter-spacing: .1rem;

  margin-bottom: 30px;
}

.world-clocks .timezone-name {
  font-weight: 500;
  margin-right: 10px;
}

.world-clocks .timezone-clock {
  font-weight: 700;
}

.world-clocks .timezone-highlight {
  color: yellow;
}

.clock {
  overflow: hidden;
}

.clock.last-10s {
  animation: blinker 1s linear infinite;
}

.clock.highlight {
  text-shadow: 0 0 10px #3498DB,
               0 0 20px #3498DB,
               0 0 30px #3498DB,
               0 0 40px #2980B9,
               0 0 70px #2980B9,
               0 0 80px #2980B9,
               0 0 100px #2980B9,
               0 0 150px #2980B9;
}

.clock span {
  font-family: 'Source Sans Pro', sans-serif;
  font-variant-numeric: tabular-nums; /* Monospace */
  font-weight: 900;
  /* font-size: 400px; */
  letter-spacing: .7rem;
  line-height: 1em;
  /* font-size: 18vw; */
  font-size: 23vw;
}

.clock span.colon {
  /* font-size: 250px; */
  position: relative;
  /* top: -62px; */
  /* font-size: 12vw; */
  font-size: 18vw;
  top: -3vw;
}

.program-schedule {
  text-align: right;
  width: 360px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  position: relative;
  left: -16px;
}

.controls {
  position: fixed;
  top: 0;
  right: -150px;
  z-index: 50;
  transform: translateX(0);
}

.controls.slide-in {
  animation: slide-in 0.3s forwards;
  /* animation-delay: 2s; */
}

.controls.slide-out {
  animation: slide-out 0.3s forwards;
  /* animation-delay: 2s; */
}

.controls.slide-far {
  transform: translateX(450px);
}

@keyframes slide-in {
  100% { right: 0; }
}

@keyframes slide-out {
  0% { right: 0; }
  100% { right: -150px; }
}

@keyframes blinker {
  from,
  49.9% {
    opacity: 0;
  }
  50%,
  to {
    opacity: 1;
  }
}

/* Hide world clock if window width less than 1500px */
@media only screen and (max-width: 1500px) {
  .world-clocks {
    display: none;
  }
}
</style>
