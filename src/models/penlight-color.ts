import AbstractPenlightColor from './abstract-penlight-color'

export default class PenlightColor extends AbstractPenlightColor {
  colorHEX: string
  colorName: string
  isBasicColor: boolean

  constructor(colorHEX: string, colorName: string, isBasicColor: boolean) {
    super()
    this.colorHEX = colorHEX
    this.colorName = colorName
    this.isBasicColor = isBasicColor
  }
}
