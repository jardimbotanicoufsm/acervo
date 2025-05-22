<template>
  <div id="app-layout">
    <header>
      <div class="header-left">
        <div class="header-logo">
          <img :src="logoSrc" alt="Logo do Jardim Botânico" class="logo" />
          <router-link to="/" style="color: white; text-decoration: none;">
            <div class="header-title">
              <div style="display: flex; gap: 10px; align-items: center;">
              <h1 class="myriad-pro-regular">Jardim Botânico</h1>
              <h1 class="zapf-humnst-regular">UFSM</h1>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="header-right">
        <nav class="main-nav">
          <router-link to="/#sobre">Sobre</router-link>
          <router-link to="/#atracoes">Atrações</router-link>
          <router-link to="/#visite">Visite</router-link>
          <router-link to="/#contato">Contato</router-link>
          <router-link to="/itens">Acervo</router-link>
          <router-link to="/mapa">Mapa</router-link>
          <a href="https://jbsm.inf.ufsm.br/360/">Visão 360°</a>
        </nav>
      </div>
    </header>

    <main style="flex: 1;">
      <router-view />
    </main>

    <footer>
        &copy; 2025 Jardim Botânico - Todos os direitos reservados
    </footer>
  </div>

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


<style>
#app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
