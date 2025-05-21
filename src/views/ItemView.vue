<template>
  <div v-if="plant">
    <div v-if="plant.images.length > 0">
      <div id="image-carousel" class="splide" style="max-width:800px;margin:auto;height: 50svh;">
          <div class="splide__track">
              <ul class="splide__list">
                  <li
                    v-for="(img, idx) in plant.images"
                    :key="idx"
                    class="splide__slide"
                  >
                    <img :src="img" :alt="`Imagem ${idx + 1}`" />
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
      <button class="button" @click="$router.push('/items')">Voltar para o Acervo</button>
    </section>
  </div>
  <div v-else>
    <p>Loading item...</p>
  </div>
</template>

<style scoped>
    @import url('https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css');
</style>


<script>
import Papa from 'papaparse';
import Splide from '@splidejs/splide';

export default {
  data() {
    return {
      plant: null,
      splide: null,
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
            //console.log(match);
            this.plant = {
              id: match[0],
              scientific_name: match[1],
              common_name: match[2],
              class: match[3],
              type: match[5],
              origin: match[4],
              latitude: match[7],
              longitude: match[8],
              description: match[9],
              images: match[10]
                ? match[10].split(',').map(img => this.getDriveImageUrl(img.trim()))
                : [],
            };
            /*for (let i = 0; i < this.plant.images.length; i++) {
              console.log(this.plant.images[i]);
            }*/
            this.$nextTick(() => {
              this.mountSplide();
              this.addModalClickListeners();
              window.addEventListener('resize', this.handleResize);
            });
          }
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
    getPerPage() {
      return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1200 ? 2 : 3;
    },
    mountSplide() {
      if (this.splide) this.splide.destroy();
      this.splide = new Splide('#image-carousel', {
        type: 'loop',
        perPage: this.getPerPage(),
      });
      this.splide.on('mounted updated move', this.addModalClickListeners);
      this.splide.mount();
    },
    handleResize() {
      if (!this.splide) return;
      const currentPerPage = this.splide.options.perPage;
      const newPerPage = this.getPerPage();
      if (currentPerPage !== newPerPage) {
        this.mountSplide();
      }
    },
    addModalClickListeners() {
      document.querySelectorAll('#image-carousel .splide__slide img').forEach((img) => {
        img.onclick = function () {
          document.getElementById('imagem-ampliada').src = this.src;
          document.getElementById('modal-ampliar').style.display = 'flex';
        };
      });
      // Fechar modal ao clicar no X ou fora da imagem
      document.getElementById('fechar-modal').onclick = function () {
        document.getElementById('modal-ampliar').style.display = 'none';
      };
      document.getElementById('modal-ampliar').onclick = function (e) {
        if (e.target === this) {
          this.style.display = 'none';
        }
      };
    },
    getDriveImageUrl(linkOrId) {
      if (linkOrId.startsWith('https://drive.google.com/thumbnail?id=')) {
        return linkOrId;
      }
      const match = linkOrId.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
      }
      if (/^[a-zA-Z0-9_-]{20,}$/.test(linkOrId)) {
        return `https://drive.google.com/thumbnail?id=${linkOrId}&sz=w1000`;
      }
      return linkOrId;
    },
  }
}
</script>
