<template>
  <iframe
    width="500"
    height="300"
    frameborder="0" style="border:0"
    :src="url" allowfullscreen>
  </iframe>
</template>

<script>
  export default {
    props: [
      'address'
    ],
    data() {
      return {
        url: `https://www.google.com/maps/embed/v1/place?key=AIzaSyCPkKbXXUI2s6w--z_pQ7yYNoMXcZmw_9I&q=${address}`
      }
    }
  }
</script>