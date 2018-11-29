import Vue from 'vue';
import App from './App.vue';
import eleNav from './lib/';
import ElementUI from 'element-ui';
Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示

Vue.use(ElementUI);
Vue.use(eleNav);
new Vue({
  el: '#app',
  render: h => h(App),
});
