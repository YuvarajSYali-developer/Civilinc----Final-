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
      <!-- Quick Actions -->
      <div class="quick-actions">
        <button class="action-btn" @click="navigateToProjects">
          <i class="fas fa-plus"></i>
          Add Project
        </button>
        <button class="action-btn" @click="$router.push('/map-forum')">
          <i class="fas fa-map-marked-alt"></i>
          View Map
        </button>
        <button class="action-btn" @click="navigateToComplaints">
          <i class="fas fa-list"></i>
          Recent Complaints
        </button>
        <button class="action-btn">
          <i class="fas fa-bell"></i>
          Notifications
        </button>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div class="kpi-content">
            <h3>Total Projects</h3>
            <p class="kpi-period">This Quarter</p>
            <p class="kpi-value">₹2.5 Cr Budget</p>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="kpi-content">
            <h3>Resolved</h3>
            <p class="kpi-period">This Month</p>
            <p class="kpi-value">85% Success Rate</p>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="kpi-content">
            <h3>Pending</h3>
            <p class="kpi-period">Active Projects</p>
            <p class="kpi-value">12 Projects</p>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon">
            <i class="fas fa-stopwatch"></i>
          </div>
          <div class="kpi-content">
            <h3>Response Time</h3>
            <p class="kpi-period">Average</p>
            <p class="kpi-value">2.5 hours</p>
          </div>
        </div>
      </div>

      <!-- Notifications and Activity Feed -->
      <div class="dashboard-grid">
        <!-- Notifications Section -->
        <div class="notifications-section">
          <div class="section-header">
            <h2>Notifications</h2>
            <button class="view-all-btn">View All</button>
          </div>
          <div class="notifications-list">
            <div v-for="(notification, index) in notifications" :key="index" class="notification-item">
              <div class="notification-icon" :class="notification.type">
                <i :class="notification.icon"></i>
              </div>
              <div class="notification-content">
                <p class="notification-text">{{ notification.message }}</p>
                <span class="notification-time">{{ notification.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="activity-feed">
          <div class="section-header">
            <h2>Activity Feed</h2>
            <button class="view-all-btn">View All</button>
          </div>
          <div class="activity-list">
            <div v-for="(activity, index) in activities" :key="index" class="activity-item">
              <div class="activity-icon">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-content">
                <p class="activity-text">{{ activity.message }}</p>
                <div class="activity-meta">
                  <span class="activity-time">{{ activity.time }}</span>
                  <span class="activity-department">{{ activity.department }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Chart Section -->
      <div class="charts-grid">
        <!-- Projects by Department Chart -->
        <div class="page03-container18">
          <div class="section-header">
            <span class="page03-text25">Projects by Department</span>
            <div class="chart-legend">
              <div class="legend-item" v-for="(label, index) in chartData.labels" :key="index">
                <span class="legend-color" :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] }"></span>
                <span class="legend-label">{{ label }}</span>
              </div>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="barChart" height="300"></canvas>
          </div>
        </div>

        <!-- Project Status Distribution -->
        <div class="page03-container18">
          <div class="section-header">
            <span class="page03-text25">Project Status Distribution</span>
          </div>
          <div class="chart-container">
            <canvas id="statusChart" height="300"></canvas>
          </div>
        </div>

        <!-- Budget Utilization -->
        <div class="page03-container18">
          <div class="section-header">
            <span class="page03-text25">Budget Utilization</span>
          </div>
          <div class="chart-container">
            <canvas id="budgetChart" height="300"></canvas>
          </div>
        </div>

        <!-- Timeline Progress -->
        <div class="page03-container18">
          <div class="section-header">
            <span class="page03-text25">Timeline Progress</span>
          </div>
          <div class="chart-container">
            <canvas id="timelineChart" height="300"></canvas>
          </div>
        </div>
      </div>
  
      <!-- Recent Complaints Section -->
      <div class="page03-container20">
        <div class="section-header">
          <span class="page03-text25">Recent Complaints</span>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="recent-complaints">
          <div v-for="(complaint, index) in recentComplaints" :key="index" class="complaint-item">
            <div class="complaint-header">
              <span class="complaint-title">{{ complaint.title }}</span>
              <span :class="['complaint-status', complaint.status]">{{ complaint.status }}</span>
            </div>
            <p class="complaint-description">{{ complaint.description }}</p>
            <div class="complaint-footer">
              <span class="complaint-date">
                <i class="far fa-calendar-alt"></i>
                {{ complaint.date }}
              </span>
              <span class="complaint-category">
                <i class="fas fa-tag"></i>
                {{ complaint.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Officer's Timeline Section -->
      <div class="timeline-section">
        <div class="section-header">
          <span class="page03-text25">Today's Schedule</span>
          <button class="view-all-btn">View Calendar</button>
        </div>
        <div class="timeline-container">
          <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-item" :class="{ 'completed': event.completed }">
            <div class="timeline-time">
              <span class="time">{{ event.time }}</span>
              <div class="timeline-dot"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>{{ event.title }}</h4>
                <span :class="['event-status', event.priority]">{{ event.priority }}</span>
              </div>
              <p class="event-description">{{ event.description }}</p>
              <div class="event-meta">
                <span class="event-location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.location }}
                </span>
                <span class="event-duration">
                  <i class="far fa-clock"></i>
                  {{ event.duration }}
                </span>
              </div>
              <div class="event-actions">
                <button class="action-btn" @click="toggleEventStatus(index)">
                  <i :class="event.completed ? 'fas fa-undo' : 'fas fa-check'"></i>
                  {{ event.completed ? 'Mark Incomplete' : 'Mark Complete' }}
                </button>
                <button class="action-btn" @click="rescheduleEvent(index)">
                  <i class="fas fa-calendar-alt"></i>
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DangerousHTML from 'dangerous-html/vue'
import { Chart, registerables } from 'chart.js'

// Register Chart.js components
Chart.register(...registerables)

export default {
  name: 'Page03',
  props: {},
  components: {
    DangerousHTML,
  },
  data() {
    return {
      rawv1yq: ' ',
      chart: null,
      chartData: {
        labels: ['Roads & Bridges', 'Water Supply', 'Electricity', 'Sanitation', 'Public Works'],
        datasets: [{
          label: 'Projects by Department',
          data: [45, 30, 25, 20, 15],
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(139, 92, 246, 1)'
          ],
          borderWidth: 1
        }]
      },
      notifications: [
        {
          type: 'urgent',
          icon: 'fas fa-exclamation-triangle',
          message: 'Water supply disruption in Sector 15',
          time: '10 minutes ago'
        },
        {
          type: 'update',
          icon: 'fas fa-info-circle',
          message: 'New project approved: Road widening in Main Market',
          time: '1 hour ago'
        },
        {
          type: 'success',
          icon: 'fas fa-check-circle',
          message: 'Sewage treatment plant maintenance completed',
          time: '2 hours ago'
        }
      ],
      activities: [
        {
          icon: 'fas fa-road',
          message: 'Road repair work started on MG Road',
          time: '30 minutes ago',
          department: 'Public Works'
        },
        {
          icon: 'fas fa-water',
          message: 'Water pipeline inspection completed in Sector 12',
          time: '1 hour ago',
          department: 'Water Supply'
        },
        {
          icon: 'fas fa-bolt',
          message: 'Street light maintenance scheduled for tonight',
          time: '2 hours ago',
          department: 'Electricity'
        }
      ],
      recentComplaints: [
        {
          title: 'Pothole on MG Road',
          description: 'Large pothole causing traffic issues near the intersection',
          status: 'pending',
          date: '2024-02-20',
          category: 'Roads'
        },
        {
          title: 'Water Leak in Sector 15',
          description: 'Water pipe leaking near the community park',
          status: 'resolved',
          date: '2024-02-19',
          category: 'Water'
        },
        {
          title: 'Street Light Outage',
          description: 'Multiple street lights not working on Ring Road',
          status: 'in-progress',
          date: '2024-02-18',
          category: 'Electricity'
        }
      ],
      timelineEvents: [
        {
          time: '09:00 AM',
          title: 'Morning Briefing',
          description: 'Daily department meeting to discuss ongoing projects and priorities',
          location: 'Conference Room A',
          duration: '1 hour',
          priority: 'high',
          completed: false
        },
        {
          time: '10:30 AM',
          title: 'Site Inspection - Water Pipeline Project',
          description: 'Inspect the ongoing water pipeline upgrade in Ward 11',
          location: 'Ward 11, Sector 3',
          duration: '2 hours',
          priority: 'high',
          completed: false
        },
        {
          time: '01:00 PM',
          title: 'Lunch with Department Heads',
          description: 'Quarterly review meeting with department heads',
          location: 'City Hall Cafeteria',
          duration: '1 hour',
          priority: 'medium',
          completed: false
        },
        {
          time: '02:30 PM',
          title: 'Public Hearing',
          description: 'Public hearing for the new road widening project',
          location: 'Town Hall',
          duration: '2 hours',
          priority: 'high',
          completed: false
        },
        {
          time: '04:30 PM',
          title: 'Review Project Reports',
          description: 'Review and approve pending project reports',
          location: 'Office',
          duration: '1 hour',
          priority: 'medium',
          completed: false
        }
      ],
      statusChartData: {
        labels: ['Planned', 'In Progress', 'Completed', 'On Hold'],
        datasets: [{
          data: [30, 45, 15, 10],
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 1
        }]
      },
      budgetChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Budget Allocated',
          data: [2500000, 3000000, 2800000, 3200000, 3500000, 4000000],
          borderColor: 'rgba(37, 99, 235, 1)',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Budget Spent',
          data: [2000000, 2500000, 2200000, 2800000, 3000000, 3500000],
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      timelineChartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Planned Progress',
          data: [25, 50, 75, 100],
          borderColor: 'rgba(37, 99, 235, 1)',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Actual Progress',
          data: [20, 45, 65, 85],
          borderColor: 'rgba(245, 158, 11, 1)',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          fill: true,
          tension: 0.4
        }]
      }
    }
  },
  metaInfo: {
    title: 'Dashboard - Civilinc',
    meta: [
      {
        property: 'og:title',
        content: 'Dashboard - Civilinc',
      },
    ],
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeCharts()
    })
  },
  methods: {
    initializeCharts() {
      try {
        // Initialize Projects by Department Chart
        const barCtx = document.getElementById('barChart')
        if (barCtx) {
          new Chart(barCtx, {
            type: 'bar',
            data: this.chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }
          })
        }

        // Initialize Status Distribution Chart
        const statusCtx = document.getElementById('statusChart')
        if (statusCtx) {
          new Chart(statusCtx, {
            type: 'doughnut',
            data: this.statusChartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          })
        }

        // Initialize Budget Chart
        const budgetCtx = document.getElementById('budgetChart')
        if (budgetCtx) {
          new Chart(budgetCtx, {
            type: 'line',
            data: this.budgetChartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => '₹' + (value / 1000000) + 'M'
                  }
                }
              }
            }
          })
        }

        // Initialize Timeline Chart
        const timelineCtx = document.getElementById('timelineChart')
        if (timelineCtx) {
          new Chart(timelineCtx, {
            type: 'line',
            data: this.timelineChartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: value => value + '%'
                  }
                }
              }
            }
          })
        }
      } catch (error) {
        console.error('Error initializing charts:', error)
      }
    },
    handleLogout() {
      // Clear any stored authentication data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      // Navigate to landing page
      this.$router.push('/');
    },
    toggleEventStatus(index) {
      this.timelineEvents[index].completed = !this.timelineEvents[index].completed
    },
    rescheduleEvent(index) {
      // Implement rescheduling logic
      console.log('Rescheduling event:', this.timelineEvents[index].title)
    },
    navigateToProjects() {
      this.$router.push({
        path: '/projects-complaints',
        query: { tab: 'projects' }
      })
    },
    navigateToComplaints() {
      this.$router.push({
        path: '/projects-complaints',
        query: { tab: 'complaints' }
      })
    }
  }
}
</script>

