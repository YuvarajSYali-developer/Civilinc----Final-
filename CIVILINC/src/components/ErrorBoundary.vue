<template>
  <div>
    <div v-if="error" class="error-boundary">
      <div class="error-content">
        <i class="fas fa-exclamation-circle"></i>
        <h3>Something went wrong</h3>
        <p>{{ error.message }}</p>
        <slot v-if="$slots.default"></slot>
        <button @click="handleReset" class="retry-button">
          <i class="fas fa-redo"></i>
          Try Again
        </button>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  data() {
    return {
      error: null
    }
  },
  errorCaptured(err) {
    this.error = err
    return false
  },
  methods: {
    handleReset() {
      this.error = null
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  background: #fef2f2;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-content {
  text-align: center;
  color: #991b1b;
}

.error-content i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.error-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.error-content p {
  margin-bottom: 1.5rem;
  color: #7f1d1d;
}

.retry-button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

.retry-button i {
  font-size: 1rem;
  margin: 0;
}
</style> 