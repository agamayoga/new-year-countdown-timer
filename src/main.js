import { createApp } from 'vue'

import App from './App.vue'
import { $router } from './router'
import { $global } from './common/global'
import { $bus } from './common/events'

import './index.css'
import './styles/main.css'

// import '../public/lib/p5/p5.min.js'
// import '../public/lib/p5js-fireworks/particle.js'
// import '../public/lib/p5js-fireworks/firework.js'
// import '../public/lib/p5js-fireworks/sketch.js'

$global.startup = new Date();
$global.uptime = () => { return new Date().getTime() - $global.startup.getTime(); };

//Create and mount application
let app = createApp(App);
app.use($router);
app.mount('#app');
