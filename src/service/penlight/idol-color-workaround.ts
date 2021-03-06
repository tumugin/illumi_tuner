import INameAndColorWithPenlightColor from '../../models/i-name-and-color-with-penlight-color'
import AbstractPenlightColor from '../../models/abstract-penlight-color'

export default class IdolColorWorkaround {
  static applyMixPenlaWorkaround(list: INameAndColorWithPenlightColor[], availableColors: AbstractPenlightColor[]) {
    // 近似色選択の通りだと一般的に使われるペンライトの色から外れてしまうアイドル用のworkaround
    list.forEach((idol) => {
      switch (idol.nameAndColor.name) {
        case '北沢志保':
          idol.penlightColor = availableColors.find((item) => item.colorName === '#24ホワイト') || idol.penlightColor
          break
        case '高山紗代子':
          idol.penlightColor = availableColors.find((item) => item.colorName === '#22パープル') || idol.penlightColor
          break
        case '所恵美':
          idol.penlightColor = availableColors.find((item) => item.colorName === '#4ブルー') || idol.penlightColor
          break
        case 'ジュリア':
          idol.penlightColor = availableColors.find((item) => item.colorName === '#1レッド') || idol.penlightColor
          break
        case '関裕美':
          idol.penlightColor =
            availableColors.find((item) => item.colorName === '#20サクラピンク') || idol.penlightColor
          break
        default:
          break
      }
    })
  }
}
