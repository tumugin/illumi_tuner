// eslint-disable-next-line no-unused-vars
import INameAndColorWithPenlightColor from '../../models/i-name-and-color-with-penlight-color'
// eslint-disable-next-line no-unused-vars
import AbstractPenlightColor from '../../models/abstract-penlight-color'

export default class IdolColorWorkaround {
  static applyWorkaround(list: INameAndColorWithPenlightColor[], availableColors: AbstractPenlightColor[]) {
    // 近似色選択の通りだと一般的に使われるペンライトの色から外れてしまうアイドル用のworkaround
    list.forEach(idol => {
      switch (idol.nameAndColor.name) {
        case '北沢志保':
          idol.penlightColor = availableColors.find(item => item.colorName === '#24ホワイト')!
          break
        case '高山紗代子':
          idol.penlightColor = availableColors.find(item => item.colorName === '#22パープル')!
          break
        default:
          break
      }
    })
  }
}
