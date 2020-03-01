import { getModule, Module, VuexModule } from 'vuex-module-decorators'
import ImasparqlApi from '../webapi/imasparql-api'
import { RootState } from './main-store'
import { Store } from 'vuex'

@Module({ name: 'ApiClient', namespaced: true, stateFactory: true })
export class ApiClientModuleClass extends VuexModule {
  imasparqlApi = process.env.NODE_ENV === 'production' ? new ImasparqlApi('/api/imasparql') : new ImasparqlApi()
}

const ApiClientVuexModule = (store?: Store<RootState>) => getModule(ApiClientModuleClass, store)
export default ApiClientVuexModule

export function registerApiClientModule(store: Store<RootState>) {
  if (!store.state.ApiClient) {
    store.registerModule('ApiClient', ApiClientModuleClass)
  }
}
