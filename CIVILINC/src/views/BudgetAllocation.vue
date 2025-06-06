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
      <div class="budget-allocation-container">

        <!-- Header Section -->
        <div class="section-header">
          <h2>AI-Assisted Budget Recommendation</h2>
          <p class="subtitle">Get data-driven insights to support human budget decisions.</p>
          
          <!-- Filters -->
          <div class="filter-controls">
            <div class="filter-group">
                <label for="region-select">Region:</label>
                <select id="region-select" class="filter-select">
                  <option value="">All Regions</option>
                  <option value="zone-a">Zone A</option>
                  <option value="zone-b">Zone B</option>
                   <option value="zone-c">Zone C</option>
                </select>
            </div>
             <div class="filter-group">
                <label for="timeframe-select">Timeframe:</label>
                <select id="timeframe-select" class="filter-select">
                  <option value="year">This Year</option>
                  <option value="quarter">This Quarter</option>
                </select>
            </div>
             <div class="filter-group">
                <label for="total-budget-input">Total Budget (₹ Cr):</label>
                <input type="number" id="total-budget-input" class="filter-input" value="200" min="0">
            </div>
             <div class="filter-group">
                <label>Prioritize Factors:</label>
                 <div class="parameter-toggles">
                    <span>Public Demand</span> <input type="checkbox"> 
                    <span>Environmental Risk</span> <input type="checkbox">
                     <span>Urgency</span> <input type="checkbox">
                 </div>
            </div>
          </div>
        </div>

        <!-- AI Recommendations Panel -->
        <div class="recommendations-panel panel">
          <h3>AI Recommendations</h3>
          <div class="recommendations-table">
            <table>
              <thead>
                <tr>
                  <th>Department/Category</th>
                  <th>Past Year Allocation (₹ Cr)</th>
                  <th>AI Suggested Allocation (₹ Cr)</th>
                  <th>Reason for Change</th>
                  <th>Officer's Final Decision (₹ Cr)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in allocationData" :key="item.category">
                  <td>{{ item.category }}</td>
                  <td class="past-year" data-label="Past Year Allocation">{{ item.pastYear }}</td>
                  <td class="ai-suggestion" data-label="AI Suggested Allocation">{{ item.aiSuggestion }}</td>
                   <td class="reason" data-label="Reason for Change">
                      {{ item.reason }}
                       <i class="fas fa-info-circle" :title="item.reason"></i>
                  </td>
                  <td class="officer-input" data-label="Officer's Final Decision">
                    <input type="number" v-model.number="item.officerFinal" :placeholder="item.aiSuggestion">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-grid">
           <!-- Comparative Visualization -->
            <div class="comparative-viz-panel panel">
              <h3>Allocation Comparison</h3>
              <canvas id="comparativeChart"></canvas>
            </div>

            <!-- Money Saved Graph -->
             <div class="money-saved-panel panel">
              <h3>Potential Savings (AI vs Past Year)</h3>
              <canvas id="moneySavedChart"></canvas>
            </div>
        </div>

        <!-- Explanation / Transparency Panel -->
        <div class="explanation-panel panel">
          <h3>AI Allocation Logic</h3>
          <p>Based on a 27% rise in waterlogging complaints in Zone C and an underutilization of last year's sanitation funds, the AI recommends increasing this year's sanitation budget.</p>
           <p>Conversely, a reduced accident rate on main roads has led to a slight decrease in the recommended budget for the Roads department.</p>
          <!-- More detailed logic/factors can be added here -->
        </div>

         <!-- User Notes -->
        <div class="notes-panel panel">
           <h3>Officer's Notes</h3>
           <textarea placeholder="Add any notes or justifications for the final allocation..."></textarea>
        </div>

         <!-- Actions Panel -->
        <div class="actions-panel panel">
          <h3>Actions</h3>
          <button class="action-btn submit-btn"><i class="fas fa-check"></i> Review and Submit Allocation</button>
          <button class="action-btn"><i class="fas fa-download"></i> Export as PDF</button>
          <button class="action-btn"><i class="fas fa-file-excel"></i> Export as Excel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'BudgetAllocation',
  data() {
    return {
       isAuthenticated: false,
       allocationData: [
          { category: 'Roads & Bridges', pastYear: 40, aiSuggestion: 35, officerFinal: null, reason: 'Reduced accident rate.' },
          { category: 'Water Supply', pastYear: 40, aiSuggestion: 40, officerFinal: null, reason: 'Consistent demand and maintenance needs.' },
          { category: 'Sanitation', pastYear: 20, aiSuggestion: 30, officerFinal: null, reason: 'Rise in disease cases in Zone C.' },
          { category: 'Public Health', pastYear: 30, aiSuggestion: 30, officerFinal: null, reason: 'Stable public health metrics.' },
           { category: 'Urban Planning', pastYear: 50, aiSuggestion: 65, officerFinal: null, reason: 'Increased population density and new development projects.' }
       ],
       comparativeChart: null,
       moneySavedChart: null
    };
  },
  computed: {
      // Data formatted for the comparative chart
      comparativeChartData() {
          const categories = this.allocationData.map(item => item.category);
          const pastYearData = this.allocationData.map(item => item.pastYear);
          const aiSuggestionData = this.allocationData.map(item => item.aiSuggestion);
          // Use AI suggestion as fallback if officer hasn't made a final decision
          const officerFinalData = this.allocationData.map(item => item.officerFinal !== null ? item.officerFinal : item.aiSuggestion);

          return {
              labels: categories,
              datasets: [
                  {
                      label: 'Past Year',
                      backgroundColor: '#d1d5db', // Grey color
                      data: pastYearData
                  },
                  {
                      label: 'AI Suggestion',
                      backgroundColor: '#3b82f6', // Blue color
                      data: aiSuggestionData
                  },
                   {
                      label: 'Officer Final',
                      backgroundColor: '#10b981', // Green color
                      data: officerFinalData
                  }
              ]
          };
      },
      // Data for the money saved chart
      moneySavedChartData() {
          const categories = this.allocationData.map(item => item.category);
          const savingsData = this.allocationData.map(item => item.pastYear - item.aiSuggestion); // Positive is saving, negative is additional needed

          const backgroundColors = savingsData.map(value => 
             value >= 0 ? '#48bb78' : '#e53e3e' // Green for savings, Red for additional needed
          );

          return {
              labels: categories,
              datasets: [
                  {
                      label: 'Potential Savings (₹ Cr)',
                      backgroundColor: backgroundColors,
                      data: savingsData
                  }
              ]
          };
      }
  },
  created() {
    // Check authentication
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!this.isAuthenticated) {
      this.$router.push('/sign-in');
      return;
    }
  },
  mounted() {
     if (!this.isAuthenticated) return;

     this.$nextTick(() => {
        this.renderComparativeChart();
        this.renderMoneySavedChart();
     });
  },
   watch: {
       // Watch for changes in allocationData to update charts
       allocationData: {
           handler() {
               this.renderComparativeChart();
               this.renderMoneySavedChart();
           },
           deep: true
       }
   },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
     renderComparativeChart() {
        const ctx = document.getElementById('comparativeChart');
        if (ctx) {
           if (this.comparativeChart) {
               this.comparativeChart.destroy(); // Destroy previous chart instance
           }
           this.comparativeChart = new Chart(ctx, {
              type: 'bar',
              data: this.comparativeChartData,
              options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 scales: {
                     x: {
                         stacked: false,
                     },
                     y: {
                         stacked: false,
                         beginAtZero: true,
                          ticks: {
                            callback: value => '₹' + value + ' Cr' // Add currency format
                         }
                     }
                 },
                 plugins: {
                    legend: {
                       position: 'top',
                    },
                    title: {
                       display: false,
                       text: 'Budget Allocation Comparison'
                    }
                 },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                  label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                  label += '₹' + context.parsed.y + ' Cr';
                              }
                              return label;
                          }
                      }
                  }
              }
           });
        }
     },
      renderMoneySavedChart() {
         const ctx = document.getElementById('moneySavedChart');
         if (ctx) {
            if (this.moneySavedChart) {
               this.moneySavedChart.destroy(); // Destroy previous chart instance
            }
            this.moneySavedChart = new Chart(ctx, {
               type: 'bar',
               data: this.moneySavedChartData,
               options: {
                 responsive: true,
                 maintainAspectRatio: false,
                  scales: {
                      x: {
                          stacked: false,
                      },
                      y: {
                          stacked: false,
                          beginAtZero: true,
                           ticks: {
                             callback: value => '₹' + value + ' Cr' // Add currency format
                           }
                      }
                  },
                 plugins: {
                    legend: {
                       display: false,
                    },
                    title: {
                       display: false,
                       text: 'Potential Savings'
                    }
                 },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                  label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                  const value = context.parsed.y;
                                  label += (value >= 0 ? '₹' + value + ' Cr Saved' : '₹' + Math.abs(value) + ' Cr Additional');
                              }
                              return label;
                          }
                      }
                  }
               }
            });
         }
      }
    // Placeholder methods for interactions
    // runAIAllocation() { /* Call backend API */ },
    // submitAllocation() { /* Submit final allocation */ },
    // handleExport(format) { /* Trigger export */ }
  }
};
</script>

