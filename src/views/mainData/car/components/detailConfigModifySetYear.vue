<template>
  <iDialog
    title="应用年份"
    :visible.sync="dialogVisible"
    width="30%"
    @close="handleClose"
  >
    <iSelect
      v-model="useYear"
      multiple
      placeholder="请选择"
      class="select-height-auto-important"
    >
      <el-option
        v-for="item in yearOptions"
        :key="item"
        :label="item + '年'"
        :value="item"
      />
    </iSelect>
    <span slot="footer" class="dialog-footer">
      <iButton :loading="loading" @click="save">保存</iButton>
      <iButton :loading="loading" @click="handleClose">退出</iButton>
    </span>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iMessage, iButton } from 'rise'
import {
  updateCartypeCfgUseYear,
  fetchConfigUserYear
} from '@/api/mainData/car'
import { getYearOptions } from '@/views/mainData/util'
export default {
  components: { iDialog, iSelect, iButton },
  props: {
    riseVersionCode: String
  },
  computed: {
    yearOptions() {
      return getYearOptions()
    }
  },
  data() {
    return {
      dialogVisible: true,
      useYear: [new Date().getFullYear()],
      loading: false,
      selectedYears: []
    }
  },
  created() {
    this.queryfetchConfigUserYear()
  },
  methods: {
    handleClose() {
      this.$store.dispatch('triggerMainDataQueryPlan')
      this.$emit('close')
    },
    save() {
      const reqData = {
        cartypeId: this.$route.query.id,
        riseVersionCode: this.riseVersionCode,
        useYear: this.useYear.join(',')
      }
      this.loading = true
      updateCartypeCfgUseYear(reqData)
        .then(res => {
          if (res.result) {
            iMessage.success(res.desZh || '应用年份成功')
            this.handleClose()
          } else {
            iMessage.error(res.desZh || '应用年份失败')
          }
        })
        .catch(err => {
          iMessage.error(err.desZh || '应用年份失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    queryfetchConfigUserYear() {
      const params = {
        cartypeId: this.$route.query.id,
        riseVersionCode: this.riseVersionCode
      }
      fetchConfigUserYear(params).then(res => {
        if (res.result && res.data) {
          const selectedYears = []
          for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i]
            if (typeof element === 'string') {
              selectedYears.push(parseInt(element))
            } else {
              selectedYears.push(element)
            }
          }
          this.useYear = selectedYears
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
