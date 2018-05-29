<template>
  <v-container class="main-info">
    <div class="headline">
      {{addressData.address}}, {{addressData.city}}, {{addressData.state}}, {{addressData.zipcode}}
    </div>
    <div class="title my-2">
      {{propertyData.result.property.number_of_bedrooms}} beds |
      {{propertyData.result.property.total_bath_count}} baths |
      {{numberWithCommas(propertyData.result.property.building_area_sq_ft)}} square feet
    </div>
    <div class="subheading">
      Property Type: {{propertyData.result.property.property_type}}
    </div>
    <v-spacer d-block class="my-3"></v-spacer>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
  export default {
    props: [
      'addressData',
      'propertyData'
    ],
    methods: {
      numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  }
</script>

<style media="screen">
  .main-info .headline,
  .main-info .title,
  .main-info .subheading {
    text-align: center;
  }
</style>