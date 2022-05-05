<template>
  <div>
    <div @click="dialogVisible = true">
      <iSelectorInput :tag-label="labelKey" v-model="users" />
    </div>
    <i-selector-dialog
      :show.sync="dialogVisible"
      @change="handleAreaControllerCallback"
      v-model="users"
      :tableSetting="tableSetting"
      :filter="userFilters"
      :title="'选择用户'"
      :search-method="handleSearch"
      :id-key="valueKey"
      tag-label="nameZh"
    />
  </div>
</template>

<script>
import { getPageListByParams, getSpUserList } from '@/api/authorityMgmt/index'
import iSelectorDialog from '../iSelector/iSelectorDialog'
import iSelectorInput from '../iSelector/iSelectorInput'
export default {
  name: 'userSelector',
  components: { iSelectorDialog, iSelectorInput },
  props: {
    value: {
      type: Array,
      require: true
    },
    onlyReportForm: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'nameZh'
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableSetting: [
        {
          type: 'selection',
          width: 50
        },
        {
          prop: '',
          type: 'index',
          label: '编号',
          width: 60
        },
        {
          prop: 'userNum',
          label: '员工号'
        },
        {
          prop: 'nameZh',
          label: '姓名'
        },
        {
          prop: 'deptList',
          label: '所属部门'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'mobile',
          label: '手机'
        },
        {
          prop: 'phone',
          label: '电话'
        }
      ],
      userFilters: [
        {
          value: 'userNum', //v-model
          label: '工号',
          type: 'input',
          initVal: ''
        },
        {
          value: 'nameZh',
          label: '姓名',
          type: 'input',
          initVal: ''
        },
        {
          value: 'deptList',
          label: '所属部门',
          type: 'input',
          initVal: ''
        }
      ],
      users: []
    }
  },
  watch: {
    users(val) {
      this.$emit('change', val)
    }
  },
  created() {
    if (this.value) {
      this.users = this.value
    }
  },
  methods: {
    handleSearch(param) {
      if (this.onlyReportForm) {
        param.accountType = 1
        return getSpUserList(param)
      } else {
        //区域控制员
        return getPageListByParams(param)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