<style scoped>
/* Base styles */
.page03-container10 {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc; /* Lighter, more modern background */
}

/* Sidebar styles remain unchanged */
.page03-container11 {
  width: 280px; /* Use the width from DataReportsPage */
  background-color: #1e40af; /* Use the background color from DataReportsPage */
  color: white; /* Use the text color from DataReportsPage */
  padding: 1.5rem; /* Use the padding from DataReportsPage */
  display: flex;
  flex-direction: column;
  position: fixed; /* Keep fixed positioning */
  left: 0;
  top: 0;
  bottom: 0; /* Extend to bottom */
  z-index: 100; /* Ensure it's on top */
  overflow-y: auto; /* Add scrolling for content overflow */
  box-sizing: border-box; /* Include padding/border in element's total width and height */
  flex-shrink: 0; /* Prevent shrinking */
}

.sidebar-header {
  text-align: center; /* Center text */
  margin-bottom: 2rem; /* Space below header */
}

.page03-text10 {
  font-size: 1.5rem; /* Use font size from DataReportsPage */
  font-weight: bold; /* Use bold font weight from DataReportsPage */
  margin-bottom: 1rem; /* Use margin from DataReportsPage */
  display: block; /* Ensure it's a block element */
  color: white; /* Explicitly set color to white */
}

