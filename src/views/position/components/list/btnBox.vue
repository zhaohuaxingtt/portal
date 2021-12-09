<template>
  <div class="btn-box flex-end-center margin-bottom30">
    <iButton
      :disabled="
        (item.value === 'add' && (selectedList.length || !orgSelected.id)) ||
        (item.value === 'del' && !selectedList.length) ||
        (item.value === 'edit' && selectedList.length !== 1)
      "
      @click="handleOperate(item.value)"
      v-for="item in operations"
      :key="item.value"
    >
      {{ item.label }}
    </iButton>
  </div>
</template>

<script>
import { iButton, iMessage } from 'rise'
import { exportExcel } from '@/api/position'
import { openUrl } from '@/utils'
export default {
  components: { iButton },
  props: {
    operations: {
      type: Array
    }
  },
  computed: {
    selectedList() {
      return this.$store.state.position.pos.listSelected
    },
    orgSelected() {
      return this.$store.state.position.org.itemSelected
    },
    queryParams() {
      return this.$store.state.position.pos.query || []
    }
  },
  methods: {
    handleOperate(operation) {
      switch (operation) {
        case 'del':
          this.delPosition()
          break
        case 'add':
          this.$store.commit('RESET_POSITION_DETAIL')
          openUrl(`/position/operate/add?deptId=${this.orgSelected.id}`)
          // this.$router.push({
          //   path: '/position/operate/add',
          //   query: {
          //     deptId: this.orgSelected.id,
          //     menuType: this.$route.query.menuType
          //   }
          // })
          break
        case 'edit':
          this.$store.commit('RESET_POSITION_DETAIL')
          openUrl(
            `/position/operate/edit?deptId=${this.$store.state.position.pos.listSelected[0].deptId}&id=${this.$store.state.position.pos.listSelected[0].id}`
          )
          /* this.$router.push({
            path: '/position/operate/edit',
            query: {
              deptId: this.$store.state.position.pos.listSelected[0].deptId,
              id: this.$store.state.position.pos.listSelected[0].id
            }
          }) */
          break
        case 'export':
          this.exportTemplate()
          break
      }
    },
    //导出
    exportTemplate() {
      /* if (this.$store.state.position.pos.listSelected.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      excelExport(this.$store.state.position.pos.listSelected, '') */
      const params = {
        deptId: this.$store.state.position.org.itemSelected.id
      }
      for (let index in this.queryParams) {
        params[this.queryParams[index].key] = this.queryParams[index].value
      }
      exportExcel(params)
    },
    //删除
    delPosition() {
      const len = this.$store.state.position.pos.listSelected.length
      const temp = this.$store.state.position.pos.listSelected.find((item) => {
        return item.userDTOList && item.userDTOList.length
      })
      const listDeling = this.$store.state.position.pos.listSelected.filter(
        (item) => {
          return item.userDTOList && item.userDTOList.length
        }
      )
      console.log(temp, listDeling)
      this.$confirm(
        `${
          listDeling.length === len
            ? '待删除岗位中均已绑定用户，不能删除'
            : listDeling.length
            ? '待删除岗位中，存在有用户绑定的岗位，不能删除，将会删除未绑定用户的岗位，此操作将永久删除该岗位, 是否继续?'
            : '此操作将永久删除该岗位, 是否继续?'
        }`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        listDeling.length !== len ? this.$store.dispatch('DelPositionList') : ''
      })
    }
  }
}
</script>
