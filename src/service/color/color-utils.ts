// eslint-disable-next-line no-unused-vars
import IRgb from 'src/models/i-rgb'
// eslint-disable-next-line no-unused-vars
import ILab from '../../models/i-lab'

export default class ColorUtils {
  static convertColorCodeToRGB(colorCode: string) {
    if (colorCode.charAt(0) === '#') {
      colorCode = colorCode.slice(1)
    }
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

  static rgbToLab(rgb: IRgb) {
    let r = rgb.red / 255
    let g = rgb.green / 255
    let b = rgb.blue / 255

    r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92)
    g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92)
    b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92)

    let x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805)
    let y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722)
    let z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505)

    const lab: ILab = {
      L: 0,
      a: 0,
      b: 0
    }

    x *= 100
    y *= 100
    z *= 100

    x /= 95.047
    y /= 100
    z /= 108.883

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (4 / 29)
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (4 / 29)
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (4 / 29)

    lab.L = (116 * y) - 16
    lab.a = 500 * (x - y)
    lab.b = 200 * (y - z)

    return lab
  }
}
