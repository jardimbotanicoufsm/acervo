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
                    :data-original="img"
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
    fetch(import.meta.env.BASE_URL + 'images.json')
      .then(res => res.json())
      .then(imagesData => {
        this.plantImages = imagesData[String(id)] || [];
      });
  },
  watch: {
    plantImages(newVal) {
      if (this.plant && newVal.length > 0) {
        this.$nextTick(() => {
          this.mountSplide();
          this.addModalClickListeners();
          window.addEventListener('resize', this.handleResize);
        });
      }
    },
    plant(newVal) {
      if (newVal && this.plantImages.length > 0) {
        this.$nextTick(() => {
          this.mountSplide();
          this.addModalClickListeners();
          window.addEventListener('resize', this.handleResize);
        });
      }
    }
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
      console.log('Mounting splide');
      this.setPerPageCSSVar();
      if (this.splide) this.splide.destroy();
      this.splide = new Splide('#image-carousel', {
        type: 'loop',
        perPage: this.getPerPage(),
      });
      this.splide.on('mounted updated move', this.addModalClickListeners);
      // Adiciona listener para ampliar qualquer imagem, inclusive slides clonados
      this.splide.on('click', (slide, e) => {
        const img = slide.querySelector('img');
        if (img) {
          const dataOriginal = img.getAttribute('data-original');
          this.openModal(dataOriginal);
        }
      });
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
      console.log('getOptimizedImage input:', img, size);
      const parts = img.split('/');
      const filename = parts.pop();
      const id = parts[parts.length - 1];
      const optimizedImg = `/acervo/images/species/${id}/${size}/${filename}`;
      console.log('getOptimizedImage output:', optimizedImg);
      return optimizedImg;
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
      // Apenas listeners do modal (fechar)
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

<style scoped>
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
  border-top: 6px solid #4d6339;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
