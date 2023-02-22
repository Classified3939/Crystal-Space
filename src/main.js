import { createApp } from "vue";
import "./style.css";
import "floating-vue/dist/style.css";
import App from "./App.vue";
import { GameController } from "./scripts/GameController";
import { AllItems } from "./scripts/items/allItems";
import FloatingVue from "floating-vue";

window.global = window;
new GameController();
window.onload = function () {
  GameController.load();
};
window.controller = GameController;
window.items = AllItems;
const app = createApp(App);
app.use(FloatingVue);
app.mount("#app");
