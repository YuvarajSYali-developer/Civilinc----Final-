import api from './api';

export const complaintsService = {
  // Fetch all complaints
  async getAllComplaints() {
    try {
      const response = await api.get('/complaints');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Fetch single complaint
  async getComplaint(id) {
    try {
      const response = await api.get(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Update complaint status
  async updateComplaintStatus(id, status) {
    try {
      const response = await api.patch(`/complaints/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Assign officer to complaint
  async assignOfficer(id, officerId) {
    try {
      const response = await api.post(`/complaints/${id}/assign`, { officerId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Add resolution notes
  async addResolutionNotes(id, notes) {
    try {
      const response = await api.post(`/complaints/${id}/notes`, { notes });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server');
    } else {
      // Other errors
      return new Error('An unexpected error occurred');
    }
  }
}; 