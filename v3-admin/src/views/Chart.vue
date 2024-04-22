<template>
  <div class="chart-container">
    <div class="chart-total">
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">固定资产</span>
      </div>
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">固定资产</span>
      </div>
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">流动资产</span>
      </div>
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">资产维护</span>
      </div>
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">报废资产</span>
      </div>
      <div class="total-box">
        <span class="total-number">20</span>
        <span class="total-text">企业员工</span>
      </div>
    </div>
    <div class="chart-box">
      <div ref="bar" class="chart-box__item"></div>
      <div ref="main" class="chart-box__item"></div>
      <div ref="polyline" class="chart-box__item"></div>
      <div ref="columnar" class="chart-box__item"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const main = ref(null);
const bar = ref(null);
const polyline = ref(null);
const columnar = ref(null);
onMounted(() => {
  circle(main.value);
  barChart(bar.value);
  polylineChart(polyline.value);
  columnarChart(columnar.value);
});
function circle(dom) {
  const myChart = echarts.init(dom);
  const option = {
    title: {
      text: "资产清单",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
}
function barChart(dom) {
  const myChart = echarts.init(dom);
  const option = {
    dataset: {
      source: [
        ["score", "amount", "product"],
        [89.3, 58212, "Matcha Latte"],
        [57.1, 78254, "Milk Tea"],
        [74.4, 41032, "Cheese Cocoa"],
        [50.1, 12755, "Cheese Brownie"],
        [89.7, 20145, "Matcha Cocoa"],
        [68.1, 79146, "Tea"],
        [19.6, 91852, "Orange Juice"],
        [10.6, 101852, "Lemon Juice"],
        [32.7, 20112, "Walnut Brownie"],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: { type: "category" },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 10,
      max: 100,
      text: ["High Score", "Low Score"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
        },
      },
    ],
  };

  option && myChart.setOption(option);
}
function polylineChart(dom) {
  const myChart = echarts.init(dom);
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  option && myChart.setOption(option);
}
function columnarChart(dom) {
  const myChart = echarts.init(dom);
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  option && myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.chart-container {
  height: cal(100vh-60px);
  padding: 20px;
  border-radius: 5px;
  .chart-total {
    display: flex;
    justify-content: space-around;
    .total-box {
      background: #fff;
      display: flex;
      width: 230px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      .total-number {
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
      }
      .total-text {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .chart-box {
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    .chart-box__item {
      width: 49.6%;
      height: 500px;
      background: #fff;
      margin-bottom: 10px;
    }
    .chart-box__item:nth-child(2n + 1) {
      margin-right: 10px;
    }
  }
}
</style>
