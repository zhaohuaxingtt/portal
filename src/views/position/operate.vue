<template>
  <iPage>
    <div class="position-operate-page" v-loading="loading">
      <pageHeader class="margin-bottom20" v-if="editable">
        {{ $route.query.id ? '编辑' : '新增' }}岗位

        <div slot="actions">
          <iButton @click="handleDirect" v-if="type === 'detail'">编辑</iButton>
          <iButton
            @click="handleConfirm"
            v-if="type !== 'detail'"
            class="margin-right20"
            :loading="saveLoading"
            >确认</iButton
          >
          <iButton
            @click="handleReset"
            :loading="saveLoading"
            v-if="type !== 'detail'"
            >重置</iButton
          >
        </div>
      </pageHeader>
      <baseInfo ref="baseInfo" :type="type" />
      <roleInfo :type="type" />
      <userInfo :type="type" v-if="type !== 'add'" />
    </div>
  </iPage>
</template>

<script>
import { baseInfo, roleInfo, userInfo } from './components'
import { iPage, iButton, iMessage } from 'rise'
import pageHeader from '@/components/pageHeader'
export default {
  components: { baseInfo, iPage, roleInfo, userInfo, iButton, pageHeader },
  data() {
    return {
      type: '',
      detailId: '',
      deptId: '',
      saveLoading: false,
      editable:false
    }
  },
  watch: {
    $route(newValue) {
      this.type = newValue.params.type
      console.log(newValue)
    }
  },
  mounted() {
    this.$route.query.editable == 1 ? this.editable = true : this.editable = false
    this.type = this.$route.params.type
    this.detailId = this.$route.query.id
    this.deptId = this.$route.query.deptId
    this.$store.dispatch('GetTagsByCategory')
    this.$store.dispatch('GetPositionPermissionList', this.deptId)
    this.$store.dispatch('GetRoleList')
  },
  computed: {
    positionObj() {
      return this.$store.state.position.pos.positionDetail
    },
    originPosDetail() {
      return this.$store.state.position.pos.originPosDetail
    },
    loading() {
      return this.$store.state.position.pos.loading
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from,'=======',to)
    if (from.name !== 'positionTag' && to.params.type !== 'add') {
      next((vm) => {
        vm.$store.dispatch('GetPositionDetail', vm.detailId)
        // to.query.editable == 1 ? vm.editable = true : vm.editable = false
      })
    }
    next()
  },
  beforeRouteUpdate(to, from, next) {
    //if (from.params.type === 'edit') {
    // this.$store.commit('SET_POSITION_DETAIL', this.originPosDetail)
    this.$store.dispatch('GetPositionDetail', this.detailId)
    this.$store.commit(
      'INIT_DIMENSION_LIST',
      this.originPosDetail.permissionList
    )
    this.$store.commit('INIT_ROLE_SELECTED', this.originPosDetail.roleDTOList)
    this.$store.commit(
      'INIT_ROLEIDS_SELECTED',
      this.originPosDetail.roleDTOList
    )
    //}
    next()
  },
  methods: {
    handleDirect() {
      this.$router.push({
        path: '/position/operate/edit',
        query: {
          id: this.detailId,
          deptId: this.deptId,
          editable:this.editable ? 1 : 2
        }
      })
    },
    async handleConfirm() {
      const valid1 = await this.$refs['baseInfo'].$refs['baseForm1'].validate()
      const valid2 = await this.$refs['baseInfo'].$refs['baseForm2'].validate()
      const obj = _.find(
        this.$store.state.position.pos.dimensionList,
        (item) => {
          return !item.dimension || !item.content.length
        }
      )
      if (obj) {
        iMessage.warn('增加的维度及内容不能为空')
        return
      }

      if (valid1 && valid2) {
        this.saveLoading = true
        const res =
          this.type === 'add'
            ? await this.$store
                .dispatch('SavePosition', this.deptId)
                .finally(() => (this.saveLoading = false))
            : await this.$store
                .dispatch('UpdatePosition', this.deptId)
                .finally(() => (this.saveLoading = false))
        if (res.code === '200' && res.data) {
          iMessage.success(
            this.type === 'add' ? '新增岗位成功' : '更新岗位成功'
          )
          // this.originPosDetail = _.cloneDeep(res.data)
          this.$store.commit('SET_POSITION_ORIGIN_DETAIL', res.data)
          // this.type = 'detail'
          // if (this.type === 'add') {
          this.detailId = res.data.id
          const query = {
            id: res.data.id,
            deptId: this.deptId,
            editable:this.editable ? 1 : 2
          }
          this.$router.replace({
            path: '/position/operate/detail',
            query
          })
          // }
        }
      }
    },
    handleReset() {
      this.$refs['baseInfo'].$refs['baseForm1'].clearValidate()
      this.$refs['baseInfo'].$refs['baseForm2'].clearValidate()
      this.$store.commit('RESET_POSITION_DETAIL')
    }
  }
}
</script>
