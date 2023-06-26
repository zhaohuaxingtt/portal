<template>
  <div>
    <!--转派-->
    <iDialog
      :title="$t('转派任务至')"
      :visible.sync="visible"
      append-to-body="true"
      width="500"
      top="5vh"
      @close="clearDiolog"
      :close-on-click-modal="false"
    >
      <el-table :data="tableData">
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="taskId"
          label="任务id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="handler"
          label="原负责人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="targetUserName"
          label="转派至"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="link" @click="changeUser(scope.row, scope.$index)">选择用户</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer margin-top10">
        <iButton @click="handleConfirmTransfer">{{ $t('LK_QUEREN') }}</iButton>
        <iButton @click="clearDiolog">{{ $t('LK_QUXIAO') }}</iButton>
      </span>
    </iDialog>
    <!-- 选择采购员 -->
    <iDialog
      :visible.sync="staffDialogVisible"
      width="90%"
      append-to-body
    >
      <Staff v-if="staffDialogVisible" @confirm="confirm" />
    </iDialog>
  </div>
</template>

<script>
import { iButton, iDialog, iInput, iPagination, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import iTableML from '@/components/iTableML'
import Staff from './staff.vue'
import { taskTransfer } from '@/api/taskManagement/index'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iPagination,
    iButton,
    iTableML,
    Staff
  },
  props: {
    visible: { type: Boolean, default: false },
    selected: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      tableData: [],
      index:'',
      row: {},
      staffDialogVisible: false,
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.tableData = JSON.parse(JSON.stringify(this.selected))
      }
    }
  },
  methods: {
    changeUser(row, index) {
      this.row = JSON.parse(JSON.stringify(row))
      this.index = index
      this.staffDialogVisible = true
    },
    // 选择用户后回调
    confirm(userInfo){
      console.log(userInfo);
      this.row = {...this.row,targetUserId:userInfo.id, targetUserName: userInfo.nameZh}
      this.staffDialogVisible = false
      this.$set(this.tableData,[this.index],this.row)

    },
    // 确认转派
    handleConfirmTransfer(){
      if(!this.tableData[0].originalUserId) return iMessage.warn('请选择转派目标用户')
      let params = {
        originalUserId:this.tableData[0].handler,
        targetUserId:this.tableData[0].targetUserId,
        taskId:this.tableData[0].taskId,
      }
      taskTransfer(params).then(res=>{
        if(res?.code==200){
          iMessage.success('转派成功')
          this.clearDiolog()
          this.$emit('getData')
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    clearDiolog() {
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-bottom: 20px;
  color: $color-black;
  .card__body {
    margin-top: 10px;
    height: auto;
    overflow: hidden;
    min-height: 672px;

    .the_font {
      font-size: 20px;
      font-family: Arial;
      font-weight: 400;
      color: #4b4b4c;
      opacity: 1;
    }

    .search-input ::v-deep {
      display: flex;
      flex-direction: row;
      margin: 10px 0 30px 0;
      .el-input {
        width: 420px;
      }
      .el-button {
        margin-left: 20px;
      }
    }

    .tag-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;

      .tag-button {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        border-color: transparent;
        position: relative;
        border-radius: 0.25rem;
        border: 1px solid #e0e6ed;
        margin-right: 20px;
        height: 35px;
        // overflow-y: auto;
        overflow: hidden;
        // text-overflow: ellipsis;
        .el-icon-close {
          position: absolute;
          right: 10px;
          top: 0.5rem;
          color: #ffffff;
          background: #cbcbcb;
          border-radius: 50%;
          cursor: pointer;
        }
        .tag-item ::v-deep {
          padding-right: 23px;
          position: relative;
          background-color: #f7faff;
          color: #abd0ff;
          border-color: #f7faff;
          border-radius: 2px;
          margin: 0.1% 0.5rem 0.1% 0.1%;
          .el-icon-close {
            position: absolute;
            right: 4px;
            top: 7px;
            color: #abd0ff;
          }
        }
      }
    }
  }
}

// ::v-deep .has-gutter tr {
//   background-color: #eaf1fd;
// }

// ::v-deep .el-table th {
//   background-color: #eaf1fd;
// }

// ::v-deep td {
//   min-width: 0;

//   .cell {
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// }
</style>
