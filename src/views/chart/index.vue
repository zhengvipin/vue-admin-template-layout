<template>
  <div id="chart" ref="chart" class="chart" style="border: 1px solid red" />
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TitleComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  TitleComponent,
  GridComponent,
  CanvasRenderer
])
export default {
  data() {
    const gapNum = 0.1
    const yAxisData = [2, 2, 3, 5].map(d => d - gapNum)
    return {
      chartInstance: null,
      option: {
        title: { text: '待办情况：' },
        width: '90%',
        grid: {
          containLabel: true,
          left: 20
        },
        yAxis: {
          type: 'category',
          data: ['数据提取', '用户申请', '参数维护', '业务差错'],
          axisLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          offset: 10
        },
        xAxis: {
          type: 'value',
          show: false
        },
        series: [
          // {
          //   name: 'assist',
          //   type: 'bar',
          //   stack: '1',
          //   itemStyle: {
          //     normal: {
          //       barBorderColor: 'rgba(0,0,0,0)',
          //       color: 'rgba(0,0,0,0)'
          //     },
          //     emphasis: {
          //       barBorderColor: 'rgba(0,0,0,0)',
          //       color: 'rgba(0,0,0,0)'
          //     }
          //   },
          //   tooltip: {
          //     trigger: 'none'
          //   },
          //   data: new Array(4).fill(gapNum)
          // },
          {
            type: 'bar',
            stack: '1',
            data: yAxisData,
            label: {
              show: true,
              position: 'right',
              formatter: function(param) {
                return param.data + gapNum
              }
            },
            itemStyle: {
              color: function(param) {
                return ['#bdbdbd', '#bdbdbd', '#bdbdbd', '#03a9f4'][param.dataIndex]
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chart)
    this.chartInstance.setOption(this.option)
  },
  beforeDestroy() {
    this.chartInstance = null
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
