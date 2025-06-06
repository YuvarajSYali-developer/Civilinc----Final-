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
      <div class="map-forum-container">
        <!-- Map Panel -->
        <div class="map-panel">
          <div class="map-controls">
            <div class="view-toggle">
              <button 
                :class="['toggle-btn', { active: viewMode === 'projects' }]"
                @click="viewMode = 'projects'"
              >
                <i class="fas fa-project-diagram"></i>
                Projects
              </button>
              <button 
                :class="['toggle-btn', { active: viewMode === 'complaints' }]"
                @click="viewMode = 'complaints'"
              >
                <i class="fas fa-exclamation-circle"></i>
                Complaints
              </button>
            </div>
            
            <div class="filters">
              <select v-model="selectedDepartment" class="filter-select">
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </select>
              
              <select v-model="selectedZone" class="filter-select">
                <option value="">All Zones</option>
                <option v-for="zone in zones" :key="zone" :value="zone">
                  {{ zone }}
                </option>
              </select>
            </div>
          </div>

          <div id="map" class="map-container"></div>
        </div>

        <!-- Forum Panel -->
        <div class="forum-panel">
          <div class="forum-header">
            <h2>Department Communication</h2>
            <div class="forum-controls">
              <button class="new-thread-btn" @click="showNewThreadModal = true">
                <i class="fas fa-plus"></i> New Thread
              </button>
              <button class="new-message-btn" @click="showNewMessageModal = true">
                <i class="fas fa-envelope"></i> New Message
              </button>
            </div>
          </div>

          <div class="forum-layout">
            <!-- Left Sidebar -->
            <div class="forum-sidebar">
              <div class="sidebar-section">
                <h3>Departments</h3>
                <div class="department-list">
                  <div 
                    v-for="dept in departments" 
                    :key="dept.id"
                    :class="['department-item', { active: selectedForumDepartment === dept.id }]"
                    @click="selectDepartment(dept)"
                  >
                    <i class="fas fa-building"></i>
                    <span>{{ dept.name }}</span>
                    <span class="notification-badge" v-if="getUnreadCount(dept.id)">{{ getUnreadCount(dept.id) }}</span>
                  </div>
                </div>
              </div>

              <div class="sidebar-section">
                <h3>Direct Messages</h3>
                <div class="dm-list">
                  <div 
                    v-for="official in getAllOfficials()" 
                    :key="official.id"
                    :class="['dm-item', { active: selectedDM === official.id }]"
                    @click="openDirectMessage(official)"
                  >
                    <div class="user-avatar">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="dm-info">
                      <span class="dm-name">{{ official.name }}</span>
                      <span class="dm-role">{{ official.role }}</span>
                    </div>
                    <span class="notification-badge" v-if="getDMUnreadCount(official.id)">{{ getDMUnreadCount(official.id) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Chat Area -->
            <div class="chat-area">
              <div class="chat-header">
                <div class="chat-title">
                  <h3>{{ getCurrentChatTitle() }}</h3>
                  <span class="chat-subtitle">{{ getCurrentChatSubtitle() }}</span>
                </div>
                <div class="chat-actions">
                  <button class="action-btn" @click="toggleChatInfo">
                    <i class="fas fa-info-circle"></i>
                  </button>
                  <button class="action-btn" @click="toggleChatMembers">
                    <i class="fas fa-users"></i>
                  </button>
                </div>
              </div>

              <div class="chat-messages" ref="chatMessages">
                <div v-for="message in getCurrentMessages()" :key="message.id" 
                     :class="['message', { 'message-outgoing': message.isOutgoing }]">
                  <div class="message-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="message-content">
                    <div class="message-header">
                      <span class="message-sender">{{ message.sender }}</span>
                      <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                    </div>
                    <div class="message-text">{{ message.content }}</div>
                    <div class="message-actions" v-if="message.attachments?.length">
                      <div v-for="attachment in message.attachments" :key="attachment.id" class="attachment">
                        <i class="fas fa-paperclip"></i>
                        <span>{{ attachment.name }}</span>
                        <button @click="downloadAttachment(attachment)">
                          <i class="fas fa-download"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chat-input">
                <div class="input-actions">
                  <button class="action-btn" @click="toggleAttachmentMenu">
                    <i class="fas fa-paperclip"></i>
                  </button>
                  <button class="action-btn" @click="toggleMentionMenu">
                    <i class="fas fa-at"></i>
                  </button>
                </div>
                <textarea 
                  v-model="newMessage" 
                  placeholder="Type your message..."
                  @keyup.enter="sendMessage"
                ></textarea>
                <button class="send-btn" @click="sendMessage">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>

            <!-- Right Sidebar (Chat Info/Members) -->
            <div class="chat-sidebar" v-if="showChatInfo || showChatMembers">
              <div class="sidebar-header">
                <h3>{{ showChatInfo ? 'Chat Information' : 'Chat Members' }}</h3>
                <button class="close-btn" @click="closeChatSidebar">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <div v-if="showChatInfo" class="chat-info">
                <div class="info-section">
                  <h4>Department Details</h4>
                  <p>{{ getCurrentDepartmentInfo() }}</p>
                </div>
                <div class="info-section">
                  <h4>Active Projects</h4>
                  <ul>
                    <li v-for="project in getActiveProjects()" :key="project.id">
                      {{ project.title }}
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="showChatMembers" class="chat-members">
                <div v-for="member in getCurrentMembers()" :key="member.id" class="member-item">
                  <div class="member-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="member-info">
                    <span class="member-name">{{ member.name }}</span>
                    <span class="member-role">{{ member.role }}</span>
                  </div>
                  <span class="member-status" :class="member.status">
                    {{ member.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Thread Modal -->
    <div v-if="showNewThreadModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>New Thread</h3>
          <button class="close-btn" @click="showNewThreadModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <input 
            type="text" 
            v-model="newThread.title" 
            placeholder="Thread Title"
            class="thread-title-input"
          >
          <textarea 
            v-model="newThread.content" 
            placeholder="Write your message..."
            class="thread-content-input"
          ></textarea>
          <div class="attachment-section">
            <button class="attach-btn">
              <i class="fas fa-paperclip"></i>
              Attach Files
            </button>
            <input type="file" multiple class="file-input" @change="handleFileUpload">
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showNewThreadModal = false">Cancel</button>
          <button class="submit-btn" @click="createThread">Create Thread</button>
        </div>
      </div>
    </div>

    <!-- New Message Modal -->
    <div v-if="showNewMessageModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>New Message</h3>
          <button class="close-btn" @click="showNewMessageModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>To:</label>
            <select v-model="newMessage.recipient" class="form-select">
              <option value="">Select Recipient</option>
              <optgroup v-for="dept in departments" :key="dept.id" :label="dept.name">
                <option v-for="official in dept.officials" :key="official.id" :value="official.id">
                  {{ official.name }} ({{ official.role }})
                </option>
              </optgroup>
            </select>
          </div>
          <div class="form-group">
            <label>Subject:</label>
            <input type="text" v-model="newMessage.subject" class="form-input" placeholder="Enter subject">
          </div>
          <div class="form-group">
            <label>Message:</label>
            <textarea v-model="newMessage.content" class="form-textarea" placeholder="Type your message..."></textarea>
          </div>
          <div class="form-group">
            <label>Attachments:</label>
            <div class="attachment-upload">
              <button class="upload-btn" @click="triggerFileUpload">
                <i class="fas fa-paperclip"></i> Add Files
              </button>
              <input type="file" ref="fileInput" multiple @change="handleFileUpload" class="file-input">
            </div>
            <div class="attachment-list" v-if="newMessage.attachments.length">
              <div v-for="file in newMessage.attachments" :key="file.id" class="attachment-item">
                <span>{{ file.name }}</span>
                <button @click="removeAttachment(file)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showNewMessageModal = false">Cancel</button>
          <button class="submit-btn" @click="sendNewMessage">Send Message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'MapForumPage',
  data() {
    return {
      viewMode: 'projects',
      selectedDepartment: '',
      selectedZone: '',
      selectedForumDepartment: '',
      forumView: 'recent',
      showNewThreadModal: false,
      showNewMessageModal: false,
      showChatInfo: false,
      showChatMembers: false,
      selectedDM: null,
      mapLayers: {
        roads: true,
        waterLines: false,
        zones: true
      },
      // Custom icons for different types
      customIcons: {
        project: L.icon({
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41],
          shadowSize: [41, 41],
          shadowAnchor: [14, 41],
          className: 'project-pin'
        }),
        complaint: L.icon({
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41],
          shadowSize: [41, 41],
          shadowAnchor: [14, 41],
          className: 'complaint-pin'
        })
      },
      // Scattered locations for projects
      projectLocations: [
        { lat: 13.9299, lng: 75.5681 }, // City Center
        { lat: 13.9310, lng: 75.5670 }, // Residential Area
        { lat: 13.9320, lng: 75.5690 }, // Industrial Area
        { lat: 13.9280, lng: 75.5670 }, // Market Area
        { lat: 13.9305, lng: 75.5665 }  // Suburbs
      ],
      // Scattered locations for complaints
      complaintLocations: [
        { lat: 13.9295, lng: 75.5685 }, // City Center
        { lat: 13.9315, lng: 75.5675 }, // Residential Area
        { lat: 13.9325, lng: 75.5695 }, // Industrial Area
        { lat: 13.9285, lng: 75.5675 }, // Market Area
        { lat: 13.9300, lng: 75.5660 }  // Suburbs
      ],
      departments: [
        {
          id: 'MCD-SW1',
          name: 'Shimoga Water Supply',
          code: 'SW1',
          contact: {
            email: 'water.shimoga@civicinc.gov.in',
            phone: '08182-123456',
            address: 'Shimoga Municipal Corporation, Water Supply Department'
          },
          jurisdiction: 'Shimoga Urban Area',
          officials: [
            { name: 'Rajesh Kumar', role: 'Department Head', contact: '9876543210' },
            { name: 'Suresh M', role: 'Field Engineer', contact: '9876543211' }
          ],
          avgResolutionTime: '48 hours',
          issuesHandled: { live: 15, closed: 120 }
        },
        {
          id: 'MCD-SR1',
          name: 'Shimoga Roads & Infrastructure',
          code: 'SR1',
          contact: {
            email: 'roads.shimoga@civicinc.gov.in',
            phone: '08182-123457',
            address: 'Shimoga Municipal Corporation, Roads Department'
          },
          jurisdiction: 'Shimoga City Roads',
          officials: [
            { name: 'Mohan Kumar', role: 'Department Head', contact: '9876543212' },
            { name: 'Lakshmi Devi', role: 'Field Engineer', contact: '9876543213' }
          ],
          avgResolutionTime: '72 hours',
          issuesHandled: { live: 25, closed: 150 }
        },
        {
          id: 'MCD-SWM1',
          name: 'Shimoga Waste Management',
          code: 'SWM1',
          contact: {
            email: 'waste.shimoga@civicinc.gov.in',
            phone: '08182-123458',
            address: 'Shimoga Municipal Corporation, Waste Management Department'
          },
          jurisdiction: 'Shimoga Urban Area',
          officials: [
            { name: 'Ravi Kumar', role: 'Department Head', contact: '9876543214' },
            { name: 'Suresh Gowda', role: 'Field Supervisor', contact: '9876543215' }
          ],
          avgResolutionTime: '24 hours',
          issuesHandled: { live: 10, closed: 200 }
        }
      ],
      zones: [
        'Shimoga City Center',
        'Shimoga Residential Area',
        'Shimoga Market Area',
        'Shimoga Industrial Area',
        'Shimoga Suburbs'
      ],
      map: null,
      markers: [],
      newThread: {
        title: '',
        content: '',
        category: '',
        department: '',
        attachments: []
      },
      forumThreads: [
        // Projects
        {
          id: 'PRJ001',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Infrastructure',
          title: 'New Road Construction - City Center',
          content: 'Construction of new 4-lane road connecting City Center to Industrial Area.',
          created_by: 'Mohan Kumar',
          timestamp: '2024-02-20T14:00',
          status: 'IN_PROGRESS',
          upvotes: 45,
          comments: [
            {
              author: 'Lakshmi Devi',
              role: 'Field Engineer',
              content: 'Initial survey completed. Construction to begin next week.',
              timestamp: '2024-02-20T15:00'
            }
          ],
          location: {
            lat: 13.9299,
            lng: 75.5681
          }
        },
        {
          id: 'PRJ002',
          department: 'Shimoga Water Supply',
          category: 'Infrastructure',
          title: 'Water Treatment Plant Upgrade',
          content: 'Modernization of water treatment plant with new filtration systems.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-19T10:00',
          status: 'PLANNED',
          upvotes: 35,
          comments: [
            {
              author: 'Suresh M',
              role: 'Project Manager',
              content: 'Equipment procurement in progress.',
              timestamp: '2024-02-19T11:00'
            }
          ],
          location: {
            lat: 13.9310,
            lng: 75.5670
          }
        },
        {
          id: 'PRJ003',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Maintenance',
          title: 'Smart Street Lighting Project',
          content: 'Installation of solar-powered LED street lights across main roads.',
          created_by: 'Lakshmi Devi',
          timestamp: '2024-02-18T09:00',
          status: 'IN_PROGRESS',
          upvotes: 50,
          comments: [
            {
              author: 'Mohan Kumar',
              role: 'Department Head',
              content: 'Phase 1 completed. Moving to Phase 2 next month.',
              timestamp: '2024-02-18T14:00'
            }
          ],
          location: {
            lat: 13.9320,
            lng: 75.5690
          }
        },
        {
          id: 'PRJ004',
          department: 'Shimoga Waste Management',
          category: 'Infrastructure',
          title: 'Waste Segregation Plant',
          content: 'Construction of new waste segregation and recycling facility.',
          created_by: 'Ravi Kumar',
          timestamp: '2024-02-17T11:00',
          status: 'PLANNED',
          upvotes: 40,
          comments: [
            {
              author: 'Suresh Gowda',
              role: 'Project Coordinator',
              content: 'Environmental impact assessment in progress.',
              timestamp: '2024-02-17T13:00'
            }
          ],
          location: {
            lat: 13.9280,
            lng: 75.5670
          }
        },
        {
          id: 'PRJ005',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Maintenance',
          title: 'Pedestrian Bridge Construction',
          content: 'New pedestrian bridge connecting residential area to market.',
          created_by: 'Mohan Kumar',
          timestamp: '2024-02-16T16:00',
          status: 'IN_PROGRESS',
          upvotes: 30,
          comments: [
            {
              author: 'Lakshmi Devi',
              role: 'Field Engineer',
              content: 'Foundation work completed. Starting superstructure.',
              timestamp: '2024-02-16T17:00'
            }
          ],
          location: {
            lat: 13.9305,
            lng: 75.5665
          }
        },
        {
          id: 'PRJ006',
          department: 'Shimoga Water Supply',
          category: 'Infrastructure',
          title: 'Water Pipeline Network Expansion',
          content: 'Extension of water pipeline network to new residential areas.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-15T09:00',
          status: 'PLANNED',
          upvotes: 25,
          comments: [
            {
              author: 'Suresh M',
              role: 'Field Engineer',
              content: 'Survey and planning phase completed.',
              timestamp: '2024-02-15T11:00'
            }
          ],
          location: {
            lat: 13.9315,
            lng: 75.5675
          }
        },
        {
          id: 'PRJ007',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Maintenance',
          title: 'Traffic Signal Modernization',
          content: 'Upgrading traffic signals with smart technology.',
          created_by: 'Lakshmi Devi',
          timestamp: '2024-02-14T14:00',
          status: 'IN_PROGRESS',
          upvotes: 35,
          comments: [
            {
              author: 'Mohan Kumar',
              role: 'Department Head',
              content: 'Testing new signal timing algorithms.',
              timestamp: '2024-02-14T15:00'
            }
          ],
          location: {
            lat: 13.9325,
            lng: 75.5695
          }
        },
        {
          id: 'PRJ008',
          department: 'Shimoga Waste Management',
          category: 'Infrastructure',
          title: 'Public Toilet Construction',
          content: 'Building modern public toilets in market areas.',
          created_by: 'Ravi Kumar',
          timestamp: '2024-02-13T10:00',
          status: 'PLANNED',
          upvotes: 20,
          comments: [
            {
              author: 'Suresh Gowda',
              role: 'Project Coordinator',
              content: 'Site selection completed.',
              timestamp: '2024-02-13T11:00'
            }
          ],
          location: {
            lat: 13.9285,
            lng: 75.5675
          }
        },
        {
          id: 'PRJ009',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Maintenance',
          title: 'Road Widening Project',
          content: 'Widening of main road to reduce traffic congestion.',
          created_by: 'Mohan Kumar',
          timestamp: '2024-02-12T11:00',
          status: 'IN_PROGRESS',
          upvotes: 40,
          comments: [
            {
              author: 'Lakshmi Devi',
              role: 'Field Engineer',
              content: 'Utility relocation in progress.',
              timestamp: '2024-02-12T13:00'
            }
          ],
          location: {
            lat: 13.9300,
            lng: 75.5660
          }
        },
        {
          id: 'PRJ010',
          department: 'Shimoga Water Supply',
          category: 'Infrastructure',
          title: 'Water Tank Renovation',
          content: 'Renovation of main water storage tank.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-11T09:00',
          status: 'PLANNED',
          upvotes: 15,
          comments: [
            {
              author: 'Suresh M',
              role: 'Project Manager',
              content: 'Design phase completed.',
              timestamp: '2024-02-11T10:00'
            }
          ],
          location: {
            lat: 13.9295,
            lng: 75.5685
          }
        },
        // Complaints
        {
          id: 'CMP001',
          department: 'Shimoga Water Supply',
          category: 'Water Quality',
          title: 'Water Pipeline Leak in City Center',
          content: 'Urgent attention needed for water pipeline leak near Shimoga bus stand.',
          created_by: 'Suresh Gowda',
          timestamp: '2024-02-20T14:00',
          status: 'OPEN',
          upvotes: 15,
          comments: [
            {
              author: 'Rajesh Kumar',
              role: 'Department Head',
              content: 'Team dispatched for inspection.',
              timestamp: '2024-02-20T14:30'
            }
          ],
          location: {
            lat: 13.9295,
            lng: 75.5685
          }
        },
        {
          id: 'CMP002',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Maintenance',
          title: 'Pothole on Main Road',
          content: 'Large pothole on main road near Shimoga market causing traffic issues.',
          created_by: 'Lakshmi Devi',
          timestamp: '2024-02-19T10:00',
          status: 'IN_PROGRESS',
          upvotes: 25,
          comments: [
            {
              author: 'Mohan Kumar',
              role: 'Field Engineer',
              content: 'Work order issued. Repair scheduled for tomorrow.',
              timestamp: '2024-02-19T11:00'
            }
          ],
          location: {
            lat: 13.9315,
            lng: 75.5675
          }
        },
        {
          id: 'CMP003',
          department: 'Shimoga Waste Management',
          category: 'Sanitation',
          title: 'Garbage Collection Delay',
          content: 'Garbage collection has been delayed for 3 days in the residential area.',
          created_by: 'Ravi Kumar',
          timestamp: '2024-02-18T09:00',
          status: 'RESOLVED',
          upvotes: 30,
          comments: [
            {
              author: 'Suresh Gowda',
              role: 'Field Supervisor',
              content: 'Issue resolved. Additional collection vehicle deployed.',
              timestamp: '2024-02-18T15:00'
            }
          ],
          location: {
            lat: 13.9325,
            lng: 75.5695
          }
        },
        {
          id: 'CMP004',
          department: 'Shimoga Water Supply',
          category: 'Water Quality',
          title: 'Water Quality Concerns',
          content: 'Residents reporting unusual water color and odor in the industrial area.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-17T11:00',
          status: 'IN_PROGRESS',
          upvotes: 45,
          comments: [
            {
              author: 'Suresh M',
              role: 'Field Engineer',
              content: 'Water samples collected for testing.',
              timestamp: '2024-02-17T13:00'
            }
          ],
          location: {
            lat: 13.9285,
            lng: 75.5675
          }
        },
        {
          id: 'CMP005',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Street Lighting',
          title: 'Street Lights Not Working',
          content: 'Multiple street lights not functioning in the market area.',
          created_by: 'Mohan Kumar',
          timestamp: '2024-02-16T16:00',
          status: 'OPEN',
          upvotes: 20,
          comments: [
            {
              author: 'Lakshmi Devi',
              role: 'Field Engineer',
              content: 'Electrical team dispatched for inspection.',
              timestamp: '2024-02-16T17:00'
            }
          ],
          location: {
            lat: 13.9300,
            lng: 75.5660
          }
        },
        {
          id: 'CMP006',
          department: 'Shimoga Waste Management',
          category: 'Sanitation',
          title: 'Illegal Dumping Site',
          content: 'New illegal waste dumping site discovered near residential area.',
          created_by: 'Ravi Kumar',
          timestamp: '2024-02-15T09:00',
          status: 'OPEN',
          upvotes: 35,
          comments: [
            {
              author: 'Suresh Gowda',
              role: 'Field Supervisor',
              content: 'Investigation in progress.',
              timestamp: '2024-02-15T10:00'
            }
          ],
          location: {
            lat: 13.9310,
            lng: 75.5670
          }
        },
        {
          id: 'CMP007',
          department: 'Shimoga Water Supply',
          category: 'Water Supply',
          title: 'Low Water Pressure',
          content: 'Residents reporting low water pressure in the morning hours.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-14T14:00',
          status: 'IN_PROGRESS',
          upvotes: 40,
          comments: [
            {
              author: 'Suresh M',
              role: 'Field Engineer',
              content: 'Checking pump station pressure.',
              timestamp: '2024-02-14T15:00'
            }
          ],
          location: {
            lat: 13.9320,
            lng: 75.5690
          }
        },
        {
          id: 'CMP008',
          department: 'Shimoga Roads & Infrastructure',
          category: 'Road Safety',
          title: 'Missing Road Sign',
          content: 'Important road sign missing at busy intersection.',
          created_by: 'Lakshmi Devi',
          timestamp: '2024-02-13T10:00',
          status: 'OPEN',
          upvotes: 15,
          comments: [
            {
              author: 'Mohan Kumar',
              role: 'Field Engineer',
              content: 'New sign ordered. Installation scheduled.',
              timestamp: '2024-02-13T11:00'
            }
          ],
          location: {
            lat: 13.9280,
            lng: 75.5670
          }
        },
        {
          id: 'CMP009',
          department: 'Shimoga Waste Management',
          category: 'Sanitation',
          title: 'Overflowing Dustbins',
          content: 'Dustbins overflowing in market area.',
          created_by: 'Ravi Kumar',
          timestamp: '2024-02-12T11:00',
          status: 'IN_PROGRESS',
          upvotes: 25,
          comments: [
            {
              author: 'Suresh Gowda',
              role: 'Field Supervisor',
              content: 'Additional collection scheduled.',
              timestamp: '2024-02-12T13:00'
            }
          ],
          location: {
            lat: 13.9305,
            lng: 75.5665
          }
        },
        {
          id: 'CMP010',
          department: 'Shimoga Water Supply',
          category: 'Water Supply',
          title: 'Water Meter Malfunction',
          content: 'Multiple water meters showing incorrect readings.',
          created_by: 'Rajesh Kumar',
          timestamp: '2024-02-11T09:00',
          status: 'OPEN',
          upvotes: 30,
          comments: [
            {
              author: 'Suresh M',
              role: 'Field Engineer',
              content: 'Technical team dispatched for inspection.',
              timestamp: '2024-02-11T10:00'
            }
          ],
          location: {
            lat: 13.9299,
            lng: 75.5681
          }
        }
      ],
      isAuthenticated: false,
      newMessage: {
        recipient: '',
        subject: '',
        content: '',
        attachments: []
      },
      messages: {
        // Department channels
        'MCD-SW1': [
          {
            id: 1,
            sender: 'Rajesh Kumar',
            content: 'Water quality test results are in. All parameters within normal range.',
            timestamp: '2024-02-20T15:30:00',
            isOutgoing: false
          },
          {
            id: 2,
            sender: 'Suresh M',
            content: 'Great! I\'ll update the dashboard with these results.',
            timestamp: '2024-02-20T15:32:00',
            isOutgoing: false
          }
        ],
        'MCD-SR1': [
          {
            id: 1,
            sender: 'Mohan Kumar',
            content: 'Road widening project Phase 1 completed ahead of schedule.',
            timestamp: '2024-02-20T14:30:00',
            isOutgoing: false
          },
          {
            id: 2,
            sender: 'Lakshmi Devi',
            content: 'Excellent work! Please prepare the Phase 2 documentation.',
            timestamp: '2024-02-20T14:35:00',
            isOutgoing: false
          }
        ],
        // Direct messages
        'DM-1': [
          {
            id: 1,
            sender: 'Rajesh Kumar',
            content: 'Can you review the water treatment plant upgrade proposal?',
            timestamp: '2024-02-20T13:30:00',
            isOutgoing: false
          },
          {
            id: 2,
            sender: 'Dr.Shivayogi.B.Yali',
            content: 'I\'ll review it by end of day.',
            timestamp: '2024-02-20T13:35:00',
            isOutgoing: true
          }
        ]
      },
      unreadCounts: {
        'MCD-SW1': 2,
        'MCD-SR1': 1,
        'DM-1': 1
      }
    }
  },
  created() {
    // Check authentication
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!this.isAuthenticated) {
      this.$router.push('/sign-in')
      return
    }
  },
  mounted() {
    if (!this.isAuthenticated) return

    // Initialize map after component is mounted
    this.$nextTick(() => {
      this.initMap()
    })
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  },
  computed: {
    filteredThreads() {
      return this.forumThreads.filter(thread => {
        const matchesDepartment = thread.department === this.selectedForumDepartment
        const matchesView = this.forumView === 'recent' || 
                          (this.forumView === 'active' && thread.comments.length > 2) ||
                          (this.forumView === 'mentions' && thread.comments.some(c => c.mentions?.length > 0))
        return matchesDepartment && matchesView
      })
    }
  },
  methods: {
    initMap() {
      try {
        // Fix Leaflet default icon issue
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        })

        // Initialize map with Shimoga coordinates
        const mapElement = document.getElementById('map')
        if (!mapElement) {
          console.error('Map element not found')
          return
        }

        // Create map instance centered on Shimoga
        this.map = L.map('map', {
          center: [13.9299, 75.5681], // Shimoga coordinates
          zoom: 13,
          zoomControl: true,
          attributionControl: true
        })

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map)

        // Add markers for projects and complaints
        this.addShimogaMarkers()

        // Force a resize event
        setTimeout(() => {
          this.map.invalidateSize()
        }, 100)
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    },
    addShimogaMarkers() {
      // Clear existing markers
      this.markers.forEach(marker => marker.remove())
      this.markers = []

      // Add markers based on view mode
      this.forumThreads.forEach((thread, index) => {
        const isProject = thread.category === 'Infrastructure' || thread.category === 'Road Maintenance'
        
        // Only add markers that match the current view mode
        if ((this.viewMode === 'projects' && isProject) || 
            (this.viewMode === 'complaints' && !isProject)) {
          const location = isProject ? 
            this.projectLocations[index % this.projectLocations.length] :
            this.complaintLocations[index % this.complaintLocations.length]

          const marker = L.marker([location.lat, location.lng], {
            icon: isProject ? this.customIcons.project : this.customIcons.complaint
          })
          .bindPopup(`
            <div class="marker-popup">
              <h4>${thread.title}</h4>
              <p>${thread.content}</p>
              <div class="marker-meta">
                <span class="status-badge ${thread.status.toLowerCase()}">${thread.status}</span>
                <span class="department-badge">${thread.department}</span>
              </div>
              <div class="marker-actions">
                <button onclick="window.dispatchEvent(new CustomEvent('viewThread', {detail: '${thread.id}'}))">
                  View Details
                </button>
              </div>
            </div>
          `)
          .addTo(this.map)
          
          this.markers.push(marker)
        }
      })
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      this.newThread.attachments.push(...files)
    },
    createThread() {
      if (!this.newThread.title || !this.newThread.content || !this.newThread.department) return

      const thread = {
        id: `THR${Math.floor(Math.random() * 10000)}`,
        department: this.newThread.department,
        category: this.newThread.category,
        title: this.newThread.title,
        content: this.newThread.content,
        created_by: 'Dr.Shivayogi.B.Yali',
        timestamp: new Date().toISOString(),
        status: 'OPEN',
        upvotes: 0,
        comments: [],
        attachments: this.newThread.attachments,
        location: {
          lat: 13.9299 + (Math.random() - 0.5) * 0.01,
          lng: 75.5681 + (Math.random() - 0.5) * 0.01
        }
      }

      this.forumThreads.unshift(thread)
      this.showNewThreadModal = false
      this.newThread = { title: '', content: '', category: '', department: '', attachments: [] }
      
      // Add marker for new thread
      this.addShimogaMarkers()
    },
    handleLogout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      this.$router.push('/')
    },
    getCurrentChatTitle() {
      if (this.selectedDM) {
        const official = this.getAllOfficials().find(o => o.id === this.selectedDM)
        return official ? official.name : ''
      }
      const dept = this.departments.find(d => d.id === this.selectedForumDepartment)
      return dept ? dept.name : ''
    },
    getCurrentChatSubtitle() {
      if (this.selectedDM) {
        const official = this.getAllOfficials().find(o => o.id === this.selectedDM)
        return official ? official.role : ''
      }
      return 'Department Channel'
    },
    getCurrentMessages() {
      if (this.selectedDM) {
        return this.messages[`DM-${this.selectedDM}`] || []
      }
      return this.messages[this.selectedForumDepartment] || []
    },
    getUnreadCount(deptId) {
      return this.unreadCounts[deptId] || 0
    },
    getDMUnreadCount(dmId) {
      return this.unreadCounts[`DM-${dmId}`] || 0
    },
    getAllOfficials() {
      return this.departments.flatMap(dept => 
        dept.officials.map(official => ({
          id: official.id,
          name: official.name,
          role: official.role,
          department: dept.name
        }))
      )
    },
    selectDepartment(dept) {
      this.selectedForumDepartment = dept.id;
      this.selectedDM = null;
      this.showChatInfo = false;
      this.showChatMembers = false;
      
      // Initialize department messages if not exists
      if (!this.messages[dept.id]) {
        this.messages[dept.id] = [];
      }
      
      // Scroll to bottom of messages
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
    openDirectMessage(official) {
      this.selectedDM = official.id;
      this.selectedForumDepartment = null;
      this.showChatInfo = false;
      this.showChatMembers = false;
      
      // Initialize DM messages if not exists
      if (!this.messages[`DM-${official.id}`]) {
        this.messages[`DM-${official.id}`] = [];
      }
      
      // Scroll to bottom of messages
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
    toggleChatInfo() {
      this.showChatInfo = !this.showChatInfo
      this.showChatMembers = false
    },
    toggleChatMembers() {
      this.showChatMembers = !this.showChatMembers
      this.showChatInfo = false
    },
    closeChatSidebar() {
      this.showChatInfo = false
      this.showChatMembers = false
    },
    getCurrentDepartmentInfo() {
      const dept = this.departments.find(d => d.id === this.selectedForumDepartment)
      return dept ? `${dept.name} - ${dept.jurisdiction}` : ''
    },
    getActiveProjects() {
      return this.forumThreads.filter(thread => 
        thread.department === this.selectedForumDepartment && 
        thread.status === 'IN_PROGRESS'
      )
    },
    getCurrentMembers() {
      if (this.selectedDM) {
        const official = this.getAllOfficials().find(o => o.id === this.selectedDM)
        return official ? [official] : []
      }
      const dept = this.departments.find(d => d.id === this.selectedForumDepartment)
      return dept ? dept.officials : []
    },
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      const message = {
        id: Date.now(),
        sender: 'Dr.Shivayogi.B.Yali',
        content: this.newMessage,
        timestamp: new Date().toISOString(),
        isOutgoing: true
      };
      
      if (this.selectedDM) {
        if (!this.messages[`DM-${this.selectedDM}`]) {
          this.messages[`DM-${this.selectedDM}`] = [];
        }
        this.messages[`DM-${this.selectedDM}`].push(message);
      } else if (this.selectedForumDepartment) {
        if (!this.messages[this.selectedForumDepartment]) {
          this.messages[this.selectedForumDepartment] = [];
        }
        this.messages[this.selectedForumDepartment].push(message);
      }
      
      this.newMessage = '';
      
      // Scroll to bottom of messages
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
    sendNewMessage() {
      if (!this.newMessage.recipient || !this.newMessage.content) return

      const message = {
        id: Date.now(),
        sender: 'Dr.Shivayogi.B.Yali',
        subject: this.newMessage.subject,
        content: this.newMessage.content,
        timestamp: new Date().toISOString(),
        attachments: this.newMessage.attachments,
        isOutgoing: true
      }

      if (!this.messages[`DM-${this.newMessage.recipient}`]) {
        this.messages[`DM-${this.newMessage.recipient}`] = []
      }
      this.messages[`DM-${this.newMessage.recipient}`].push(message)

      this.showNewMessageModal = false
      this.newMessage = {
        recipient: '',
        subject: '',
        content: '',
        attachments: []
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      this.newMessage.attachments.push(...files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        file
      })))
    },
    removeAttachment(attachment) {
      this.newMessage.attachments = this.newMessage.attachments.filter(a => a.id !== attachment.id)
    },
    downloadAttachment(attachment) {
      // Implement file download logic
      console.log('Downloading:', attachment)
    }
  },
  watch: {
    viewMode: {
      handler(newValue) {
        this.addShimogaMarkers()
      }
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
}

/* Map & Forum Container */
.map-forum-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - 4rem);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  padding: 1.5rem;
}

