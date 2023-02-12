import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { GameController } from "./scripts/GameController";
import { reactive } from "vue";

new GameController();
createApp(App).mount("#app");