<style scoped>
.page03-container10 {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6; /* Use the background color from DataReportsPage */
}

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

.main-content {
  flex: 1; /* Allow main content to take remaining width */
  margin-left: 280px; /* Add left margin equal to sidebar width */
  padding: 2rem;
  overflow-y: auto; /* Add scrolling for content overflow */
  box-sizing: border-box; /* Include padding in total width */
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem; /* Increased gap for better spacing */
  margin-bottom: 2.5rem; /* Increased bottom margin */
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center; /* Center content */
  gap: 0.75rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb; /* Lighter border */
  border-radius: 0.75rem; /* Slightly larger radius */
  color: #1e40af;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Subtle shadow */
}

.action-btn:hover {
  background: #f9fafb; /* Lighter hover background */
  transform: translateY(-3px); /* More pronounced lift */
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.1); /* More prominent shadow on hover */
  border-color: #bfdbfe; /* Blue border on hover */
}

.action-btn i {
  font-size: 1.2rem; /* Slightly larger icons */
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem; /* Increased bottom margin */
}

.kpi-card {
  background: #ffffff;
  border-radius: 0.75rem; /* Slightly larger radius */
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e5e7eb; /* Lighter border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  transition: all 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-3px); /* More pronounced lift */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* More prominent shadow on hover */
}