/* Map Panel */
.map-panel {
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.map-controls {
  padding: 1.2rem;
  background: #ffffff;
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.view-toggle {
  display: flex;
  gap: 0.8rem;
}

.toggle-btn {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  background: #ffffff;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(37, 99, 235, 0.05);
}

.toggle-btn.active {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  border-color: #2563eb;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  font-size: 0.95rem;
  color: #4b5563;
  background: #ffffff;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #2563eb;
}

/* Map Container */
.map-container {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  z-index: 1;
  background: #f8fafc;
}

/* Forum Panel */
.forum-panel {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.forum-header {
  padding: 1.2rem;
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
  background: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forum-header h2 {
  font-size: 1.4rem;
  color: #1e40af;
  margin: 0;
  font-weight: 600;
}

.forum-controls {
  display: flex;
  gap: 1rem;
}

.new-thread-btn,
.new-message-btn {
  padding: 0.7rem 1.2rem;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.new-thread-btn:hover,
.new-message-btn:hover {
  background: #1d4ed8;
}

/* Forum Layout */
.forum-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  height: calc(100% - 60px);
  background: #ffffff;
}

/* Forum Sidebar */
.forum-sidebar {
  border-right: 1px solid rgba(37, 99, 235, 0.1);
  background: #f8fafc;
  overflow-y: auto;
}

.sidebar-section {
  padding: 1rem;
}

.sidebar-section h3 {
  font-size: 0.9rem;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}

.department-item,
.dm-item {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.department-item:hover,
.dm-item:hover {
  background: rgba(37, 99, 235, 0.05);
}

.department-item.active,
.dm-item.active {
  background: rgba(37, 99, 235, 0.1);
}

.department-item i,
.dm-item i {
  margin-right: 0.8rem;
  color: #4b5563;
}

.notification-badge {
  background: #ef4444;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: auto;
}

/* Chat Area */
.chat-area {
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  display: flex;
  flex-direction: column;
}

.chat-title h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1e40af;
}

.chat-subtitle {
  font-size: 0.85rem;
  color: #6b7280;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(37, 99, 235, 0.05);
  color: #2563eb;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 1rem;
  max-width: 80%;
}

.message-outgoing {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.message-content {
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 12px;
  flex: 1;
}

.message-outgoing .message-content {
  background: #2563eb;
  color: white;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.message-sender {
  font-weight: 500;
  color: #1e40af;
}

.message-outgoing .message-sender {
  color: white;
}

.message-time {
  font-size: 0.8rem;
  color: #6b7280;
}

.message-outgoing .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.message-text {
  line-height: 1.5;
}

.message-actions {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(37, 99, 235, 0.1);
}

.attachment {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(37, 99, 235, 0.05);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.chat-input {
  padding: 1rem;
  border-top: 1px solid rgba(37, 99, 235, 0.1);
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.input-actions {
  display: flex;
  gap: 0.5rem;
}

.chat-input textarea {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  resize: none;
  height: 60px;
  font-family: inherit;
}

.send-btn {
  padding: 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: #1d4ed8;
}

/* Chat Sidebar */
.chat-sidebar {
  border-left: 1px solid rgba(37, 99, 235, 0.1);
  background: #f8fafc;
  overflow-y: auto;
}

.chat-info,
.chat-members {
  padding: 1rem;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h4 {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.8rem;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
}

.member-info {
  flex: 1;
}

.member-name {
  display: block;
  font-weight: 500;
  color: #1e40af;
}

.member-role {
  font-size: 0.8rem;
  color: #6b7280;
}

.member-status {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.member-status.online {
  background: #dcfce7;
  color: #16a34a;
}

.member-status.offline {
  background: #e5e7eb;
  color: #6b7280;
}

.member-status.away {
  background: #fef3c7;
  color: #d97706;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .map-forum-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .map-panel,
  .forum-panel {
    height: 600px;
  }
}

@media (max-width: 768px) {
  .forum-layout {
    grid-template-columns: 1fr;
  }

  .chat-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .chat-sidebar.active {
    transform: translateX(0);
  }
}
</style> 