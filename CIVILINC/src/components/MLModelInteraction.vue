<template>
  <div>
    <h2>ML Model Interaction</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="inputData">Input Data (JSON):</label>
        <textarea id="inputData" v-model="inputData" required></textarea>
        <div v-if="inputError" class="error">{{ inputError }}</div>
      </div>
      <button type="submit" :disabled="mlLoading">Run Model</button>
    </form>
    <LoadingSpinner :loading="mlLoading" message="Running model..." />
    <ErrorBoundary v-if="mlError">
      <template #default>
        <div class="error">{{ mlError }}</div>
      </template>
    </ErrorBoundary>
    <div v-if="mlOutput" class="result">
      <h3>Model Output</h3>
      <pre>{{ mlOutput }}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';
import ErrorBoundary from './ErrorBoundary.vue';

export default {
  name: 'MLModelInteraction',
  components: { LoadingSpinner, ErrorBoundary },
  data() {
    return {
      inputData: '',
      inputError: null
    };
  },
  computed: {
    ...mapGetters('mlModel', ['mlOutput', 'mlLoading', 'mlError'])
  },
  methods: {
    ...mapActions('mlModel', ['runModel', 'resetModel']),
    submitForm() {
      this.inputError = null;
      let parsed;
      try {
        parsed = JSON.parse(this.inputData);
      } catch (e) {
        this.inputError = 'Input must be valid JSON.';
        return;
      }
      this.runModel(parsed);
    }
  }
};
</script>

<style scoped>
.error { color: #dc2626; margin-top: 0.5rem; }
.result { background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
textarea { width: 100%; min-height: 80px; }
button { margin-top: 1rem; }
</style> 