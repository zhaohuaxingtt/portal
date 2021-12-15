<template>
  <div class="container">
    <div class="header">{{ $t('会议资料') }}</div>
    <div v-if="documentTypeList.length > 0">
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="item.name"
          :name="'first' + index"
          v-for="(item, index) of documentTypeList"
          :key="index"
          class="tab-item"
        >
          <iCard class="my-topics-all">
            <dataTable :documents="item.documents"></dataTable>
          </iCard>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else class="no-doc">
      {{ $t('暂无下载资料') }}
    </div>
  </div>
</template>
<script>
import { iCard } from 'rise'
import dataTable from './dataTable.vue'
import { findByMeetingTypeId } from '@/api/file/filedownload.js'
export default {
  components: {
    iCard,
    dataTable
  },

  data() {
    return {
      activeName: 'first0',
      documentTypeList: []
    }
  },
  mounted() {
    const param = {
      category:"02",
    }
    this.query(param)
  },
  methods: {
    query(param) {
      findByMeetingTypeId(param).then((res) => {
        this.documentTypeList = [...res].slice(0, 8)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.no-doc {
  width: 1740px;
  height: 105px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  line-height: 105px;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  text-align: center;
}
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
      color: #1763f7;
    }
    .el-tabs__active-bar {
      height: 3px;
    }
  }
}
::v-deep.container {
  /* width: 1740px;
  margin: 0 auto; */
  width: 1740px;
  .header {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    letter-spacing: 0;
    line-height: 27px;
    margin: 40px 0 30px;
  }

  .my-topics-all {
    width: 100%;
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
        color: #1763f7;
      }
      .el-tabs__active-bar {
        height: 3px;
      }
    }
  }
}

::v-deep .el-table {
  width: 1660px;
}
</style>
