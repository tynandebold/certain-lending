<template>
  <v-layout d-flex column>
    <div class="title mb-2">Standard deviation around estimated property value</div>
    <p class="viz-subtext">You could buy this house at this <span @click="showPurchasePrice">purchasing price</span>. But the <span @click="showAsIs">as-is value</span> is actually lower than that. Assuming you take on a renovation budget of about <strong>$30,000</strong>, you could be looking at quite a nice <span @click="showAfterRenovation">after-renovation value</span>.</p>
    <highcharts :options="chartOptions"></highcharts>
  </v-layout>
</template>

<script>
  import Highcharts from 'highcharts';
  import _range from 'lodash.range';

  const lowerBound = 505903, upperBound = 578553;
  const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2)) * 100000;
  const getStdDeviation = (lowerBound, upperBound) => (upperBound - lowerBound) / 4;
  
  const generatePoints = (lowerBound, upperBound) => {
    let stdDev = getStdDeviation(lowerBound, upperBound); 
    let min = lowerBound - 2 * stdDev;
    let max = upperBound + 2 * stdDev;
    let unit = (max - min) / 100;
    return _range(min, max, unit);
  }

  const mean = (upperBound + lowerBound) / 2;
  const stdDev = getStdDeviation(lowerBound, upperBound);
  const points = generatePoints(lowerBound, upperBound);
  let seriesData = points.map(x => ({ x, y: normalY(x, mean, stdDev)}));

  export default {
    data() {      
      return {
        chartOptions: {
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
              value: 516800,
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
            data: seriesData,
          }],
          plotOptions: {
            area: {
              enableMouseTracking: false,
              color: '#23947a',
              fillColor: 'rgba(35, 148, 122, .35)',
              zoneAxis: 'x',
              zones: [{
                fillColor: '#fafafa',
                value: lowerBound,
              },{
                value: upperBound,
              },{
                fillColor: '#fafafa',
              }]
            }
          }
        }
      }
    },
    methods: {
      showPurchasePrice() {        
        this.chartOptions.xAxis.plotLines[0].width = 2;
        this.chartOptions.xAxis.plotLines[0].label.text = 'Purchase price';
      },
      showAsIs() {
        seriesData.unshift({x: 436200, y: 0 });
        this.chartOptions.series[0].data = seriesData;
        this.chartOptions.xAxis.plotLines[1].width = 2;
        this.chartOptions.xAxis.plotLines[1].label.text = 'Assessed value';
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
  }

  .viz-subtext span:hover {
    cursor: pointer;
  }
</style>