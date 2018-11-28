/*
 * @Author: aFei
 * @Date: 2018-08-28 11:02:25
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-28 11:02:27
 */
import eleNav from './eleNav';

const comment = {
  install(Vue) {
    Vue.component('eleNav', eleNav);
  },
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}

export default comment;
