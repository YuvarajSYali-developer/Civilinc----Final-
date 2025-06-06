import { complaintsService } from '../../services/complaints';

export default {
  namespaced: true,
  
  state: {
    complaints: [],
    currentComplaint: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_COMPLAINTS(state, complaints) {
      state.complaints = complaints;
    },
    SET_CURRENT_COMPLAINT(state, complaint) {
      state.currentComplaint = complaint;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_COMPLAINT(state, updatedComplaint) {
      const index = state.complaints.findIndex(c => c.id === updatedComplaint.id);
      if (index !== -1) {
        state.complaints.splice(index, 1, updatedComplaint);
      }
      if (state.currentComplaint && state.currentComplaint.id === updatedComplaint.id) {
        state.currentComplaint = updatedComplaint;
      }
    }
  },

  actions: {
    async fetchComplaints({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const complaints = await complaintsService.getAllComplaints();
        commit('SET_COMPLAINTS', complaints);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchComplaint({ commit }, id) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const complaint = await complaintsService.getComplaint(id);
        commit('SET_CURRENT_COMPLAINT', complaint);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateStatus({ commit }, { id, status }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const updatedComplaint = await complaintsService.updateComplaintStatus(id, status);
        commit('UPDATE_COMPLAINT', updatedComplaint);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async assignOfficer({ commit }, { id, officerId }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const updatedComplaint = await complaintsService.assignOfficer(id, officerId);
        commit('UPDATE_COMPLAINT', updatedComplaint);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getComplaints: state => state.complaints,
    getCurrentComplaint: state => state.currentComplaint,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}; 