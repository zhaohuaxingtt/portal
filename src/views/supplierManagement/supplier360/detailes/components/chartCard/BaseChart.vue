<template>
  <div
    class="echarts"
    :id="id"
    :ref="id"
    
  ></div>
  <!-- :style="{ height: height * (wHeight / 578) + 'px', width: '100%' }" -->
</template>
<script>
import echarts from '@/utils/echarts'

export default {
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  data() {
    return {
      echartsElement: "", //echarts实例,
      wHeight: window.innerHeight,
    };
  },
  computed: {
 
    style() {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },
  watch: {
    //要监听的对象 option
    //由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    option: {
      handler(newVal, oldVal) {
        if (this.echartsElement) {
          if (newVal) {
            this.echartsElement.setOption(newVal, true);
          } else {
            this.echartsElement.setOption(oldVal, true);
          }
        } else {
          this.initCharts();
        }
      },
      deep: true, //对象内部属性的监听，关键。
    },
    isCollapse() {
      setTimeout(() => {
        this.echartsElement.resize();
      }, 500);
    },
    getOverData: {
      handler() {
        this.initCharts();
      },
      deep: true, //对象内部属性的监听，关键。
    },
    mapCol(newVal) {
      if (newVal !== 24) {
        this.echartsElement.resize();
      }
    },
  },
  methods: {
 
    initCharts() {
      this.echartsElement = echarts.init(this.$refs[this.id]);
      this.echartsElement.clear();
      this.echartsElement.setOption(this.option, true); // 设置为true可以是图表切换数据时重新渲染
      let _this = this;
      window.addEventListener("resize", function () {
        _this.echartsElement.resize();
      });
      this.echartsElement.off("click");
      this.echartsElement.on("click", (params) => {
        this.$emit("chartClick", params);
      });
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>