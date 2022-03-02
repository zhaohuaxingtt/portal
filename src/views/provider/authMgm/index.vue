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
                    <span>{{ language(searchOptionTitles.contactName) }}</span>
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.nameZh"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ language(searchOptionTitles.supChina) }}</span>
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.companyName"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ language(searchOptionTitles.position) }}</span>
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.position"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ language(searchOptionTitles.department) }}</span>
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.department"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <el-form-item class="elFormOItem">
                    <span>{{ language(searchOptionTitles.Landline) }}</span>
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.telephoneO"
                    ></iInput>
                  </el-form-item>
                </el-col>
                <el-col span="4">
                  <div class="searchButtons">
                    <iButton @click="search">{{
                      language(searchOptionTitles.buttons.search)
                    }}</iButton>
                    <iButton @click="reset">{{
                      language(searchOptionTitles.buttons.reset)
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
                    <span>{{ language(searchOptionTitles.isPrimaryContact) }}</span>
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
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.sapNum"
                    >
                    </iInput>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="language('正式/SVW号')">
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
                      v-model="searchCondition.svwCode"
                    >
                    </iInput>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="language('临时号')">
                    <iInput
                      :placeholder="language(searchOptionTitles.input)"
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
                {{ language(tableButtons.auth) }}</iButton
              >
              <iButton @click="cancelAuth" :disabled="isClick">
                {{ language(tableButtons.unauth) }}
              </iButton>
              <iButton @click="exportBtnClick">{{
                language(tableButtons.export)
              }}</iButton>
              <button-table-setting @click="$refs.authList.openSetting()" />
              <iDialog
                :title="language(iDialogTitle.title)"
                :visible.sync="dialogVisible"
                width="350px"
                :close-on-click-modal="false"
              >
                <resetPwd @close="closeReset" />
              </iDialog>
            </div>
            <iTableCustom
              ref="authList"
              :loading="tableLoading"
              :data="tableData"
              :columns="tableSetting"
              permission-key="ADMIN_PRO_CS_PROVIDER_AUTH"
              @goEdit="goEdit"
              @handle-selection-change="handleSelectionChange"
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
        .then((value) => {
          if (value.code == 200) {
            this.tableLoading = false
            this.tableData = value.data
            this.page.totalCount = value.total
            // alert("正确啦");
          } else {
            iMessage.error(value.desZh || this.language('获取数据失败'))
          }
        })
        .catch((error) => {
          //   alert(`报错啦${error}`);
          this.tableLoading = false
          iMessage.error(error.desZh || this.language('获取数据失败'))
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
          lable: this.language('是')
        },
        {
          value: 'false',
          lable: this.language('否')
        }
      ],
      tableData: [],
      searchOptionTitles: {
        sapNO: this.language('SAP号'),
        pageTitle: this.language('供应商用户授权管理'),
        contactName: this.language('联系人姓名'),
        supChina: this.language('供应商中/英文名'),
        position: this.language('职位'),
        department: this.language('部门'),
        Landline: this.language('联系电话'),
        phoneCode: this.language('手机'),
        isPrimaryContact: this.language('是否是主联系人'),
        buttons: {
          search: this.language('查询'),
          reset: this.language('重置')
        },
        input: this.language('请输入'),
        iselect: this.language('请选择')
      },
      tableButtons: {
        auth: this.language('授权'),
        unauth: this.language('取消授权'),
        export: this.language('导出')
      },
      iDialogTitle: {
        title: this.language('重置密码')
      },
      searchCondition: {
        isMainContact: null, //是否主联系人 false：否，true：是
        nameZh: '', //联系人姓名
        companyName: '', //供应商中文名
        telephoneM: '', //手机
        telephoneO: '', //座机
        position: '',
        department: '',
        sapNum: '', //sap
        svwCode: '', //svw
        temporaryNum: '' //临时号
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
      align-items: center;
    }
  }
}

.searchButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 45px;
}
</style>
