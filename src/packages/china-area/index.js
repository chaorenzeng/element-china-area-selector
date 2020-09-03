import ChinaArea from './china-area'

ChinaArea.install = Vue => Vue.component(ChinaArea.name, ChinaArea);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ChinaArea);
}

export default ChinaArea