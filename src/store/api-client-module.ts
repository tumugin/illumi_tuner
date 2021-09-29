import { RootState } from './main-store'
import { Module, Store } from 'vuex'
import ImasparqlApi from '../webapi/imasparql-api'

const module: Module<{}, RootState> = {
  namespaced: true,
  getters: {
    imasparqlApi: () =>
      IS_PRODUCTION ? new ImasparqlApi('https://illumituner.firebaseapp.com/api/imasparql') : new ImasparqlApi(),
  },
}

export type ApiClientModule = typeof module

export function registerApiClientModule(store: Store<RootState>) {
  if (!store.state.ApiClient) {
    store.registerModule('ApiClient', module)
  }
}
