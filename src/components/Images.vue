<template>
  <v-layout justify-space-between>
    <img
      :src="image"
      alt="Image of the property"
      v-for="image in images"
      class="hero-image">
  </v-layout>
</template>

<script>
  export default {
    props: [
      'images'
    ]
  }
</script>

<style>
  img.hero-image {
    width: 33%;
    height: 100%;
  }
</style>