.kpi-icon {
  width: 56px; /* Larger icon container */
  height: 56px; /* Larger icon container */
  border-radius: 0.5rem; /* Keep square with rounded corners */
  background: #eff6ff; /* Lighter blue background */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  font-size: 1.8rem; /* Larger icon */
}

.kpi-content h3 {
  color: #1e40af;
  font-size: 1.2rem; /* Slightly larger font */
  margin-bottom: 0.4rem; /* Adjusted margin */
}

.kpi-period {
  color: #6b7280; /* Slightly darker grey */
  font-size: 0.9rem;
  margin-bottom: 0.4rem; /* Adjusted margin */
}

.kpi-value {
  color: #1e40af;
  font-size: 1.4rem; /* Larger value font */
  font-weight: 700; /* Bolder font */
}

/* Dashboard Grid (Notifications and Activity Feed) */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem; /* Increased bottom margin */
}

.notifications-section,
.activity-feed {
  background: #ffffff;
  border-radius: 0.75rem; /* Consistent radius */
  padding: 2rem; /* Increased padding */
  border: 1px solid #e5e7eb; /* Lighter border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem; /* Added padding to bottom */
  border-bottom: 1px solid #e5e7eb; /* Separator line */
}

.section-header h2 {
  color: #1e40af;
  font-size: 1.35rem; /* Slightly larger heading */
  font-weight: 700; /* Bolder heading */
}

