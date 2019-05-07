<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-date-picker style="float: right;" size="small" v-model="value" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="getMonitorData">
      </el-date-picker>
    </el-row>
    <el-row>
      <div id="Innodb_row_lock_waits" style="width: 100%; height: 500px;"></div>
    </el-row>
  </div>
</template>

<script>
  import echarts from "echarts";
  import { debounce } from '../debounce'
  import axios from 'axios'
  import {formatDates} from '../TimeExchange'
  export default {
    name: "Innodb_row_lock_waits",
    data() {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        value: null,
        times: {
          from: '',
          to: ''
        },
        message: {
          expectedData:  null,
          time: [],
          Ydata: []
        },
        chart: null
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      setOptions({ expectedData, actualData } = {}) {
        this.chart.setOption({
          xAxis: {
            data: this.message.time,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 50,
            right: 80,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ["Innodb_row_lock_waits"]
          },
          series: [
            {
              name: "Innodb_row_lock_waits",
              itemStyle: {
                normal: {
                  color: "#ff9d13",
                  lineStyle: {
                    color: "#ff9d13",
                    width: 2
                  }
                }
              },
              smooth: true,
              type: "line",
              data: this.message.Ydata,
              animationDuration: 2800,
              animationEasing: "cubicInOut"
            }
          ]
        });
      },
      initChart () {
        let endTime = +new Date()
        // 实时显示
        this.times = {
          from: formatDates(new Date(endTime-5*60*1000),'yyyy-MM-dd hh:mm:ss'),
          to: formatDates(new Date(endTime),'yyyy-MM-dd hh:mm:ss')
        }
        this.getMonitorData()
      },
      getMonitorData () {
        const Innodb_row_lock_waits = document.getElementById("Innodb_row_lock_waits");
        this.chart = echarts.init(Innodb_row_lock_waits);
        this.getData()
        setTimeout(() => {
          this.exchange()
          this.setOptions()
        }, 1000)
      },
      getData () {
        if (this.value !== null){
          // 历史显示优先级高于实时显示
          this.times = {
            from: formatDates(new Date(this.value[0]-5*60*1000),'yyyy-MM-dd hh:mm:ss'),
            to: formatDates(new Date(this.value[1]),'yyyy-MM-dd hh:mm:ss')
          }
        }
        axios({
          url: 'http://localhost/time',
          method: 'get',
          params: {
            start: this.times.from,
            stop: this.times.to
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(this.succeedOperation).catch(function (show) {
          console.log(show)
        })
      },
      succeedOperation (response) {
        response = response.data
        this.message.expectedData = response
      },
      exchange () {
        if(this.message.expectedData === null){
          alert('NULL VALUE')
        }else{
          // 清空缓存区
          this.message.time = [];
          this.message.Ydata = [];
          //console.log(this.message.expectedData)
          for(let i=0;i<this.message.expectedData.length;i++){
            this.message.time.push(this.message.expectedData[i].Current_times);
            this.message.Ydata.push(this.message.expectedData[i].Innodb_row_lock_waits);
          }
        }
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
  };
</script>

<style scoped>
  .error-code span {
    color: #00a854;
  }
</style>
