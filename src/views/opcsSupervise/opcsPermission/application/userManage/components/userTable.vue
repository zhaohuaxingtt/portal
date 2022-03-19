<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-20 15:07:29
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\userTable.vue
-->
<template>
  <iCard tabCard
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('LIANXIRENYUYONGHU', '联系人与用户')
      }}</span>
      <div class="floatright">
        <i-button @click="openLog">{{ language('rizhi', '日志') }}</i-button>
        <i-button v-if="edit"
                  @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button v-if="edit"
                  @click="remove">{{ language('SHANCHU', '删除')}}
        </i-button>
        <i-button v-if="edit"
                  @click="cancelBtn">{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit"
                  @click="save" :disabled="onUserSaveAction" :loading="onUserSaveAction">{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('BIANJI', '编辑') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="freezeBtn" :disabled="onUserFreezeAction" :loading="onUserFreezeAction">{{ language('DONGJIE', '冻结') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="thawBtn" :disabled="onUserThawAction" :loading="onUserThawAction">{{ language('JIEDONG', '解冻') }}
        </i-button>
        <!-- <i-button v-if="!edit"
                  @click="upload">{{ language('SHANGCHUAN', '上传') }}
        </i-button> -->
        <!-- <i-button v-if="!edit"
                  @click="activeBtn">{{ language('JIHUO', '激活') }}
        </i-button> -->
        <!-- <i-button v-if="!edit"
                  @click="renewalBtn">{{ language('XUQI', '续期') }}
        </i-button> -->
        <i-button v-if="!edit"
                 @click="exportFile" :disabled="onExportAction" :loading="onExportAction">{{ language('DAOCHU', '导出') }}
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
            <i-button>{{ language('PILIANGDAORU', '批量导入') }}
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
        <span v-if="(scope.row.isActive=='Y'||scope.row.isActive==1||scope.row.isActive==true) && !ratioDate(scope.row)">是</span>
        <span v-else>否</span>
      </template>
      <template #system='scope'>
        <iButton @click="openDialog(scope.row)"
                 type="text">{{ language('CAOZUO', '操作') }}
        </iButton>

      </template>
    </table-list>
<!--    <iPagination style="margin-top: 20px"
                 v-update
                 @size-change="handleSizeChange($event, getTableData)"
                 @current-change="handleCurrentChange($event, getTableData)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />-->
    <systemDetail @closeDiolog="closeDiolog"
                  v-model="isdialog"
                  :rowList="rowList"></systemDetail>
    <iDialog :visible.sync="importDialog"
             width="90%"
             top="2%"
             :title="language('DAORUSHIBEISHUJU', '导入失败数据')">
      <table-list style="padding-bottom:20px"
                  :tableData="tableListDetail"
                  :tableTitle="tableTitleImportErr"
                  :tableLoading="tableLoading">

      </table-list>
    </iDialog>
    <iUserLog :show.sync="importLogDialog" :bizId="this.$route.query.opcsSupplierId" menuId="WS1OHTER-018" is-page  />
  </iCard>
</template>

<script>
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import systemDetail from './systemDetail'
import { tableTitle, tableTitleEdit,tableTitleImportErr } from './data'
import store from '@/store'
import { excelExport } from '@/utils/filedowLoad'
import iUserLog from '@/components/iUserLog'
import {
  iCard,
  iButton,
  iMessage,
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
    systemDetail,
    iDialog,
    iUserLog
  },
  data() {
    return {
      onUserSaveAction: false,
      onUserFreezeAction: false,
      onUserThawAction: false,
      onExportAction: false,
      importDialog: false,
      importLogDialog: false,
      isdialog: false,
      rowList: {},
      inputProps: [],
      edit: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableTitleEdit: tableTitleEdit,
      tableTitleImportErr:tableTitleImportErr,
      tableListData: [],
      importLoading: false,
      tableListDetail: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    openLog() {
      this.importLogDialog = true;
    },
    exportFile() {
      //因为需要一个序号  所以这里处理页签和数据
      let downTableList = this.tableTitleEdit;
      let tableHead = {
            props: 'idNo',
            name: '序号',
            key: 'xuhao'
          }

      this.onExportAction = true;
      downTableList.unshift(tableHead)

      let downTableListData = this.tableListData;
      downTableListData.forEach((item, index) => {
        item.idNo = index
      })
      excelExport(downTableListData, downTableList, "联系人与用户列表")
      this.onExportAction = false;
    },
    save() {
      this.$refs.commonTable.$refs.commonTableForm.validate((valid) => {
        if (valid) {
          let parmars = {
            saveUserList: this.tableListData,
            opcsSupplierId: this.$route.query.opcsSupplierId,
          }
          this.onUserSaveAction = true;
          saveUser(parmars).then((res) => {
            if (res && res.code == 200) {
              this.inputProps = []
              this.edit = false
              this.getTableData()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
            this.onUserSaveAction = false;
          },function() {
            this.onUserSaveAction = false;
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
        pageSize: 9999,
        ...this.form
      }
      queryDetailUser(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          //this.page.totalCount = res.total
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
          }else{
            this.getTableData()
            this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
          }
        }else{
            this.$message.error(res.desZh)
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
      downloadUser({ pageNo: 1, pageSize: 9999, opcsSupplierId: this.$route.query.opcsSupplierId })
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
        this.language('SHIFOUQUERENSHANCHU', '是否确认删除?'),
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
      this.onUserThawAction = true;
      thawUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
            this.getTableData()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
        this.onUserThawAction = false;
      },function() {
        this.onUserThawAction = false;
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
            this.getTableData()
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
      this.onUserFreezeAction = true;
      freezeUser({
        opcsSupplierId: this.$route.query.opcsSupplierId,
        idList: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
            this.getTableData()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
        this.onUserFreezeAction = false;
      },function() {
        this.onUserFreezeAction = false;
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
            this.getTableData()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    ratioDate(row) {
      var strtime = row.expirationTime.replace('/-/g', '/') //时间转换
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
