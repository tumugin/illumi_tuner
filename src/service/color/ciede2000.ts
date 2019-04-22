import MathUtils from './math-utils'

export default class Ciede2000 {
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

  static calculateCiede2000FromRGB(firstColor: IRgb, secondColor: IRgb) {
    const labFirst = this.rgbToLab(firstColor)
    const labSecond = this.rgbToLab(secondColor)
    return this.calculateCiede2000(labFirst.L, labFirst.a, labFirst.b, labSecond.L, labSecond.a, labSecond.b)
  }

  static calculateCiede2000(L1: number, a1: number, b1: number, L2: number, a2: number, b2: number, kL = 1, kC = 1, kH = 1) {
    const deltaLp = L2 - L1
    const L_ = (L1 + L2) / 2
    const C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2))
    const C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2))
    const C_ = (C1 + C2) / 2
    const ap1 = a1 + (a1 / 2) * (1 - Math.sqrt(Math.pow(C_, 7) / (Math.pow(C_, 7) + Math.pow(25, 7))))
    const ap2 = a2 + (a2 / 2) * (1 - Math.sqrt(Math.pow(C_, 7) / (Math.pow(C_, 7) + Math.pow(25, 7))))
    const Cp1 = Math.sqrt(Math.pow(ap1, 2) + Math.pow(b1, 2))
    const Cp2 = Math.sqrt(Math.pow(ap2, 2) + Math.pow(b2, 2))
    const CP_ = (Cp1 + Cp2) / 2
    const deltaCp = Cp2 - Cp1

    let hp1
    if (b1 === 0 && ap1 === 0) {
      hp1 = 0
    } else {
      hp1 = MathUtils.radianToDegree(Math.atan2(b1, ap1))
      if (hp1 < 0) {
        hp1 = hp1 + 360
      }
    }
    let hp2
    if (b2 === 0 && ap2 === 0) {
      hp2 = 0
    } else {
      hp2 = MathUtils.radianToDegree(Math.atan2(b2, ap2))
      if (hp2 < 0) {
        hp2 = hp2 + 360
      }
    }

    let deltahp
    if (C1 === 0 || C2 === 0) {
      deltahp = 0
    } else if (Math.abs(hp1 - hp2) <= 180) {
      deltahp = hp2 - hp1
    } else if (hp2 <= hp1) {
      deltahp = hp2 - hp1 + 360
    } else {
      deltahp = hp2 - hp1 - 360
    }

    const deltaHp = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin(MathUtils.degreeToRadian(deltahp) / 2)

    let HP_
    if (Math.abs(hp1 - hp2) > 180) {
      HP_ = (hp1 + hp2 + 360) / 2
    } else {
      HP_ = (hp1 + hp2) / 2
    }

    const T = 1 -
      0.17 * Math.cos(MathUtils.degreeToRadian(HP_ - 30)) +
      0.24 * Math.cos(MathUtils.degreeToRadian(2 * HP_)) +
      0.32 * Math.cos(MathUtils.degreeToRadian(3 * HP_ + 6)) -
      0.20 * Math.cos(MathUtils.degreeToRadian(4 * HP_ - 63))

    const SL = 1 + ((0.015 * Math.pow(L_ - 50, 2)) / Math.sqrt(20 + Math.pow(L_ - 50, 2)))
    const SC = 1 + 0.045 * CP_
    const SH = 1 + 0.015 * CP_ * T

    const RT = -2 *
      Math.sqrt(
        Math.pow(CP_, 7) /
        (Math.pow(CP_, 7) + Math.pow(25, 7))
      ) *
      Math.sin(MathUtils.degreeToRadian(
        60 * Math.exp(-Math.pow((HP_ - 275) / 25, 2))
      ))

    return Math.sqrt(
      Math.pow(deltaLp / (kL * SL), 2) +
      Math.pow(deltaCp / (kC * SC), 2) +
      Math.pow(deltaHp / (kH * SH), 2) +
      RT * (deltaCp / (kC * SC)) * (deltaHp / (kH * SH))
    )
  }
}
