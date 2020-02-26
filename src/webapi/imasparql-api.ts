import findNameAndColorQuery from 'raw-loader!./imasparql-query/find-name-and-color.sparql'
import findNextLiveQuery from 'raw-loader!./imasparql-query/find-next-live.sparql'
import INameAndColor from '../models/i-name-and-color'
import uuidv4 from 'uuid/v4'
import ILive from '../models/i-live'
import { formatDate } from '../utils/date-utils'
import Axios from 'axios'

interface IImasparqlApiResponse {
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
        actor: {
          value: string
        }
      }
    ]
  }
}

interface IImasparqlLiveListResponse {
  results: {
    bindings: [
      {
        liveName: {
          value: string
        }
        liveDate: {
          value: string
        }
        liveActor: {
          value: string
        }
        liveLocation: {
          value: string
        }
      }
    ]
  }
}

export default class ImasparqlApi {
  static readonly ApiEndpoint = 'https://sparql.crssnky.xyz/spql/imas/query'

  static async fetchNameAndColor() {
    const response = await Axios.get<IImasparqlApiResponse>(this.ApiEndpoint, {
      params: { query: findNameAndColorQuery }
    })
    return response.data.results.bindings.map(item => {
      const mappedItem: INameAndColor = {
        colorHEX: `#${item.color.value}`,
        name: item.name.value,
        nameKana: item.namekana.value,
        title: this.getShortTitle(item.title.value),
        actor: item.actor.value,
        key: uuidv4(),
        checked: false
      }
      return mappedItem
    })
  }

  static async fetchNextLive() {
    const currentDateTime = new Date()
    const date = formatDate(currentDateTime, 'YYYY-MM-DD')
    const queryText = findNextLiveQuery.replace('@@DATE@@', date)
    const response = await Axios.get<IImasparqlLiveListResponse>(this.ApiEndpoint, { params: { query: queryText } })
    return response.data.results.bindings.map(item => {
      return {
        liveName: item.liveName.value,
        liveDate: item.liveDate.value,
        liveActor: item.liveActor.value.split(' '),
        liveLocation: item.liveLocation.value
      } as ILive
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
