// eslint-disable-next-line no-unused-vars
import AbstractPenlightColor from './abstract-penlight-color'
// eslint-disable-next-line no-unused-vars
import INameAndColor from './i-name-and-color'

export default interface INameAndColorWithPenlightColor {
  nameAndColor: INameAndColor
  penlightColor: AbstractPenlightColor
}
