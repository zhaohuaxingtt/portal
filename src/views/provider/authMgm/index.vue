<template>
  <iPage class="template">
    <div class="main">
      <!-- <div class="title">{{ searchOptionTitles.pageTitle }}</div> -->
      <div class="searchCondition">
        <iCard>
          <div class="condition">
            <el-form class="elForm">
              <el-row :gutter="20">
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.contactName }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.nameZh"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.supChina }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.opcsCompanyNameZh"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.position }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.position"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.department }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.department"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.Landline }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.telephoneO"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <div class="searchButtons">
                    <iButton @click="search">{{
                      searchOptionTitles.buttons.search
                    }}</iButton>
                    <iButton @click="reset">{{
                      searchOptionTitles.buttons.reset
                    }}</iButton>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <!-- <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.phoneCode }}</span>
                    <iInput
                      :placeholder="searchOptionTitles.input"
                      v-model="searchCondition.telephoneM"
                    ></iInput>
                  </el-form-item>
                </el-col> -->
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ searchOptionTitles.isPrimaryContact }}</span>
                    <iSelect v-model="searchCondition.isMainContact">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.value"
                      >
                      </el-option>
                    </iSelect>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                <el-form-item :label="language('SAP号')">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="searchCondition.sapNum"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item :label="language('正式/SVW号')">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="searchCondition.svwCode"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item :label="language('临时号')">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="searchCondition.temporaryNum"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              </el-row>
            </el-form>
          </div>
        </iCard>
      </div>
      <div class="tableData">
        <iCard>
          <div class="tableContent">
            <div class="tableButton">
              <iButton @click="authorization" :disabled="isClick">
                {{ tableButtons.auth }}</iButton
              >
              <iButton @click="cancelAuth" :disabled="isClick">
                {{ tableButtons.unauth }}
              </iButton>
              <iButton @click="exportBtnClick">{{
                tableButtons.export
              }}</iButton>

              <iDialog
                :title="iDialogTitle.title"
                :visible.sync="dialogVisible"
                width="350px"
                :close-on-click-modal="false"
              >
                <resetPwd @close="closeReset" />
              </iDialog>
            </div>
            <iTableCustom
              :loading="tableLoading"
              :data="tableData"
              :columns="tableSetting"
              @goEdit="goEdit"
              @handle-selection-change="handleSelectionChange"
              ref="authList"
              />
            <iPagination
              v-update
              @size-change="handleSizeChange($event, getTableData)"
              @current-change="handleCurrentChange($event, getTableData)"
              background
              :current-page="page.currPage"
              :page-sizes="page.pageSizes"
              :page-size="page.pageSize"
              :layout="page.layout"
              :total="page.totalCount"
            >
            </iPagination>
          </div>
        </iCard>
      </div>
    </div>
    <authorization
      @visible="isVisible = false"
      :isVisible="isVisible"
      :selectedUsers="selectedUsers"
      @getTableData="getTableData"
      :operationType="operation"
      v-if="isVisible"
    ></authorization>
  </iPage>
</template>

<script>
import {
  iCard,
  iPage,
  iInput,
  iSelect,
  iButton,
  iMessage,
  iDialog,
  iPagination
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import resetPwd from '../authMgm/components/resetPwd'
import authorization from '../authMgm/components/authorization'
import { tableSetting, defaultValueAuth } from '../authMgm/data.js'
import { pageMixins } from '@/utils/pageMixins'
import { providerList, authExport } from '@/api/provider/index'
export default {
  methods: {
    resetBtnClick() {
      this.dialogVisible = true
    },
    goEdit(val) {
      /* this.$router.push({
        name: 'authEdit',
        params: { id: val.id }
      }) */
      window.open('/portal/#/provider/authMgm/edit/' + val.id)
    },
    closeReset(val) {
      this.dialogVisible = false
    },
    exportBtnClick() {
      let param = { ...this.searchCondition, exportType: 1 }
      authExport(param)
    },
    reset() {
      this.searchCondition = _.cloneDeep(defaultValueAuth)
      this.page.currPage = 1
      this.getTableData()
    },
    search() {
      this.page.currPage = 1
      this.getTableData()
    },
    getTableData() {
      this.tableLoading = true
      let data = {
        ...this.searchCondition,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      providerList(data)
        .then(value => {
          if (value.code == 200) {
            this.tableLoading = false
            this.tableData = value.data
            this.page.totalCount = value.total
            // alert("正确啦");
          } else {
            iMessage.error(value.desZh || '获取数据失败')
          }
        })
        .catch(error => {
          //   alert(`报错啦${error}`);
          this.tableLoading = false
          iMessage.error('获取数据失败')
        })
    },
    //勾选item操作
    handleSelectionChange(val) {
      // console.log('val',val);
      if (val.length == 0) {
        this.isClick = true
        this.createPassword = true
      } else {
        this.isClick = false
      }
      if (val.length == 1) {
        this.createPassword = false
      } else {
        this.createPassword = true
      }
      this.propItem = val
      this.selectedUsers = val
      /* this.selectedUsers = val.map(item => {
        return item.id
      }) */
    },
    authorization() {
      this.operation = 'auth'
      this.isVisible = true
    },
    cancelAuth() {
      this.operation = 'cancelAuth'
      this.isVisible = true
    }
  },
  created() {
    this.getTableData()
  },
  components: {
    iCard,
    iPage,
    iInput,
    iButton,
    iTableCustom,
    iPagination,
    iDialog,
    resetPwd,
    authorization,
    iSelect
  },
  mixins: [pageMixins],
  data() {
    return {
      dialogVisible: false,
      isVisible: false,
      createPassword: true,
      isClick: true,
      tableSetting,
      propItem: '',
      operation: 'auth',
      selectedUsers: [],
      options: [
        {
          value: 'true',
          lable: '是'
        },
        {
          value: 'false',
          lable: '否'
        }
      ],
      tableData: [],
      searchOptionTitles: {
        sapNO:'SAP号',
        pageTitle: '供应商用户授权管理',
        contactName: '联系人姓名',
        supChina: '供应商中/英文名',
        position: '职位',
        department: '部门',
        Landline: '联系电话',
        phoneCode: '手机',
        isPrimaryContact: '是否是主联系人',
        buttons: {
          search: '查询',
          reset: '重置'
        },
        input: '请输入',
        iselect: '请选择'
      },
      tableButtons: {
        auth: '授权',
        unauth: '取消授权',
        export: '导出'
      },
      iDialogTitle: {
        title: '重置密码'
      },
      searchCondition: {
        isMainContact: null, //是否主联系人 false：否，true：是
        nameZh: '', //联系人姓名
        opcsCompanyNameZh: '', //供应商中文名
        telephoneM: '', //手机
        telephoneO: '', //座机
        position: '',
        department: '',
        sapNum:'',//sap
        svwCode:'',//svw
        temporaryNum:''//临时号
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  // font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

// .main {
//   .title {
//     font-family: Arial;
//     font-size: 20px;
//     font-weight: bold;
//   }
//   .searchCondition {
//     ::v-deep .cardBody {
//       width: 100%;
//       display: flex;
//       justify-content: space-around;
//       margin-top: 20px;
//       .condition {
//         // margin-right: 60px;s
//         .elForm {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: flex-start;
//           .elFormOItem {
//             width: 17%;
//             margin-right: 30px;
//           }
//         }
//       }
//       .searchButton {
//         width: 20%;
//         margin-top: 5vh;
//       }
//     }
//   }

// }

.tableData {
  margin-top: 20px;
  .tableContent {
    .tableButton {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.searchButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 45px;
}
</style>
