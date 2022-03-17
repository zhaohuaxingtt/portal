<!--
* @author:moxuan
* @Date: 2021-5-06 17:21:13
* @Description: 普通iText展示
 -->
<template>
  <iFormGroup row="3">
    <iFormItem v-for="(item, index) in title"
               :key="index"
               :label="$t(item.language)">
      <iText v-if="item.key === 'isLaborunion'">
        <span v-permission="item.permission">{{ handleIsLaborunion(data[item.key]) }}</span>
      </iText>
      <iText v-else>
        <span v-permission="item.permission">{{ data[item.key] ? data[item.key] : '' }}</span>
      </iText>
    </iFormItem>
  </iFormGroup>
</template>

<script>
import { iFormGroup, iFormItem, iText } from "rise";

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
        return {}
      }
    }
  },
  methods: {
    handleIsLaborunion (val) {
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
