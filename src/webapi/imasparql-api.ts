// eslint-disable-next-line import/no-webpack-loader-syntax
import findNameAndColorQuery from 'raw-loader!./imasparql-query/find-name-and-color.sparql'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../models/i-name-and-color'
import * as uuidv4 from 'uuid/v4'

interface IImasparqlApiResponce {
  results: {
    bindings: [
      {
        color: {
          value: string
        }
        name: {
          value: string
        }
        namekana: {
          value: string
        }
        title: {
          value: string
        }
      }
    ]
  }
}

export default class ImasparqlApi {
  static readonly ApiEndpoint = 'https://sparql.crssnky.xyz/spql/imas/query'

  static async fetchNameAndColor() {
    const uri = `${this.ApiEndpoint}?query=${encodeURIComponent(findNameAndColorQuery)}`
    const response = (await (await fetch(uri)).json()) as IImasparqlApiResponce
    return response.results.bindings.map(item => {
      const mappedItem: INameAndColor = {
        colorHEX: `#${item.color.value}`,
        name: item.name.value,
        nameKana: item.namekana.value,
        title: this.getShortTitle(item.title.value),
        key: uuidv4(),
        checked: false
      }
      return mappedItem
    })
  }

  static getShortTitle(title: string) {
    switch (title) {
      case '283Pro':
        return 'シャニ'
      case 'MillionStars':
        return 'ミリ'
      case 'CinderellaGirls':
        return 'デレ'
      case '315ProIdols':
        return 'SideM'
      default:
        return title
    }
  }
}
