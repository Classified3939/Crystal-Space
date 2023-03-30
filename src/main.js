import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Listbox from "primevue/listbox";
import Ripple from "primevue/ripple";

import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

app.component("Button", Button);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("Listbox", Listbox);

app.directive("ripple", Ripple);

app.mount("#app");
