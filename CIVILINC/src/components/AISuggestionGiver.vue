<template>
  <div class="ai-advisor-container">
    <div class="ai-advisor-header">
      <div class="header-content">
        <div class="title-section">
          <i class="fas fa-robot text-blue-600"></i>
          <h2>Smart Project Advisor</h2>
        </div>
        <div class="ai-badge">
          <span>Powered by AI</span>
          <i class="fas fa-microchip"></i>
        </div>
      </div>
      <p class="subtitle">Get intelligent project suggestions based on area data and historical patterns</p>
    </div>

    <div class="area-selector">
      <label>Select Area</label>
      <div class="select-wrapper">
        <select 
          v-model="selectedArea" 
          @change="fetchSuggestions"
        >
          <option value="">Choose an area...</option>
          <option v-for="area in areas" :key="area.id" :value="area.id">
            {{ area.name }}
          </option>
        </select>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Analyzing area data...</p>
    </div>

    <div v-else-if="suggestions.length" class="suggestions-grid">
      <div 
        v-for="(suggestion, index) in suggestions" 
        :key="index"
        class="suggestion-card"
        :class="{
          'high-confidence': suggestion.confidence >= 80,
          'medium-confidence': suggestion.confidence >= 60 && suggestion.confidence < 80,
          'low-confidence': suggestion.confidence < 60
        }"
      >
        <div class="card-header">
          <h3>{{ suggestion.project }}</h3>
          <div class="confidence-badge" :class="{
            'high': suggestion.confidence >= 80,
            'medium': suggestion.confidence >= 60 && suggestion.confidence < 80,
            'low': suggestion.confidence < 60
          }">
            {{ suggestion.confidence }}%
          </div>
        </div>
        
        <div class="card-body">
          <div class="reason-section">
            <i class="fas fa-lightbulb"></i>
            <p>{{ suggestion.reason }}</p>
          </div>
          
          <div class="metrics-section">
            <div class="metric">
              <i class="fas fa-chart-line"></i>
              <span>Priority Level</span>
              <strong>{{ getPriorityLevel(suggestion.confidence) }}</strong>
            </div>
            <div class="metric">
              <i class="fas fa-clock"></i>
              <span>Estimated Impact</span>
              <strong>{{ getImpactLevel(suggestion.confidence) }}</strong>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <button 
            @click="viewDetails(suggestion)"
            class="details-button"
          >
            <i class="fas fa-info-circle"></i>
            View Details
          </button>
          <button 
            @click="allotProject(suggestion)"
            class="allot-button"
          >
            <i class="fas fa-check"></i>
            Allot Project
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="selectedArea" class="empty-state">
      <i class="fas fa-lightbulb"></i>
      <p>No suggestions available for this area yet.</p>
      <span class="sub-text">Try selecting a different area or check back later for updates.</span>
    </div>

    <div v-else class="empty-state">
      <i class="fas fa-map-marker-alt"></i>
      <p>Select an area to get AI-powered project suggestions</p>
      <span class="sub-text">Our AI will analyze area data and provide intelligent project recommendations.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AISuggestionGiver',
  data() {
    return {
      selectedArea: '',
      loading: false,
      areas: [
        { id: 'ward-12', name: 'Ward 12 - South Side' },
        { id: 'zone-3', name: 'Zone 3 - East Block' },
        { id: 'sector-7', name: 'Sector 7 - Riverfront' }
      ],
      suggestions: []
    }
  },
  methods: {
    async fetchSuggestions() {
      if (!this.selectedArea) return
      
      this.loading = true
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.suggestions = [
          {
            project: 'Rainwater Harvesting System',
            reason: 'Frequent water shortages reported + low rainfall zone. Historical data shows 40% water scarcity during summer months.',
            confidence: 87
          },
          {
            project: 'Smart Street Lights',
            reason: 'High complaint density about poor lighting. 78% of residents reported safety concerns after dark.',
            confidence: 78
          },
          {
            project: 'Community Health Center',
            reason: 'Nearest medical facility is 5km away. Population density indicates high demand for local healthcare.',
            confidence: 92
          }
        ]
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        this.suggestions = []
      } finally {
        this.loading = false
      }
    },
    getPriorityLevel(confidence) {
      if (confidence >= 80) return 'High'
      if (confidence >= 60) return 'Medium'
      return 'Low'
    },
    getImpactLevel(confidence) {
      if (confidence >= 80) return 'Significant'
      if (confidence >= 60) return 'Moderate'
      return 'Limited'
    },
    viewDetails(suggestion) {
      // TODO: Implement detailed view
      console.log('View details for:', suggestion)
    },
    allotProject(suggestion) {
      // TODO: Implement project allotment
      console.log('Allot project:', suggestion)
    }
  }
}
</script>

<style scoped>
.ai-advisor-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
}

.ai-advisor-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-section i {
  font-size: 1.75rem;
  color: #3b82f6;
}

.title-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.ai-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f9ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 500;
}

.subtitle {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.area-selector {
  margin-bottom: 2rem;
}

.area-selector label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.75rem;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: white;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-wrapper select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.select-wrapper i {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.suggestion-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.suggestion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  padding-right: 1rem;
}

.confidence-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.confidence-badge.high {
  background: #dcfce7;
  color: #166534;
}

.confidence-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.confidence-badge.low {
  background: #fee2e2;
  color: #991b1b;
}

.card-body {
  padding: 1.25rem;
}

.reason-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.reason-section i {
  color: #3b82f6;
  font-size: 1.1rem;
  margin-top: 0.2rem;
}

.reason-section p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
}

.metrics-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric i {
  color: #3b82f6;
  font-size: 1rem;
}

.metric span {
  font-size: 0.85rem;
  color: #64748b;
}

.metric strong {
  color: #1e293b;
  font-size: 0.95rem;
}

.card-actions {
  padding: 1.25rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

.details-button,
.allot-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-button {
  background: #f1f5f9;
  color: #475569;
  border: none;
}

.details-button:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.allot-button {
  background: #3b82f6;
  color: white;
  border: none;
}

.allot-button:hover {
  background: #2563eb;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;
}

.empty-state i {
  font-size: 3rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.sub-text {
  font-size: 0.9rem;
  color: #94a3b8;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .ai-advisor-container {
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .ai-badge {
    align-self: flex-start;
  }

  .suggestions-grid {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-direction: column;
  }
}
</style> 