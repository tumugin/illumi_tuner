import { configure } from '@storybook/vue'
import { requireContext } from './jest-workaround'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

// automatically import all files ending in *.stories.vue
const req = requireContext('../src/stories', true, /\.stories/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

Vue.use(BootstrapVue)

configure(loadStories, module)
