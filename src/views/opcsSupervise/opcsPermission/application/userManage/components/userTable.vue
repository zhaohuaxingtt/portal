<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-18 10:15:38
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
        <!-- <i-button v-if="!edit"
                  @click="upload">{{ language('SHANGCHUAN', '上传') }}
        </i-button> -->
        <i-button v-if="!edit"
                  @click="activeBtn">{{ language('JIHUO', '激活') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="renewalBtn">{{ language('XUQI', '续期') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="download">{{ language('XIAZAIMOBAN', '下载模板') }}
        </i-button>
        <el-upload style="margin-left:10px"
                   v-if="!edit"
                   action="1"
                   :accept="accept"
                   :before-upload="beforeAvatarUpload"
                   :show-file-list="false"
                   :http-request="httpUpload"
                   :disabled="importLoading">
          <div>
            <i-button>{{ language('DAORU', '导入') }}
            </i-button>
          </div>
        </el-upload>

      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="edit?tableTitleEdit:tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="inputProps"
                :index="true"
                ref="commonTable">

      <template #markExpiration='scope'>
        <span v-if="ratioDate(scope.row)">是</span>
        <span v-if="!ratioDate(scope.row)">否</span>
      </template>
      <template #isActive='scope'>
        <span v-if="scope.row.isActive=='Y'||scope.row.isActive==1||scope.row.isActive==true">是</span>
        <span v-if="scope.row.isActive=='N'||scope.row.isActive==0||scope.row.isActive==false">否</span>
      </template>
      <template #system='scope'>
        <iButton @click="openDialog(scope.row)"
                 type="text">{{ language('CAOZUO', '操作') }}
        </iButton>
      </template>
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
    <systemDetail @closeDiolog="closeDiolog"
                  v-model="isdialog"
                  :rowList="rowList"></systemDetail>
    <iDialog :visible.sync="importDialog"
             width="90%"
             top="2%"
             :title="language('DAORU', '导入')">
      <table-list style="padding-bottom:20px"
                  :tableData="tableListDetail"
                  :tableTitle="tableTitleEdit"
                  :tableLoading="tableLoading">

      </table-list>
    </iDialog>

  </iCard>
</template>

<script>
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import systemDetail from './systemDetail'
import { tableTitle, tableTitleEdit } from './data'
import store from '@/store'
import {
  iCard,
  iButton,
  iMessage,
  iPagination,
  iMessageBox,
  iDialog
} from 'rise'
import {
  queryDetailUser,
  thawUser,
  saveUser,
  renewalUser,
  freezeUser,
  downloadUser,
  activeUser,
  imports
} from '@/api/opcs/solPermission'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    systemDetail,
    iDialog
  },
  data() {
    return {
      importDialog: false,
      isdialog: false,
      rowList: {},
      inputProps: [],
      edit: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableTitleEdit: tableTitleEdit,
      tableListData: [],
      importLoading: false,
      tableListDetail: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    save() {
      this.$refs.commonTable.$refs.commonTableForm.validate((valid) => {
        if (valid) {
          let parmars = {
            saveUserList: this.tableListData,
            opcsSupplierId: this.$route.query.opcsSupplierId
          }
          console.log(parmars)
          saveUser(parmars).then((res) => {
            if (res && res.code == 200) {
              this.inputProps = []
              this.edit = false
              this.getTableData()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        }
      })
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        opcsSupplierId: this.$route.query.opcsSupplierId,
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
      this.inputProps = [
        'supplierNum',
        'supplierName',
        'supplierAddress',
        'contactName',
        'contactMobile',
        'contactEmail',
        'contactTel'
      ]
      this.edit = true
    },
    cancelBtn() {
      this.inputProps = []
      this.tableListData = []
      this.getTableData()
      this.editMode = false
      this.edit = false
    },
    //导入
    async httpUpload(info) {
      this.importLoading = true
      let formData = new FormData()
      formData.append('file', info.file)
      formData.append('opcsSupplierId ', this.$route.query.opcsSupplierId)
      formData.append('userId ', store.state.permission.userInfo.id)
      //    const res= await imports(formData)
      await imports(formData).then((res) => {
        if (res.code == 200 && res) {
          if (res.data.length > 0) {
            this.importDialog = true
            this.tableListDetail = res.data
          }
        }
      })
      this.importLoading = false
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error(`上传文件大小不能超过10MB!`)
      }
      return isLt10M
    },
    closeDiolog() {
      this.isdialog = false
    },
    //应用关联弹窗
    openDialog(v) {
      this.rowList = v
      this.isdialog = true
    },
    //下载模板
    download() {
      downloadUser({ pageNo: this.page.currPage, pageSize: this.page.pageSize })
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
    remove() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      iMessageBox(
        this.language('QUERENSHANCHUGAIYINGYONG', '确认删除该应用？'),
        this.language('SHANCHU', '删除'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        this.selectTableData.map((v) => {
          this.tableListData.map((j, i) => {
            if (v === j) {
              this.tableListData.splice(i, 1)
            }
          })
        })
      })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //解冻
    thawBtn() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      thawUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    //激活
    activeBtn() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      activeUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    //冻结
    freezeBtn() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      freezeUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    //续期
    renewalBtn() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      renewalUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    ratioDate(row) {
      var strtime = row.markExpiration.replace('/-/g', '/') //时间转换
      //时间
      var date1 = new Date(strtime)
      //现在时间
      var date2 = new Date()
      //判断时间是否过期
      return date1 < date2 ? true : false
    }
  }
}
</script>

<style  lang="scss" scope>
.el-table .el-table__row .el-input {
  width: 100% !important;
}
.floatright {
  display: flex;
}
</style>
