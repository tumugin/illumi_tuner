import Vuex from 'vuex'
import Vue from 'vue'
import { IllumiTunerVuexModuleClass, registerIllumiTunerModule } from './illumi-tuner-vuex-module'
import { ApiClientModule, registerApiClientModule } from './api-client-module'

Vue.use(Vuex)

export interface RootState {
  IllumiTunerStore?: IllumiTunerVuexModuleClass
  ApiClient?: ApiClientModule
}

export default function createStore() {
  const store = new Vuex.Store<RootState>({})
  // とりあえず必要なmoduleはここでregisterしておく
  registerIllumiTunerModule(store)
  registerApiClientModule(store)
  return store
}
