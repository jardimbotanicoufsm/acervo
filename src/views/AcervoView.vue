<template>
  <div>
    <h1 style="padding-left: 25px;">Acervo de Espécimes Vegetais</h1>
    <div v-if="entries.length" class="cards" style="margin: 30px;">
      <div v-for="entry in entries" :key="entry.code" class="card-list">
      <h2>{{ entry.commonName || entry.scientificName }}</h2>
      <p><strong>Código:</strong> {{ entry.code }}</p>
      <p><strong>Nome Científico:</strong> {{ entry.scientificName }}</p>
      <p><strong>Família:</strong> {{ entry.family }}</p>
      <p><strong>Origem:</strong> {{ entry.origin }}</p>
      <p><strong>Tipo de Planta:</strong> {{ entry.type }}</p>
      <router-link :to="`/item/${entry.code}`" class="details-link">Ver detalhes</router-link>
      </div>
    </div>
    <div v-else>
      Carregando dados...
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcervoView',
  data() {
    return {
      entries: [],
      // Replace this with your actual Google Sheets CSV export link
      csvUrl: 'https://docs.google.com/spreadsheets/d/1jxPq1Pj7szd6Cw3uQq1l9N6iFCEAeLUR1bh978gJF9g/export?format=tsv',
    };
  },
  methods: {
    async fetchCSV() {
      try {
        const response = await fetch(this.csvUrl);
        const csvText = await response.text();
        this.entries = this.parseCSV(csvText);
      } catch (e) {
        console.error('Erro ao buscar CSV:', e);
      }
    },
    parseCSV(csv) {
      const lines = csv.trim().split('\n');
      // Remove header
      lines.shift();
      return lines.map(line => {
        // Simple CSV split, works if no commas inside fields
        // Split CSV line by tabs, ignoring tabs inside quotes
        // Since fields are separated by tabs and there are no tabs inside fields,
        // we can safely split by '\t' without worrying about quoted fields.
        const cols = line.split('\t');
        return {
          code: cols[0]?.trim(),
          scientificName: cols[1]?.trim(),
          commonName: cols[2]?.trim(),
          family: cols[3]?.trim(),
          origin: cols[4]?.trim(),
          type: cols[5]?.trim(),
        };
      });
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
</style>
