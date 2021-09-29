import { RootState } from './main-store'
import { Module, Store } from 'vuex'
import ImasparqlApi from '../webapi/imasparql-api'

const module: Module<Record<string, never>, RootState> = {
  namespaced: true,
  getters: {
    imasparqlApi: () => new ImasparqlApi(),
  },
}

export type ApiClientModule = typeof module

export function registerApiClientModule(store: Store<RootState>) {
  if (!store.state.ApiClient) {
    store.registerModule('ApiClient', module)
  }
}
