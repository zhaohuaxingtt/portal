<template>
  <div class="detail-plan-list">
    <div class="flex-end-center margin-bottom20">
      <iButton v-if="!editable" @click="$emit('add-version')">新增版本</iButton>
      <iButton v-if="!editable" @click="edit">编辑</iButton>
      <iButton v-if="editable" @click="batchSave">保存</iButton>
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
import { CAR_PROJECT_PLAN_COLUMNS } from './data'
import { iButton, iMessage } from 'rise'
import { saveCarProjectPlanVersion } from '@/api/mainData/carProject'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailPlanList',
  components: { iButton, iTableCustom },
  mixins: [mixin],
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    planListStatus: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableColumns: CAR_PROJECT_PLAN_COLUMNS,
      tableExtraData: { editable: false, validChange: this.validChange },
      editable: false,
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
            this.batchSave()
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
      if (this.planListStatus) {
        this.editPlanVersionAlert()
        return
      }
      console.log('777777')
      this.tableExtraData.editable = val
      this.editable = val
      this.$emit('edit-change', 'version', val)
    },
    validChange(row) {
      if (row.isValid) {
        const { productFactory, riseVersionCode } = row
        this.data.forEach((e) => {
          if (
            e.productFactory === productFactory &&
            e.riseVersionCode !== riseVersionCode
          ) {
            e.isValid = false
          }
        })
      }
    },
    batchSave() {
      this.saveLoading = true
      this.data.forEach((e) => {
        e.currentUserId = this.$store.state.permission.userInfo.id
      })
      saveCarProjectPlanVersion(this.data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '设置成功')
            this.toggleEdit(false)
            this.$emit('save-success')
          } else {
            iMessage.error(res.desZh || '设置失败')
          }
        })
        .catch((err) => {
          console.log(err)
          iMessage.error(err.desZh || '设置失败')
        })
        .finally(() => {
          this.saveLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
