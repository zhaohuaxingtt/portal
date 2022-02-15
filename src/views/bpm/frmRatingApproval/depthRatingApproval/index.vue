<!--
 * @Author: 舒杰
 * @Date: 2021-06-08 16:51:54
 * @LastEditTime: 2022-02-15 15:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\bpm\frmRatingApproval\depthRatingApproval\index.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-5-21 11:45:11
 * @Description:深评审批清单
 -->
<template>
  <!--深评审批清单-->
  <div class="iPage">
    <!-- <div class="margin-bottom20 flex-between-center">
				<div class="title flex-align-center">{{$t('SPR_FRM_DEP_SPSPQD')}}</div>
				<div class="floatright">
					<iButton>{{ $t('SUPPLIER_PIZHUN') }}</iButton>
					<iButton>{{ $t('LK_JUJUE') }}</iButton>
					<iButton>{{ language('补充材料') }}</iButton>
				</div>
			</div> -->
    <iCard>
      <el-table ref="multipleTable"
                :data="tableListData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                multiple
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
        <el-table-column v-for="item,i in tableTitle"
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
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
    </iCard>
  </div>
</template>

<script>
import {
  iPage, iCard, iPagination, iButton, iSelect, iInput
} from 'rise'
// import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import { depthRatingApprovalTitle } from './data'
// import { approvalListQuery } from '@/api/approval/frmRating'
import { approvalListGroupByPid } from '@/api/frmRating/depthRating';
import { selectDictByKeys } from '@/api/dictionary';
export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    // tableList,
    // iPage,
    iCard,
    // iButton,
    iSelect,
    iInput
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      tableListData: [],
      tableTitle: depthRatingApprovalTitle,
      tableLoading: false,
      currentSelect: [], //当前选择的数据
      fromGroup: {},
      init: false
    }
  },
  async created () {
    await this.getAllSelect()
    this.getTableList()
  },
  methods: {
    // clearDiolog () {
    //   this.$emit('input', false)
    // },
    checkChildren (currentSelect, row) {
      let action = currentSelect.indexOf(row) !== -1 ? true : false
      if (row.children && row.children !== null && row.children.length > 0) {
        row.children.map((c) => {
          this.$refs.multipleTable.toggleRowSelection(c, action)
        })
      }
    },
    getTableList () {
      let data = {
        approvalBusinessId: this.$route.query.approvalBusinessId,
        stopApprovalBusinessId: this.$route.query.stopApprovalBusinessId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      approvalListGroupByPid(data).then((res) => {
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
          console.log(this.tableListData, "tableList")
        } else {
          this.tableListData = []
        }
      })
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
    // 筛选可勾选的数据
    checkSelectable (row) {
      return row.children !== undefined
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
    },
    handleSelectionChange (currentSelect) {
      // console.log(currentSelect)
      this.currentSelect = currentSelect
    },
  }
}
</script>

<style scoped lang="scss">
.iPage {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.title {
  font-weight: bold;
  font-size: 20px;
  color: $color-black;
}
</style>
