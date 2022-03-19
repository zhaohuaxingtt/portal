<template>
  <div class="u-table">
    <iTableCustom
      v-if="this.$route.query.editable == 1"
      :loading="tableLoading"
      :data="userList"
      :columns="tableSetting"
      @go-detail="handleGoDetail"
    >
    </iTableCustom>
    <iTableCustom
      v-if="this.$route.query.editable == 2"
      :loading="tableLoading"
      :data="userList"
      :columns="tableSettingNotEmit"
    >
    </iTableCustom>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
export default {
  components: { iTableCustom },
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      tableSettingNotEmit:[
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'userNum',
          label: '员工号',
          i18n:'员工号',
          tooltip: false,
          align: 'center',
        },
        {
          prop: 'nameZh',
          label: '姓名',
          i18n:'姓名',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'department',
          label: '所属部门',
          i18n:'所属部门',
          align: 'center',
          tooltip: false
          // customRender: (h, scope) => {
          //     return <span class='open-link-text'>{scope.row.deptDTO.nameZh}</span>
          // },
        },
        {
          prop: 'mobile',
          label: '手机',
          i18n:'手机',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'phone',
          label: '电话',
          i18n:'电话',
          align: 'center',
          tooltip: false
        }
      ],
      tableSetting: [
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'userNum',
          label: '员工号',
          i18n: '员工号',
          tooltip: false,
          align: 'center',
          emit: 'go-detail',
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.userNum}</span>
          }
        },
        {
          prop: 'nameZh',
          label: '姓名',
          i18n: '姓名',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'department',
          label: '所属部门',
          i18n: '所属部门',
          align: 'center',
          tooltip: false
          // customRender: (h, scope) => {
          //     return <span class='open-link-text'>{scope.row.deptDTO.nameZh}</span>
          // },
        },
        {
          prop: 'mobile',
          label: '手机',
          i18n: '手机',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'phone',
          label: '电话',
          i18n: '电话',
          align: 'center',
          tooltip: false
        }
      ],
      tabelLoading: false
    }
  },
  computed: {
    userList() {
      return this.$store.state.position.pos.positionDetail.userDTOList
    }
  },
  methods: {
    handleGoDetail(val) {
      this.$router.push({
        path: '/authorityMgmt/detail',
        query: { id: val.id }
      })
    }
  }
}
</script>
