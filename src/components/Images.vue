<template>
  <v-layout justify-space-between class="imgs-wrapper">
    <img
      :src="image"
      alt="Image of the property"
      v-for="(image, index) in images"
      :key="index"
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

  @media only screen and (max-width: 600px) {
    .imgs-wrapper img {
      display: none;
    }

    .imgs-wrapper img:first-child {
      display: block;
      width: 100%;
    }
  }
</style>