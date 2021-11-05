<template>
  <div class="detail-plan-list">
    <div class="flex-end-center margin-bottom20" v-show="data.length > 0">
      <iButton v-if="!editable" @click="edit">编辑</iButton>
      <iButton v-if="editable" :loading="saveLoading" @click="save">
        保存
      </iButton>
      <iButton v-if="editable" @click="cancel">取消</iButton>
    </div>

    <i-table-custom
      :loading="loading"
      :data="data"
      :columns="tableColumns"
      :extra-data="tableExtraData"
      @go-detail="handleGoDetail"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { CAR_PROJECT_CONFIG_COLUMNS } from './data'
import { updateCartypeProCfgVersionInfo } from '@/api/mainData/carProject'
import { iButton, iMessage } from 'rise'
import deleteMixin from '@/mixins/deleteMixin'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailPlanList',
  components: { iButton, iTableCustom },
  mixins: [deleteMixin, mixin],
  props: {
    configListStatus: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableColumns: CAR_PROJECT_CONFIG_COLUMNS,
      tableExtraData: { editable: false, isValidChange: this.isValidChange },
      editable: false,
      saveLoading: false,
      originalData: []
    }
  },
  methods: {
    edit() {
      this.originalData = _.cloneDeep(this.data)
      this.toggleEdit(true)
    },
    cancel() {
      if (_.isEqual(this.data, this.originalData)) {
        this.toggleEdit(false)
      } else {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.toggleEdit(false)
            this.$emit('reset', this.originalData)
          })
      }
    },
    handleGoDetail(row) {
      console.log('handleGoDetail', row)
    },
    toggleEdit(val) {
      if (this.configListStatus) {
        // console.log("====请先保存配置列表，再编辑版本列表")
        this.editConfigVersionAlert()
        return
      }

      this.tableExtraData.editable = val
      this.editable = val
      this.$emit('edit-change', 'version', val)
    },
    isValidChange(row) {
      if (row.isValid) {
        this.data.forEach(e => {
          if (e.riseVersionCode !== row.riseVersionCode) {
            e.isValid = false
          }
        })
      }
    },
    save() {
      this.saveLoading = true
      const reqData = []
      if (this.data.length > 0) {
        this.data.forEach(e => {
          reqData.push({
            cartypeProId: this.$route.query.id,
            currentUserId: this.$store.state.permission.userInfo.id,
            isValid: e.isValid,
            riseVersionCode: e.riseVersionCode
          })
        })
        updateCartypeProCfgVersionInfo(reqData)
          .then(res => {
            if (res.result) {
              iMessage.success(res.desZh || '设置成功')
              this.toggleEdit(false)
              this.$emit('save-success')
            } else {
              iMessage.error(res.desZh || '设置失败')
            }
          })
          .catch(err => {
            console.log(err)
            iMessage.error(err.desZh || '设置失败')
          })
          .finally(() => {
            this.saveLoading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
