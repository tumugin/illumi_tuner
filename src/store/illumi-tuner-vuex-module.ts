import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import mainStore from './main-store'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../models/i-name-and-color'
import ImasparqlApi from '../webapi/imasparql-api'
import nameof from '../utils/nameof-helper'

@Module({ dynamic: true, name: 'IllumiTunerStore', store: mainStore })
export class IllumiTunerVuexModuleClass extends VuexModule {
  imasCharacters: INameAndColor[] = []

  @Mutation
  public setImasCharacters(param: INameAndColor[]) {
    this.imasCharacters = param
  }

  @Action<INameAndColor[]>({ commit: nameof<IllumiTunerVuexModuleClass>('imasCharacters') })
  public async fetchImasCharacters() {
    return await ImasparqlApi.fetchNameAndColor()
  }
}

const IllumiTunerVuexModule = getModule(IllumiTunerVuexModuleClass)
export default IllumiTunerVuexModule
