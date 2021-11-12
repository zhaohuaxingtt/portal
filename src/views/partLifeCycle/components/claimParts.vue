<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div>
        {{ language('LK_RENLINGLINGJIAN', '认领零件') }} <span> 已选择{{ claimNum.length }}个</span>
      </div>
    </div>
    <el-form class="content" v-loading="contetnLoading">
      <el-form-item :label="language('LK_KESHI', '科室')">
        <iSelect
          :placeholder="language('LK_QINGXUANZHE', '请选择')"
          filterable
          clearable
          v-model="deptId"
          @change="changeDeptId"
        >
          <el-option
            :value="item.deptId"
            :label="item.commodity"
            v-for="(item, index) in departmentsList"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('LK_ZHUANYECAIGOUYUAN', '专业采购员')">
        <iSelect
          :placeholder="language('LK_QINGXUANZHE', '请选择')"
          filterable
          clearable
          v-model="linieId"
          @change="changeLinieId"
        >
          <el-option
            :value="item.linieId"
            :label="item.linieName"
            v-for="(item, index) in linieList"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('LK_GANGWEI', '岗位')">
        <iSelect
          :placeholder="language('LK_QINGXUANZHE', '请选择')"
          filterable
          clearable
          v-model="roleCode"
        >
          <el-option
            :value="item.id"
            :label="item.fullNameZh"
            v-for="(item, index) in roleNameList"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <iButton @click="confirmParts" :loading="sureLoading">{{ language('LK_QUEREN', '确认') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iDialog, iSelect, iMessage, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  getDepartmentsCombo,
  liniePullDownByDept,
  getRoleName,
  assignOneself,
  confirmParts
} from '@/api/partLifeCycle/partLifeCycleStar'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  props: {
    value: { type: Boolean, default: false },
    claimNum: { type: Array, default: () => [] }
  },
  data() {
    return {
      title: '',
      xxx: '',
      itemChecked: '',
      resData: {},
      resDataClone: {},
      deptId: '',
      departmentsList: [],
      linieId: '',
      linieList: [],
      roleCode: '',
      roleNameList: [],
      defaultData: {},
      contetnLoading: false,
      sureLoading: false,

    }
  },
  mounted() {

  },
  methods: {
    confirmParts(){
      this.sureLoading = true
      confirmParts({
        partsNum: this. claimNum,
        deptId: this. deptId,
        linieId: this. linieId,
        positionCode: this. roleCode,
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          // this.departmentsList = res.data
          if(res.data.status){
            iMessage.success(this.language('LK_RENLINGCHENGGONG', '认领成功'))
            this.$emit('sure')
          } else {
            iMessage.error(res.data.partNum.split(',') + this.language('LK_RENLINGSHIBAI', '认领失败'))
          }
        } else {
          iMessage.error(result)
        }
        this.sureLoading = false
      }).catch(() => {
        this.sureLoading = false
      })
    },
    changeDeptId(){
      this.linieId = ''
      this.roleCode = ''
      this.roleNameList = []
      this.liniePullDownByDept()
    },
    changeLinieId(){
      this.roleCode = ''
      this.getRoleName()
    },
    getDepartmentsCombo() {
      this.contetnLoading = true
      getDepartmentsCombo().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.departmentsList = res.data
        } else {
          iMessage.error(result)
        }
        this.contetnLoading = false
      }).catch(() => {
        this.contetnLoading = false
      })
    },
    liniePullDownByDept() {
      this.contetnLoading = true
      liniePullDownByDept({deptId: this.deptId}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.linieList = res.data
        } else {
          iMessage.error(result)
        }
        this.contetnLoading = false
      }).catch(() => {
        this.contetnLoading = false
      })
    },
    getRoleName() {
      this.contetnLoading = true
      getRoleName({userId: this.linieId}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.roleNameList = res.data
        } else {
          iMessage.error(result)
        }
        this.contetnLoading = false
      }).catch(() => {
        this.contetnLoading = false
      })
    },
    assignOneself() {
      this.contetnLoading = true
      assignOneself().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          let data = res.data
          this.deptId = data.deptId
          this.linieId = data.linieId
          this.roleCode = data.rolePullDown.length > 0 ? data.rolePullDown[0].code : ''
          this.getDepartmentsCombo()
          this.liniePullDownByDept()
          this.getRoleName()
        } else {
          iMessage.error(result)
        }
        this.contetnLoading = false
      }).catch(() => {
        this.contetnLoading = false
      })
    },
    clearDiolog() {
      this.$emit('clearDiolog')
    },
    openPartInfo() {
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.assignOneself()
      }
    }
  }
}
</script>
<style lang='scss' scoped>

.iDialogCon {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  span{
    font-size: 14px;
    font-weight: 400;
    color: #6D7B96;
  }
}
.content{
  ::v-deep .el-form-item__label{
    font-size: 14px;
    color: #000000;
  }
}

</style>

