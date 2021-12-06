
<template>
  <div class="card">
    <div class="header">{{$t('我的议题')}}</div>
    <!-- <iCard class="my-topics-all">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未完成" name="first">
          <unfinish />
        </el-tab-pane>
        <el-tab-pane label="已完成" name="second">
          <finished />
        </el-tab-pane>
      </el-tabs>
    </iCard> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('未完成')" name="first">
        <iCard class="my-topics-all">
          <unfinish />
        </iCard>
      </el-tab-pane>
      <el-tab-pane :label="$t('已完成')" name="second">
        <iCard class="my-topics-all">
          <finished />
        </iCard>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { iCard } from "rise";
import finished from "./finished.vue";
import unfinish from "./unfinish.vue";

export default {
  components: {
    iCard,
    finished,
    unfinish,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

.card {
  width: 1731px;
}

.header {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  letter-spacing: 0;
  line-height: 27px;
  margin: 40px 0 20px;
}

::v-deep .el-tabs__header {
  margin-bottom: 20px;

  .el-tabs__nav-wrap {
    &::after {
      height: 0px !important;
    }
    .el-tabs__item {
      font-size: 18px;
      color: #727272;
      letter-spacing: 0;
      text-align: center;
      height: 30px;
      line-height: 25px;
    }
    .is-active {
      color: #1763F7;
    }
    .el-tabs__active-bar {
      height: 3px;
    }
  }
}

/* .my-topics-all {
  width: 100%;

  ::v-deep .el-tabs__nav-wrap {
    &::after {
      height: 0px !important;
    }
    .el-tabs__item {
      font-size: 18px;
      color: #727272;
      letter-spacing: 0;
      text-align: center;
      height: 30px;
      line-height: 25px;
    }
    .is-active {
      color: #1763F7;
    }
    .el-tabs__active-bar {
      height: 3px;
    }
  }
} */

</style>
