const state = {
  input: null,
  output: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_INPUT(state, input) {
    state.input = input;
  },
  SET_OUTPUT(state, output) {
    state.output = output;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  RESET(state) {
    state.input = null;
    state.output = null;
    state.loading = false;
    state.error = null;
  }
};

const actions = {
  async runModel({ commit }, input) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    commit('SET_INPUT', input);
    try {
      // Replace with your actual API call
      const response = await this._vm.$api.post('/ml-model/run', input);
      commit('SET_OUTPUT', response.data);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  resetModel({ commit }) {
    commit('RESET');
  }
};

const getters = {
  mlInput: state => state.input,
  mlOutput: state => state.output,
  mlLoading: state => state.loading,
  mlError: state => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 