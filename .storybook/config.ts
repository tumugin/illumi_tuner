import { addDecorator, configure } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// automatically import all files ending in *.stories.vue
const req = require.context('../src/stories', true, /\.stories/)

function loadStories() {
  req.keys().forEach(req)
}

Vue.use(BootstrapVue)

configure(loadStories, module)
// @ts-ignore
addDecorator(withKnobs)
