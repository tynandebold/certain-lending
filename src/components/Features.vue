<template>
  <v-layout column flex xs6>
    <v-flex xs6 d-flex style="flex-wrap:wrap;">
      <div class="title">Key details</div>
      <PropertyFeature
        label="Year built"
        icon="far fa-calendar"
        :data="data.result.property.year_built">
      </PropertyFeature>
      <PropertyFeature
        label="Lot size"
        icon="far fa-square"
        :data="data.result.property.site_area_acres"
        suffix="acres">
      </PropertyFeature>
      <PropertyFeature
        label="Total rooms"
        icon="fas fa-th-large"
        :data="data.result.property.total_number_of_rooms">
      </PropertyFeature>
      <PropertyFeature
        label="Heating"
        icon="fas fa-thermometer-three-quarters"
        :data="data.result.property.heating">
      </PropertyFeature>
      <PropertyFeature
        label="Cooling"
        icon="far fa-snowflake"
        :data="data.result.property.air_conditioning">
      </PropertyFeature>
      <PropertyFeature
        label="Parking"
        icon="fas fa-parking"
        :data="data.result.property.garage_type_parking">
      </PropertyFeature>
    </v-flex>
    <v-flex class="feature-types-wrapper" xs6 d-flex style="flex-wrap:wrap;">
      <v-divider class="my-4 mr-5"></v-divider>
      <v-flex d-flex align-center justify-start style="width: 100%;">
        <v-icon medium style="width: 35px;">fas fa-home</v-icon>
        <div class="subheading ml-2" style="width: 100%;">Construction</div>
      </v-flex>
      <PropertyFeature
        label="Type"
        :data="data.result.property.construction_type">
      </PropertyFeature>
      <PropertyFeature
        label="Style"
        :data="data.result.property.style">
      </PropertyFeature>
      <PropertyFeature
        label="Exterior walls"
        :data="data.result.property.exterior_walls">
      </PropertyFeature>
      <PropertyFeature
        label="Roof cover"
        :data="data.result.property.roof_cover">
      </PropertyFeature>
      <PropertyFeature
        label="Roof type"
        :data="data.result.property.roof_type">
      </PropertyFeature>
    </v-flex>
    <v-flex class="feature-types-wrapper" xs6 d-flex style="flex-wrap:wrap;">
      <v-divider class="my-4 mr-5"></v-divider>
      <v-flex d-flex align-center justify-start style="width: 100%;">
        <v-icon medium style="width: 35px;">fas fa-bath</v-icon>
        <div class="subheading ml-2" style="width: 100%;">Interior</div>
      </v-flex>
      <PropertyFeature
        label="Bedrooms"
        :data="data.result.property.number_of_bedrooms">
      </PropertyFeature>
      <PropertyFeature
        label="Full bathrooms"
        :data="data.result.property.full_bath_count">
      </PropertyFeature>
      <PropertyFeature
        label="Partial bathrooms"
        :data="data.result.property.partial_bath_count">
      </PropertyFeature>
      <PropertyFeature
        label="Basement"
        :data="data.result.property.basement">
      </PropertyFeature>
      <PropertyFeature
        label="Fireplace"
        :data="data.result.property.fireplace">
      </PropertyFeature>
      <PropertyFeature
        label="Attic"
        :data="data.result.property.attic">
      </PropertyFeature>
    </v-flex>
    <v-flex class="feature-types-wrapper" xs6 d-flex style="flex-wrap:wrap;">
      <v-divider class="my-4 mr-5"></v-divider>
      <v-flex d-flex align-center justify-start style="width: 100%;">
        <v-icon medium style="width: 35px;">fas fa-wrench</v-icon>
        <div class="subheading ml-2" style="width: 100%;">Other</div>
      </v-flex>
      <PropertyFeature
        label="Heating fuel"
        :data="data.result.property.heating_fuel_type">
      </PropertyFeature>
      <PropertyFeature
        label="Pool"
        :data="data.result.property.pool">
      </PropertyFeature>
      <PropertyFeature
        label="Number of stories"
        :data="data.result.property.no_of_stories">
      </PropertyFeature>
      <PropertyFeature
        label="Water"
        :data="data.result.property.water">
      </PropertyFeature>
      <PropertyFeature
        label="Sewer"
        :data="data.result.property.sewer">
      </PropertyFeature>
    </v-flex>
  </v-layout>
</template>

<script>
  import PropertyFeature from './PropertyFeature'

  export default {
    props: [
      'propertyData'
    ],
    data() {
      return {
        data: this.propertyData
      }
    },
    components: {
      PropertyFeature
    }
  }
</script>

<style>
  .main-content .title {
    width: 100%;
  }

  .feature-types-wrapper .layout.wrap.ml-2 {
    margin-left: 0 !important;
  }

  .feature-types-wrapper::after {
    content: '';
    width: 33%;
  }
</style>
