<template>
  <v-layout d-flex column>
    <div class="title mb-2">Standard deviation around estimated property value</div>
    <p class="viz-subtext mb-1">The poor condition of this house would put your <span @click="showPurchasePrice">purchasing price</span> well below the mean. The <span class="inactive" @click="showAsIs">as-is value</span>, the price the property was assessed at in 2018, is actually lower than that. Assuming you take on a renovation budget of about <strong>$45,000</strong>, you could be looking at quite a nice <span class="inactive" @click="showAfterRenovation">after-renovation value</span>.</p>
    <p class="caption"><i>Hint: select the highlighted words.</i></p>
    <highcharts :options="chartOptions" v-if="!loading"></highcharts>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import _range from 'lodash.range'
  import Highcharts from 'highcharts'

  export default {
    props: [
      'assessedAmt'
    ],
    data() {
      return {
        chartOptions: {},
        loading: true,
        seriesData: null,
        valueData: null,
      }
    },
    created() {
      axios({
        auth: {
          username: 'EZWE2U4RSITP71QHNYIL',
          password: 'uX11P1aWlfrAFt7RTconuabke5VQedJL'
        },
        baseURL: 'https://api.housecanary.com/v2',
        // baseURL: 'http://localhost:8080/data/propertyValue.json',
        method: 'get',
        params: {
          address: '188 sugar road',
          zipcode: '01740'
        },
        url: '/property/value_by_quality?'
      })
        .then(response => {
          this.valueData = response.data['0']["property/value_by_quality"];

          const lowerPrice = this.valueData.result.value.price_lwr;
          const upperPrice = this.valueData.result.value.price_upr;
          const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2)) * 100000;
          const getStdDeviation = (lowerPrice, upperPrice) => (upperPrice - lowerPrice) / 4;
          
          const generatePoints = (lowerPrice, upperPrice) => {
            let stdDev = getStdDeviation(lowerPrice, upperPrice); 
            let min = lowerPrice - 2 * stdDev;
            let max = upperPrice + 2 * stdDev;
            let unit = (max - min) / 100;
            return _range(min, max, unit);
          }

          const mean = (upperPrice + lowerPrice) / 2;
          const stdDev = getStdDeviation(lowerPrice, upperPrice);
          const points = generatePoints(lowerPrice, upperPrice);
          this.seriesData = points.map(x => ({ x, y: normalY(x, mean, stdDev)}));          

          this.chartOptions = {
            chart: {
              backgroundColor: 'transparent',
              height: 300,
              style: {
                fontFamily: 'Roboto'
              },
              spacing: [0,0,0,0],
              type: 'area',
            },
            credits: {
              enabled: false
            },
            title: {
              text: ''
            },
            yAxis: {
              labels: {
                enabled: false,  	
              },
              gridLineWidth: 0,
              title: ''
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: 13
                },
                y: 23
              },
              plotLines: [{
                color: '#ec9e92',
                value: 473463,
                width: 0,
                label: {
                  align: 'right',
                  text: '',
                  x: 5,
                  y: 80
                }
              },
              {
                color: '#ec9e92',
                value: 436200,
                width: 0,
                label: {
                  align: 'right',
                  text: '',
                  x: 5,
                  y: 85
                }
              },
              {
                color: '#ec9e92',
                value: 571287,
                width: 0,
                label: {
                  align: 'right',
                  text: '',
                  x: 5,
                  y: 117
                }
              }],
              title: {
                style: {
                  fontSize: 14
                },
                text: ''
              }
            },
            tooltip: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            series: [{
              data: this.seriesData,
            }],
            plotOptions: {
              area: {
                enableMouseTracking: false,
                color: '#23947a',
                fillColor: 'rgba(35, 148, 122, .35)',
                zoneAxis: 'x',
                zones: [{
                  fillColor: '#fafafa',
                  value: lowerPrice,
                },{
                  value: upperPrice,
                },{
                  fillColor: '#fafafa',
                }]
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.loading = false);
    },
    methods: {
      showPurchasePrice(e) {        
        this.chartOptions.xAxis.plotLines[0].width = 2;
        this.chartOptions.xAxis.plotLines[0].label.text = 'Purchase price';
        e.target.nextElementSibling.classList.remove('inactive');
      },
      showAsIs(e) {
        this.seriesData.unshift({x: this.assessedAmt, y: 0 });
        this.chartOptions.series[0].data = this.seriesData;
        this.chartOptions.xAxis.plotLines[1].width = 2;
        this.chartOptions.xAxis.plotLines[1].label.text = 'Assessed value';
        e.target.nextElementSibling.nextElementSibling.classList.remove('inactive');
      },
      showAfterRenovation() {
        this.chartOptions.xAxis.plotLines[2].width = 2;
        this.chartOptions.xAxis.plotLines[2].label.text = 'After-renovation value';
      }
    }
  }
</script>

<style>
  .viz-subtext span {
    background-color: rgba(236, 158, 146, .5);
    border-radius: 2px;;
    display: inline;
    padding: 2px 4px;
    transition: background-color ease 0.2s;
  }

  .viz-subtext span:hover {
    cursor: pointer;
  }

  .viz-subtext span.inactive {
    background-color: transparent;
    padding: 0;
    pointer-events: none;
  }
</style>