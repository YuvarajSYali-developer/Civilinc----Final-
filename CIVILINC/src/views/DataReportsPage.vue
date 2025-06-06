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
      <div class="data-reports-container">
        <!-- Top Navigation Tabs -->
        <div class="tabs-container">
          <button 
            :class="['tab-button', { active: activeTab === 'data-exchange' }]"
            @click="activeTab = 'data-exchange'"
          >
            <i class="fas fa-exchange-alt"></i>
            Data Exchange
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'analytics' }]"
            @click="activeTab = 'analytics'"
          >
            <i class="fas fa-chart-bar"></i>
            Analytics
          </button>
        </div>

        <!-- Content Area -->
        <div class="content-area">
          <!-- Data Exchange Tab -->
          <div v-if="activeTab === 'data-exchange'" class="tab-content">
            <div class="data-exchange-grid">
              <!-- Upload Area -->
              <div class="upload-section">
                <div class="upload-area" 
                     @dragover.prevent 
                     @drop.prevent="handleFileDrop"
                     :class="{ 'dragging': isDragging }">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <h3>Drag & Drop Files Here</h3>
                  <p>or</p>
                  <button class="upload-button" @click="triggerFileInput">
                    Browse Files
                  </button>
                  <input 
                    type="file" 
                    ref="fileInput" 
                    @change="handleFileSelect" 
                    multiple 
                    class="hidden"
                  >
                </div>
              </div>

              <!-- Filter Area -->
              <div class="filter-section">
                <div class="filter-group">
                  <label>Department</label>
                  <select v-model="selectedDepartment" class="filter-select">
                    <option value="">All Departments</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">
                      {{ dept }}
                    </option>
                  </select>
                </div>
                <div class="filter-group">
                  <label>File Type</label>
                  <select v-model="selectedFileType" class="filter-select">
                    <option value="">All Types</option>
                    <option value="PDF">PDF</option>
                    <option value="CSV">CSV</option>
                    <option value="XLSX">XLSX</option>
                  </select>
                </div>
                <div class="filter-group">
                  <label>Date Range</label>
                  <div class="date-range">
                    <input 
                      type="date" 
                      v-model="dateRange.start" 
                      class="date-input"
                    >
                    <span>to</span>
                    <input 
                      type="date" 
                      v-model="dateRange.end" 
                      class="date-input"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Files Table -->
            <div class="files-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Department</th>
                    <th>Uploaded By</th>
                    <th>Upload Date</th>
                    <th>Views</th>
                    <th>Downloads</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="file in filteredFiles" :key="file.id">
                    <td>
                      <i :class="getFileIcon(file.type)"></i>
                      {{ file.name }}
                    </td>
                    <td>{{ file.type }}</td>
                    <td>{{ file.department }}</td>
                    <td>{{ file.uploadedBy }}</td>
                    <td>{{ formatDate(file.uploadDate) }}</td>
                    <td>{{ file.viewCount }}</td>
                    <td>{{ file.downloadCount }}</td>
                    <td>
                      <button class="action-icon" @click="viewFile(file)">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="action-icon" @click="downloadFile(file)">
                        <i class="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div v-if="activeTab === 'analytics'" class="tab-content">
            <div class="analytics-grid">
              <!-- Filters -->
              <div class="analytics-filters">
                <div class="filter-group">
                  <label>Department</label>
                  <select v-model="analyticsDepartment" class="filter-select">
                    <option value="">All Departments</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">
                      {{ dept }}
                    </option>
                  </select>
                </div>
                <div class="filter-group">
                  <label>Time Range</label>
                  <select v-model="timeRange" class="filter-select">
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div class="filter-group" v-if="timeRange === 'custom'">
                  <label>Custom Range</label>
                  <div class="date-range">
                    <input 
                      type="date" 
                      v-model="customDateRange.start" 
                      class="date-input"
                    >
                    <span>to</span>
                    <input 
                      type="date" 
                      v-model="customDateRange.end" 
                      class="date-input"
                    >
                  </div>
                </div>
              </div>

              <!-- Charts -->
              <div class="charts-grid">
                <div class="chart-container">
                  <h3>Complaints by Ward</h3>
                  <canvas id="complaintsChart"></canvas>
                </div>
                <div class="chart-container">
                  <h3>Budget Usage by Department</h3>
                  <canvas id="budgetChart"></canvas>
                </div>
                <div class="chart-container">
                  <h3>Project Delays Over Time</h3>
                  <canvas id="delaysChart"></canvas>
                </div>
                <div class="chart-container">
                  <h3>Work Completion Rate</h3>
                  <canvas id="completionChart"></canvas>
                </div>
              </div>

              <!-- Export Options -->
              <div class="export-options">
                <button class="export-button" @click="generateReport">
                  <i class="fas fa-file-pdf"></i>
                  Generate Report
                </button>
                <button class="export-button" @click="exportToCSV">
                  <i class="fas fa-file-csv"></i>
                  Export to CSV
                </button>
                <button class="export-button" @click="exportToPDF">
                  <i class="fas fa-file-pdf"></i>
                  Export to PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- File Preview Modal -->
    <div v-if="showPreviewModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedFile?.name }}</h3>
          <button class="close-button" @click="showPreviewModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <iframe v-if="selectedFile?.type === 'PDF'" :src="previewUrl" class="preview-frame"></iframe>
          <div v-else class="preview-placeholder">
            <i class="fas fa-file-alt"></i>
            <p>Preview not available for this file type</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'DataReportsPage',
  data() {
    return {
      activeTab: 'data-exchange',
      isDragging: false,
      selectedDepartment: '',
      selectedFileType: '',
      dateRange: {
        start: '',
        end: ''
      },
      analyticsDepartment: '',
      timeRange: '7',
      customDateRange: {
        start: '',
        end: ''
      },
      showPreviewModal: false,
      selectedFile: null,
      previewUrl: '',
      departments: [
        'Water Supply',
        'Roads & Infrastructure',
        'Waste Management',
        'Public Health',
        'Urban Planning'
      ],
      files: [
        {
          id: 1,
          name: 'Water Supply Report Q1',
          type: 'PDF',
          department: 'Water Supply',
          uploadedBy: 'John Doe',
          uploadDate: '2024-01-15',
          viewCount: 45,
          downloadCount: 12
        },
        {
          id: 2,
          name: 'Road Maintenance Data',
          type: 'CSV',
          department: 'Roads & Infrastructure',
          uploadedBy: 'Jane Smith',
          uploadDate: '2024-01-14',
          viewCount: 78,
          downloadCount: 34
        }
      ],
      charts: {}
    }
  },
  computed: {
    filteredFiles() {
      return this.files.filter(file => {
        const matchesDepartment = !this.selectedDepartment || file.department === this.selectedDepartment
        const matchesType = !this.selectedFileType || file.type === this.selectedFileType
        const matchesDate = !this.dateRange.start || !this.dateRange.end || 
          (file.uploadDate >= this.dateRange.start && file.uploadDate <= this.dateRange.end)
        return matchesDepartment && matchesType && matchesDate
      })
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated')
      this.$router.push('/sign-in')
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(e) {
      const files = e.target.files
      this.processFiles(files)
    },
    handleFileDrop(e) {
      this.isDragging = false
      const files = e.dataTransfer.files
      this.processFiles(files)
    },
    processFiles(files) {
      // Handle file processing logic here
      console.log('Processing files:', files)
    },
    getFileIcon(type) {
      const icons = {
        'PDF': 'fas fa-file-pdf',
        'CSV': 'fas fa-file-csv',
        'XLSX': 'fas fa-file-excel'
      }
      return icons[type] || 'fas fa-file'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    viewFile(file) {
      // Implement file preview logic
      console.log('Viewing file:', file)
    },
    downloadFile(file) {
      // Implement file download logic
      console.log('Downloading file:', file)
    },
    initializeCharts() {
      // Initialize charts when the analytics tab is active
      if (this.activeTab === 'analytics') {
        this.$nextTick(() => {
          // Initialize your charts here
          this.initializeComplaintsChart()
          this.initializeBudgetChart()
          this.initializeDelaysChart()
          this.initializeCompletionChart()
        })
      }
    },
    initializeComplaintsChart() {
      const ctx = document.getElementById('complaintsChart')
      if (ctx && !this.charts.complaints) {
        this.charts.complaints = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'],
            datasets: [{
              label: 'Complaints',
              data: [12, 19, 3, 5, 2],
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    },
    initializeBudgetChart() {
      const ctx = document.getElementById('budgetChart')
      if (ctx && !this.charts.budget) {
        this.charts.budget = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Water Supply', 'Roads', 'Waste Management', 'Public Health'],
            datasets: [{
              data: [30, 25, 20, 25],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    },
    initializeDelaysChart() {
      const ctx = document.getElementById('delaysChart')
      if (ctx && !this.charts.delays) {
        this.charts.delays = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Project Delays',
              data: [5, 8, 12, 7, 4, 6],
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    },
    initializeCompletionChart() {
      const ctx = document.getElementById('completionChart')
      if (ctx && !this.charts.completion) {
        this.charts.completion = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Water Supply', 'Roads', 'Waste Management', 'Public Health'],
            datasets: [{
              label: 'Completion Rate',
              data: [85, 65, 90, 75],
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    },
    generateReport() {
      // Implement report generation logic
      console.log('Generating report...')
    },
    exportToCSV() {
      // Implement CSV export logic
      console.log('Exporting to CSV...')
    },
    exportToPDF() {
      // Implement PDF export logic
      console.log('Exporting to PDF...')
    }
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'analytics') {
        this.initializeCharts()
      }
    }
  },
  mounted() {
    if (this.activeTab === 'analytics') {
      this.initializeCharts()
    }
  }
}
</script>

<style scoped>
.page03-container10 {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.page03-container11 {
  width: 280px;
  background-color: #1e40af;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page03-text10 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: block;
}

.page03-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 1rem auto;
  border: 3px solid white;
}

.page03-text11,
.page03-text12 {
  display: block;
  margin-bottom: 0.5rem;
}

.user-role {
  font-size: 0.9rem;
  opacity: 0.8;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-nav a {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background-color 0.3s;
}

.sidebar-nav a:hover,
.sidebar-nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav i {
  width: 20px;
  text-align: center;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.data-reports-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tabs-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #e5e7eb;
  color: #4b5563;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.tab-button:hover {
  background-color: #d1d5db;
}

.tab-button.active {
  background-color: #1e40af;
  color: white;
}

.content-area {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-exchange-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.upload-section {
  grid-column: 1 / -1;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover,
.upload-area.dragging {
  border-color: #1e40af;
  background-color: #f8fafc;
}

.upload-area i {
  font-size: 3rem;
  color: #1e40af;
  margin-bottom: 1rem;
}

.upload-area h3 {
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.upload-button {
  background-color: #1e40af;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #1e3a8a;
}

.hidden {
  display: none;
}

.filter-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #4b5563;
}

.filter-select,
.date-input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.files-table-container {
  margin-top: 2rem;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background-color: #f9fafb;
  font-weight: 500;
  color: #4b5563;
}

.data-table tr:hover {
  background-color: #f9fafb;
}

.action-icon {
  background: none;
  border: none;
  color: #1e40af;
  cursor: pointer;
  padding: 0.25rem;
  margin: 0 0.25rem;
  transition: color 0.3s;
}

.action-icon:hover {
  color: #1e3a8a;
}

.analytics-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.analytics-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.chart-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  color: #1e40af;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.chart-container canvas {
  width: 100% !important;
  height: 300px !important;
}

.export-options {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #1e3a8a;
}

@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page03-container10 {
    flex-direction: column;
  }

  .page03-container11 {
    width: 100%;
    padding: 1rem;
  }

  .data-exchange-grid {
    grid-template-columns: 1fr;
  }

  .export-options {
    flex-direction: column;
  }
}
</style> 