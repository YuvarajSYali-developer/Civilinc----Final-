import api from '../../services/api';

export default {
  namespaced: true,
  
  state: {
    projects: [],
    currentProject: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_CURRENT_PROJECT(state, project) {
      state.currentProject = project;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    ADD_PROJECT(state, project) {
      state.projects.unshift(project);
    },
    UPDATE_PROJECT(state, updatedProject) {
      const index = state.projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        state.projects.splice(index, 1, updatedProject);
      }
      if (state.currentProject && state.currentProject.id === updatedProject.id) {
        state.currentProject = updatedProject;
      }
    },
    DELETE_PROJECT(state, projectId) {
      state.projects = state.projects.filter(p => p.id !== projectId);
    }
  },

  actions: {
    async fetchProjects({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.get('/projects');
        commit('SET_PROJECTS', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchProject({ commit }, id) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.get(`/projects/${id}`);
        commit('SET_CURRENT_PROJECT', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createProject({ commit }, projectData) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.post('/projects', projectData);
        commit('ADD_PROJECT', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateProject({ commit }, { id, data }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.put(`/projects/${id}`, data);
        commit('UPDATE_PROJECT', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deleteProject({ commit }, id) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        await api.delete(`/projects/${id}`);
        commit('DELETE_PROJECT', id);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
    isLoading: state => state.loading,
    getError: state => state.error,
    
    // Filtered projects getters
    getProjectsByDepartment: state => department => {
      return state.projects.filter(p => p.department === department);
    },
    
    getProjectsByStatus: state => status => {
      return state.projects.filter(p => p.status === status);
    },
    
    getProjectsBySearch: state => searchTerm => {
      const term = searchTerm.toLowerCase();
      return state.projects.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }
  }
}; 