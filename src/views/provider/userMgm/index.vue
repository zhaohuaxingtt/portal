<template>
  <iPage class="template" v-loading="loading">
    <div class="main">
      <div class="title">
        <!-- <span>{{ pageTitle }}</span> -->
      </div>
      <div class="searchOptions">
        <iSearch @sure="search" @reset="reset">
          <el-form>
            <el-row class="rowOne" :gutter="formAppearance.gutter">
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.contactName">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.nameZh"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.providerName">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.opcsCompanyNameZh"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.loginName">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.userName"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.isMainContact">
                  <iSelect
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.isMainContact"
                  >
                    <el-option
                      v-for="item in trueFalseSelect"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                  <div class="searchButtons">
                    <iButton @click="search">{{ buttonTitles.search }}</iButton>
                    <iButton @click="reset">{{ buttonTitles.reset }}</iButton>
                  </div>
                </el-col> -->
            </el-row>
            <el-row class="rowTwo" :gutter="formAppearance.gutter">
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.mail">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.email"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.telPhone">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.telephoneO"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.rencentDate">
                  <iDatePicker
                    type="date"
                    :placeholder="searchOptionTitles.iselect"
                    :picker-options="endDateOptions"
                    v-model="formData.lastLoginDate"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.temNumber">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.temporaryNum"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="formAppearance.gutter">
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.sapNO">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.sapNum"
                  >
                  </iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.status">
                  <i-select
                    :placeholder="searchOptionTitles.iselect"
                    v-model="formData.status"
                  >
                    <el-option
                      v-for="item in statusSelect"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.isExpire">
                  <i-select
                    :placeholder="searchOptionTitles.iselect"
                    v-model="formData.isValid"
                  >
                    <el-option
                      v-for="item in falseTrueSelect"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </iSearch>
      </div>
      <div class="tableList">
        <iCard class="tableListCard">
          <div class="tableOperationButtons">
            <iButton
              :disabled="selectedData.length == 0"
              @click="lockAccount"
              >{{ buttonTitles.block }}</iButton
            >
            <iButton
              :disabled="selectedData.length == 0"
              @click="delockAccount"
              >{{ buttonTitles.deblock }}</iButton
            >
            <iButton @click="exportData">{{ buttonTitles.export }}</iButton>
          </div>
          <iTableCustom
            ref="testTable"
            :loading="tableLoading"
            :data="tableListData"
            :columns="table.tableColumnSetting"
            @handle-selection-change="handleSelectionChange"
          />
          <iPagination
            v-update
            background
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          >
          </iPagination>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iInput,
  iSelect,
  iButton,
  iCard,
  iDatePicker,
  iPagination,
  Icon,
  iSearch,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableColumnSetting, defalutValue } from './data/data'
import { pageMixins } from '@/utils/pageMixins'
import {
  providerList,
  delockAccount,
  lockAccount,
  providerExport
} from '@/api/provider/index'
export default {
  created() {
    this.getTableList()
  },
  // activated() {
  //   this.getTableList();
  // },
  methods: {
    getTableList() {
      //获取列表数据
      this.tableLoading = true
      let param = {
        ...this.formData,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      providerList(param)
        .then(val => {
          if (val.code == 200) {
            // console.log('value', val)
            this.tableLoading = false
            this.tableListData = val.data
            this.page.totalCount = val.total
          } else {
            iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch(error => {
          // console.log('error', error)
          iMessage.error('获取数据失败')
        })
    },
    search() {
      //查询
      this.page.currPage = 1
      this.getTableList()
    },
    reset() {
      //重置
      this.formData = _.cloneDeep(defalutValue)
      this.page.currPage = 1
      this.getTableList()
    },
    lockAccount() {
      //冻结账户
      let newArray = this.selectedData.map(val => {
        return { id: val.id }
      })
      let param = newArray
      lockAccount(param)
        .then(val => {
          if (val.code == 200) {
            this.getTableList()
          } else {
            iMessage.error(val.desZh || '冻结账号失败')
          }
        })
        .catch(val => {
          iMessage.error(val.desZh || '冻结账号失败')
        })
    },
    delockAccount() {
      //解封账户
      let newArray = this.selectedData.map(val => {
        return { id: val.id }
      })
      let param = newArray
      this.tableLoading = true
      delockAccount(param)
        .then(val => {
          if (val.code == 200) {
            this.getTableList()
            this.tableLoading = false
          } else {
            iMessage.error(val.desZh || '解冻账号失败')
          }
        })
        .catch(val => {
          iMessage.error(val.desZh || '解冻账号失败')
        })
    },
    exportData() {
      //导出数据
      let param = { ...this.formData, exportType: 2 }
      providerExport(param)
    },
    handleSelectionChange(val) {
      //选中处理
      this.selectedData = val
    }
  },
  components: {
    iPage,
    iInput,
    iSelect,
    iButton,
    iCard,
    iDatePicker,
    iTableCustom,
    iPagination,
    Icon,
    iSearch
  },
  mixins: [pageMixins],
  data() {
    return {
      tableLoading: false,
      tableListData: [],
      selectedData: [],
      table: {
        tableColumnSetting: tableColumnSetting
      },
      formAppearance: {
        gutter: 24
      },
      pageTitle: '供应商用户管理',
      searchOptionTitles: {
        contactName: '联系人姓名',
        providerName: '供应商中文名',
        loginName: '用户登录名',
        isMainContact: '是否是主联系人',
        mail: '邮箱',
        telPhone: '联系电话',
        phone: '手机',
        rencentDate: '最近登录',
        temNumber: '临时号',
        sapNO: 'SAP号',
        status: '是否有效',
        isExpire: '是否过期',
        input: '请输入',
        iselect: '请选择'
      },
      buttonTitles: {
        search: '查询',
        reset: '重置',
        block: '冻结账号',
        deblock: '解冻账号',
        export: '导出'
      },
      formData: {
        email: '', //邮箱
        isMainContact: null, //是否主联系人 false：否，true：是
        isValid: null, //是否过期   有效 true：有效 false：无效
        lastLoginDate: null, //最近登陆
        nameZh: '', //联系人姓名
        opcsCompanyNameZh: '', //供应商中文名
        status: '', //状态 1.正常 2.冻结
        telephoneM: '', //手机
        telephoneO: '', //座机
        userName: '', //用户登录名
        sapNum: '', //SAP号
        temporaryNum: '' //临时号
      },
      selectedData: [],
      falseTrueSelect: [
        {
          value: false,
          label: '是',
          id: '1'
        },
        {
          value: true,
          label: '否',
          id: '2'
        }
      ],
      trueFalseSelect: [
        {
          value: true,
          label: '是',
          id: '1'
        },
        {
          value: false,
          label: '否',
          id: '2'
        }
      ],
      statusSelect: [
        {
          value: 1,
          label: '是',
          id: '1'
        },
        {
          value: 2,
          label: '否',
          id: '2'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  // margin-bottom: 20px;
}

.searchOptions {
  margin-bottom: 20px;
}

.searchButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 65px;
}

.tableOperationButtons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  // iButton {
  //     margin-right: 5px;
  // }
}
</style>
