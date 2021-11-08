<!--
* @author:shujie
* @Date: 2021-4-15 11:21:13
* @Description: 普通iText展示
 -->
<template>
  <iFormGroup row="3">
    <iFormItem v-for="(item, index) in title" :key="index" :label="item.language ? $t(item.language) : item.name" :v-permission="item.permission">
      <iText>111</iText>
    </iFormItem>
  </iFormGroup>
</template>

<script>
import {iFormGroup, iFormItem, iText} from "rise";

export default {
  components: {
    iFormGroup,
    iFormItem,
    iText
  },
  props: {
    title: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    handleIsLaborunion(val) {
      if (val !== undefined) {
        return val ? "是" : "否";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
