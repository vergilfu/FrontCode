<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-main>
        <div class="chartLine_wrap">
          <div id="myChart" :style="{ width: '100%', height: '438px' }"></div>
        </div>
      </el-main>
    </el-container>
  </el-form>
</template>


<script>
import * as echarts from 'echarts';
import axios from "axios";


require("echarts/theme/macarons"); //引入主题
export default {
  name: "board",
  data() {
    return {
      dataseries: [],
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      date: [],
      property: {},
      formInline: {
        user: "",
        region: ""
      }
    };
  },

  mounted() {
    this.searchData();
  },


  methods: {
    searchData() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/board/getdataseries", {
          taskid: "2935685772665087224"
        })
        .then(response => {
          this.dataseries = response.data
          this.insertData()
          this.drawLine()
        });
    },

    insertData() {
      this.date = this.dataseries.date;
      this.a = this.dataseries.a;
      this.b = this.dataseries.b;
      this.c = this.dataseries.c;
      this.d = this.dataseries.d;
      this.e = this.dataseries.e;
      this.f = this.dataseries.f;
      this.g = this.dataseries.g;
      this.h = this.dataseries.h;
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "基线全回归自动化首次人均报错数",
          top: "30",
          left: "32",
          textStyle: {
            fontSize: 16, //字体大小
            color: "#333", //字体颜色
            fontWeight: "500",
          },
        },
        tooltip: {
          //触发类型：坐标轴触发
          trigger: "axis", //触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
          axisPointer: {
            type: "line", //默认为line，line直线，cross十字准星，shadow阴影
            lineStyle: {
              type: "dashed",
              color: "#808BA9",
            },
          },
          backgroundColor: "#fff", //也可以通过设置rgba调节背景颜色与透明度
          color: "#333",
          borderWidth: "1",
          borderColor: "#D9E1F8",
          textStyle: {
            color: "#333",
            fontSize: "12",
            lineHeight: "17",
          },
          formatter: function (arg) {
            // 自定义提示
            return (
              arg[0].name +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[0].color +
              ';"></span>' +
              arg[0].seriesName +
              '<span style="margin-left:10px;">' +
              arg[0].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[1].color +
              ';"></span>' +
              arg[1].seriesName +
              '<span style="margin-left:10px;">' +
              arg[1].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[2].color +
              ';"></span>' +
              arg[2].seriesName +
              '<span style="margin-left:10px;">' +
              arg[2].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[3].color +
              ';"></span>' +
              arg[3].seriesName +
              '<span style="margin-left:10px;">' +
              arg[3].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[4].color +
              ';"></span>' +
              arg[4].seriesName +
              '<span style="margin-left:10px;">' +
              arg[4].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[5].color +
              ';"></span>' +
              arg[5].seriesName +
              '<span style="margin-left:10px;">' +
              arg[5].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[6].color +
              ';"></span>' +
              arg[6].seriesName +
              '<span style="margin-left:10px;">' +
              arg[6].data +
              "</span>" +
              "<br>" +
              '<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
              arg[7].color +
              ';"></span>' +
              arg[7].seriesName +
              '<span style="margin-left:10px;">' +
              arg[7].data +
              "</span>"
            );
          },
        },
        legend: {
          icon: "circle",
          itemHeight: 10, //修改icon图形大小
          textStyle: {
            fontSize: 14,
            color: "#333",
          },
          x: "left", //可设定图例在左、右、居中
          y: "top", //可设定图例在上、下、居中
          padding: [81, 0, 0, 32], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        grid: {
          top: "145",
          left: "17",
          right: "17",
          bottom: "41",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.date,
          //使坐标轴刻度与标签对齐
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            // 改变x轴颜色
            lineStyle: {
              // color: "#D9E1F8",
              color: "#666",
              width: "1",
            },
          },
          axisLabel: {
            // 改变x轴字体颜色和大小
            formatter(val) {
              return "{a|" + `${val}` + "}";
            },
            rich: {
              a: {
                height: 40, // 设置字体行高
                color: "#666",
                fontSize: 14,
              },
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false, //y轴线消失
          },
          axisTick: {
            show: false, //y轴坐标点消失
          },
          boundaryGap: [0.1, 0], //有负数设置这个
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#D9E1F8",
            },
          },
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: "#92A5E3",
            },
          },
        },
        series: [
          {
            name: this.dataseries.grouplist.a,
            type: "line", //bar:柱状 line:折线图
            data: this.a,
            color: "#000000",
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.b,
            type: "line",
            data: this.b,
            color: "#8B0000",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.c,
            type: "line",
            data: this.c,
            color: "#FF00FF",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.d,
            type: "line",
            data: this.d,
            color: "#00FF00",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.e,
            type: "line",
            data: this.e,
            color: "#6495ED",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.f,
            type: "line",
            data: this.f,
            color: "#00FFFF",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.g,
            type: "line",
            data: this.g,
            color: "#CDBA96",
            symbolSize: 8, //折线点的大小
          },
          {
            name: this.dataseries.grouplist.h,
            type: "line",
            data: this.h,
            color: "#FFFF00",
            symbolSize: 8, //折线点的大小
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chartLine_wrap {
  width: auto;
  height: 438px;
  background: #fff;
}
</style>
