<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ project ? 'Edit Project' : 'Add New Project' }}</h2>
        <button class="close-button" @click="$emit('close')" type="button">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="project-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="title">Project Title</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              placeholder="Enter project title"
            >
          </div>

          <div class="form-group">
            <label for="department">Department</label>
            <select
              id="department"
              v-model="formData.department"
              required
            >
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select
              id="status"
              v-model="formData.status"
              required
            >
              <option value="">Select Status</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label for="budget">Budget (₹)</label>
            <input
              id="budget"
              v-model.number="formData.budget"
              type="number"
              required
              min="0"
              placeholder="Enter project budget"
            >
          </div>

          <div class="form-group">
            <label for="start_date">Start Date</label>
            <input
              id="start_date"
              v-model="formData.start_date"
              type="date"
              required
            >
          </div>

          <div class="form-group">
            <label for="end_date">End Date</label>
            <input
              id="end_date"
              v-model="formData.end_date"
              type="date"
              required
            >
          </div>
        </div>

        <div class="form-group full-width">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            required
            placeholder="Enter project description"
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label>Assigned Engineers</label>
          <div class="engineers-list">
            <div v-for="(engineer, index) in formData.assigned_engineers" :key="index" class="engineer-tag">
              {{ engineer }}
              <button type="button" @click="removeEngineer(index)" class="remove-engineer">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="add-engineer">
              <input
                v-model="newEngineer"
                type="text"
                placeholder="Add engineer"
                @keyup.enter="addEngineer"
              >
              <button type="button" @click="addEngineer" class="add-button">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-button" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="save-button" :disabled="isSubmitting">
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i>
              Saving...
            </span>
            <span v-else>Save Project</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import toast from '../assets/toast';

export default {
  name: 'ProjectModal',
  props: {
    project: {
      type: Object,
      default: null
    },
    departments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formData: {
        title: '',
        department: '',
        status: '',
        budget: 0,
        start_date: '',
        end_date: '',
        description: '',
        assigned_engineers: []
      },
      newEngineer: '',
      isSubmitting: false,
      error: null
    }
  },
  created() {
    if (this.project) {
      this.formData = { ...this.project };
    }
  },
  methods: {
    addEngineer() {
      if (this.newEngineer.trim()) {
        this.formData.assigned_engineers.push(this.newEngineer.trim());
        this.newEngineer = '';
      }
    },
    removeEngineer(index) {
      this.formData.assigned_engineers.splice(index, 1);
    },
    async handleSubmit() {
      this.error = null;
      if (!this.formData.title || !this.formData.department || !this.formData.status) {
        this.error = 'Title, Department, and Status are required.';
        toast.show(this.error, 'error');
        return;
      }
      this.isSubmitting = true;
      try {
        await this.$emit('save', this.formData);
        toast.show('Project saved successfully!', 'success');
      } catch (e) {
        this.error = e.message || 'Failed to save project.';
        toast.show(this.error, 'error');
      } finally {
        this.isSubmitting = false;
      }
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

.project-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  color: #4b5563;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.engineers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  min-height: 3rem;
}

.engineer-tag {
  background: #f1f5f9;
  color: #1e293b;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-engineer {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.remove-engineer:hover {
  background: #e2e8f0;
  color: #dc2626;
}

.add-engineer {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.add-engineer input {
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  flex: 1;
}

.add-engineer input:focus {
  outline: none;
}

.add-button {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.add-button:hover {
  background: rgba(37, 99, 235, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-button,
.save-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background: none;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.cancel-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.save-button {
  background: #2563eb;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-button:hover {
  background: #1d4ed8;
}

.save-button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
    padding: 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .save-button {
    width: 100%;
  }
}
</style> 