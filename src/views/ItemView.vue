<template>
  <div v-if="plant">
    <div v-if="plantImages.length > 0">
      <div id="image-carousel" class="splide" style="max-width:800px;margin:auto;height: 50svh;">
          <div class="splide__track">
              <ul class="splide__list">
                <li
                  v-for="(img, idx) in plantImages"
                  :key="idx"
                  class="splide__slide"
                >
                  <img
                    :src="getOptimizedImage(img, 400)"
                    :srcset="`${getOptimizedImage(img, 400)} 400w, ${getOptimizedImage(img, 800)} 800w`"
                    sizes="(max-width: 600px) 400px, 800px"
                    :alt="`Imagem ${idx + 1}`"
                    @click="openModal(img)"
                    style="cursor:zoom-in"
                  />
                </li>
              </ul>
          </div>
      </div>
      <!-- Modal para ampliar imagem -->
      <div id="modal-ampliar"
          style="display:none;position:fixed;z-index:9999;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);justify-content:center;align-items:center;">
          <span id="fechar-modal"
              style="position:absolute;top:30px;right:40px;font-size:40px;color:white;cursor:pointer;font-weight:bold;">&times;</span>
          <img id="imagem-ampliada" src="" alt="Imagem ampliada"
              style="max-width:90vw;max-height:90vh;box-shadow:0 0 20px #000;border-radius:8px;">
      </div>
    </div>
    <div v-else></div>
    <!-- Informações Científicas -->
    <section class="section" id="sobre">
        <div class="section-title">{{ plant.common_name }}</div>
        <li><strong>Nome popular:</strong> {{ plant.common_name }}</li>
        <li><strong>Nome científico:</strong> <em>{{ plant.scientific_name }}</em></li>
        <li><strong>Classificação:</strong> {{ plant.class }}</li>
        <li><strong>Origem:</strong> {{ plant.origin }}</li>
    </section>

    <!-- Descrição da Planta -->
    <section class="section" id="sobre">
        <div class="section-title">Sobre</div>
        <p v-if="plant.description">{{ plant.description }}</p><p v-else>Descrição não disponível.</p>
    </section>

    <!-- Localização -->
    <section class="section" id="sobre">
        <div class="section-title">Localização</div>
        <p>
          <span style="display:inline-block; min-width: 300px;">Indivíduo {{ plant.id }}</span>
          <span style="display:inline-block; min-width: 300px;">Latitude: {{ plant.latitude }}</span>
          <span style="display:inline-block; min-width: 300px;">Longitude: {{ plant.longitude }}</span>
        </p>
    </section>
<!-- Splide carousel logic is now handled in the Vue component's mounted hook -->
    <section class="section" id="menu">
      <button class="button" @click="$router.push('/itens')">Voltar para o Acervo</button>
    </section>
  </div>
  <div v-else class="loading-container">
      <div class="spinner"></div>
      <span style="margin-top: 12px; color: #4d6339;">Carregando dados...</span>
    </div>
</template>

<style scoped>
    @import url('https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css');
</style>


<script>
import Papa from 'papaparse';
import Splide from '@splidejs/splide';
import dataStore from '@/main.js';

export default {
  data() {
    return {
      plant: null,
      splide: null,
      plantImages: [],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchCSV();
    fetch('/acervo/images.json')
      .then(res => res.json())
      .then(imagesData => {
        this.plantImages = imagesData[String(id)] || [];
        this.$nextTick(() => {
          this.mountSplide();
          this.addModalClickListeners();
          window.addEventListener('resize', this.handleResize);
        });
      });
  },
  beforeDestroy() {
    if (this.splide) {
      this.splide.destroy();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async fetchCSV() {
      const rawEntries = await dataStore.fetchTSV();
      const entriesCopy = rawEntries.slice();
      entriesCopy.shift(); // Remove header row

      // Find the entry for the current id
      const id = this.$route.params.id;
      const entry = entriesCopy.find(cols => cols[0]?.trim() === id);

      if (entry) {
        this.plant = {
          id: entry[0]?.trim(),
          scientific_name: entry[1]?.trim(),
          common_name: entry[2]?.trim(),
          class: entry[3]?.trim(),
          origin: entry[4]?.trim(),
          type: entry[5]?.trim(),
          latitude: entry[7]?.trim(),
          longitude: entry[8]?.trim(),
          description: entry[9]?.trim(),
        };
      } else {
        this.plant = null;
      }
    },
    getPerPage() {
      return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1200 ? 2 : 3;
    },
    setPerPageCSSVar() {
      document.documentElement.style.setProperty('--splide-per-page', this.getPerPage());
    },
    mountSplide() {
      this.setPerPageCSSVar();
      if (this.splide) this.splide.destroy();
      this.splide = new Splide('#image-carousel', {
        type: 'loop',
        perPage: this.getPerPage(),
      });
      this.splide.on('mounted updated move', this.addModalClickListeners);
      this.splide.mount();
    },
    handleResize() {
      this.setPerPageCSSVar();
      if (!this.splide) return;
      const currentPerPage = this.splide.options.perPage;
      const newPerPage = this.getPerPage();
      if (currentPerPage !== newPerPage) {
        this.mountSplide();
      }
    },
    getOptimizedImage(img, size) {
      // Exemplo: /acervo/images/species/00277/20250514_110933.jpg => /acervo/images/species/00277/400/20250514_110933.jpg
      const parts = img.split('/');
      const filename = parts.pop();
      const id = parts[parts.length - 1];
      return `/acervo/images/species/${id}/${size}/${filename}`;
    },
    openModal(img) {
      // Carrega a versão 1920px no modal
      const parts = img.split('/');
      const filename = parts.pop();
      const id = parts[parts.length - 1];
      const bigImg = `/acervo/images/species/${id}/1920/${filename}`;
      const modalImg = document.getElementById('imagem-ampliada');
      modalImg.src = bigImg;
      document.getElementById('modal-ampliar').style.display = 'flex';
    },
    addModalClickListeners() {
      // Remove o onclick antigo, pois agora usamos @click no Vue
      document.getElementById('fechar-modal').onclick = function () {
        document.getElementById('modal-ampliar').style.display = 'none';
      };
      document.getElementById('modal-ampliar').onclick = function (e) {
        if (e.target === this) {
          this.style.display = 'none';
        }
      };
    },
  }
}
</script>
