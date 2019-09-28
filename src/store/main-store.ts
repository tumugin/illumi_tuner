import Vuex from 'vuex'
import Vue from 'vue'
import { IllumiTunerVuexModuleClass } from './illumi-tuner-vuex-module'

Vue.use(Vuex)

export interface IMainStore {
  illumiTunerStore: IllumiTunerVuexModuleClass;
}

const mainStore = new Vuex.Store<IMainStore>({})
export default mainStore
