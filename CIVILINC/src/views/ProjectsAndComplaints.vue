<template>
  <div class="page03-container10">
    <!-- Sidebar -->
    <div class="page03-container11">
      <div class="sidebar-header">
        <span class="page03-text10">&lt;/&gt; Civilinc</span>
        <div class="page03-container12">
          <img src="/Shivayogi-pic.jpg" alt="Profile" class="page03-image" />
        </div>
        <span class="page03-text11">Welcome back,</span>
        <span class="page03-text12">Dr.Shivayogi.B.Yali</span>
        <span class="user-role">Municipal Commissioner</span>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="page03-link1">
          <i class="fas fa-chart-line"></i>
          Dashboard
        </router-link>
        <router-link to="/projects-complaints" class="page03-link2">
          <i class="fas fa-tasks"></i>
          Projects & Complaints
        </router-link>
        <router-link to="/map-forum" class="page03-link3">
          <i class="fas fa-map-marked-alt"></i>
          Map & Forum
        </router-link>
        <router-link to="/data-reports" class="page03-link4">
          <i class="fas fa-database"></i>
          Data & Reports
        </router-link>
        <router-link to="/budget-allocation" class="page03-link-new">
          <i class="fas fa-chart-pie"></i>
          Budget Allocation
        </router-link>
        <router-link to="/" class="page03-link6" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Tabs for Projects and Complaints -->
      <div class="tabs-container">
        <button
          :class="['tab-button', { active: activeTab === 'projects' }]"
          @click="switchTab('projects')"
        >
          <i class="fas fa-tasks"></i>
          Projects
        </button>
        <button
          :class="['tab-button', { active: activeTab === 'complaints' }]"
          @click="switchTab('complaints')"
          data-test="complaints-tab"
        >
          <i class="fas fa-clipboard-list"></i>
          Complaints
        </button>
      </div>

      <!-- Projects Tab Content -->
      <div v-if="activeTab === 'projects'" class="tab-content">
        <div class="section-header">
          <h2>Projects</h2>
          <button class="add-button" @click="handleAddProject">
            <i class="fas fa-plus"></i>
            Add Project
          </button>
        </div>
        <div class="filters">
          <input
            type="text"
            v-model="projectSearch"
            placeholder="Search projects..."
            class="search-input"
            data-test="project-search"
          />
          <select v-model="selectedProjectDepartment" class="filter-select">
            <option value="">All Departments</option>
            <option>Roads & Infrastructure</option>
            <option>Water Supply</option>
            <option>Waste Management</option>
            <option>Public Health</option>
            <option>Urban Planning</option>
          </select>
          <select v-model="selectedProjectStatus" class="filter-select">
            <option value="">All Statuses</option>
            <option>planned</option>
            <option>in-progress</option>
            <option>completed</option>
            <option>on-hold</option>
          </select>
        </div>

        <div v-if="loading" class="loading">Loading projects...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="filteredProjects.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <p>No projects found.</p>
        </div>
        <div v-else class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in filteredProjects" :key="project.id">
                <td>{{ project.title }}</td>
                <td>{{ project.department }}</td>
                <td>
                  <span :class="['status-badge', project.status]">
                    {{ project.status }}
                  </span>
                </td>
                <td>₹{{ project.budget.toLocaleString() }}</td>
                <td>{{ project.start_date }}</td>
                <td>{{ project.end_date }}</td>
                <td>
                  <button class="action-icon" @click="handleViewProject(project)" title="View Project">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-icon" @click="handleEditProject(project)" title="Edit Project">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-icon delete-button" @click="handleDeleteProject(project.id)" title="Delete Project">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Complaints Tab Content -->
      <div v-if="activeTab === 'complaints'" class="tab-content">
        <div class="section-header">
          <h2>Complaints</h2>
          <!-- Add Complaint button if needed -->
        </div>
        <div class="filters">
          <input
            type="text"
            v-model="complaintSearch"
            placeholder="Search complaints..."
            class="search-input"
          />
          <select v-model="selectedComplaintDepartment" class="filter-select">
            <option value="">All Departments</option>
            <option>Roads & Infrastructure</option>
            <option>Water Supply</option>
            <option>Waste Management</option>
            <option>Public Health</option>
            <option>Urban Planning</option>
          </select>
          <select v-model="selectedComplaintStatus" class="filter-select">
            <option value="">All Statuses</option>
            <option>pending</option>
            <option>in-progress</option>
            <option>resolved</option>
          </select>
        </div>

        <div v-if="loadingComplaints" class="loading">Loading complaints...</div>
        <div v-else-if="errorComplaints" class="error">{{ errorComplaints }}</div>
        <div v-else-if="filteredComplaints.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <p>No complaints found.</p>
        </div>
        <div v-else class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Date</th>
                <th>Category</th>
                <th>Assigned Officer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="complaint in filteredComplaints" :key="complaint.id">
                <td>{{ complaint.title }}</td>
                <td>{{ complaint.department }}</td>
                <td>
                  <span :class="['status-badge', complaint.status]">
                    {{ complaint.status }}
                  </span>
                </td>
                <td>{{ complaint.date }}</td>
                <td>{{ complaint.category }}</td>
                <td>{{ complaint.assigned_officer || 'Unassigned' }}</td>
                <td>
                   <button class="action-icon" @click="handleViewComplaint(complaint)" title="View Complaint">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-icon" @click="handleEditComplaint(complaint)" title="Edit Complaint">
                    <i class="fas fa-edit"></i>
                  </button>
                   <button class="action-icon assign-button" @click="handleAssignOfficer(complaint)" title="Assign Officer">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- AI Suggestion Giver -->
      <div class="mt-8">
        <AISuggestionGiver />
      </div>

      <!-- Modals -->
      <ProjectModal
        v-if="showProjectModal"
        :show-modal.sync="showProjectModal"
        :project="selectedProject"
        :departments="departments"
        @save="handleSaveProject"
        @close="closeProjectModal"
      />

      <ComplaintModal
        v-if="showComplaintModal"
        :show-modal.sync="showComplaintModal"
        :complaint="selectedComplaint"
        @save="handleSaveComplaint"
        @close="showComplaintModal = false"
      />

      <AssignOfficerModal
        v-if="showAssignOfficerModal"
        :show-modal.sync="showAssignOfficerModal"
        :complaint="selectedComplaint"
        @assign="handleAssignOfficerToComplaint"
        @close="showAssignOfficerModal = false"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ProjectModal from '@/components/ProjectModal.vue';
