import { addDecorator, configure } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'

// automatically import all files ending in *.stories.vue
const req = require.context('../src/stories', true, /\.stories/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
// @ts-ignore
addDecorator(withKnobs)
