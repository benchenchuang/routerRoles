import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex'
import App from './App.vue';
import router from './router';

Vue.use(ElementUI);
/*
* v-has
*/
Vue.directive('has', {
  inserted: function(el, binding) {
    if (Vue.prototype.$_has && !Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

