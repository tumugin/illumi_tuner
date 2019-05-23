declare module '@storybook/addon-storyshots-puppeteer' {
  import Pupetter from 'puppeteer'
  import { Test } from '@storybook/addon-storyshots'

  interface IMatchOptions {
    failureThreshold: number
    failureThresholdType: string
  }

  interface IMatchOptionsArgs {
    context: {
      kind: string
      story: string
    }
    url: string
  }

  interface IBeforeScreenshotContext {
    context: {
      kind: string
      story: string
    }
  }

  interface IOptions {
    storybookUrl?: string
    chromeExecutablePath?: string
    getMatchOptions: (args: IMatchOptionsArgs) => IMatchOptions
    beforeScreenshot: (page: Pupetter.Page, context: IBeforeScreenshotContext, url: string) => Promise<void>
  }

  function imageSnapshot(options: IOptions): Test
}
