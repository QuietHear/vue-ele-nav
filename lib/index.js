/*
* @Author: aFei
* @Date: 2018-07-10 16:45:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2022-11-17 11:55:23
*/
import vueEleNav from './vueEleNav';

const comment = {
  install(Vue) {
    Vue.component('vueEleNav', vueEleNav);
  },
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}

export default comment;
