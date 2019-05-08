import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import mainStore from './main-store'
import INameAndColor from '../models/i-name-and-color'
import ImasparqlApi from '../webapi/imasparql-api'

@Module({ dynamic: true, name: 'IllumiTunerStore', store: mainStore })
export class IllumiTunerVuexModuleClass extends VuexModule {
  imasCharacters: INameAndColor[] = []

  @Mutation
  public setImasCharacters(param: INameAndColor[]) {
    this.imasCharacters = param
  }

  @Mutation
  public updateImasCharacter(param: INameAndColor, key: string) {
    const index = this.imasCharacters.findIndex(item => item.key === param.key)
    this.imasCharacters.splice(index, 1, param)
  }

  @Action({})
  public async fetchImasCharacters() {
    const result = await ImasparqlApi.fetchNameAndColor()
    this.setImasCharacters(result)
  }
}

const IllumiTunerVuexModule = getModule(IllumiTunerVuexModuleClass)
export default IllumiTunerVuexModule
