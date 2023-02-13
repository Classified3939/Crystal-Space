import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { GameController } from "./scripts/GameController";

window.global = window;
new GameController();
createApp(App).mount("#app");
