<template>
  <iframe
    width="100%"
    height="375"
    frameborder="0" style="border:0"
    :src="url"
    allowfullscreen>
  </iframe>
</template>

<script>
  export default {
    props: [
      'address'
    ],
    data() {
      return {
        url: `https://www.google.com/maps/embed/v1/place?key=AIzaSyCPkKbXXUI2s6w--z_pQ7yYNoMXcZmw_9I&q=${this.address}`
      }
    }
  }
</script>