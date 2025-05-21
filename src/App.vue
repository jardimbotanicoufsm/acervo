<template>
  <header>
    <div class="header-left">
      <div class="header-logo">
        <img :src="logoSrc" alt="Logo do Jardim Botânico" class="logo" style="width: 50px; height: 50px;" />
        <div class="header-title">
          <div style="display: flex; gap: 10px; align-items: center;">
            <h1 class="myriad-pro-regular">Jardim Botânico</h1>
            <h1 class="zapf-humnst-regular">UFSM</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <nav class="main-nav">
        <router-link to="/sobre">Sobre</router-link>
        <router-link to="/atracoes">Atrações</router-link>
        <router-link to="/visite">Visite</router-link>
        <router-link to="/contato">Contato</router-link>
        <router-link to="/itens">Acervo</router-link>
        <router-link to="/mapa">Mapa</router-link>
      </nav>
    </div>
  </header>

  <router-view />
  <footer>
      &copy; 2025 Jardim Botânico - Todos os direitos reservados
  </footer>
</template>


<script>
import logo from '@/assets/img/logo1.png'
export default {
  data() {
    return {
      logoSrc: logo
    }
  }
}
</script>
