<template>
  <div class="u-table">
    <iTableCustom
      :loading="tableLoading"
      :data="userList"
      :columns="tableSetting"
      @go-detail="handleGoDetail"
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
      tableSetting: [
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'userNum',
          label: '员工号',
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
          align: 'center',
          tooltip: false
        },
        {
          prop: 'department',
          label: '所属部门',
          align: 'center',
          tooltip: false
          // customRender: (h, scope) => {
          //     return <span class='open-link-text'>{scope.row.deptDTO.nameZh}</span>
          // },
        },
        {
          prop: 'mobile',
          label: '手机',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'phone',
          label: '电话',
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
