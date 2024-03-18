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
        <span class="total-text">固定资产</span>
      </div>
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
        <span class="total-text">固定资产</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.chart-container {
  height: cal(100vh-60px);
  padding: 20px;
  border-radius: 5px;
  .chart-total {
    background: #fff;
    display: flex;
    justify-content: space-around;
    .total-box {
      display: flex;
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
}
</style>
