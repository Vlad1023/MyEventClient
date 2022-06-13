import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store'
import vuetify from './plugins/vuetify'
import toast from "vue-toastification";
import filters from '@filters';
import DatetimePicker from 'vuetify-datetime-picker'
import VueGoogleAutocomplete from "vue-google-autocomplete";
import * as VueGoogleMaps from 'vue2-google-maps'
import "vue-toastification/dist/index.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false

Vue.use(toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
Vue.use(DatetimePicker)
Vue.use(filters);
Vue.use(VueGoogleAutocomplete);
Vue.prototype.$autocompleteOptions = {  
    componentRestrictions: {
    country: [
      'ua',
    ],
  }
};
Vue.prototype.$googleApiKey = "AIzaSyAkNZBYc8_btHH5zmDS3Bxm3GMXaqLEqlM"
Vue.use(VueGoogleMaps, {
  load: {
    key: Vue.prototype.$googleApiKey,
    libraries: 'places',
    language: 'EN'
  }
});

new Vue({
  toast,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
