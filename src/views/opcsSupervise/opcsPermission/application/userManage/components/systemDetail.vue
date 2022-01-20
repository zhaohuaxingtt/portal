<!--
 * @Date: 2021-12-16 17:21:59
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-18 15:30:28
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\systemDetail.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="90%"
           top="2%"
           @close="clearDiolog"
           :title="language('GUANLIANYINGYONG', '关联应用')">
    <div class="header">
      <el-form inline
               label-position="left">
        <el-form-item :label="language('YINGYONGZHONGWENMING', '应用中文名')">
          <iInput v-model="form.nameZh"
                  :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('YINGYONGYINGWENMING', '应用英文名')">
          <iInput v-model="form.nameEn"
                  :placeholder="language('QINGSHURU', '请输入')"></iInput>
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
         style="margin-top: 20px">
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
        <table-list style="margin-top: 20px"
                    :tableData="tableListDataAdd"
                    :tableTitle="tableTitle"
                    :tableLoadingAdd="tableLoadingAdd"
                    @handleSelectionChange="handleSelectionChangeAdd"
                    :index="true"
                    ref="commonTable">

        </table-list>
      </div>
      <div>
        <div class="sectionTitle">
          <span class="ptext">
            {{ language('YIYOUYINGYONGQUANXIAN', '已有应用权限') }}
          </span>
          <iButton :disabled="selectDelArr.length == 0"
                   @click="del">{{
              language('SHANCHU', '删除')
            }}</iButton>
        </div>
        <table-list style="margin-top: 20px"
                    :tableData="tableListDataDel"
                    :tableTitle="tableTitle"
                    :tableLoadingAdd="tableLoadingDel"
                    @handleSelectionChange="handleSelectionChangeDel"
                    :index="true"
                    ref="commonTable">

        </table-list>
      </div>
    </div>

  </iDialog>
</template>

<script>
import tableList from '@/components/commonTable'
import { iDialog, iButton, iMessage, iInput } from 'rise'
import { tableTitleDetail } from './data'
import {
  operationAdd,
  operationQuery,
  relateQuery,
  operationRemove
} from '@/api/opcs/system'
export default {
  components: {
    iDialog,
    iButton,
    tableList,
    iInput
  },
  props: {
    value: { type: Boolean },
    rowList: { type: Object }
  },
  watch: {
    value() {
      this.getAddList()
    }
  },
  data() {
    return {
      form: {},
      tableLoadingAdd: false,
      tableLoadingDel: false,
      tableTitle: tableTitleDetail,
      tableListDataAdd: [],
      tableListDataDel: [],
      selectAddArr: [],
      selectDelArr: []
    }
  },
  created() {},
  methods: {
    sure() {
      this.getAddList()
    },
    //获取列表接口
    getAddList() {
      this.tableLoadingAdd = true
      const params = {
        ...this.form,
        opcsSupplierId: this.$route.query.opcsSupplierId,
        pageNo: 1,
        pageSize: 99999,
        opcsUserId: this.rowList.id
      }
      operationQuery(params).then((res) => {
        this.tableLoadingAdd = false
        if (res && res.code == 200) {
          this.getDelList()
          this.tableListDataAdd = res.data
        } else iMessage.error(res.desZh)
      })
    },
    getDelList() {
      this.tableLoadingDel = true
      const params = {
        ...this.form,
        opcsSupplierId: this.$route.query.opcsSupplierId,
        pageNo: 1,
        pageSize: 99999,
        opcsUserId: this.rowList.id
      }
      relateQuery(params).then((res) => {
        this.tableLoadingDel = false
        if (res && res.code == 200) {
          this.$nextTick(() => {
            this.tableListDataAdd = this.tableListDataAdd.filter(
              (item) => !this.tableListDataDel.some((ele) => ele.id === item.id)
            )
          })
          this.tableListDataDel = res.data
        } else iMessage.error(res.desZh)
      })
    },
    clickadd() {
      let parmars = {
        appList: this.selectAddArr,
        opcsSupplierId: this.$route.query.opcsSupplierId,
        opcsUserId: this.$route.query.opcsUserId
      }
      operationAdd(parmars).then((res) => {
        if (res && res.code == 200) {
          this.getAddList()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    del() {
      if (this.selectDelArr.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return
      }
      const req = {
        appIds: this.selectDelArr.map((v) => {
          return v.id
        }),
        opcsUserId: this.$route.query.opcsUserId
      }
      operationRemove(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
           this.getAddList()
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
    clickReset() {
      this.form = {}
      this.getAddList()
    }
  }
}
</script>

<style scoped lang="scss">
.btnbox {
  text-align: right;
  padding: 0 0 20px 0px;
}
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
    padding-bottom: 20px;
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