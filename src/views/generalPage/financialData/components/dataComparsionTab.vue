<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-04 13:57:39
 * @Descripttion: your project
-->
<template>
  <div class="tabBox">
    <div
      class="item"
      :class="{ 'item-active': current === index + 1 }"
      v-for="(item, index) of list"
      :key="item"
      @click="handleItemClick(index + 1, item.value)"
    >
      {{ item.title }}
    </div>
    <el-tooltip effect="light" placement="top-start">
      <template slot="content">
        <div v-html="tipContent"></div>
      </template>
      <icon symbol name="iconzhongyaoxinxitishi" class="iconStyle"></icon>
    </el-tooltip>
  </div>
</template>

<script>
import { icon } from "rise";

export default {
  components: {
    icon
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          { title: "资产负债表", value: "balance" },
          { title: "利润表", value: "income" },
          { title: "现金流量表", value: "cashFlow" },
          { title: "其他财务数据", value: "other" },
          { title: "基础信息", value: "infor" }
        ];
      }
    },
    tipContent: {
      type: String,
      default:
        "贵司提供的财务数据将仅用于上汽<br/>" +
        "大众供应财务风险评估，且这些信<br/>" +
        "息均会被严格保密。本模块建议由<br/>" +
        "贵司财务人员填写。"
    }
  },
  data() {
    return {
      current: 1
    };
  },
  methods: {
    handleItemClick(index, data) {
      this.current = index;
      this.$emit("handleClick", data);
    }
  }
};
</script>

<style scoped lang="scss">
.tabBox {
  display: flex;
  align-items: center;
  border-radius: 10px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 136px;
    background: #f5f6f7;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    line-height: 25px;
    padding: 8px 20px;
    cursor: pointer;
  }

  .item-active {
    font-weight: bold;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    color: #67C23A;
  }

  .iconStyle {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>