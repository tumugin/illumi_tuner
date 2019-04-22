export default class MathUtils {
  static radianToDegree(radian: number) {
    return radian * (180 / Math.PI)
  }

  static degreeToRadian(degree: number) {
    return degree * (Math.PI / 180)
  }
}
