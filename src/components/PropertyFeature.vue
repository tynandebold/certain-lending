<template>
  <v-layout wrap class="trait mt-4">
    <v-icon v-if="icon" large style="width: 35px;">{{icon}}</v-icon>
    <v-layout wrap ml-2>
      <div class="trait--label">{{label}}</div>
      <div class="trait--data">{{propData}} {{suffix}}</div>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'icon',
      'label',
      'data',
      'suffix',
    ],
    data() {
      let propData;
      if (typeof this.data === 'number') {
        propData = Math.round(this.data * 100) / 100;
      } else if (this.data === null) {
        propData = 'No data';
      } else if (this.data === true) {
        propData = 'Yes';
      } else {
        propData = this.data.replace('_', ' ');
      }

      return {
        propData
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