<template>
  <div>
    <iPage class="main">
      <div class="title">{{ formData.nameZh }}</div>
      <iCard
        :title="searchOptionTitles.basicMessage"
        collapse="true"
        class="basicMessage"
      >
        <el-form
          ref="form"
          :model="form"
          class="elForm"
          label-position="left"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.contactName">
                <iInput v-model="formData.nameZh" :disabled="isEdit"></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                class="elFormItems"
                :label="formLable.userLoginName"
              >
                <iInput v-model="formData.userName" :disabled="isEdit"></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.supChina">
                <iInput
                  v-model="formData.opcsCompanyNameZh"
                  :disabled="isEdit"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                class="elFormItems"
                :label="formLable.temporaryNumber"
              >
                <iInput
                  v-model="formData.temporaryNum"
                  :disabled="isEdit"
                ></iInput>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.position">
                <iInput v-model="formData.position" :disabled="isEdit"></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.department">
                <iInput v-model="formData.dept" :disabled="isEdit"></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.areaCode">
                <iInput
                  v-model="formData.telephoneAreaCode"
                  :disabled="isEdit"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.contactPhone">
                <iInput
                  v-model="formData.telephoneO"
                  :disabled="isEdit"
                ></iInput>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.Landline">
                <iInput
                  v-model="formData.telephoneO"
                  :disabled="isEdit"
                ></iInput>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-row gutter="20">
            <el-col :span="6">
              <el-form-item class="elFormItems" :label="formLable.email">
                <iInput v-model="formData.email" :disabled="isEdit"></iInput>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="buttons">
            <iButton @click="edit" v-if="isEdit">{{ iButtons.edit }}</iButton>
            <iButton v-if="!isEdit" @click="sure">{{ iButtons.sure }}</iButton>
            <iButton v-if="!isEdit" @click="reset">{{
              iButtons.reset
            }}</iButton>
          </div>
        </el-form>
      </iCard>
      <iCard
        :title="searchOptionTitles.tableTile"
        collapse="true"
        class="tableList"
      >
        <div class="tableButton">
          <iButton v-if="isEditAuth" @click="authEditStatus">
            {{ iButtons.edit }}
          </iButton>
          <iButton v-else @click="cancelAuthBtnClick">
            {{ iButtons.cancelAuth }}
          </iButton>
        </div>
        <div class="table margin-top20">
          <iTableCustom
            v-show="isEditAuth"
            :loading="tableloading"
            :data="tableList"
            :columns="ReadTableSetting"
            @edit="editAuthStatus"
            @handle-selection-change="handleSelectionChange"
          />
          <iTableCustom
            v-show="!isEditAuth"
            :loading="tableloading"
            :data="tableList"
            :columns="EditTableSetting"
            @edit="editAuthStatus"
            @handle-selection-change="handleSelectionChange"
          />
        </div>
        <iPagination
          v-update
          background
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        >
        </iPagination>
      </iCard>
      <!-- <editAuth
        style="display:none"
        :isVisible="isVisible"
        @visible="isVisible = false"
        :itemMessage="itemMessage"
        @backItem="backItem"
      ></editAuth> -->
    </iPage>
  </div>
</template>

