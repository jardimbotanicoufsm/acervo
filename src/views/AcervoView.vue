<template>
  <div>
    <h1 style="padding-left: 25px;">Acervo de Espécimes Vegetais</h1>
    <div v-if="entries.length" class="cards" style="margin: 30px;">
      <router-link
      v-for="entry in entries"
      :key="entry.code"
      :to="`/item/${entry.code}`"
      class="card-list"
      style="display: block; text-decoration: none; color: inherit;"
      >
      <h2>{{ entry.commonName || entry.scientificName }}</h2>
      <p><strong>Código:</strong> {{ entry.code }}</p>
      <p><strong>Nome Científico:</strong> {{ entry.scientificName }}</p>
      <p><strong>Família:</strong> {{ entry.family }}</p>
      <p><strong>Origem:</strong> {{ entry.origin }}</p>
      <p><strong>Tipo de Planta:</strong> {{ entry.type }}</p>
      </router-link>
    </div>
    <div v-else class="loading-container">
      <div class="spinner"></div>
      <span style="margin-top: 12px; color: #555;">Carregando dados...</span>
    </div>
  </div>
</template>

<script>
import dataStore from '@/main.js';
export default {
  name: 'AcervoView',
  data() {
    return {
      entries: [],
    };
  },
  methods: {
    async fetchCSV() {
      const rawEntries = await dataStore.fetchTSV();
      // Make a shallow copy so we don't mutate the global array
      const entriesCopy = rawEntries.slice();
      // Remove header row
      entriesCopy.shift();
      this.entries = entriesCopy
        .filter(cols => cols.length > 1)
        .map(cols => ({
          code: cols[0]?.trim(),
          scientificName: cols[1]?.trim(),
          commonName: cols[2]?.trim(),
          family: cols[3]?.trim(),
          origin: cols[4]?.trim(),
          type: cols[5]?.trim(),
        }));
    },
  },
  mounted() {
    this.fetchCSV();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5em;
}
th {
  background: #f0f0f0;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