import ComplaintModal from '@/components/ComplaintModal.vue';
import AssignOfficerModal from '@/components/AssignOfficerModal.vue';
import AISuggestionGiver from '@/components/AISuggestionGiver.vue'
import { required, minLength } from 'vuelidate/lib/validators';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

export default {
  name: 'ProjectsAndComplaints',
  components: {
    ProjectModal,
    ComplaintModal,
    AssignOfficerModal,
    AISuggestionGiver,
    LoadingSpinner,
    ErrorBoundary,
  },
  data() {
    return {
      activeTab: 'projects',
      projectSearch: '',
      complaintSearch: '',
      selectedProjectDepartment: '',
      selectedProjectStatus: '',
      selectedComplaintDepartment: '',
      selectedComplaintStatus: '',
      showProjectModal: false,
      showComplaintModal: false,
      showAssignOfficerModal: false,
      selectedProject: null,
      selectedComplaint: null,
      isMobile: false,
      departments: [
        'Roads & Infrastructure',
        'Water Supply',
        'Waste Management',
        'Public Health',
        'Urban Planning'
      ],
      projectForm: {
        title: '',
        department: '',
        status: '',
        budget: '',
        start_date: '',
        end_date: '',
      },
      formErrors: {},
      // Sample Shimoga Projects
      shimogaProjects: [
        {
          id: 1,
          title: 'Shimoga City Road Widening',
          department: 'Roads & Infrastructure',
          status: 'in-progress',
          budget: 25000000,
          start_date: '2024-01-15',
          end_date: '2024-06-30',
          description: 'Widening of main roads in Shimoga city to reduce traffic congestion',
          location: 'Shimoga City Center',
          assigned_engineers: ['Rajesh Kumar', 'Suresh M']
        },
        {
          id: 2,
          title: 'Shimoga Water Supply Upgrade',
          department: 'Water Supply',
          status: 'planned',
          budget: 15000000,
          start_date: '2024-03-01',
          end_date: '2024-08-31',
          description: 'Upgrading water supply infrastructure in Shimoga urban areas',
          location: 'Shimoga Urban Area',
          assigned_engineers: ['Mohan Kumar']
        },
        {
          id: 3,
          title: 'Shimoga Public Park Development',
          department: 'Urban Planning',
          status: 'completed',
          budget: 8000000,
          start_date: '2023-10-01',
          end_date: '2024-01-31',
          description: 'Development of new public park in Shimoga city center',
          location: 'Shimoga City Center',
          assigned_engineers: ['Lakshmi Devi', 'Ravi Kumar']
        }
      ],
      // Sample Shimoga Complaints
      shimogaComplaints: [
        {
          id: 1,
          title: 'Pothole on Main Road',
          department: 'Roads & Infrastructure',
          status: 'pending',
          date: '2024-02-15',
          category: 'Road Maintenance',
          assigned_officer: 'Ramesh Kumar',
          citizen_name: 'Suresh Gowda',
          contact: '9876543210',
          description: 'Large pothole on main road near Shimoga bus stand causing traffic issues',
          priority: 'high',
          location: 'Shimoga Bus Stand Road'
        },
        {
          id: 2,
          title: 'Water Supply Issue',
          department: 'Water Supply',
          status: 'in-progress',
          date: '2024-02-10',
          category: 'Water Supply',
          assigned_officer: 'Mohan Kumar',
          citizen_name: 'Lakshmi Devi',
          contact: '9876543211',
          description: 'Irregular water supply in Shimoga residential area',
          priority: 'medium',
          location: 'Shimoga Residential Area'
        },
        {
          id: 3,
          title: 'Garbage Collection Delay',
          department: 'Waste Management',
          status: 'resolved',
          date: '2024-02-05',
          category: 'Waste Management',
          assigned_officer: 'Suresh M',
          citizen_name: 'Ravi Kumar',
          contact: '9876543212',
          description: 'Garbage not being collected regularly in Shimoga market area',
          priority: 'medium',
          location: 'Shimoga Market Area'
        }
      ]
    };
  },
  computed: {
    ...mapState('projects', ['projects', 'loading', 'error']),
    ...mapState('complaints', {
      complaints: 'complaints',
      loadingComplaints: 'loading',
      errorComplaints: 'error'
    }),
    filteredProjects() {
      let filtered = this.shimogaProjects;
      
      if (this.projectSearch) {
        const search = this.projectSearch.toLowerCase();
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(search) ||
          project.department.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search)
        );
      }
      
      if (this.selectedProjectDepartment) {
        filtered = filtered.filter(project => 
          project.department === this.selectedProjectDepartment
        );
      }
      
      if (this.selectedProjectStatus) {
        filtered = filtered.filter(project => 
          project.status === this.selectedProjectStatus
        );
      }
      
      return filtered;
    },
    filteredComplaints() {
      let filtered = this.shimogaComplaints;
      
      if (this.complaintSearch) {
        const search = this.complaintSearch.toLowerCase();
        filtered = filtered.filter(complaint => 
          complaint.title.toLowerCase().includes(search) ||
          complaint.department.toLowerCase().includes(search) ||
          complaint.description.toLowerCase().includes(search)
        );
      }
      
      if (this.selectedComplaintDepartment) {
        filtered = filtered.filter(complaint => 
          complaint.department === this.selectedComplaintDepartment
        );
      }
      
      if (this.selectedComplaintStatus) {
        filtered = filtered.filter(complaint => 
          complaint.status === this.selectedComplaintStatus
        );
      }
      
      return filtered;
    }
  },
  validations: {
    projectForm: {
      title: { required, minLength: minLength(3) },
      department: { required },
      status: { required },
      budget: { required },
      start_date: { required },
      end_date: { required },
    },
  },
  methods: {
    ...mapActions('projects', [
      'fetchProjects',
      'fetchProjectById',
      'createProject',
      'updateProject',
      'deleteProject',
    ]),
    ...mapActions('complaints', [
      'fetchComplaints',
      'updateComplaintStatus',
      'assignOfficerToComplaint',
    ]),
    async switchTab(tab) {
      if (this.activeTab === tab) return;
      
      // Close any open modals first
      this.closeAllModals();
      
      // Switch the tab
      this.activeTab = tab;
      
      // Fetch data for the new tab
      if (tab === 'projects') {
        await this.fetchProjects();
      } else if (tab === 'complaints') {
        await this.fetchComplaints();
      }
    },
    
    closeAllModals() {
      this.showProjectModal = false;
      this.showComplaintModal = false;
      this.showAssignOfficerModal = false;
      this.selectedProject = null;
      this.selectedComplaint = null;
    },
    
    closeProjectModal() {
      this.showProjectModal = false;
      this.selectedProject = null;
    },
    
    closeComplaintModal() {
      this.showComplaintModal = false;
      this.selectedComplaint = null;
    },
    
    async handleAddProject() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formErrors = this.$v.projectForm.$errors;
        return;
      }
      try {
        await this.$store.dispatch('createProject', this.projectForm);
        this.$router.push('/projects-complaints');
      } catch (error) {
        this.formErrors = error.response?.data || { message: 'An error occurred' };
      }
    },
    
    handleViewProject(project) {
      this.selectedProject = { ...project };
      this.showProjectModal = true;
    },
    
    handleEditProject(project) {
      this.selectedProject = { ...project };
      this.showProjectModal = true;
    },
    
    handleViewComplaint(complaint) {
      this.selectedComplaint = { ...complaint };
      this.showComplaintModal = true;
    },
    
    handleEditComplaint(complaint) {
      this.selectedComplaint = { ...complaint };
      this.showComplaintModal = true;
    },
    
    handleAssignOfficer(complaint) {
      this.selectedComplaint = { ...complaint };
      this.showAssignOfficerModal = true;
    },
    
    async handleSaveProject(projectData) {
      try {
        if (projectData.id) {
          await this.updateProject(projectData);
        } else {
          await this.createProject(projectData);
        }
        this.closeProjectModal();
        await this.fetchProjects();
      } catch (error) {
        console.error('Error saving project:', error);
      }
    },
    
    async handleSaveComplaint(complaintData) {
      try {
        if (complaintData && complaintData.id && complaintData.status) {
          await this.updateComplaintStatus({ 
            id: complaintData.id, 
            status: complaintData.status 
          });
          this.closeComplaintModal();
          await this.fetchComplaints();
        }
      } catch (error) {
        console.error('Error saving complaint:', error);
      }
    },
    
    async handleAssignOfficerToComplaint(assignmentData) {
      try {
        await this.assignOfficerToComplaint(assignmentData);
        this.showAssignOfficerModal = false;
        await this.fetchComplaints();
      } catch (error) {
        console.error('Error assigning officer:', error);
      }
    },
    handleLogout() {
      // Implement logout logic if needed
      console.log('Logout');
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
   created() {
    this.fetchProjects();
    this.fetchComplaints();
     if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); // Set initial state
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  watch: {
    activeTab(newVal) {
      // Fetch data when tab changes if needed
      if (newVal === 'projects' && this.projects.length === 0) {
        this.fetchProjects();
      } else if (newVal === 'complaints' && this.complaints.length === 0) {
        this.fetchComplaints();
      }
    },
     // Watch for changes in route query for tab switching
    '$route.query.tab': {
      immediate: true,
      handler(newTab) {
        if (newTab) {
          this.activeTab = newTab;
        }
      }
    }
  }
};
</script>

