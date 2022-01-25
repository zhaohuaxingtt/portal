<template>
  <div>
    <pageHeader>
      <el-form inline>
        <iFormItem :label="language('版本号')" v-if="version !== ''">
          <iSelect v-model="version" @change="versionChange">
            <el-option
              v-for="item in versions"
              :value="item"
              :label="item"
              :key="item"
            />
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('车型总产量')">
          <iInput :value="total" readonly disabled />
        </iFormItem>
      </el-form>
      <div
        slot="actions"
        v-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_VERSION_DETAIL_MODIFY'"
      >
        <iButton v-show="!extraData.editable" @click="edit">{{
          language('编辑')
        }}</iButton>
        <iButton v-show="extraData.editable" @click="addItem">{{
          language('新增年份')
        }}</iButton>
        <iButton v-show="extraData.editable" @click="save">{{
          language('保存')
        }}</iButton>
        <iButton v-show="extraData.editable" @click="cancel">{{
          language('取消')
        }}</iButton>
      </div>
    </pageHeader>

    <div v-loading="loading" v-show="data.length > 0">
      <verticalTable
        :columns="detailAddColumns"
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
  CAR_PROJECT_PLAN_DETAIL_ADD_COLUMNS,
  CAR_PROJECT_PLAN_DETAIL_EDIT_COLUMNS,
  CAR_PLAN_REMOVE_COLUMNS
} from './data'
import { getYearOptions } from '@/views/mainData/util'
import {
  saveCarProjectPlanDetail,
  fetchCarProjectPlanDetail
} from '@/api/mainData/carProject'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailPlanAdd',
  components: {
    verticalTable,
    iSelect,
    iFormItem,
    iInput,
    iButton,
    pageHeader
  },
  mixins: [mixin],
  props: {
    versions: {
      type: Array,
      default: function () {
        return []
      }
    },
    versionListStatus: {
      type: Boolean,
      default: false
    },
    defaultVersion: {
      type: String,
      default: ''
    }
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
    userId() {
      return this.$store.state.permission.userInfo.id
    },
    detailAddColumns() {
      if (!this.extraData.editable) {
        return CAR_PROJECT_PLAN_DETAIL_ADD_COLUMNS
      }
      return { ...CAR_PROJECT_PLAN_DETAIL_ADD_COLUMNS, CAR_PLAN_REMOVE_COLUMNS }
    },
    detailEditColumns() {
      if (!this.extraData.editable) {
        return CAR_PROJECT_PLAN_DETAIL_EDIT_COLUMNS
      }
      return {
        ...CAR_PROJECT_PLAN_DETAIL_EDIT_COLUMNS,
        CAR_PLAN_REMOVE_COLUMNS
      }
    }
  },
  watch: {
    defaultVersion(val) {
      this.version = val
      this.versionChange()
    }
  },
  created() {
    this.setYearOptions()
    if (this.defaultVersion) {
      this.version = this.defaultVersion
      this.versionChange()
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
      loading: false,
      data: [],
      originalData: [],
      isAddMode: false
    }
  },
  methods: {
    toggleEdit(val) {
      if (this.versionListStatus) {
        this.editPlanDetailAlert()
        return
      }
      this.extraData.editable = val
      this.$emit('edit-change', 'plan', val)
    },
    versionChange() {
      if (this.version !== '') {
        this.queryCarProjectPlanDetail()
      }
    },
    async queryCarProjectPlanDetail() {
      this.loading = true
      const reqData = {
        riseVersionCode: this.version,
        cartypeProId: this.$route.query.id
      }
      const { data } = await fetchCarProjectPlanDetail(reqData).finally(
        () => (this.loading = false)
      )

      this.data = data || []
      this.data.sort((a, b) => (a.years > b.years ? 1 : -1))
    },
    addItem() {
      let lastYear = new Date().getFullYear()
      if (this.data.length > 0) {
        lastYear = this.data[this.data.length - 1].years
      }
      this.data.push({
        years: parseInt(lastYear) + 1,
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

      if (this.data.filter((e) => !e.years).length > 0) {
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

      // 年份不足，补充齐
      const years = this.data.map((e) => parseInt('' + e.years))
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
        cartypeProId: this.$route.query.id,
        outPutPlanList: sortData.map((e) => {
          e.createBy = currentUserId
          e.cartypeProId = this.$route.query.id
          return e
        }),
        riseVersionCode: this.version
      }
      this.loading = true
      saveCarProjectPlanDetail(reqData)
        .then((res) => {
          if (res.result) {
            iMessage.success('保存成功')
            this.toggleEdit(false)
            this.$emit('save-success')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => (this.loading = false))
    },
    addVersion() {
      const nowYear = new Date().getFullYear()
      const newItems = [
        {
          years: nowYear,
          output: 0,
          createBy: this.userId
        }
      ]
      for (let i = 1; i < 10; i++) {
        newItems.push({
          years: nowYear + i,
          output: 0,
          createBy: this.userId
        })
      }
      this.data = newItems
      this.version = ''
      this.toggleEdit(true)
      this.isAddMode = true
    },
    edit() {
      this.originalData = _.cloneDeep(this.data)
      this.isAddMode = false
      this.toggleEdit(true)
    },
    cancel() {
      if (this.isAddMode) {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            if (!this.version) {
              this.data = []
            }
            if (this.version === '') {
              if (this.versions.length > 0 && this.versions[0] !== '') {
                this.version = this.versions[0]
              }
            }
            this.queryCarProjectPlanDetail()
            this.toggleEdit(false)
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
              this.data = this.originalData
              this.toggleEdit(false)
            })
        }
      }
    },
    handleYearChange(scope) {
      const { row, $index } = scope
      console.log('row', row)
      const entYears =
        this.extraData.yearOptions[this.extraData.yearOptions.length - 1]
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
