<template>
  <!--提交清单审批-->
  <iDialog :title="disabled?language('ZHONGZHIQINGDANSHENPI','终止清单审批'):language('TIJIAOQINGDANSHENPI','提交清单审批')"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog">
    <div class="content">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!--提交-->
          <iButton @click="submitDeepList">{{ $t('LK_TIJIAO') }}</iButton>
        </div>
      </div>
      <el-table ref="multipleTable"
                :data="tableListData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children'}"
                @selection-change="handleSelectionChange"
                @select="checkChildren"
                @select-all="checkAll">
        <el-table-column type="selection"
                         width="55"
                         :selectable="checkSelectable">
        </el-table-column>
        <el-table-column prop="myindex"
                         align='center'
                         label='#'
                         width='50'>
        </el-table-column>
        <el-table-column :label="$t('LK_GYSMCJT')"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.nameZh||scope.row.financialSupplementName}}
          </template>
        </el-table-column>
        <el-table-column v-for="item,i in tableTitle1"
                         :key='i'
                         :prop="item.props"
                         :label="$t(item.key)">
        </el-table-column>
        <el-table-column :prop="deepCommentReasons"
                         :label="$t('SPR_FRM_DEP_DEPREASON')">
          <template slot-scope="scope">
            <iSelect v-model="scope.row.deepCommentReasons"
                     :disabled="disabled">
              <el-option :value="item.name"
                         :label="item.name"
                         v-for="item in fromGroup.DEEP_COMMENT_REASON"
                         :key="item.code"></el-option>
            </iSelect>
          </template>
        </el-table-column>
        <el-table-column :prop="deepCommentReasons"
                         :label="$t('SPR_FRM_DEP_XXYY')">
          <template slot-scope="scope">
            <iInput v-if="scope.row.deepCommentReasons=='其他原因'"
                    :disabled="disabled"
                    v-model="scope.row.deepCommentOtherReasons"
                    @change="check2(scope.row)"
                    maxlength="6"></iInput>
          </template>
        </el-table-column>
        <el-table-column :prop="isDeepComment"
                         :label="$t('SPR_FRM_DEP_ISDEPTH')">
          <template slot-scope="scope">
            <iSelect :disabled="true"
                     v-if="scope.row.children!==undefined"
                     v-model="scope.row.isDeepComment">
              <el-option :value="item.code"
                         :label="item.name"
                         v-for="item in fromGroup.TURE_FALSE"
                         :key="item.code"></el-option>
            </iSelect>
          </template>
        </el-table-column>
        <el-table-column :prop="noDeepCommentReason"
                         :label="$t('SPR_FRM_DEP_BPJYY')">
          <template slot-scope="scope">
            <iInput v-if="scope.row.children!==undefined && scope.row.isDeepComment=='0'"
                    v-model="scope.row.noDeepCommentReason"
                    @change="check(scope.row)"></iInput>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iButton,
  iSelect,
  iInput
} from 'rise';
import tableList from '@/components/commonTable';
import {
  endRatingTitle,
  endRatingTitle1
} from './data';
import {
  submitDeepList,
  approvalListGroupByPid,
  termination
} from '@/api/frmRating/depthRating';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import {
  selectDictByKeys
} from '@/api/dictionary';
export default {
  mixins: [resultMessageMixin],
  components: {
    iDialog,
    iButton,
    iSelect,
    iInput
  },
  props: {
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      tableTitle: endRatingTitle,
      tableLoading: false,
      currentSelect: [], //当前选择的数据
      fromGroup: {},
      tableListData: [],
      tableTitle1: endRatingTitle1,
      init: false
    };
  },
  created () {
    this.getAllSelect()
  },
  methods: {
    handleSelectionChange (currentSelect) {
      // console.log(currentSelect)
      this.currentSelect = currentSelect
    },
    checkAll (currentSelect) {
      const haschild = currentSelect.filter((r) => r.children && r.children !== null && r.children.length > 0)
      if (haschild.length > 0) {
        currentSelect.map((r) => {
          if (r.children && r.children !== null && r.children.length > 0) {
            r.children.forEach((c) => {
              this.currentSelect.push(c)
              this.$refs.multipleTable.toggleRowSelection(c, true)
            })
          }

        })
      } else {
        if (!this.init) {
          this.$refs.multipleTable.clearSelection()
        }
      }
    },
    // 筛选可勾选的数据
    checkSelectable (row) {
      return row.children !== undefined
    },
    checkChildren (currentSelect, row) {
      let action = currentSelect.indexOf(row) !== -1 ? true : false
      if (row.children && row.children !== null && row.children.length > 0) {
        row.children.map((c) => {
          this.$refs.multipleTable.toggleRowSelection(c, action)
        })
      }
    },
    getIndex (all) {
      return all.$index
    },
    clearDiolog () {
      this.$emit('input', false);
    },
    getTableList (ids, statusList) {
      let data = {
        idList: ids, //[102,182]
        statusList: statusList
      }
      approvalListGroupByPid(data).then(res => {
        if (res.data) {
          this.tableListData = res.data.map((r, i) => {
            r.myindex = i + 1
            if (r.children && r.children !== null && r.children.length > 0) {
              r.children = r.children.map((c, j) => {
                c.myindex = r.myindex + '.' + (j + 1)
                return c
              })
            }
            if (this.disabled) {
              r.isDeepComment = '0'
            } else {
              r.isDeepComment = '1'
            }
            return r
          })
          // console.log(this.tableListData)
          this.$refs.multipleTable.toggleAllSelection()
          this.init = true
        } else {
          this.tableListData = []
        }
      })
    },
    // 提交审批清单
    submitDeepList () {
      let flag = false
      this.currentSelect.forEach((r) => {
        if (r.children !== undefined) {
          if (r.isDeepComment === '0' && (r.noDeepCommentReason === '' || r.noDeepCommentReason ===
            null)) {
            flag = true
          }
          if (r.deepCommentReasons == '其他原因' && (r.deepCommentOtherReasons === '' || r.deepCommentOtherReasons === null)) {
            flag = true
          }
        }
      })
      if (flag) {
        // this.$message.error(this.language('QINGTIANXIEBUPINGJIYUANYIN', '请填写不评级原因'))
        this.$message.error(this.$t('SPR_FRM_DEP_BUPINGJIYUANYIN'))
        return
      }
      // 判断是提交还是终止
      if (this.disabled) {
        termination({
          idList: this.currentSelect
        }).then(res => {
          this.resultMessage(res, () => {
            this.clearDiolog()
            this.$emit('getTableList')
          })
        })
      } else {
        submitDeepList({
          list: this.currentSelect
        }).then(res => {
          this.resultMessage(res, () => {
            this.clearDiolog()
            this.$emit('getTableList')
          })
        })
      }
    },
    // 字段查询下拉框
    getAllSelect () {
      let data = ['TURE_FALSE', 'DEEP_COMMENT_REASON']
      let url = 'keys='
      url = url + data.join('&keys=')
      selectDictByKeys(url).then(res => {
        if (res.data) {
          this.fromGroup = res.data
          console.log(this.fromGroup, "========")
        }
      })
    },
    check (row) {
      if (row.isDeepComment === '0' && (row.noDeepCommentReason === '' || row.noDeepCommentReason === null)) {
        this.$message.error(this.$t('SPR_FRM_DEP_CHECK'))
      }
    },
    check2 (row) {
      if (row.deepCommentReasons == '其他原因' && (row.deepCommentOtherReasons === '' || row.deepCommentOtherReasons === null)) {
        this.$message.error(this.$t('SPR_FRM_DEP_CHECK'))
      }
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}
::v-deep .el-table {
  th {
    border-right: none;
  }
  td {
    border-right: none;
  }
  .cell {
    .el-table__indent {
      display: none;
    }
    .el-table__placeholder {
      display: none;
    }
  }
}
</style>
