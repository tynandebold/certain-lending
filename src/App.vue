<template>
  <v-app>
    <Toolbar></Toolbar>
    <v-content>
      <section v-if="requestError">
        <p
          class="mt-5"
          style="text-align:center;">
          We're sorry, we're not able to retrieve this information at the moment. Please try again later.
        </p>
      </section>
      <section v-else>
        <div
          v-if="loading"
          class="mt-5"
          style="text-align:center;">
          Loading...
        </div>
        <v-layout row wrap column v-if="!loading">
          <Images :images="images"></Images>
          <TopLevelInfo
            :addressData="addressData"
            :propertyData="propertyData">
          </TopLevelInfo>
          <v-container class="main-content">
            <v-layout row wrap align-start>
              <Features :propertyData="propertyData"></Features>
              <v-flex xs12 md6>
                <GoogleMap :address="addressData.slug" class="mb-5"></GoogleMap>
                <Dataviz :assessedAmt="assessedAmt"></Dataviz>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </section>
    </v-content>
    <Footer class="mt-5"></Footer>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import Images from './components/Images'
  import Footer from './components/Footer'
  import Toolbar from './components/Toolbar'
  import Dataviz from './components/Dataviz'
  import Features from './components/Features'
  import GoogleMap from './components/GoogleMap'
  import TopLevelInfo from './components/TopLevelInfo'

  export default {
    data() {
      return {
        addressData: null,
        images: ['https://goo.gl/NN9qVL',
          'https://goo.gl/PAJjYb',
          'https://goo.gl/m9gquf',
        ],
        loading: true,
        assessedAmt: null,
        propertyData: null,
        requestError: false,
        valueData: null
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
          baseURL: 'https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2',
          // baseURL: 'http://localhost:8080/data/propertyDetails.json',
          method: 'get',
          params: {
            address: '188 sugar road',
            zipcode: '01740'
          },
          url: '/property/details?'
        })
          .then(response => {
            this.propertyData = response.data['0']["property/details"];
            this.addressData = response.data['0'].address_info;
            this.assessedAmt = this.propertyData.result.assessment.total_assessed_value;
          })
          .catch(error => {
            console.log(error);
            this.requestError = true;
          })
          .finally(() => this.loading = false);
      }
    },
    components: {
      Dataviz,
      Features,
      Footer,
      GoogleMap,
      Images,
      Toolbar,
      TopLevelInfo
    }
  }
</script>