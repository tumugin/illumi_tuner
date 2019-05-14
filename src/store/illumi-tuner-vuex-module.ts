import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import mainStore from './main-store'
import INameAndColor from '../models/i-name-and-color'
import ImasparqlApi from '../webapi/imasparql-api'
import ILive from '../models/i-live'

@Module({ dynamic: true, name: 'IllumiTunerStore', store: mainStore })
export class IllumiTunerVuexModuleClass extends VuexModule {
  imasCharacters: INameAndColor[] = []
  imasLiveList: ILive[] = []
  filterOffice = Array<string>(0)

  @Mutation
  public setImasCharacters(param: INameAndColor[]) {
    this.imasCharacters = param
  }

  @Mutation
  public updateImasCharacter(param: INameAndColor, key: string) {
    const index = this.imasCharacters.findIndex(item => item.key === param.key)
    this.imasCharacters.splice(index, 1, param)
  }

  @Mutation
  public setFilterOffice(param: string[]) {
    this.filterOffice = param
  }

  @Mutation
  public setImasLiveList(param: ILive[]) {
    this.imasLiveList = param
  }

  @Action({})
  public async fetchImasCharacters() {
    const result = await ImasparqlApi.fetchNameAndColor()
    this.setImasCharacters(result)
  }
}

const IllumiTunerVuexModule = getModule(IllumiTunerVuexModuleClass)
export default IllumiTunerVuexModule
