<template>
  <div>
    <div class="echarts-inner" ref="echart"></div>
  </div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    option: {
      type: Object,
      return: {},
    },
    index: {
      type: Number,
      return: 0,
    },
  },
  data() {
    return {};
  },
  watch: {
    option: {
      handler() {
        this.myEcharts();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    myEcharts() {
      const el = document.querySelectorAll(".echarts-inner")[this.index];
      el.style.width = this.width / 16 + "rem";
      el.style.height = this.height / 16 + "rem";
      let myChart = echarts().init(
        // document.querySelectorAll(".echarts-inner")[this.index]
        this.$refs.echart
      );
      myChart.setOption(this.option);
    },
  },
  mounted() {
    console.log(this.index);
    this.myEcharts();
  },
};
</script>
<style lang="scss" scoped></style>
