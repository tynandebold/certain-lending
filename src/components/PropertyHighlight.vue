<template>
  <v-layout wrap class="trait mt-4">
    <v-icon large style="width: 35px;">{{icon}}</v-icon>
    <v-layout wrap ml-2>
      <div class="trait--label">{{label}}</div>
      <div class="trait--data">{{data}} {{suffix}}</div>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'icon',
      'label',
      'propertyData',
      'suffix',
    ],
    data() {
      let propData;
      if (typeof this.propertyData === 'number') {
        propData = Math.round(this.propertyData * 100) / 100;
      } else {
        propData = this.propertyData
      }

      return {
        data: propData || 'No data'
      }
    }
  }
</script>

<style>
  .trait {
    width: 33%;
  }

  .trait--label {
    text-transform: uppercase;
    width: 100%;
  }

  .trait--data::first-letter {
    text-transform: capitalize;
  }
</style>