<template>
  <div>
    <div @click="dialogVisible = true">
      <iSelectorInput tag-label="nameZh" v-model="users" />
    </div>
    <i-selector-dialog
      :show.sync="dialogVisible"
      @change="handleAreaControllerCallback"
      v-model="users"
      :tableSetting="tableSetting"
      :filter="userFilters"
      :title="'选择用户'"
      :search-method="handleSearch"
      idKey="accountId"
      sizeType="size"
      tag-label="nameZh"
    />
  </div>
</template>

<script>
import { getUserSelectPageList } from '@/api/authorityMgmt/index'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog'
import iSelectorInput from '@/components/iSelector/iSelectorInput'
export default {
  name: 'userSelect',
  components: { iSelectorDialog, iSelectorInput },
  props: {
    value: {
      type: Array,
      require: true
    },
    onlyReportForm: {
      type: Boolean,
      default: false
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
          i18n: '编号'
        },
        {
          prop: 'userNum',
          i18n: '员工号'
        },
        {
          prop: 'nameZh',
          i18n: '姓名'
        },
        {
          prop: 'deptNameZh',
          i18n: '所属部门'
        },
        {
          prop: 'email',
          i18n: '邮箱'
        },
        {
          prop: 'mobile',
          i18n: '手机'
        },
        {
          prop: 'phone',
          i18n: '电话'
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
          value: 'deptNameZh',
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
      }
      return getUserSelectPageList(param)
    }
  }
}
</script>

<style lang="scss" scoped></style>
