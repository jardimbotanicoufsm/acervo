<template>
  <div v-if="item">
    <h1>{{ item.name1 }}</h1>
    <h2>{{ item.name2 }}</h2>
    <img :src="item.picture" :alt="item.name1" style="max-width: 400px" />
    <p>Latitude: {{ item.latitude }}</p>
    <p>Longitude: {{ item.longitude }}</p>
  </div>
  <div v-else>
    <p>Loading item...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null
    }
  },
  async created() {
    const id = this.$route.params.id
    const res = await fetch('/acervo/items.json')
    const items = await res.json()
    this.item = items.find(i => i.id === id)
  }
}
</script>
