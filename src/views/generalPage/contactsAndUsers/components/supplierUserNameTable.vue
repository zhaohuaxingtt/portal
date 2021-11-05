<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('SUPPLIER_GONGYINGSHANGXINGMING')}}</span>
      <div class="floatright">
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_SAVE" v-if="this.supplierType === 4" @click="saveInfos('submit')">{{$t('LK_BAOCUN')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_FREEZE" v-if="this.supplierType === 4" @click="handleActivity(false)">{{$t('SUPPLIER_DONGJIE')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_UNFREEZE" v-if="this.supplierType === 4" @click="handleActivity(true)">{{$t('SUPPLIER_JIEDONG')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_SETASADMIN" @click="setMasterUser">{{$t('SUPPLIER_SHEWEIZHUYONGHU')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_ADD" @click="handleAdd">{{$t('LK_XINZENG')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_DELETE" @click="deleteItem('ids',deleteUser)">{{$t('LK_SHANCHU')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_USER_EXPORT" @click="exportsTable" v-if="showExportsButton">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list v-permission="SUPPLIER_SUPPLIERCONTACT_USER" ref="commonTable" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :index="true">
      <template #isDefault="scope">
        <icon v-if="scope.row.isDefault===true" name='iconsheweizhuyonghu1' symbol></icon>
      </template>
      <template #isActivity="scope">
        <span v-if="scope.row.isActivity">{{$t('SUPPLIER_SHI')}}</span>
        <span v-else>{{$t('SUPPLIER_FOU')}}</span>
      </template>
      <template #isExpire="scope">
        <span v-if="scope.row.isExpire">{{$t('SUPPLIER_SHI')}}</span>
        <span v-else>{{$t('SUPPLIER_FOU')}}</span>
      </template>
      <template #operation="scope">
        <i-button v-if="scope.row.id&&scope.row.id!=='null'" @click="handleDialog">操作</i-button>
      </template>
      <template #nameZh="scope">
        <iInput @focus="handleTip" v-model="scope.row.nameZh"></iInput>
      </template>
      <template #designation="scope">
        <iInput @focus="handleTip" v-model="scope.row.designation"></iInput>
      </template>
      <template #dept="scope">
        <iInput @focus="handleTip" v-model="scope.row.dept"></iInput>
      </template>
      <template #telephoneAreaCode="scope">
        <iInput @focus="handleTip" v-model="scope.row.telephoneAreaCode"></iInput>
      </template>
      <template #telephone="scope">
        <iInput @focus="handleTip" v-model="scope.row.telephone"></iInput>
      </template>
      <template #email="scope">
        <iInput @focus="handleTip" v-model="scope.row.email"></iInput>
      </template>
    </table-list>
    <supplierUserNameDialog @handleSelection='handleSelection' v-model="userNameDialog" />
    <tipDialog v-model="tipDialog" />
    <addDialog v-model="addDialog" />
    <personalPrivacyPolicyDialog v-model="personalPrivacyPolicyDialog" />
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage, icon, iMessageBox, iInput } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { supplierUserNameTableTitle } from './data'
import { saveUser, selectUser, deleteUser } from "../../../../api/register/contactsAndUsers";
import supplierUserNameDialog from "./supplierUserNameDialog";
import tipDialog from "./tipDialog";
import addDialog from "./addDialog";
import personalPrivacyPolicyDialog from "./personalPrivacyPolicyDialog";
export default {
  mixins: [generalPageMixins],
  components: { iCard, iButton, tableList, icon, supplierUserNameDialog, iInput, tipDialog, addDialog, personalPrivacyPolicyDialog },
  data() {
    return {
      tableListData: [],
      tableTitle: supplierUserNameTableTitle,
      tableLoading: false,
      selectTableData: [],
      userNameDialog: false,
      tipDialog: false,
      tipDialogFlag: 1,
      addDialog: false,
      addDialogFlag: 1,
      personalPrivacyPolicyDialog: false,
    }
  },
  created() {
    this.tableTitles()
    this.getTableList()
  },
  methods: {
    handleAdd() {
       if (this.addDialogFlag === 1) {
        this.addDialog = true
      } else if (this.addDialogFlag === 0) {
        this.addTableItem()
      }
    },
    handlepersonalPrivacyPolicy() {
      this.personalPrivacyPolicyDialog = true
    },
    handleTip() {
      if (this.tipDialogFlag === 1) {
        this.tipDialog = true
      }
      this.tipDialogFlag = 0
    },
    handleDialog() {
      this.userNameDialog = true
    },
    tableTitles() {
      if (this.$route.query.supplierType <= 3) {
        supplierUserNameTableTitle.splice(11, 4)
        this.tableTitle = supplierUserNameTableTitle
      }
    },
    handleActivity(isActivity) {
      if (this.selectTableData.length === 0) {
        iMessage.warn('至少选择一条记录')
        return
      }
      this.selectTableData.forEach((item, index) => {
        this.tableListData.map((i, x) => {
          if (item.time === i.time) {
            return i.isActivity = isActivity
          }
        })
      })
      this.saveInfos()
    },
    async getTableList() {
      this.tableLoading = true
      const pms = {
        "step": "register",
        pageNo: 1,
        pageSize: 999
      }
      if (this.supplierType > 3) {
        pms.step = 'submit'
      }
      const res = await selectUser(pms, this.supplierType)
      res.data.map((item, index) => {
        return item.time = new Date().getTime() + index
      })
      this.tableListData = res.data
      this.tableLoading = false
    },
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    setMasterUser() {
      if (this.selectTableData.length !== 1) {
        this.iMessage.warn('只能存在一个主联系人，请重新设置')
      } else {
        this.tableListData.map((item, index) => {
          if (item.time === this.selectTableData[0].time) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
      }
      this.saveInfos()
    },
    deleteItem(idName, fun) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      }
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      }
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
      ).then(async () => {
        this.tableLoading = true
        let ids = [], times = []
        this.selectTableData.map(item => {
          if (item.id || item.tiem) {
            ids.push(item.id)
          }
          if (item.time && !item.id) {
            times.push(item.time)
          }
        })
        if (times.length !== 0) {
          this.tableListData = this.tableListData.filter(item => {
            return !times.includes(item.time)
          })
          const save = await this.saveInfos('tempSore')
        }
        if (ids.length !== 0) {
          const req = {
            [idName]: ids
          }
          const res = await fun(req, this.supplierType)
          res.moduleName = this.$t('SUPPLIER_GONGYINGSHANGXINGMING')
          this.resultMessage(res, () => {
            this.tableListData = this.tableListData.filter(item => {
              return !ids.includes(item.id)
            })
          })
        }
        this.tableLoading = false
      })
    },
    async saveInfos(step = '') {
      if (!this.tableListData.length) {
        return
      }
      return new Promise((resolve, reject) => {
        this.$refs.commonTable.$refs.commonTableForm.validate(async (valid) => {
          if (valid) {
            this.tableLoading = true
            if (this.tableListData.length === 1) {
              this.tableListData[0].isDefault = true
            }
            const pms = {
              "list": this.tableListData,
              "step": "register"
            }
            if (this.supplierType > 3) {
              pms.step = 'submit'
            }
            if (step !== '') {
              pms.step = step
            }
            const res = await saveUser(pms, this.supplierType)
            res.moduleName = this.$t('SUPPLIER_GONGYINGSHANGXINGMING')
            this.resultMessage(res, () => {
              this.getTableList()
              this.nextStep = true
              resolve(true)
            }, () => {
              this.tableLoading = false
              this.nextStep = false
              reject(false)
            })
          }
        })
      })
    },
    async handleNextStep() {
      await this.saveInfos()
      return this.nextStep
    },
    deleteUser
  }
}
</script>

<style scoped>
</style>