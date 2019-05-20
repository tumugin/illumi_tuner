import initStoryshots from '@storybook/addon-storyshots'
// @ts-ignore
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'

const getMatchOptions = () => {
  return {
    failureThreshold: 0.03,
    failureThresholdType: 'percent'
  }
}

initStoryshots({
  suite: 'Image Storyshots',
  configPath: '.storybook/config-jest.ts',
  test: imageSnapshot({ storybookUrl: 'file://' + path.resolve('./storyshot-public/'), getMatchOptions })
})