.page03-container12 {
  width: 80px; /* Use width from DataReportsPage */
  height: 80px; /* Use height from DataReportsPage */
  border-radius: 50%; /* Make it round */
  margin: 1rem auto; /* Center and add margin from DataReportsPage */
  border: 3px solid white; /* White border from DataReportsPage */
  overflow: hidden; /* Hide overflow for round image */
}

.page03-image {
  width: 100%; /* Image fills the container */
  height: 100%; /* Image fills the container */
  object-fit: cover; /* Crop image to cover the area */
}

.page03-text11,
.page03-text12 {
  display: block; /* Ensure block display from DataReportsPage */
  margin-bottom: 0.5rem; /* Use margin from DataReportsPage */
  color: white; /* Explicitly set color to white */
}

.user-role {
  font-size: 0.9rem; /* Use font size from DataReportsPage */
  opacity: 0.8; /* Use opacity from DataReportsPage */
  color: white; /* Explicitly set color to white */
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Use gap from DataReportsPage */
}

.sidebar-nav a {
  color: white; /* Use white color for links from DataReportsPage */
  text-decoration: none; /* Remove underline */
  padding: 0.75rem 1rem; /* Use padding from DataReportsPage */
  border-radius: 0.5rem; /* Use border-radius from DataReportsPage */
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Use gap from DataReportsPage */
  transition: background-color 0.3s; /* Use transition from DataReportsPage */
}

