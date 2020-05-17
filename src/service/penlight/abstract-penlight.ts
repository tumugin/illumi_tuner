import ColorUtils from '../color/color-utils'
import AbstractPenlightColor from '../../models/abstract-penlight-color'
import Ciede2000 from '../color/ciede2000'
import INameAndColor from '../../models/i-name-and-color'
import INameAndColorWithPenlightColor from '../../models/i-name-and-color-with-penlight-color'
import PenlightColor from '../../models/penlight-color'

export interface IColorDiffWithIPenlightColor {
  penlightColor: AbstractPenlightColor
  diff: number
}

export default abstract class AbstractPenlight {
  abstract productName: string

  abstract productManufacture: string

  abstract isColorAdjustable: boolean

  abstract availableColors: AbstractPenlightColor[]

  searchColor(arrayOfIdol: INameAndColor[], useBasicColor: boolean): INameAndColorWithPenlightColor[] {
    // with color adjustable penlights, no need to search nearest color
    if (this.isColorAdjustable) {
      return arrayOfIdol.map((item) => {
        const mapItem: INameAndColorWithPenlightColor = {
          nameAndColor: item,
          penlightColor: new PenlightColor(item.colorHEX, '', false),
        }
        return mapItem
      })
    }
    // search the nearest color
    const searchResult = arrayOfIdol.map((item) => {
      const idolColorRGB = ColorUtils.convertColorCodeToRGB(item.colorHEX)
      const colorDiffList = this.availableColors.map((penlightColorItem) => {
        const mapValue: IColorDiffWithIPenlightColor = {
          penlightColor: penlightColorItem,
          diff: Ciede2000.calculateCiede2000FromRGB(penlightColorItem.colorRGB, idolColorRGB),
        }
        return mapValue
      })
      const searchResultMapValue: INameAndColorWithPenlightColor = {
        nameAndColor: item,
        penlightColor: colorDiffList.sort((a, b) => a.diff - b.diff)[0].penlightColor,
      }
      return searchResultMapValue
    })

    // if not using basic color priority mode
    if (!useBasicColor) {
      return searchResult
    }

    // using basic color option
    // すでに選択されている標準色のみを抜き出して、他のものもそれに合わせるようにする
    // TODO: 許容量もパラメータに設定できるようにする

    // 標準色のみを求める
    const selectedBasicColors = searchResult
      .filter((item) => item.penlightColor.isBasicColor)
      .map((item) => item.penlightColor)
    // 標準色のみで表現可能なアイドルを取得する
    const basicColorIdols = searchResult.filter((item) => !item.penlightColor.isBasicColor)
    // そうでないアイドルの色を標準色で表現させる
    const notBasicColorIdols = searchResult
      .filter((item) => !item.penlightColor.isBasicColor)
      .map((item) => item.nameAndColor)
      .map((item) => {
        const idolColorRGB = ColorUtils.convertColorCodeToRGB(item.colorHEX)
        const colorDiffList = selectedBasicColors.map((penlightColorItem) => {
          const mapValue: IColorDiffWithIPenlightColor = {
            penlightColor: penlightColorItem,
            diff: Ciede2000.calculateCiede2000FromRGB(penlightColorItem.colorRGB, idolColorRGB),
          }
          return mapValue
        })
        const searchResultMapValue: INameAndColorWithPenlightColor = {
          nameAndColor: item,
          penlightColor: colorDiffList.sort((a, b) => a.diff - b.diff)[0].penlightColor,
        }
        return searchResultMapValue
      })
    // それらを結合する
    return [...basicColorIdols, ...notBasicColorIdols]
  }
}
