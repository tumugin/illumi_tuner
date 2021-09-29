declare module '@storybook/addon-storyshots-puppeteer' {
  import { StoryshotsOptions } from '@storybook/addon-storyshots/dist/ts3.9/api/StoryshotsOptions'
  import Pupetter from 'puppeteer'

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

  function imageSnapshot(options: IOptions): StoryshotsOptions['test']
}
