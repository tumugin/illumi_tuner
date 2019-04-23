import ColorUtils from '../color/color-utils'
// eslint-disable-next-line no-unused-vars
import AbstractPenlightColor from '../../models/abstract-penlight-color'
import Ciede2000 from '../color/ciede2000'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../../models/i-name-and-color'
// eslint-disable-next-line no-unused-vars
import INameAndColorWithPenlightColor from '../../models/i-name-and-color-with-penlight-color'
import PenlightColor from '../../models/penlight-color'

interface IColorDiffWithIPenlightColor {
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
      return arrayOfIdol.map(item => {
        const mapItem: INameAndColorWithPenlightColor = {
          nameAndColor: item,
          penlightColor: new PenlightColor(item.colorHEX, '', false)
        }
        return mapItem
      })
    }
    return arrayOfIdol.map(item => {
      const idolColorRGB = ColorUtils.convertColorCodeToRGB(item.colorHEX)
      const colorDiffList = this.availableColors.map(penlightColorItem => {
        const mapValue: IColorDiffWithIPenlightColor = {
          penlightColor: penlightColorItem,
          diff: Ciede2000.calculateCiede2000FromRGB(penlightColorItem.colorRGB, idolColorRGB)
        }
        return mapValue
      })
      const searchResultMapValue: INameAndColorWithPenlightColor = {
        nameAndColor: item,
        penlightColor: colorDiffList.sort((a, b) => a.diff - b.diff)[0].penlightColor
      }
      return searchResultMapValue
    })
  }
}
