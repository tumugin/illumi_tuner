import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueObserveVisibility from 'vue-observe-visibility'
import VueScrollTo from 'vue-scrollto'
import VueCompositionApi from '@vue/composition-api'
import titleMixin from './mixins/title-mixin'

Vue.use(VueCompositionApi)
Vue.use(BootstrapVue)
Vue.use(VueObserveVisibility)
Vue.use(VueScrollTo)
Vue.mixin(titleMixin)
