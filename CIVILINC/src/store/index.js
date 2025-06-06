import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';
import complaints from './modules/complaints';
import projects from './modules/projects';
import mlModel from './modules/mlModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    data: null,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const response = await api.get('/your-endpoint');
        commit('SET_DATA', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    getError: state => state.error,
    getData: state => state.data,
  },
  modules: {
    complaints,
    projects,
    mlModel
  }
}); 