.view-all-btn {
  background: none;
  border: none;
  color: #2563eb; /* Blue color */
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
}

.view-all-btn:hover {
  color: #1e40af; /* Darker blue on hover */
  text-decoration: underline;
}

.notifications-list,
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between items */
}

.notification-item,
.activity-item {
  display: flex;
  align-items: flex-start; /* Align items to the top */
  gap: 1rem;
  padding-bottom: 1rem; /* Added bottom padding */
  border-bottom: 1px dashed #e5e7eb; /* Dashed separator */
}

.notifications-list .notification-item:last-child,
.activity-list .activity-item:last-child {
  border-bottom: none; /* Remove border for the last item */
  padding-bottom: 0;
}

.notification-icon,
.activity-icon {
  width: 32px; /* Icon size */
  height: 32px; /* Icon size */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0; /* Prevent shrinking */
}

.notification-icon.urgent { background-color: #ef4444; }
.notification-icon.update { background-color: #f59e0b; }
.notification-icon.success { background-color: #10b981; }

.activity-icon {
  background-color: #60a5fa; /* Default activity icon background */
}

.notification-content,
.activity-content {
  flex-grow: 1; /* Allow content to take available space */
}

.notification-text,
.activity-text {
  color: #374151; /* Darker text color */
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.notification-time,
.activity-meta {
  font-size: 0.85rem;
  color: #6b7280; /* Grey text color */
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.activity-department {
  font-weight: 500;
  color: #4b5563; /* Slightly darker grey for department */
}

/* Chart Section Styles */
.chart-container {
  position: relative;
  height: 300px;
  margin-top: 1.5rem; /* Adjusted margin */
  /* Removed background, border-radius, padding, box-shadow as it's now on the parent container */
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); /* Adjusted min width for charts and make two columns */
  gap: 1.5rem;
  margin-bottom: 2.5rem; /* Increased bottom margin */
}

.page03-container18 {
  background: #ffffff;
  border-radius: 0.75rem; /* Consistent radius */
  padding: 2rem; /* Increased padding */
  border: 1px solid #e5e7eb; /* Lighter border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  display: flex; /* Use flexbox for better layout within the chart container */
  flex-direction: column; /* Stack header and chart vertically */
}

.page03-text25 {
   font-size: 1.35rem; /* Consistent heading size */
   font-weight: 700; /* Consistent heading weight */
   color: #1e40af; /* Consistent heading color */
   margin-bottom: 1rem; /* Add space below heading */
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Increased gap */
  margin-top: 1rem; /* Adjusted margin */
  font-size: 0.9rem;
  justify-content: center; /* Center the legend */
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
}

.legend-color {
  width: 14px; /* Slightly larger color swatch */
  height: 14px; /* Slightly larger color swatch */
  border-radius: 3px;
}

/* Enhanced Recent Complaints */
.page03-container20 {
  background: #ffffff; /* White background */
  border-radius: 0.75rem; /* Consistent radius */
  padding: 2rem; /* Increased padding */
  border: 1px solid #e5e7eb; /* Lighter border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  margin-bottom: 2.5rem; /* Increased bottom margin */
  /* Removed backdrop-filter */
  /* backdrop-filter: blur(10px); */
  /* Removed border from previous style */
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  /* Removed box-shadow from previous style */
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); */
}

.recent-complaints {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between complaint items */
}

.complaint-item {
  background: #f9fafb; /* Light grey background for items */
  border-radius: 0.5rem; /* Rounded corners for items */
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb; /* Item border */
  /* Removed margin-bottom from previous style */
  /* margin-bottom: 1rem; */
  /* Removed backdrop-filter from previous style */
  /* backdrop-filter: blur(5px); */
  /* Removed border from previous style */
  /* border: 1px solid rgba(0, 0, 0, 0.05); */
}

.complaint-item:hover {
  background: #f3f4f6; /* Slightly darker grey on hover */
  transform: translateY(-2px); /* Lift effect */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow on hover */
  border-color: #d1d5db; /* Darker border on hover */
}

.complaint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem; /* Adjusted margin */
}

.complaint-title {
  color: #1e40af;
  font-size: 1.1rem; /* Adjusted font size */
  font-weight: 600;
}

.complaint-status {
  padding: 0.3rem 0.8rem; /* Adjusted padding */
  border-radius: 1rem; /* Pill shape */
  font-size: 0.8rem; /* Adjusted font size */
  font-weight: 600;
  text-transform: capitalize; /* Capitalize status text */
}

.complaint-description {
  color: #4b5563;
  font-size: 0.95rem; /* Adjusted font size */
  margin-bottom: 1rem;
  line-height: 1.6;
  font-weight: 400;
}

.complaint-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem; /* Adjusted font size */
  color: #6b7280; /* Grey text color */
}

.complaint-date,
.complaint-category {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Adjusted gap */
}

.complaint-category {
  background: #e5e7eb; /* Light grey background */
  padding: 0.3rem 0.8rem; /* Adjusted padding */
  border-radius: 1rem; /* Pill shape */
  color: #4b5563; /* Darker text color */
  border: none; /* Remove border */
}

/* Timeline Section Styles */
.timeline-section {
  background: #ffffff;
  border-radius: 0.75rem; /* Consistent radius */
  padding: 2rem; /* Increased padding */
  margin-top: 2rem;
  border: 1px solid #e5e7eb; /* Lighter border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  /* Removed border from previous style */
  /* border: 2px solid rgba(37, 99, 235, 0.2); */
  /* Removed box-shadow from previous style */
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); */
}

