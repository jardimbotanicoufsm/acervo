<template>
  <div v-if="plant">
    <h1>{{ plant.scientific_name }}</h1>
    <h2>{{ plant.common_name }}</h2>
    <img :src="plant.images[0]" :alt="plant.scientific_name" style="max-width: 400px" />
    <p>Latitude: {{ plant.latitude }}</p>
    <p>Longitude: {{ plant.longitude }}</p>
  </div>
  <div v-else>
    <p>Loading item...</p>
  </div>
</template>

<script>
import Papa from 'papaparse';
export default {
  data() {
    return {
      plant: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch('https://docs.google.com/spreadsheets/d/1jxPq1Pj7szd6Cw3uQq1l9N6iFCEAeLUR1bh978gJF9g/export?format=tsv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: false,
          delimiter: '\t',
          complete: (results) => {
            const match = results.data.find(p => p[0] === id);
            this.plant = {
              id: match[0],
              scientific_name: match[1],
              common_name: match[2],
              family: match[3],
              type: match[5],
              origin: match[4],
              latitude: match[7],
              longitude: match[8],
              description: match[9],
              images: match[10] ? match[10].split(',') : [],
            };
            console.log(this.plant);
          }
        });
      });
  }
}
</script>
