import Vuex from 'vuex'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import { IllumiTunerVuexModuleClass } from './illumi-tuner-vuex-module'

Vue.use(Vuex)

export interface IMainStore {
  illumiTunerStore: IllumiTunerVuexModuleClass
}

const mainStore = new Vuex.Store<IMainStore>({})
export default mainStore
