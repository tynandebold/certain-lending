<template>
  <v-layout row wrap class="main-info white">
    <v-container justify-space-between d-flex>
      <v-layout d-flex column>
        <div class="headline">
          {{addressData.address}}
        </div>
        <div class="body-1 mt-1 mb-4">
          {{addressData.city}}, {{addressData.state}}, {{addressData.zipcode}}
        </div>
        <div class="body-1">
          <strong>{{propertyData.result.property.number_of_bedrooms}}</strong> beds |
          <strong>{{propertyData.result.property.total_bath_count}}</strong> baths |
          <strong>{{numberWithCommas(propertyData.result.property.building_area_sq_ft)}}</strong> square feet
        </div>
      </v-layout>
      <v-layout d-flex column align-end>
        <div class="headline">
          {{propertyData.result.property.property_type}}
        </div>
        <div class="body-1 mt-1 mb-4">
          Tax amount <strong>${{numberWithCommas(propertyData.result.assessment.tax_amount)}}</strong> |
          Tax year <strong>{{propertyData.result.assessment.tax_year}}</strong>
        </div>
        <div class="body-1">&nbsp;</div>
      </v-layout>
    </v-container>
  </v-layout>
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
  .main-info .headline {
    font-family: serif;
  }

  .main-info .body-1 {
    /* font-family: serif; */
  }

  .main-info body-1 {
    /* font-family: serif; */
  }
</style>