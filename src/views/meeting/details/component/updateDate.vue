<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_HUIYIGAIQI')"
    :visible.sync="dialogStatusManageObj.openUpdateDateDialog"
    width="67.5rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <theTable
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableListColumns="tableListColumns"
      :typeObject="typeObject"
      @handleChangePage="handleChangePage"
      @handleSelected="handleSelected"
    ></theTable>
    <div class="button-list">
      <iButton @click="clearDiolog" class="cancel">{{
        $t('LK_QUXIAO')
      }}</iButton>
      <iButton
        @click="handleSubmit"
        class="save"
        v-if="row.length !== 1"
        disabled
        :loading="loading"
        >{{ $t('LK_QUEREN') }}</iButton
      >
      <iButton @click="handleSubmit" class="save" v-else>{{
        $t('LK_QUEREN')
      }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import theTable from './theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { getMettingList } from '@/api/meeting/home'
import { tableListColumns } from './data'
import { rescheduleThemen } from '@/api/meeting/details'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    theTable
  },
  props: {
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogStatusManageObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    typeObject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      tableListData: [],
      tableListColumns,
      row: []
    }
  },
  mounted() {
    this.getUpdateDateTableList()
  },
  methods: {
    handleSelected(row) {
      this.row = row
    },
    handleSubmit() {
      // this.$confirm("确定要进行改期吗?", "提示", {
      //   confirmButtonText: "确认",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      const data = {
        sourceMeetingId: this.meetingInfo.id,
        targetMeetingId: this.row[0].id,
        themenId: this.selectedTableData[0].id
      }
      this.loading = true
      rescheduleThemen(data)
        .then((res) => {
          if (res.code === 200) {
            iMessage.success(this.$t('改期成功'))
          }
          this.loading = false
          this.$emit('flushTable')
          this.close()
        })
        .catch((err) => {
          this.loading = false
          iMessage.error('改期失败 ' + err)
          this.$emit('flushTable')
          this.close()
        })
      // });
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        pageNum: this.page.currPage,
        pageSize: 10,
        states: ['02', '03']
      }
      this.getUpdateDateTableList(param)
    },
    //获取日期改期的更新的表格数据
    getUpdateDateTableList(e) {
      this.page.currPage = e ? e.pageNum : 1
      let param = {
        pageNum: this.page.currPage,
        pageSize: 10,
        states: ['02', '03'],
        meetingId: this.meetingInfo.id,
        themenId: this.selectedTableData[0].id,
        meetingTypeNames: ['COMMON']
      }
      this.queryMettingList(param)
    },
    //会议改期调取会议大厅列表
    queryMettingList(e) {
      getMettingList(e).then((res) => {
        // let dataArr = res.data ? res.data : [];
        // this.tableListData = dataArr.filter((item) => {
        //   return !(Number(item.id) === Number(this.meetingInfo.id));
        // });
        this.tableListData = res.data
        this.page.total = res.total
      })
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.close()
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.close()
        // });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  padding-left: 20px;
}
.button-list {
  padding: 0 15px;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  padding-left: 780px;
  .cancel,
  .save {
    width: 100px;
    height: 35px;
    flex-grow: 1;
    flex-shrink: 0;
  }
  .save {
    margin-left: 20px;
  }
}
</style>