.sidebar-nav a:hover,
.sidebar-nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1); /* Use hover/active background from DataReportsPage */
}

.sidebar-nav i {
  width: 20px; /* Use icon width from DataReportsPage */
  text-align: center;
  font-size: 1rem; /* Use icon font size from DataReportsPage */
}

.page03-link-new {
    color: white;
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: background-color 0.3s;
}

.page03-link-new:hover, 
.page03-link-new.router-link-active {
    background-color: rgba(255, 255, 255, 0.1);
}

.page03-link6 {
    margin-top: auto; /* Push logout to the bottom */
    border-top: 1px solid rgba(255, 255, 255, 0.1); /* Separator above logout */
    padding-top: 1rem; /* Padding above logout */
}

/* Main Content Area */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9); /* Subtle gradient background */
}

.budget-allocation-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header Section */
.section-header {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.section-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #1e40af, #3b82f6);
}

.section-header h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

/* Filter Controls */
.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-group label {
  font-weight: 600;
  color: #334155;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-select,
.filter-input {
  padding: 0.875rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: white;
  color: #1e293b;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.parameter-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.parameter-toggles span {
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.parameter-toggles input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 2px solid #cbd5e1;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.parameter-toggles input[type="checkbox"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.parameter-toggles input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 0.75rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Recommendations Panel */
.recommendations-panel {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.recommendations-panel h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.recommendations-panel h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 24px;
  background: #3b82f6;
  border-radius: 2px;
}

.recommendations-table {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.recommendations-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.recommendations-table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
}

.recommendations-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 0.875rem;
}

.recommendations-table tr:last-child td {
  border-bottom: none;
}

.recommendations-table tr:hover {
  background-color: #f8fafc;
}

.past-year {
  color: #64748b;
  font-weight: 500;
}

.ai-suggestion {
  color: #3b82f6;
  font-weight: 600;
}

.officer-input input[type="number"] {
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 100px;
  color: #10b981;
  font-weight: 600;
  transition: all 0.2s ease;
}

.officer-input input[type="number"]:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.reason {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reason i {
  color: #94a3b8;
  cursor: help;
  transition: color 0.2s ease;
}

.reason i:hover {
  color: #3b82f6;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.comparative-viz-panel,
.money-saved-panel {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.comparative-viz-panel h3,
.money-saved-panel h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comparative-viz-panel h3::before,
.money-saved-panel h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
}

.comparative-viz-panel canvas,
.money-saved-panel canvas {
  width: 100% !important;
  height: 300px !important;
}

/* Explanation Panel */
.explanation-panel {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.explanation-panel h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.explanation-panel h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
}

.explanation-panel p {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Notes Panel */
.notes-panel {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.notes-panel h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.notes-panel h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
}

.notes-panel textarea {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
}

.notes-panel textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Actions Panel */
.actions-panel {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.actions-panel h3 {
  width: 100%;
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.actions-panel h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.action-btn i {
  font-size: 1rem;
}

.submit-btn {
  background-color: #10b981;
  color: white;
}

.submit-btn:hover {
  background-color: #059669;
}

.action-btn:not(.submit-btn) {
  background-color: #f1f5f9;
  color: #475569;
}

.action-btn:not(.submit-btn):hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }

  .section-header {
    padding: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .filter-controls {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .recommendations-panel,
  .comparative-viz-panel,
  .money-saved-panel,
  .explanation-panel,
  .notes-panel,
  .actions-panel {
    padding: 1.5rem;
  }

  .recommendations-table th,
  .recommendations-table td {
    padding: 0.75rem 1rem;
  }

  .actions-panel {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel {
  animation: fadeIn 0.3s ease-out;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style> 