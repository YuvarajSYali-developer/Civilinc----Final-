<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Assign Officer</h2>
        <button class="close-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="assign-form">
        <div class="form-group">
          <label for="department">Department</label>
          <select 
            id="department" 
            v-model="selectedDepartment"
            @change="filterOfficers"
          >
            <option value="">Select Department</option>
            <option 
              v-for="dept in departments" 
              :key="dept"
              :value="dept"
            >
              {{ dept }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="officer">Select Officer</label>
          <div class="officer-search">
            <input 
              type="text" 
              id="officer"
              v-model="searchQuery"
              placeholder="Search officers..."
              @input="filterOfficers"
            >
            <i class="fas fa-search"></i>
          </div>
        </div>

        <div class="officers-list" v-if="filteredOfficers.length">
          <div 
            v-for="officer in filteredOfficers" 
            :key="officer.id"
            class="officer-card"
            :class="{ 'selected': selectedOfficer?.id === officer.id }"
            @click="selectOfficer(officer)"
          >
            <div class="officer-info">
              <div class="officer-name">{{ officer.name }}</div>
              <div class="officer-details">
                <span class="officer-role">{{ officer.role }}</span>
                <span class="officer-cases">Active Cases: {{ officer.active_cases }}</span>
              </div>
            </div>
            <div class="officer-status" :class="officer.status">
              {{ officer.status }}
            </div>
          </div>
        </div>
        <div class="no-results" v-else>
          No officers found matching your criteria
        </div>

        <div class="action-buttons">
          <button 
            class="assign-button"
            :disabled="!selectedOfficer"
            @click="assignOfficer"
          >
            <i class="fas fa-user-plus"></i>
            Assign Officer
          </button>
          <button class="cancel-button" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssignOfficerModal',
  props: {
    complaint: {
      type: Object,
      required: true
    },
    departments: {
      type: Array,
      required: true
    },
    officers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedDepartment: '',
      searchQuery: '',
      selectedOfficer: null,
      filteredOfficers: []
    }
  },
  created() {
    this.filterOfficers()
  },
  methods: {
    filterOfficers() {
      this.filteredOfficers = this.officers.filter(officer => {
        const matchesDepartment = !this.selectedDepartment || 
          officer.department === this.selectedDepartment
        const matchesSearch = !this.searchQuery || 
          officer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          officer.role.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchesDepartment && matchesSearch
      })
    },
    selectOfficer(officer) {
      this.selectedOfficer = officer
    },
    assignOfficer() {
      if (this.selectedOfficer) {
        this.$emit('assign', {
          complaintId: this.complaint.id,
          officerId: this.selectedOfficer.id,
          officerName: this.selectedOfficer.name
        })
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
  max-width: 600px;
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

.assign-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #4b5563;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group select,
.officer-search input {
  padding: 0.8rem 1rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.3s ease;
}

.form-group select:focus,
.officer-search input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.officer-search {
  position: relative;
}

.officer-search i {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.officers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.officer-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.officer-card:hover {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.05);
}

.officer-card.selected {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
}

.officer-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.officer-name {
  color: #1e293b;
  font-size: 1rem;
  font-weight: 500;
}

.officer-details {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.officer-status {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.officer-status.available {
  background: rgba(34, 197, 94, 0.1);
  color: #15803d;
}

.officer-status.busy {
  background: rgba(234, 179, 8, 0.1);
  color: #b45309;
}

.officer-status.offline {
  background: rgba(100, 116, 139, 0.1);
  color: #475569;
}

.no-results {
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.assign-button,
.cancel-button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
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

.assign-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.assign-button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.cancel-button {
  background: none;
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: #2563eb;
}

.cancel-button:hover {
  background: rgba(37, 99, 235, 0.05);
  border-color: rgba(37, 99, 235, 0.3);
}
</style> 