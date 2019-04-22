export default class ColorUtils {
  static convertColorCodeToRGB(colorCode: string) {
    const hexValue = colorCode.split('')
    const rgb: IRgb = { red: 0, green: 0, blue: 0 }
    switch (hexValue.length) {
      case 3:
        rgb.red = parseInt(hexValue[0] + hexValue[0], 16)
        rgb.green = parseInt(hexValue[1] + hexValue[1], 16)
        rgb.blue = parseInt(hexValue[2] + hexValue[2], 16)
        break
      case 6:
        rgb.red = parseInt(hexValue[0] + hexValue[1], 16)
        rgb.green = parseInt(hexValue[2] + hexValue[3], 16)
        rgb.blue = parseInt(hexValue[4] + hexValue[5], 16)
        break
      default:
        throw new Error('Invalid color code was input.')
    }
    return rgb
  }
}
