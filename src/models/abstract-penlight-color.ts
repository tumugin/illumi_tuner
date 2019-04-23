import ColorUtils from '../service/color/color-utils'

export default abstract class AbstractPenlightColor {
  abstract colorName: string
  abstract colorHEX: string
  abstract isBasicColor: boolean

  get colorRGB() {
    return ColorUtils.convertColorCodeToRGB(this.colorHEX)
  }
}
