<template>
  <div class="detail-plan-list">
    <div
      class="flex-end-center margin-bottom20"
      v-permission="'BUTTON_MAIN_DATA_CAR_MODEL_PRODUCTION_PLAN_VERSION_MODIFY'"
    >
      <iButton v-if="!editable && addable" @click="$emit('add-version')">
        {{ $t('新增版本') }}
      </iButton>
      <iButton v-if="!editable" @click="edit">
        {{ $t('编辑') }}
      </iButton>
      <iButton v-if="editable" @click="batchSave">{{ $t('保存') }}</iButton>
      <iButton v-if="editable" @click="cancel">
        {{ $t('取消') }}
      </iButton>
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
import { CAR_PLAN_COLUMNS } from './data'
import { iButton, iMessage } from 'rise'
import { updCartypeOutputPlanVersion } from '@/api/mainData/car'
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
    loading: {
      type: Boolean,
      default: false
    },
    productFactoryOptions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    dataProductFactoryIds() {
      return [...new Set(this.data.map((e) => e.productFactory))]
    },
    addable() {
      return (
        this.dataProductFactoryIds.length < this.productFactoryOptions.length
      )
    }
  },
  data() {
    return {
      tableColumns: CAR_PLAN_COLUMNS,
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
            this.$emit('reset', this.originalData)
            this.toggleEdit(false)
          })
      }
    },
    handleGoDetail(row) {
      console.log('handleGoDetail', row)
    },
    toggleEdit(val) {
      if (this.$store.state.mainData.mainDataPlanEditMode === 'detail') {
        this.editPlanVersionAlert()
      } else {
        this.$store.dispatch('setMainDataPlanEditMode', val ? 'version' : '')
        this.tableExtraData.editable = val
        this.editable = val
      }
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
      updCartypeOutputPlanVersion(this.data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '设置成功')
            this.toggleEdit(false)
            this.$store.dispatch('setMainDataPlanEditMode', '')
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
