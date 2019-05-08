import AbstractPenlightColor from './abstract-penlight-color'
import INameAndColor from './i-name-and-color'

export default interface INameAndColorWithPenlightColor {
  nameAndColor: INameAndColor
  penlightColor: AbstractPenlightColor
}
