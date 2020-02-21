import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import INameAndColor from '../models/i-name-and-color'
import ImasparqlApi from '../webapi/imasparql-api'
import ILive from '../models/i-live'
import { Store } from 'vuex'
import { RootState } from './main-store'

@Module({ name: 'IllumiTunerStore' })
export class IllumiTunerVuexModuleClass extends VuexModule {
  imasCharacters: INameAndColor[] = []

  imasLiveList: ILive[] = []

  filterOffice = Array<string>(0)

  @Mutation
  public setImasCharacters(param: INameAndColor[]) {
    this.imasCharacters = param
  }

  @Mutation
  public updateImasCharacter(param: INameAndColor) {
    const index = this.imasCharacters.findIndex(item => item.key === param.key)
    this.imasCharacters.splice(index, 1, param)
  }

  @Mutation
  public updateImasCharacters(param: INameAndColor[]) {
    param.forEach(character => {
      const index = this.imasCharacters.findIndex(item => item.key === character.key)
      this.imasCharacters.splice(index, 1, character)
    })
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
    // キャラクターリストを更新すると事務所も一旦リセットする必要がある
    // 今のデフォルトは全て選択された状態
    this.setFilterOffice([...new Set(this.imasCharacters.map(item => item.title))])
  }

  @Action({})
  public async fetchImasLiveList() {
    const result = await ImasparqlApi.fetchNextLive()
    this.setImasLiveList(result)
  }
}

const IllumiTunerVuexModule = (store: Store<RootState>) => getModule(IllumiTunerVuexModuleClass, store)
export default IllumiTunerVuexModule

export function registerIllumiTunerModule(store: Store<RootState>) {
  if (!store.state.IllumiTunerStore) {
    store.registerModule('IllumiTunerStore', IllumiTunerVuexModuleClass)
  }
}