.timeline-container {
  position: relative;
  padding: 1rem 0;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 120px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #d1d5db; /* Lighter timeline line */
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.timeline-item.completed {
  opacity: 0.8; /* Slightly reduced opacity for completed items */
}

.timeline-item.completed .timeline-content {
  background: #f3f4f6; /* Light background for completed items */
}

.timeline-time {
  width: 120px;
  padding-right: 2rem;
  text-align: right;
  position: relative;
  font-size: 0.95rem; /* Slightly larger time font */
  color: #4b5563; /* Darker time color */
  font-weight: 500;
  flex-shrink: 0; /* Prevent shrinking */
}

.timeline-dot {
  position: absolute;
  right: -7px; /* Adjusted position */
  top: 50%;
  transform: translateY(-50%);
  width: 14px; /* Slightly larger dot */
  height: 14px; /* Slightly larger dot */
  border-radius: 50%;
  background: #2563eb; /* Blue dot */
  border: 3px solid #ffffff; /* White border */
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3); /* Subtle shadow */
}

.timeline-item.completed .timeline-dot {
  background: #10b981; /* Green for completed */
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3); /* Subtle shadow for completed */
}

.timeline-content {
  flex: 1;
  background: #ffffff;
  border-radius: 0.5rem; /* Rounded corners */
  padding: 1.5rem;
  margin-left: 2rem;
  border: 1px solid #e5e7eb; /* Item border */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-2px); /* Lift effect */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow on hover */
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.timeline-header h4 {
  font-size: 1.1rem;
  color: #1e40af;
  margin: 0;
  font-weight: 600;
}

.event-status {
  padding: 0.3rem 0.8rem; /* Adjusted padding */
  border-radius: 1rem; /* Pill shape */
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize; /* Capitalize status text */
}

.event-status.high {
  background: #fee2e2; /* Light red */
  color: #991b1b; /* Dark red */
  border: none;
}

.event-status.medium {
  background: #fef3c7; /* Light yellow */
  color: #92400e; /* Dark yellow */
  border: none;
}

.event-status.low {
  background: #d1fae5; /* Light green */
  color: #065f46; /* Dark green */
  border: none;
}

.event-description {
  color: #4b5563;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.event-meta {
  display: flex;
  gap: 1rem; /* Adjusted gap */
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.event-location,
.event-duration {
  display: flex;
  align-items: center;
  gap: 0.4rem; /* Adjusted gap */
}

.event-actions {
  display: flex;
  gap: 0.8rem; /* Adjusted gap */
  margin-top: 1rem; /* Added top margin */
}

.event-actions .action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; /* Lighter border */
  border-radius: 0.375rem; /* Smaller radius */
  background: #ffffff;
  color: #2563eb;
  font-size: 0.85rem; /* Adjusted font size */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem; /* Adjusted gap */
  transition: all 0.3s ease;
}

.event-actions .action-btn:hover {
  background: #f3f4f6; /* Light grey background */
  transform: translateY(-1px);
  border-color: #bfdbfe; /* Blue border on hover */
}


/* Responsive Design for Timeline */
@media (max-width: 768px) {
  .timeline-container::before {
    left: 20px; /* Adjusted position for small screens */
  }

  .timeline-time {
    width: 60px; /* Reduced width for time */
    padding-right: 1rem;
    text-align: left; /* Align time to the left */
  }

  .timeline-dot {
    left: 16px; /* Adjusted position to align with line */
    right: auto;
  }

  .timeline-content {
    margin-left: 1rem;
    padding: 1rem; /* Reduced padding */
  }

  .event-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-actions .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr; /* Revert to single column on smaller screens */
  }

  .chart-container {
    height: 250px;
  }

  .page03-container18 {
      padding: 1.5rem; /* Adjust padding on smaller screens */
  }

  .page03-text25 {
      margin-bottom: 0.8rem; /* Adjust margin on smaller screens */
  }
}

