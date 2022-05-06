<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2022-04-19 23:30:44
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpMBDLNearMeeting\index.vue
-->
<template>
  <div>
    <carouselBox />
    <myTopics />
    <dataDownload :meetingTypeId="meetingTypeId" />
  </div>
</template>

<script>
import carouselBox from "./components/carouselBox/index.vue";
import myTopics from "./components/myTopics/index.vue";
import dataDownload from "../gpMBDlLive/components/dataDownload.vue";

export default {
  components: {
    carouselBox,
    myTopics,
    dataDownload,
  },
  data() {
    return {
      meetingTypeId: "",
    };
  },
  created() {
    this.meetingTypeId = this.$route.query.id;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep .routerpage {
  overflow-y: auto;
}

.tab-list-box {
  display: flex;
  justify-content: start;

  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
