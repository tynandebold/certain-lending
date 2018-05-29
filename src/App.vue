<template>
  <v-app>
    <Toolbar></Toolbar>
    <v-content>
      <section v-if="requestError">
        <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
      </section>
      <section v-else>
        <div v-if="loading">Loading...</div>
        <v-layout row wrap v-if="!loading">
          <Images :images="images"></Images>
          <TopLevelInfo
            :addressData="addressData"
            :propertyData="propertyData">
          </TopLevelInfo>
          <v-container class="main-content">
            <v-layout row wrap align-start>
              <v-flex class="mb-2" xs6 d-flex style="flex-wrap:wrap;">
                <div class="title">Highlights</div>
                <PropertyHighlight
                  label="Year built"
                  icon="far fa-calendar"
                  :propertyData="propertyData.result.property.year_built">
                </PropertyHighlight>
                <PropertyHighlight
                  label="Lot size"
                  icon="far fa-square"
                  :propertyData="propertyData.result.property.site_area_acres"
                  suffix="acres">
                </PropertyHighlight>
                <PropertyHighlight
                  label="Heating"
                  icon="fas fa-thermometer-three-quarters"
                  :propertyData="propertyData.result.property.heating_fuel_type">
                </PropertyHighlight>
                <PropertyHighlight
                  label="Cooling"
                  icon="far fa-snowflake"
                  :propertyData="propertyData.result.property.air_conditioning">
                </PropertyHighlight>
                <PropertyHighlight
                  label="Parking"
                  icon="fas fa-parking"
                  :propertyData="propertyData.result.property.garage_type_parking">
                </PropertyHighlight>
                <PropertyHighlight
                  label="Water"
                  icon="fas fa-tint"
                  :propertyData="propertyData.result.property.water">
                </PropertyHighlight>
              </v-flex>
              <v-flex xs6>
                <iframe
                  width="500"
                  height="300"
                  frameborder="0" style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPkKbXXUI2s6w--z_pQ7yYNoMXcZmw_9I&q=188-Sugar-Rd-Bolton-MA-01740" allowfullscreen>
                </iframe>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </section>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import Images from './components/Images'
  import Toolbar from './components/Toolbar'
  import GoogleMap from './components/GoogleMap'
  import TopLevelInfo from './components/TopLevelInfo'
  import PropertyHighlight from './components/PropertyHighlight'

  export default {
    data() {
      return {
        addressData: null,
        appTitle: 'Property Information',
        images: [
          'https://thumbs.trulia-cdn.com/pictures/thumbs_6/zillowstatic/ISq51mq507ta0v1000000000.jpg',
          'https://thumbs.trulia-cdn.com/pictures/thumbs_6/zillowstatic/IS23btwg4exobv1000000000.jpg',
          'https://thumbs.trulia-cdn.com/pictures/thumbs_6/zillowstatic/ISucpgtny4ngcv1000000000.jpg'
        ],
        loading: true,
        propertyData: null,
        requestError: false,
        sidebar: false
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios({
          auth: {
            username: 'EZWE2U4RSITP71QHNYIL',
            password: 'uX11P1aWlfrAFt7RTconuabke5VQedJL'
          },
          baseURL: 'https://api.housecanary.com/v2',
          method: 'get',
          params: {
            address: '188 sugar road',
            zipcode: '01740'
          },
          url: '/property/details?'
        })
          .then(response => {
            this.propertyData = response.data['0']["property/details"]
            this.addressData = response.data['0'].address_info
          })
          .catch(error => {
            console.log(error);
            this.requestError = true
          })
          .finally(() => this.loading = false)
      }
    },
    components: {
      Images,
      Toolbar,
      TopLevelInfo,
      PropertyHighlight
    }
  }
</script>

<style>
  .main-content .title {
    width: 100%;
  }
</style>