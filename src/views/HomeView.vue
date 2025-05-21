<template>
  <div>
    <div class="hero" :style="heroStyle"></div>

    <section class="section" id="sobre">
      <div class="section-title">Sobre o Jardim</div>
      <p>
        Somos o Jardim Botânico da Universidade Federal de Santa Maria, Órgão Suplementar do Centro de Ciências Naturais e Exatas da Universidade Federal de Santa Maria (CCNE/UFSM).<br>
        O Jardim Botânico da UFSM (JBSM) foi fundado em 1981. Seu acervo apresenta 349 espécies catalogadas, num total de aproximadamente 2500 indivíduos, distribuídas em 13 hectares. O JBSM tem por missão ser um local privilegiado de conservação das espécies florestais nativas do Rio Grande do Sul, servindo como base de apoio às atividades de ensino, pesquisa e extensão, assim como um centro de lazer para a comunidade em geral. É um espaço aberto para a comunidade em geral, com entrada franca.<br>
      </p>
    </section>

    <section class="section" id="atracoes">
      <div class="section-title">Atrações</div>
      <div class="cards">
        <div class="card">
          <div class="card-image">
            <img :src="trilhasImage" alt="Trilhas Ecológicas" class="card-image">
          </div>
          <h3>Trilhas Ecológicas</h3>
          <p>Explore a biodiversidade nas trilhas do Jardim.</p>
        </div>
        <div class="card">
          <div class="card-image">
            <img :src="jardimSensorialImage" alt="Jardim sensorial" class="card-image">
          </div>
          <h3>Jardim sensorial</h3>
          <p>Conheça plantas por meio de seus sentidos.</p>
        </div>
        <div class="card">
          <div class="card-image">
            <img :src="espacoInfantilImage" alt="Espaço Infantil" class="card-image">
          </div>
          <h3>Visitas guiadas</h3>
          <p>Conheça mais sobre o jardim com visitas guiadas para grupos.</p>
        </div>
      </div>
    </section>

    <section class="section" id="visite">
      <div class="section-title">Planeje sua Visita</div>
      <p>
        O Jardim está aberto de segunda a sexta, das 8h às 17h. Abre eventualmente aos domingos.<br>
        Agendamentos de visitas escolares ou grupos (durante período letivo) pelo formulário:
        <a href="https://forms.gle/9GoPeqG27csYxWJ86" target="_blank">https://forms.gle/9GoPeqG27csYxWJ86</a><br>
        Endereço: Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-900.
      </p>
    </section>

    <section class="section" id="contato">
      <div class="section-title">Contato</div>
      <p>
        Administração: +55 55 3220-8973<br>
        Visitações: +55 55 99193-8183<br>
        Email: jardimbotanico@ufsm.br<br>
        Siga-nos nas redes sociais:<br>
      </p>
      <div class="social-buttons">
          <a href="https://www.facebook.com/JardimBotanicoDeSantaMaria" class="social-button" target="_blank">
            <img :src="facebookIcon" alt="Facebook">
          </a>
          <a href="https://www.instagram.com/jardimbotanicodaufsm" class="social-button" target="_blank">
            <img :src="instagramIcon" alt="Instagram">
          </a>
          <a href="https://www.youtube.com/@JardimBotanicodaUFSM" class="social-button" target="_blank">
            <img :src="youtubeIcon" alt="Youtube">
          </a>
          <a href="https://www.ufsm.br/orgaos-suplementares/jardim-botanico" class="social-button" target="_blank">
            <img :src="websiteIcon" alt="Site Institucional">
          </a>
        </div>
    </section>
  </div>
</template>

<script setup>

import facebookIcon from '@/assets/icons/facebook.svg'
import instagramIcon from '@/assets/icons/instagram.svg'
import youtubeIcon from '@/assets/icons/youtube.svg'
import websiteIcon from '@/assets/icons/website.svg'
import trilhasImage from '@/assets/img/tourguiado.jpg'
import jardimSensorialImage from '@/assets/img/homepage4.jpg'
import espacoInfantilImage from '@/assets/img/passeioescola.jpg'
import homepageImage from '@/assets/img/homepage2crop.jpg'

const heroStyle = {
  backgroundImage: `url(${homepageImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '2rem'
}
</script>

<style scoped>
/* You can import your style.css globally in main.js or App.vue */
</style>
