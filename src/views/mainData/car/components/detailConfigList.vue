<!--
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-13 10:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\car\components\detailConfigList.vue
-->
<template>
  <div class="detail-plan-list">
    <div class="flex-end-center margin-bottom20" v-show="data.length > 0">
      <iButton v-if="!editable" @click="edit">
        {{ language('编辑') }}
      </iButton>
      <iButton v-if="editable" :loading="saveLoading" @click="save">
        {{ language('保存') }}
      </iButton>
      <iButton v-if="editable" @click="cancel">
        {{ language('取消') }}
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
import { CAR_CONFIG_COLUMNS } from './data'
import { updateCartypeCfgValid } from '@/api/mainData/car'
import { iButton, iMessage } from 'rise'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailPlanList',
  components: { iButton, iTableCustom },
  mixins: [mixin],
  props: {
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
      tableColumns: CAR_CONFIG_COLUMNS,
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
            this.$emit('reset', this.originalData)
            this.toggleEdit(false)
          })
      }
    },
    handleGoDetail(row) {
      console.log('handleGoDetail', row)
    },
    toggleEdit(val) {
      if (this.$store.state.mainData.mainDataConfigEditMode === 'detail') {
        this.editConfigVersionAlert()
      } else {
        this.$store.dispatch('setMainDataConfigEditMode', val ? 'version' : '')

        this.tableExtraData.editable = val
        this.editable = val
      }
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
      updateCartypeCfgValid(this.data)
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
</script>

<style lang="scss" scoped></style>