<style scoped>
.page03-container10 {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.page03-container11 {
  width: 280px;
  background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page03-text10 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: block;
  color: white;
  letter-spacing: 0.5px;
}

.page03-container12 {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 1.5rem auto;
  border: 3px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.page03-container12:hover {
  transform: scale(1.05);
}

.page03-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page03-text11 {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.page03-text12 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.user-role {
  font-size: 0.85rem;
  opacity: 0.7;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-nav a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sidebar-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

.sidebar-nav a.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-nav i {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2.5rem;
  overflow-y: auto;
}

/* Tabs Styling */
.tabs-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab-button {
  padding: 1rem 2rem;
  border: none;
  background: transparent;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-button:hover {
  color: #1e40af;
  background: rgba(30, 64, 175, 0.05);
}

.tab-button.active {
  background: #1e40af;
  color: white;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.2);
}

.tab-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-header h2 {
  font-size: 1.75rem;
  color: #1e40af;
  font-weight: 700;
}

.add-button {
  background: #1e40af;
  color: white;
  padding: 0.9rem 1.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.2);
}

.add-button:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

/* Filters */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.search-input,
.filter-select {
  padding: 0.8rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  transition: all 0.3s ease;
  min-width: 200px;
}

.search-input:focus,
.filter-select:focus {
  border-color: #1e40af;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  outline: none;
}

/* Table Styling */
.table-responsive {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
}

.data-table th,
.data-table td {
  padding: 1.2rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

.data-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.data-table tbody tr {
  transition: all 0.3s ease;
}

.data-table tbody tr:hover {
  background: #f8fafc;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* Status Badges */
.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  min-width: 100px;
}

.status-badge.planned {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.completed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.on-hold {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.resolved {
  background: #dcfce7;
  color: #166534;
}

/* Action Buttons */
.action-icon,
.delete-button,
.assign-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-right: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.action-icon:hover {
  color: #1e40af;
  background: rgba(30, 64, 175, 0.1);
}

.delete-button {
  color: #ef4444;
}

.delete-button:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.1);
}

.assign-button {
  color: #22c55e;
}

.assign-button:hover {
  color: #16a34a;
  background: rgba(34, 197, 94, 0.1);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 12px;
  margin: 2rem 0;
}

.empty-state i {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #94a3b8;
}

.empty-state p {
  font-size: 1.2rem;
  font-weight: 500;
}

/* Loading and Error States */
.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  background: #f8fafc;
  border-radius: 12px;
  margin: 2rem 0;
}

.error {
  color: #ef4444;
  background: #fef2f2;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 1.5rem;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input,
  .filter-select {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page03-container11 {
    width: 100%;
    position: relative;
    padding: 1rem;
  }
  
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
  
  .sidebar-header {
    display: none;
  }
  
  .sidebar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .sidebar-nav a {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  .tabs-container {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
    justify-content: center;
  }
  
  .data-table th,
  .data-table td {
    padding: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .add-button {
    width: 100%;
    justify-content: center;
  }
}
</style> 