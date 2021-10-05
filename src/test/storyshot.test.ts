import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots'

initStoryshots({
  framework: 'vue',
  test: multiSnapshotWithOptions({}),
})
