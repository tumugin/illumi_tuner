import { configure } from '@storybook/vue'
import { requireContext } from './jest-workaround'

// automatically import all files ending in *.stories.vue
const req = requireContext('../src/stories', true, /\.stories/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
