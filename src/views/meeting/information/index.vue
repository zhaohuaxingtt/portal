<template>
  <iCard>
    <iTabs @tab-click="handleLoad">
      <el-tab-pane class="margin-bottom3" :label="$t('MT_HUIYILIANXIREN')"
        ><contact></contact
      ></el-tab-pane>
      <el-tab-pane class="margin-bottom3" :label="$t('MT_HUIYILEIXINGGUANLI')" name="tab3"
        ><typeManagement :key="timer2"></typeManagement
      ></el-tab-pane>
      <el-tab-pane class="margin-bottom3" :label="$t('MT_HUIYIZILIAOGUANLI')" name="tab2"
        ><dataManagement :key="timer"></dataManagement
      ></el-tab-pane>
    </iTabs>
  </iCard>
</template>

<script>
import { iCard, iTabs } from "rise";
import contact from "./contact";
import dataManagement from "./dataManagement";
import typeManagement from "./typeManagement";
export default {
  components: { iCard, iTabs, contact, dataManagement, typeManagement },
  data() {
    return {
      timer: "",
      timer2: "",
    };
  },
  methods: {
    handleLoad(tab) {
      if (tab.name == "tab2") {
        this.timer = new Date().getTime();
      } else if (tab.name == "tab3") {
        this.timer2 = new Date().getTime();
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
