import IRgb from '../../models/i-rgb'
import ColorUtils from './color-utils'

export default class Cie76 {
  static calculateCie76FromRGB(firstColor: IRgb, secondColor: IRgb) {
    const labFirst = ColorUtils.rgbToLab(firstColor)
    const labSecond = ColorUtils.rgbToLab(secondColor)
    return this.calculateCie76(labFirst.L, labFirst.a, labFirst.b, labSecond.L, labSecond.a, labSecond.b)
  }

  static calculateCie76(L1: number, a1: number, b1: number, L2: number, a2: number, b2: number) {
    return Math.sqrt(Math.pow(L2 - L1, 2) + Math.pow(a2 - a1, 2) + Math.pow(b2 - b1, 2))
  }
}
