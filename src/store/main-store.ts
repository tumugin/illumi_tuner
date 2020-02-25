import Vuex from 'vuex'
import Vue from 'vue'
import { IllumiTunerVuexModuleClass, registerIllumiTunerModule } from './illumi-tuner-vuex-module'

Vue.use(Vuex)

export interface RootState {
  IllumiTunerStore: IllumiTunerVuexModuleClass
}

export default function createStore() {
  const store = new Vuex.Store<RootState>({})
  // とりあえず必要なmoduleはここでregisterしておく
  registerIllumiTunerModule(store)
  return store
}
