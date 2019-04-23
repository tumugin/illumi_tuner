import findNameAndColorQuery from './imasparql-query/find-name-and-color.sparql'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../models/i-name-and-color'

interface IImasparqlApiResponce {
  results: {
    bindings: [{
      color: {
        value: string
      }
      name: {
        value: string
      }
    }]
  }
}

export default class ImasparqlApi {
  static readonly ApiEndpoint = 'https://sparql.crssnky.xyz/spql/imas/query'

  static async fetchNameAndColor() {
    const uri = `${this.ApiEndpoint}?query=${encodeURIComponent(findNameAndColorQuery)}`
    const response = (await (await fetch(uri)).json()) as IImasparqlApiResponce
    return response.results.bindings.map(item => {
      const mappedItem: INameAndColor = {
        colorHEX: item.color.value,
        name: item.name.value
      }
      return mappedItem
    })
  }
}
