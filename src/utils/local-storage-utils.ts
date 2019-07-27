export type LocalStorageKeys = 'AlertMesgColorMightBeWrong'

export type LocalStorageDataTypes = 'string' | 'boolean' | 'number'

export type AvailableTypes = string | boolean | number

function booleanDefaultWhenNull(value: boolean | null, defaultValue: boolean) {
  if (value !== null) {
    return value
  } else {
    return defaultValue
  }
}

export default class LocalStorageUtils {
  static getLocalStorageData(
    key: LocalStorageKeys,
    defaultValue: AvailableTypes,
    type: LocalStorageDataTypes
  ): AvailableTypes {
    const storageValue = localStorage.getItem(key)
    switch (type) {
      case 'string':
        return storageValue || defaultValue
      case 'boolean':
        return booleanDefaultWhenNull(JSON.parse(storageValue!), defaultValue as boolean)
      case 'number':
        return Number(storageValue) || defaultValue
    }
  }

  static setLocalStorageData(key: LocalStorageKeys, value: AvailableTypes) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
