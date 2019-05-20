import initStoryshots from '@storybook/addon-storyshots'
// @ts-ignore
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'

initStoryshots({
  configPath: '.storybook/config-jest.ts',
  test: imageSnapshot({ storybookUrl: 'file://' + path.resolve('./storyshot-public/') })
})
