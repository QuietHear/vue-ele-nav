/*
 * @Author: aFei
 * @Date: 2018-08-28 11:02:25
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-11-29 10:32:46
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