<script>
import { iCard, iPage, iInput, iButton, iMessage, iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import {
  EditTableSetting,
  defaultValueEdit,
  ReadTableSetting
} from '../data.js'
import {
  authList,
  providerDetail,
  updateProvider,
  cancelAuth
} from '@/api/provider/index'
export default {
  components: {
    iCard,
    iPage,
    iInput,
    // iSelect,
    iButton,
    iTableCustom,
    // iMessage,
    // Icon,
    // iDialog,
    iPagination
  },
  methods: {
    sure() {
      let param = [
        {
          ...this.formData,
          id: this.$route.params.id
        }
      ]
      updateProvider(param)
        .then((value) => {
          if (value.code == 200) {
            this.$router.push({
              name: 'authMgm'
            })
          } else {
            iMessage.error(value.desZh || this.language('获取数据失败'))
          }
        })
        .catch((error) => {
          // console.log(error)
          iMessage.error(error.desZh || this.language('获取数据失败'))
        })
    },
    getTableData() {
      this.tableloading = true
      let param = {
        ...this.formData,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      if (this.isEdit) {
        param = {
          ...this.formData,
          size: this.page.pageSize,
          current: this.page.currPage,
          supplierUserId: this.$route.params.id
        }
      } else {
        param = {
          ...this.formData,
          size: this.page.pageSize,
          current: this.page.currPage
        }
      }
      // console.log('====== ', this.params)
      authList(param)
        .then((value) => {
          this.tableloading = false
          if (value.code == 200) {
            this.tableList = value.data
            this.page.totalCount = value.total
          } else {
            iMessage.error(value.desZh || this.language('获取数据失败'))
          }
        })
        .catch((error) => {
          this.tableloading = false
          iMessage.error(error.desZh || this.language('获取数据失败'))
        })
    },
    editAuthStatus(val) {
      //授权按钮点击
      this.isVisible = true
      this.itemMessage = val
      // console.log("val", val);
    },
    edit() {
      this.isEdit = false
    },
    authEditStatus() {
      this.isEditAuth = false
      this.isSelectStatus = this.EditTableSetting
    },
    cancelAuthBtnClick() {
      // console.log("999999", this.selectedAuthList);
      if (this.selectedAuthList && this.selectedAuthList.length > 0) {
        let userIds = this.$route.params.id
        let applicationIds = this.selectedAuthList.map((item) => {
          return item.id
        })
        let param = {
          userIds: [userIds],
          applicationIds: applicationIds
        }
        const msg = this.formData.isMainContact
          ? '该操作将一并取消对应子联系人的权限，是否确认取消主联系人授权'
          : '是否取消当前联系人授权'
        this.$confirm(this.language(msg), this.language('提示'), {
          confirmButtonText: this.language('确定'),
          cancelButtonText: this.language('取消'),
          type: 'warning'
        })
          .then(() => {
            cancelAuth(param)
              .then((result) => {
                if (result.code == 200) {
                  this.getTableData()
                } else {
                  iMessage.error(result.desZh || this.language('取消授权失败'))
                }
              })
              .catch((error) => {
                iMessage.error(error.desZh || this.language('取消授权失败'))
              })
          })
          .catch(() => {})
      }
    },
    //重置
    reset() {
      this.formData = _.cloneDeep(defaultValueEdit)
    },
    handleSelectionChange(val) {
      this.selectedAuthList = val
    },
    getProviderDetail() {
      this.tableloading = true
      let data = this.$route.params.id
      let param = { id: data }
      providerDetail(param)
        .then((value) => {
          if (value.code == 200) {
            this.formData = value.data
            this.title = value.data.userName
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getProviderDetail()
    this.getTableData()
  },
  mixins: [pageMixins],
  data() {
    return {
      EditTableSetting,
      ReadTableSetting,
      tableloading: false,
      isSelectStatus: ReadTableSetting,
      isEditAuth: true,
      title: '',
      isSelect: false,
      isEdit: true,
      isVisible: false,
      authStatus: true,
      itemMessage: '',
      tableList: [],
      selectedAuthList: [],
      searchOptionTitles: {
        basicMessage: this.language('基本信息'),
        tableTile: this.language('已授权系统列表')
      },
      formLable: {
        contactName: this.language('联系人姓名'),
        userLoginName: this.language('用户登录名'),
        supChina: this.language('供应商中文名'),
        temporaryNumber: this.language('临时号'),
        position: this.language('职位'),
        department: this.language('部门'),
        areaCode: this.language('区号'),
        Landline: this.language('座机'),
        phoneCode: this.language('手机'),
        contactPhone: this.language('联系电话'),
        email: this.language('邮箱')
      },
      formData: {
        nameZh: '',
        userName: '',
        opcsCompanyNameZh: '',
        temporaryNum: '',
        position: '',
        dept: '',
        telephoneAreaCode: '',
        telephoneO: '',
        telephoneM: '',
        email: ''
      },
      iButtons: {
        edit: this.language('编辑'),
        sure: this.language('确认'),
        reset: this.language('重置'),
        cancelAuth: this.language('取消授权')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .title {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .tableList {
    margin-top: 20px;
    .tableButton {
      display: flex;
      justify-content: flex-end;
    }

    /* .table {
      margin-top: 20px;
      height: 200px;
      overflow: auto;
    } */
  }
}
</style>
