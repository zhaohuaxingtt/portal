<template>
  <div>
    <pageHeader>
      <el-form inline>
        <iFormItem :label="$t('版本号')" v-if="mode !== 'ADD'">
          <iSelect v-model="version" @change="versionChange">
            <el-option
              v-for="item in versions"
              :value="item.code"
              :label="item.code"
              :key="item.code"
            />
          </iSelect>
        </iFormItem>
        <iFormItem :label="$t('生产工厂')">
          <iSelect
            v-model="productFactory"
            :disabled="mode !== 'ADD'"
            @change="productFactoryChange"
          >
            <el-option
              v-for="item in effectProductFactoryOptions"
              :value="item.id"
              :label="item.name"
              :key="item.id"
            />
          </iSelect>
        </iFormItem>
        <iFormItem :label="$t('车型总产量')">
          <iInput :value="total" readonly disabled />
        </iFormItem>
      </el-form>
      <div slot="actions">
        <iButton v-show="!extraData.editable" @click="edit">
          {{ $t('编辑') }}
        </iButton>
        <iButton v-show="extraData.editable" @click="addItem">
          {{ $t('新增年份') }}
        </iButton>
        <iButton v-show="extraData.editable" @click="save">
          {{ $t('保存') }}
        </iButton>
        <iButton v-show="extraData.editable" @click="cancel">
          {{ $t('取消') }}
        </iButton>
      </div>
    </pageHeader>

    <div v-loading="loading">
      <verticalTable
        v-if="mode === 'ADD'"
        :columns="detailAddColumns"
        :data="data"
        :extra-data="extraData"
      />
      <verticalTable
        v-else
        :columns="detailEditColumns"
        :data="data"
        :extra-data="extraData"
      />
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iSelect, iFormItem, iInput, iButton, iMessage } from 'rise'
import verticalTable from '@/components/verticalTable'
import {
  CAR_PLAN_DETAIL_ADD_COLUMNS,
  CAR_PLAN_DETAIL_EDIT_COLUMNS,
  CAR_PLAN_REMOVE_COLUMNS
} from './data'
import { getYearOptions } from '@/views/mainData/util'
import {
  saveCartypeOutputPlanVersion,
  fetchRiseVersionList,
  fetchCartypeOutPutPlan
} from '@/api/mainData/car'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailPlanAdd',
  mixins: [mixin],
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    mode: {
      type: String,
      default: 'ADD'
    },
    productFactoryOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    defaultProductFactory: {
      type: String,
      default: ''
    },
    allProductFactoryIds: {
      type: Array,
      default: function() {
        return []
      }
    },
    riseVersionCode: {
      type: String,
      default: ''
    }
  },
  components: {
    verticalTable,
    iSelect,
    iFormItem,
    iInput,
    iButton,
    pageHeader
  },
  computed: {
    total() {
      let total = 0
      for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i]
        if (element.output) {
          total += parseFloat(element.output)
        }
      }
      return total
    },
    effectProductFactoryOptions() {
      return this.productFactoryOptions.filter(
        e =>
          this.allProductFactoryIds.indexOf(e.id) === -1 ||
          e.id === this.productFactory
      )
    },
    detailAddColumns() {
      if (!this.extraData.editable) {
        return CAR_PLAN_DETAIL_ADD_COLUMNS
      }
      return { ...CAR_PLAN_DETAIL_ADD_COLUMNS, CAR_PLAN_REMOVE_COLUMNS }
    },
    detailEditColumns() {
      if (!this.extraData.editable) {
        return CAR_PLAN_DETAIL_EDIT_COLUMNS
      }
      return { ...CAR_PLAN_DETAIL_EDIT_COLUMNS, CAR_PLAN_REMOVE_COLUMNS }
    }
  },
  watch: {
    riseVersionCode(val) {
      this.version = val
    },
    defaultProductFactory(val) {
      this.productFactory = val
    }
  },
  created() {
    this.setYearOptions()
    if (this.mode === 'ADD') {
      this.toggleEdit(true)
    }
    if (this.defaultProductFactory) {
      this.productFactory = this.defaultProductFactory
      this.queryRiseVersionList()
    }
    if (this.riseVersionCode) {
      this.version = this.riseVersionCode
    }
  },
  data() {
    return {
      version: '',
      productFactory: '',
      extraData: {
        editable: false,
        yearOptions: [],
        removeItem: this.removeItem,
        viewConfigDetail: this.handleViewConfigDetail,
        handleYearChange: this.handleYearChange
      },
      versions: [],
      loading: false,
      originalData: []
    }
  },
  methods: {
    edit() {
      this.originalData = _.cloneDeep(this.data)
      this.toggleEdit(true)
    },
    cancel() {
      if (this.mode === 'ADD') {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.toggleEdit(false)
            this.$emit('version-remove')
          })
      } else {
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
      }
    },
    toggleEdit(val) {
      if (this.$store.state.mainData.mainDataPlanEditMode === 'version') {
        this.editPlanDetailAlert()
      } else {
        this.$store.dispatch('setMainDataPlanEditMode', val ? 'detail' : '')
        this.extraData.editable = val
      }
    },
    async versionChange(val) {
      const reqData = {
        cartypeId: this.$route.query.id,
        riseVersionCode: val,
        productFactory: this.productFactory
      }
      this.loading = true
      fetchCartypeOutPutPlan(reqData)
        .then(res => {
          if (res.result) {
            this.$emit('version-change', res.data || [])
          }
        })
        .finally(() => (this.loading = false))
    },
    productFactoryChange(val) {
      this.$emit('product-factory-change', val)
    },
    addItem() {
      let lastYear = new Date().getFullYear()
      if (this.data.length > 0) {
        lastYear = this.data[this.data.length - 1].years
      }
      this.data.push({
        years: parseInt('' + lastYear) + 1,
        output: 0
      })
    },
    removeItem(index) {
      this.onDelete().then(() => {
        this.data.splice(index, 1)
      })
    },
    handleViewConfigDetail(row) {
      this.$store.dispatch('triggerMainDataCarScroll', row)
    },
    setYearOptions() {
      const yearOptions = getYearOptions()
      Vue.set(this.extraData, 'yearOptions', yearOptions)
    },
    save() {
      const hash = {}
      let repeatYear = ''
      if (this.data.length === 0) {
        return
      }

      if (this.data.filter(e => !e.years).length > 0) {
        iMessage.error('年份不能为空')
        return
      }

      // 验证重复年份
      for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i]
        if (!hash[element.years]) {
          hash[element.years] = element.years
        } else {
          repeatYear = element.years
          break
        }
      }
      if (repeatYear) {
        iMessage.error('年份 ' + repeatYear + ' 重复')
        return
      }
      // 生产工厂
      if (!this.productFactory) {
        iMessage.error('生产工厂不能为空')
        return false
      }

      // 年份不足，补充齐
      const years = this.data.map(e => parseInt('' + e.years))
      years.sort((a, b) => (a > b ? 1 : -1))
      const start = years[0]
      const end = years[years.length - 1]
      const missingYears = []
      for (let i = start; i < end; i++) {
        if (!years.includes(i)) {
          missingYears.push(i)
        }
      }
      if (missingYears.length > 0) {
        this.$confirm(
          `是否需要系统为缺失年份 ${missingYears.join(',')} 计划补全并保存。`,
          '计划年份缺失',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.saveToServer(hash)
          })
          .catch(() => {})
      } else {
        this.saveToServer(hash)
      }
    },
    saveToServer(hash) {
      const currentUserId = this.$store.state.permission.userInfo.id
      // 年份不足，补充齐
      const sortData = this.data.sort((a, b) => (a.years > b.years ? 1 : -1))
      if (sortData.length > 1) {
        const start = parseInt('' + sortData[0].years) + 1
        const end = parseInt('' + sortData[sortData.length - 1].years)
        for (let i = start; i < end; i++) {
          if (!hash[i]) {
            sortData.push({
              years: i,
              output: 0,
              createBy: currentUserId
            })
          }
        }
      }

      this.data = sortData.sort((a, b) => (a.years > b.years ? 1 : -1))

      const reqData = {
        cartypeId: this.$route.query.id,
        outPutPlanList: sortData.map(e => {
          e.createBy = currentUserId
          return e
        }),
        productFactory: this.productFactory,
        totalOutPlan: this.total,
        riseVersionCode: this.version
      }
      this.loading = true
      saveCartypeOutputPlanVersion(reqData)
        .then(res => {
          if (res.result) {
            iMessage.success('保存成功')
            this.$store.dispatch('setMainDataPlanEditMode', '')
            this.$emit('save-success')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch(err => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => (this.loading = false))
    },
    async queryRiseVersionList() {
      const params = {
        cartypeId: this.$route.query.id,
        productFactoryId: this.productFactory
      }
      const { data } = await fetchRiseVersionList(params)
      this.versions = data || []
      this.productFactory = this.defaultProductFactory
    },
    handleYearChange(scope) {
      const { row, $index } = scope
      console.log('row', row)
      const entYears = this.extraData.yearOptions[
        this.extraData.yearOptions.length - 1
      ]
      let years = row.years
      for (let i = $index + 1; i < this.data.length; i++) {
        const element = this.data[i]
        if (years < entYears) {
          element.years = ++years
        } else {
          element.years = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
