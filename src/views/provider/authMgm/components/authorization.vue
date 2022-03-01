<template>
  <iDialog
    :visible="isVisible"
    @close="backEdit"
    :title="language(operationType === 'cancelAuth' ? '取消授权' : '授权')"
    width="88%"
    destroy-on-close="true"
  >
    <div class="content">
      <div class="contentLeft">
        <iTableCustom
          :loading="tableUserLoading"
          :data="authUser"
          :columns="userMessage"
          style="height: 380px; overflow: auto"
        />
      </div>
      <div class="contentRight">
        <el-form>
          <el-row gutter="20">
            <el-col :span="7">
              <el-form-item :label="searchOptionTitles.name">
                <iInput
                  :placeholder="searchOptionTitles.input"
                  v-model="formData.appNameCn"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item :label="searchOptionTitles.sysTag">
                <iSelect v-model="formData.supplierType">
                  <el-option
                    v-for="item in systemTagOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="searchbtn">
                <iButton @click="searchBtnClick">{{ iButtons.search }}</iButton>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="ibuttons">
                <iButton
                  :loading="sureLoading"
                  @click="sure"
                  :disabled="authSelectedList.length == 0"
                >
                  {{ iButtons.sure }}
                </iButton>
                <iButton
                  @click="reset"
                  :disabled="
                    authSelectedList.length == 0 &&
                    formData.appNameCn.length == 0 &&
                    formData.supplierType.length == 0
                  "
                >
                  {{ iButtons.reset }}
                </iButton>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <iTableCustom
          :loading="tableLoading"
          :data="authListData"
          :columns="authList"
          rowKey="id"
          @handle-selection-change="handleSelectionChange"
          ref="authorization"
        />
        <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
          class="pagecontrol"
        >
        </iPagination> -->
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage, iSelect, iInput } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { userMessage, authList } from './data'
import { pageMixins } from '@/utils/pageMixins'
import {
  sysList,
  sysUserList,
  auth,
  cancelAuth,
  authList as queryAuthList
} from '@/api/provider/index'
import { SYSTEM_TAGS } from '@/views/provider/data'
export default {
  components: {
    iDialog,
    iButton,
    iTableCustom,
    iSelect,
    iInput
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    selectedUsers: {
      type: Array,
      default: () => {
        return []
      }
    },
    operationType: {
      type: String,
      default: 'auth'
    }
  },
  mixins: [pageMixins],
  methods: {
    getSysUserList() {
      this.tableUserLoading = true
      const users = this.selectedUsers.map((e) => e.id)
      let param = { supplierUserIdList: users }
      sysUserList(param)
        .then((val) => {
          this.tableUserLoading = false
          if (val.code == 200) {
            this.authUser = val.data
          } else {
            iMessage.error(val.desZh || this.language('获取数据失败'))
          }
        })
        .catch((error) => {
          this.tableUserLoading = false
          iMessage.error(error.desZh || this.language('获取数据失败'))
        })
    },
    getSysList() {
      let param = { ...this.formData, current: 1, size: 10000 }
      this.tableLoading = true
      sysList(param)
        .then((val) => {
          if (val.code == 200) {
            /* this.authListData = val.data
            this.page.totalCount = val.total */
            this.getauthList(val)
          } else {
            iMessage.error(val.desZh || this.language('获取数据失败'))
          }
        })
        .catch((error) => {
          this.tableLoading = false
          iMessage.error(error.desZh || this.language('获取数据失败'))
        })
    },
    getauthList(sysResult) {
      if (this.selectedUsers.length === 1) {
        queryAuthList({
          supplierUserId: this.selectedUsers[0].id
        })
          .then((res) => {
            const { data } = res
            if (data && data.length) {
              // TMD,居然要根据选择排序
              const authedIds = data.map((e) => e.id)
              const sysData = sysResult.data

              // 勾选的排在前面
              const inData = sysData.filter((e) => authedIds.includes(e.id))
              const notInData = sysData.filter((e) => !authedIds.includes(e.id))
              const authListData = inData.concat(notInData)

              this.page.totalCount = sysResult.total

              const ids = data.map((e) => e.id)
              if (this.operationType === 'auth') {
                authListData.forEach((item) => {
                  const isInclude = ids.includes(item.id)
                  item.checked = isInclude
                  item.disabledChecked = isInclude
                })
              } else {
                authListData.forEach((item) => {
                  item.disabledChecked = !ids.includes(item.id)
                })
              }
              this.authListData = authListData
            } else {
              this.authListData = sysResult.data
              this.page.totalCount = sysResult.total
            }
          })
          .finally(() => {
            this.tableLoading = false
          })
      } else {
        this.authListData = sysResult.data
        this.page.totalCount = sysResult.total
        this.tableLoading = false
      }
    },
    searchBtnClick() {
      this.getSysList()
    },
    backEdit() {
      this.isVisible = false
      this.$emit('visible')
    },
    sure() {
      if (this.operationType == 'auth') {
        //授权
        this.authApplication()
      } else {
        //取消授权
        for (let item of this.authUser) {
          if (item.isMainContact == true) {
            this.iMessageBox = true
            /* const msg = this.formData.isMainContact
          ? '该操作将一并取消对应子联系人的权限，是否确认取消主联系人授权'
          : '是否取消当前联系人授权' */
            this.$confirm(
              this.language(
                '该操作将一并取消对应子联系人的权限，是否确认取消主联系人授权'
              ),
              this.language('提示'),
              {
                confirmButtonText: this.language('确定'),
                cancelButtonText: this.language('取消'),
                type: 'warning'
              }
            )
              .then(() => {
                this.cancelAuthApplication()
              })
              .catch(() => {})
          }
          break
        }
        if (!this.iMessageBox) {
          this.cancelAuthApplication()
        }
      }
    },
    reset() {
      // Vue.set(this,"formData",this.defaultData())
      this.formData = this.defaultData()
      this.$refs.authorization.clearSelection()
      this.getSysList()
    },
    authApplication() {
      let userIds = this.authUser.map((item) => {
        return item.id
      })

      let applicationIds = this.authSelectedList.map((item) => {
        return item.id
      })
      let param = { userIds: userIds, applicationIds: applicationIds }
      this.sureLoading = true
      auth(param)
        .then((val) => {
          if (val.code == 200) {
            iMessage.success(val.desZh || this.language('授权成功'))
            this.isVisible = false
            this.$emit('getTableData')
          } else {
            iMessage.error(val.desZh || this.language('授权失败'))
          }
        })
        .catch((error) => {
          iMessage.error(error.desZh || '授权失败')
        })
        .finally(() => (this.sureLoading = false))
    },
    cancelAuthApplication() {
      let userIds = this.authUser.map((item) => {
        return item.id
      })

      let applicationIds = this.authSelectedList.map((item) => {
        return item.id
      })
      let param = { userIds: userIds, applicationIds: applicationIds }
      this.sureLoading = true
      cancelAuth(param)
        .then((val) => {
          if (val.code == 200) {
            this.iMessageBox = false
            this.isVisible = false
            iMessage.success(val.desZh || this.language('取消授权成功'))
            this.$emit('getTableData')
          } else {
            iMessage.error(val.desZh || this.language('取消授权失败'))
          }
        })
        .catch(() => {
          iMessage.error('取消授权失败')
        })
        .finally(() => (this.sureLoading = false))
    },
    handleSelectionChange(val) {
      this.authSelectedList = val
    },
    defaultData() {
      return {
        appNameCn: '',
        // appNameEn: '',
        // description: '',
        supplierType: ''
        // systemType: ''
      }
    }
  },
  created() {
    this.getSysUserList()
    this.getSysList()
  },
  watch: {
    isVisible() {
      // console.log('88888', this.selectedUsers)
      if (this.selectedUsers.length > 0 && this.isVisible) {
        this.getSysUserList()
        this.getSysList()
      }
      // console.log('88888ooooooo')
    }
  },
  data() {
    return {
      pageTitle: '授权',
      iMessageBox: false,
      userMessage,
      authList,
      tableLoading: false,
      authListData: [],
      authUser: [],
      authSelectedList: [],
      iButtons: {
        sure: this.language('确认'),
        reset: this.language('重置'),
        search: this.language('查询')
      },
      searchOptionTitles: {
        name: this.language('中文名称'),
        sysTag: this.language('系统标签')
      },
      formData: {
        appNameCn: '',
        // appNameEn: '',
        // description: '',
        supplierType: ''
        // systemType: ''
      },
      systemTagOptions: SYSTEM_TAGS,
      systemOptions: [
        {
          id: '1',
          label: this.language('系统')
        },
        {
          id: '2',
          label: 'Scenario'
        }
      ],
      sureLoading: false,
      tableUserLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .contentLeft {
    border: 1px solid #d9dee5;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 700px;
    ::v-deep .i-table-custom {
      margin: 10px;
    }
  }
  .contentRight {
    border: 1px solid #d9dee5;
    margin-bottom: 20px;
    width: calc(100% - 700px);
    ::v-deep .i-table-custom {
      margin: 10px;
    }
    ::v-deep .el-form-item {
      margin-left: 10px;
    }
    .searchbtn {
      padding-top: 45px;
    }
    .ibuttons {
      display: flex;
      justify-content: flex-end;
      margin: 20px 10px;
      padding-top: 25px;
    }

    .pagecontrol {
      margin: 0px 10px 0px 10px;
    }
  }
}
</style>
