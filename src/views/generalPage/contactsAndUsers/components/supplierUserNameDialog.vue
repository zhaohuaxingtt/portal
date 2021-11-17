<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-dialog :visible.sync="value"
            width="90%"
            top="2%"
            @close="clearDiolog"
            :title="rowList.nameZh + '-' + rowList.dept + '-' + rowList.designation">
    <div class="box">
      <div class="header">
        <el-form inline
                 label-position="top">
          <el-form-item :label="language('YINGYONGZHONGWENMING', '应用中文名')">
            <iInput v-model="form.appNameCn"
                    :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </el-form-item>
          <el-form-item :label="language('YINGYONGYINGWENMING', '应用英文名')">
            <iInput v-model="form.appNameEn"
                    :placeholder="language('QINGSHURU', '请输入')"></iInput>
          </el-form-item>
          <el-form-item :label="language('YINGYONGLEIXING', '应用类型')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.systemType">
              <el-option v-for="item in systemLsit"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <div>
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      <div class="section"
           style="margin-top: 30px">
        <div>
          <div class="sectionTitle">
            <span class="ptext">
              {{ language('KETIANJIAYINGYONGQUANXIAN', '可添加应用权限') }}
            </span>
            <iButton :disabled="selectAddArr.length == 0"
                     @click="clickadd">{{
              language('TIANJIA', '添加')
            }}</iButton>
          </div>
          <tableList style="margin-top: 30px"
                     :tableData="tabledataAdd"
                     @handleSelectionChange="handleSelectionChangeAdd"
                     :tableTitle="CloumAdd"
                     :tableLoading="tableLoadingAdd"
                     :index="true">
            <template #systemType="scope">
              {{ scope.row.systemType == 1 ? '系统' : 'SCENARIO' }}
            </template>
          </tableList>
        </div>
        <div>
          <div class="sectionTitle">
            <span class="ptext">
              {{ language('YIYOUYINGYONGQUANXIAN', '已有应用权限') }}
            </span>
            <iButton :disabled="selectDelArr.length == 0"
                     @click="clickDel">{{
              language('SHANCHU', '删除')
            }}</iButton>
          </div>
          <tableList style="margin-top: 30px"
                     :tableData="tabledataDel"
                     @handleSelectionChange="handleSelectionChangeDel"
                     :tableTitle="CloumDel"
                     :tableLoading="tableLoadingDel"
                     :index="true">
          </tableList>
        </div>
      </div>
    </div>
  </i-dialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage, iInput } from 'rise'
import tableList from '@/components/commonTable'
import { CloumAdd, CloumDel } from './data'
import { sysList, authList, cancelAuth, auth } from '@/api/provider/index'
export default {
  components: {
    iDialog,
    tableList,
    iButton,
    iSelect,
    iInput
  },
  props: {
    value: { type: Boolean },
    rowList: { type: Object },
    tabledata: { type: Array }
  },
  data() {
    return {
      tabledataDel: [],
      tabledataAdd: [],
      CloumDel: CloumDel,
      CloumAdd: CloumAdd,
      selectTableData: [],
      tableLoadingDel: false,
      tableLoadingAdd: false,
      selectDelArr: [],
      selectAddArr: [],
      supplierType: '',
      form: {},
      systemLsit: [
        { label: this.language('XITONG', '系统'), value: 1 },
        { label: 'SCENARIO', value: 2 }
      ],
      isMainContact: true,
      userType: 1
    }
  },
  watch: {},
  created() {
    this.userType = this.$store.state.permission.userInfo.userType
    this.isMainContact = this.$store.state.permission.userInfo.isMainContact
    if (this.isMainContact == null) this.isMainContact = false
    // this.getAddList()
    if (this.$route.query.subSupplierType == 'GP') {
      this.supplierType = 2
    } else if (this.$route.query.subSupplierType == 'PP') {
      this.supplierType = 1
    } else {
      this.supplierType = 3
    }
    console.log(this.tabledata)
    this.getAddList()
  },
  methods: {
    getAddList() {
      this.tableLoadingAdd = true

      if (this.userType == 2 && this.isMainContact) {
        const params1 = {
          current: 1,
          size: 9999,
          supplierUserId: this.rowList.id
        }
        const req1 = {
          current: 1,
          size: 9999,
          supplierUserId: this.$store.state.permission.userInfo.id
        }
        authList(req1).then((res) => {
          if (res && res.code == 200) {
            this.tabledataAdd = res.data
            this.tableLoadingAdd = false
            this.tableLoadingDel = true

            authList(params1).then((res) => {
              if (res && res.code == 200) {
                this.tabledataDel = res.data
                this.tableLoadingDel = false
                this.tabledataAdd = this.tabledataAdd.filter(
                  (item) => !this.tabledataDel.some((ele) => ele.id === item.id)
                )
              } else iMessage.error(res.desZh)
            })
          } else iMessage.error(res.desZh)
        })
      } else {
        const req = {
          supplierType: this.supplierType,
          ...this.form,
          current: 1,
          size: 9999
        }
        sysList(req).then((res) => {
          if (res && res.code == 200) {
            this.tabledataAdd = res.data
            this.tableLoadingAdd = false
            this.tableLoadingDel = true
            const params = {
              current: 1,
              size: 9999,
              supplierUserId: this.rowList.id
            }
            authList(params).then((res) => {
              if (res && res.code == 200) {
                this.tabledataDel = res.data
                this.tableLoadingDel = false
                this.tabledataAdd = this.tabledataAdd.filter(
                  (item) => !this.tabledataDel.some((ele) => ele.id === item.id)
                )
              } else iMessage.error(res.desZh)
            })
          } else iMessage.error(res.desZh)
        })
      }
    },
    clickadd() {
      const req = {
        applicationIds: this.selectAddArr.map((x) => {
          return x.id
        }),
        userIds: [this.rowList.id]
      }
      auth(req).then((res) => {
        if (res && res.code == 200) {
          this.getAddList()
          iMessage.success(res.desZh)
          this.tabledataDel = res.data
        } else iMessage.error(res.desZh)
      })
    },
    clickDel() {
      let userIds = []
      if (this.rowList.isDefault) {
        userIds = this.tabledata.map((i) => {
         return i.id
        })
      } else {
        userIds = [this.rowList.id]
      }
      console.log(111)
      const req = {
        applicationIds: this.selectDelArr.map((x) => {
          return x.id
        }),
        userIds: userIds
      }
      cancelAuth(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getAddList()

          this.tabledataDel = res.data
        } else iMessage.error(res.desZh)
      })
    },
    handleSelectionChangeAdd(val) {
      this.selectAddArr = val
    },
    handleSelectionChangeDel(val) {
      this.selectDelArr = val
    },
    clearDiolog() {
      this.$emit('input', false)
    },

    sure() {
      this.getAddList()
    },
    clickReset() {
      this.form = {}
      this.getAddList()
    }
  }
}
</script>

<style scoped lang="scss">
.ptext {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
}
.changeContent {
  padding: 0px 10px 20px 10px;
}
.box {
  padding-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #e3e3e3;
  }
  .section {
    display: flex;
    justify-content: space-between;
    .sectionTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > div {
      width: 48%;
    }
  }
}
</style>