@media (max-width: 768px) {
  .page03-container10 {
    flex-direction: column;
  }

  .page03-container11 {
    position: relative; /* Change to relative on small screens */
    width: 100%;
    height: auto;
    z-index: auto;
    margin-left: 0;
    border-right: none;
    box-shadow: none;
    flex-direction: row;
    justify-content: space-around;
    padding: 1rem;
    align-items: center;
    background-color: #1e40af; /* Ensure consistent background on small screens */
    color: white; /* Ensure consistent text color on small screens */
    overflow-y: visible; /* Allow content to be visible */
  }

  .sidebar-header {
    display: none; /* Hide header on small screens */
  }

  .sidebar-nav {
    flex-direction: row;
    gap: 1rem;
    margin-top: 0;
    width: auto;
    flex-grow: 0;
  }

  .sidebar-nav a {
    padding: 0.5rem 0.8rem; /* Adjust padding */
    font-size: 0.8rem; /* Adjust font size */
    gap: 0.5rem; /* Adjust gap */
    flex-direction: column; /* Stack icon and text vertically */
    align-items: center; /* Center icon and text */
    color: white; /* Ensure consistent text color on small screens */
  }

  .sidebar-nav i {
    width: auto; /* Auto width for icons in stacked layout */
    font-size: 1rem; /* Adjust icon font size */
  }

  .page03-link6 {
    margin-top: 0;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }

  .quick-actions,
  .kpi-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem; /* Reduced gap on small screens */
    margin-bottom: 1.5rem; /* Reduced margin on small screens */
  }
  
  .action-btn,
  .kpi-card,
  .notifications-section,
  .activity-feed,
  .page03-container18,
  .page03-container20,
  .timeline-section {
      padding: 1.5rem; /* Adjusted padding on small screens */
  }

  .chart-container {
    height: 200px;
  }

  .page03-container12 {
    width: 60px;
    height: 60px;
    margin: 0.5rem 0;
  }

  .page03-text10 {
    display: none;
  }

  .page03-text11,
  .page03-text12 {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .user-role {
    font-size: 0.8rem;
  }
}
</style>
