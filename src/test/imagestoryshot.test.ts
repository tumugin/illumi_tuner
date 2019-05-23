import initStoryshots from '@storybook/addon-storyshots'
import { IBeforeScreenshotContext, imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'
import Pupetter from 'puppeteer'

const getMatchOptions = () => {
  return {
    failureThreshold: 0.05,
    failureThresholdType: 'percent'
  }
}

const beforeScreenshot = (page: Pupetter.Page, context: IBeforeScreenshotContext) => {
  if (context.context.story.match(/HasAnimation/)) {
    return new Promise<void>(resolve =>
      setTimeout(() => {
        resolve()
      }, 1000)
    )
  } else {
    return new Promise<void>(resolve => resolve())
  }
}

initStoryshots({
  suite: 'Image Storyshots',
  configPath: '.storybook/config-jest.ts',
  test: imageSnapshot({
    storybookUrl: 'file://' + path.resolve('./storyshot-public/'),
    getMatchOptions,
    beforeScreenshot
  })
})
