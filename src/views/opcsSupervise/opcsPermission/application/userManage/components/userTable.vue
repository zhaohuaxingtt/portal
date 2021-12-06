<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-06 15:14:11
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\userTable.vue
-->
<template>
  <iCard tabCard
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button v-if="edit"
                  @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button v-if="edit"
                  @click="remove">{{ language('SHANCHU', '删除') }}
        </i-button>
        <i-button v-if="edit"
                  @click="cancelBtn">{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit"
                  @click="save">{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('BIANJI', '编辑') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="freezeBtn">{{ language('DONGJIE', '冻结') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="thawBtn">{{ language('JIEDONG', '解冻') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('LDAPTONGBU', '同步LDAP') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="activeBtn">{{ language('JIHUO', '激活') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="renewalBtn">{{ language('XUQI', '续期') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="download">{{ language('XIAZAIMOBAN', '下载模板') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="exportsTable">{{ language('DAOCHU', '导出') }}
        </i-button>
      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="edit?tableTitleEdit:tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="['supplierNum', 'supplierName', 'supplierAddress','contactName','contactMobile','contactEmail','contactTel']"
                :index="true"
                ref="commonTable">
    </table-list>
    <iPagination style="margin-top: 20px"
                 v-update
                 @size-change="handleSizeChange($event, getTableData)"
                 @current-change="handleCurrentChange($event, getTableData)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle, tableTitleEdit } from './data'
import { iCard, iButton, iSelect, iMessage, iPagination } from 'rise'
import {
  queryDetailUser,
  thawUser,
  saveUser,
  renewalUser,
  freezeUser,
  exportUser,
  downloadUser,
  activeUser
} from '@/api/opcs/solPermission'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iSelect,
    tableList,
    iPagination
  },
  data() {
    return {
      edit: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableTitleEdit: tableTitleEdit,
      tableListData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    save() {
      this.$refs.commonTable.$refs.commonTableForm.validate((valid) => {
        if (valid) {
          saveUser(this.tableListData).then((res) => {
            if (res && res.data == 200) {
              iMessage.success(res.desZh)
            }
          })
        }
      })
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      queryDetailUser(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    editBtn() {
      this.edit = true
    },
    cancelBtn() {
      this.tableListData = []
      this.getTableData()
      this.editMode = false
      this.edit = false
    },
    //导出
    exportsTable() {
      exportUser()
    },
    //下载模板
    download() {
      downloadUser()
    },
    //解冻
    thawBtn() {
      thawUser()
    },
    //激活
    activeBtn() {
      activeUser()
    },
    //冻结
    freezeBtn() {
      freezeUser()
    },
    //续期
    renewalBtn() {
      renewalUser()
    },

    //新增
    add() {
      const newItemList = this.tableTitle.map((item) => {
        return item.props
      })
      const newItem = {}
      newItemList.map((item) => {
        newItem[item] = ''
      })
      this.tableListData.push({
        ...newItem
      })
      this.editMode = true
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    }
  }
}
</script>

<style  lang="scss" scope>
.el-table .el-table__row .el-input {
  width: 100% !important;
}
</style>
