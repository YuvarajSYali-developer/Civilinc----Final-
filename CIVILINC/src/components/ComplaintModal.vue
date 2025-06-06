<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Complaint Details</h2>
        <button class="close-button" @click="$emit('close')" type="button">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="complaint-details">
        <div class="detail-grid">
          <div class="detail-group">
            <label>Complaint ID</label>
            <span>{{ complaint.id }}</span>
          </div>

          <div class="detail-group">
            <label>Status</label>
            <span :class="['status-badge', complaint.status]">
              {{ complaint.status }}
            </span>
          </div>

          <div class="detail-group">
            <label>Priority</label>
            <span :class="['priority-badge', complaint.priority]">
              {{ complaint.priority }}
            </span>
          </div>

          <div class="detail-group">
            <label>Department</label>
            <span>{{ complaint.department }}</span>
          </div>

          <div class="detail-group">
            <label>Date Submitted</label>
            <span>{{ formatDate(complaint.date_submitted) }}</span>
          </div>

          <div class="detail-group">
            <label>Assigned Officer</label>
            <span>{{ complaint.assigned_officer || 'Not Assigned' }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h3>Citizen Information</h3>
          <div class="detail-grid">
            <div class="detail-group">
              <label>Name</label>
              <span>{{ complaint.citizen_name }}</span>
            </div>
            <div class="detail-group">
              <label>Contact</label>
              <span>{{ complaint.contact }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>Complaint Description</h3>
          <p class="description">{{ complaint.description }}</p>
        </div>

        <div class="detail-section" v-if="complaint.attachments && complaint.attachments.length">
          <h3>Attachments</h3>
          <div class="attachments-list">
            <div v-for="(file, index) in complaint.attachments" :key="index" class="file-tag">
              <i class="fas fa-file"></i>
              {{ file.name }}
              <button class="view-file" @click="viewFile(file)">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>Resolution Notes</h3>
          <div class="resolution-notes">
            <div v-if="complaint.resolution_notes" class="notes-content">
              {{ complaint.resolution_notes }}
            </div>
            <div v-else class="no-notes">
              No resolution notes available
            </div>
          </div>
        </div>

        <div class="action-section">
          <div class="status-update" v-if="isCommissioner">
            <label for="status">Update Status</label>
            <select id="status" v-model="newStatus" @change="handleStatusUpdate">
              <option value="unresolved">Unresolved</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div class="action-buttons">
            <button 
              v-if="isCommissioner && !complaint.assigned_officer"
              class="assign-button"
              @click="$emit('assign')"
            >
              <i class="fas fa-user-plus"></i>
              Assign Officer
            </button>
            <button 
              v-if="isCommissioner"
              class="edit-button"
              @click="editComplaint"
            >
              <i class="fas fa-edit"></i>
              Edit Complaint
            </button>
            <button class="close-button" @click="$emit('close')">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import toast from '../assets/toast';

export default {
  name: 'ComplaintModal',
  props: {
    complaint: {
      type: Object,
      required: true
    },
    isCommissioner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newStatus: this.complaint.status,
      isUpdating: false,
      error: null
    }
  },
  computed: {
    ...mapState('complaints', ['loading', 'error'])
  },
  methods: {
    ...mapActions('complaints', ['updateStatus', 'assignOfficer']),
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-IN')
    },
    
    async handleStatusUpdate() {
      if (this.newStatus === this.complaint.status) return;
      
      this.isUpdating = true;
      try {
        await this.updateStatus({
          id: this.complaint.id,
          status: this.newStatus
        });
        this.$emit('status-updated', {
          id: this.complaint.id,
          newStatus: this.newStatus
        });
        toast.show('Complaint status updated successfully!', 'success');
      } catch (error) {
        console.error('Failed to update status:', error);
        this.error = error.message || 'Failed to update complaint status.';
        toast.show(this.error, 'error');
      } finally {
        this.isUpdating = false;
      }
    },
    
    editComplaint() {
      this.$emit('edit', this.complaint)
    },
    
    viewFile(file) {
      // Implement file viewing logic
      console.log('Viewing file:', file)
    },
    
    async handleSubmit() {
      this.error = null;
      if (!this.form.title || !this.form.department || !this.form.status) {
        this.error = 'Title, Department, and Status are required.';
        toast.show(this.error, 'error');
        return;
      }
      try {
        // ... existing API call ...
        toast.show('Complaint saved successfully!', 'success');
      } catch (e) {
        this.error = e.message || 'Failed to save complaint.';
        toast.show(this.error, 'error');
      }
    }
  },
  watch: {
    'complaint.status'(newStatus) {
      this.newStatus = newStatus;
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(37, 99, 235, 0.1);
}

.modal-header h2 {
  color: #1e40af;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: #4b5563;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.complaint-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-group label {
  color: #4b5563;
  font-size: 0.9rem;
  font-weight: 500;
}

.detail-group span {
  color: #1e293b;
  font-size: 1rem;
}

.detail-section {
  border-top: 1px solid rgba(37, 99, 235, 0.1);
  padding-top: 1.5rem;
}

.detail-section h3 {
  color: #1e40af;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  color: #1e293b;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.status-badge,
.priority-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.unresolved {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.status-badge.assigned {
  background: rgba(234, 179, 8, 0.1);
  color: #b45309;
}

.status-badge.in-progress {
  background: rgba(37, 99, 235, 0.1);
  color: #1e40af;
}

.status-badge.resolved {
  background: rgba(34, 197, 94, 0.1);
  color: #15803d;
}

.priority-badge.high {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.priority-badge.medium {
  background: rgba(234, 179, 8, 0.1);
  color: #b45309;
}

.priority-badge.low {
  background: rgba(34, 197, 94, 0.1);
  color: #15803d;
}

.attachments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.file-tag {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-file {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.view-file:hover {
  background: rgba(37, 99, 235, 0.2);
}

.resolution-notes {
  background: rgba(37, 99, 235, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(37, 99, 235, 0.1);
}

.notes-content {
  color: #1e293b;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.no-notes {
  color: #64748b;
  font-style: italic;
}

.action-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(37, 99, 235, 0.1);
}

.status-update {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-update select {
  padding: 0.6rem 1rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  font-size: 0.9rem;
  background: #ffffff;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.assign-button,
.edit-button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.assign-button {
  background: #2563eb;
  border: none;
  color: #ffffff;
}

.assign-button:hover {
  background: #1d4ed8;
}

.edit-button {
  background: none;
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: #2563eb;
}

.edit-button:hover {
  background: rgba(37, 99, 235, 0.05);
  border-color: rgba(37, 99, 235, 0.3);
}
</style> 