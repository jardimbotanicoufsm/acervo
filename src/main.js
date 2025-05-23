import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import Papa from 'papaparse';

const dataStore = {
  entries: [],
  loaded: false,
  async fetchTSV() {
    if (this.loaded) return this.entries;
    const response = await fetch('https://docs.google.com/spreadsheets/d/1jxPq1Pj7szd6Cw3uQq1l9N6iFCEAeLUR1bh978gJF9g/export?format=tsv');
    const csv = await response.text();
    const parsed = Papa.parse(csv, { header: false, delimiter: '\t' });
    this.entries = parsed.data;
    this.loaded = true;
    return this.entries;
  }
};

export default dataStore;

createApp(App).use(router).mount('#app')
