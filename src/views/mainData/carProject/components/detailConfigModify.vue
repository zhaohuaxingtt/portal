<template>
  <div class="detail-config-modify">
    <pageHeader>
      <el-form inline>
        <el-form-item :label="language('版本号')" v-if="configVersions.length > 0">
          <iSelect
            v-model="searchData.riseVersionCode"
            @change="configVersionChange"
            :placeholder="language('请选择')"
          >
            <el-option
              v-for="item in configVersions"
              :key="item.riseVersionCode"
              :value="item.riseVersionCode"
              :label="item.riseVersionCode"
            />
          </iSelect>
        </el-form-item>
      </el-form>

      <div slot="actions" ref="detailPanel" id="detailPanel">
        <div class="flex-end-center margin-bottom20">
          <iButton v-show="editable" :disabled="loading" @click="add">
            {{language('新增配置')}}
          </iButton>
          <iButton v-show="!editable" :disabled="loading" @click="edit">
            {{language('编辑')}}
          </iButton>
          <iButton v-show="editable" :disabled="loading" @click="save">
            {{language('保存')}}
          </iButton>
          <iButton v-show="editable" :disabled="loading" @click="cancel">
            {{language('取消')}}
          </iButton>
        </div>
      </div>
    </pageHeader>
    <div v-show="!editable">
      <detailConfigModifyView
        :loading="loading"
        :data="tableData"
        :extra-data="extraData"
        :cartype-levels="cartypeLevels"
        @remove="handelDeleteRow"
      />
    </div>
    <div v-show="editable">
      <detailConfigModifyEdit
        :loading="loading"
        :data="tableData"
        :extra-data="extraData"
        :cartype-levels="cartypeLevels"
        ref="editTable"
        @remove="handelDeleteRow"
      />
    </div>
  </div>
</template>

<script>
import { iButton, iSelect, iMessage } from 'rise'
import pageHeader from '@/components/pageHeader'
import detailConfigModifyView from './detailConfigModifyView'
import detailConfigModifyEdit from './detailConfigModifyEdit'
import { CAR_PROJECT_CONFIG_EDIT_ROW } from './data'
import {
  fetchEngineSelectData,
  fetchBoxSelectData,
  fetchBatterySelectData
} from '@/api/mainData/car'
import {
  saveOrupdCarTypeProConfig,
  fetchCartypeProConfigList,
  fetchCarTypeLevelSelect
} from '@/api/mainData/carProject'
import { arrayToMap } from '@/utils'
import { getYearOptions } from '@/views/mainData/util'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailConfigModify',
  mixins: [mixin],
  components: {
    iButton,
    pageHeader,
    iSelect,
    detailConfigModifyView,
    detailConfigModifyEdit
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    versionListStatus: {
      type: Boolean,
      default: false
    },
    configVersions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    isEditPage() {
      return this.searchData.riseVersionCode
    },
    editable() {
      return this.extraData.editable
    },
    yearOptions() {
      const years = getYearOptions()
      years.unshift('全部')
      return years
    },
    scrollData() {
      return this.$store.state.mainData.mainDataCarScrollData
    }
  },
  watch: {
    configVersions(val) {
      if (val.length > 0) {
        let validArray = val.filter((item) => {
          return item.isValid
        })
        this.searchData.riseVersionCode = validArray[0].riseVersionCode //val[0].riseVersionCode
        this.queryCartypeConfigList()
      }
    },
    data(val) {
      this.tableData = val
      this.edit()
    },
    scrollData(val) {
      this.handleViewConfigDetail(val)
    },
    allSelectedYears() {
      const res = []
      this.tableData.forEach((e) => {
        if (e.years) {
          res.push(e.years)
        }
      })
    }
  },
  data() {
    return {
      loading: false,
      selectedRows: [],
      tableData: [],
      extraData: {
        editable: false,
        engineSelectOptions: [],
        engineSelectMap: {},
        boxSelectOptions: [],
        boxSelectMap: {},
        batterySelectOptions: [],
        batterySelectMap: {},
        cartypeConfigLevelOptions: [],
        deleteRow: this.handelDeleteRow
      },
      setYearVisible: false,
      searchData: {
        riseVersionCode: '',
        year: '全部'
      },
      cartypeLevels: [],
      originalData: []
    }
  },
  created() {
    this.queryEngineSelectData()
    this.queryBoxSelectData()
    this.queryBatterySelectData()
    this.querySelectDicts()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    edit() {
      this.originalData = _.cloneDeep(this.tableData)
      if (this.versionListStatus) {
        //请先保存配置列表，再编辑版本列表
        this.editConfigDetailAlert()
        return
      }
      this.extraData.editable = true
      this.$emit('edit-change', 'config', true)
    },
    cancel() {
      if (_.isEqual(this.tableData, this.originalData)) {
        this.cancelAction()
      } else {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.cancelAction()
            this.$emit('reset', this.originalData)
          })
      }
    },
    cancelAction() {
      this.extraData.editable = false
      this.queryCartypeConfigList()
      this.$emit('edit-change', 'config', false)
    },
    add() {
      if (!this.extraData.editable) {
        this.edit()
      }
      this.tableData.push({
        ...CAR_PROJECT_CONFIG_EDIT_ROW,
        createBy: this.$store.state.permission.userInfo.id,
        riseVersionCode: this.searchData.riseVersionCode,
        cartypeId: this.$route.query.id
      })
    },
    async save() {
      if (!this.$refs.editTable.validateForm()) {
        return
      }
      // 检查是不是超出100%
      let totalRate = 0
      this.tableData.forEach((e) => {
        totalRate += parseFloat(e.cartypeLevelRate)
      })

      if (totalRate > 100) {
        iMessage.error('配置比例总数不能超过100%')
        return
      }

      const detailDtos = this.tableData.map((e) => {
        const cartypeLevelRate = e.cartypeLevelRate
          ? parseFloat((e.cartypeLevelRate / 100).toFixed(6))
          : 0
        return { ...e, cartypeLevelRate: cartypeLevelRate }
      })

      this.loading = true

      const reqData = {
        cartypeProId: this.$route.query.id,
        detailDtos: detailDtos,
        createBy: this.$store.state.permission.userInfo.id,
        riseVersionCode: this.searchData.riseVersionCode
      }
      await saveOrupdCarTypeProConfig(reqData)
        .then((res) => {
          if (res.result) {
            iMessage.success('保存成功')
            this.cancelAction()
            this.$emit('save-success')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((error) => {
          iMessage.error(error.desZh)
        })
        .finally(() => (this.loading = false))
    },
    handelDeleteRow(index) {
      this.onDelete().then(() => {
        this.tableData.splice(index, 1)
      })
    },
    configVersionChange() {
      this.queryCartypeConfigList()
    },
    yearChange() {
      this.queryCartypeConfigList()
    },
    // 变速箱下拉查询数据接口
    async queryEngineSelectData() {
      const { data } = await fetchEngineSelectData({ type: 2 })
      Object.assign(
        this.extraData,
        { engineSelectOptions: data },
        { engineSelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 变速箱下拉查询数据接口
    async queryBoxSelectData() {
      const { data } = await fetchBoxSelectData({ type: 2 })
      Object.assign(
        this.extraData,
        { boxSelectOptions: data },
        { boxSelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 电池电量下拉
    async queryBatterySelectData() {
      const { data } = await fetchBatterySelectData({ type: 2 })
      Object.assign(
        this.extraData,
        { batterySelectOptions: data },
        { batterySelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 数据字典下拉，车型等级
    async querySelectDicts() {
      /* const req = ['cartype_config_level']
      const { data } = await fetchSelectDicts(req)
      const { cartype_config_level } = data */
      const { data } = await fetchCarTypeLevelSelect()
      Object.assign(
        this.extraData,
        {
          cartypeConfigLevelOptions: data
        },
        {
          cartypeConfigLevelMap: arrayToMap(data, 'id', 'name')
        }
      )
    },
    // 详情列表
    async queryCartypeConfigList() {
      if (this.searchData.riseVersionCode) {
        this.loading = true
        const reqData = {
          cartypeProId: this.$route.query.id,
          riseVersionCode: this.searchData.riseVersionCode
        }
        const { data } = await fetchCartypeProConfigList(reqData).finally(
          () => (this.loading = false)
        )
        this.tableData = data || []

        // 转化为百分比
        this.tableData.forEach((e) => {
          if (e.cartypeLevelRate) {
            e.cartypeLevelRate = parseFloat(e.cartypeLevelRate * 100).toFixed(6)
          }
        })

        const cartypeLevels = []
        this.tableData.forEach((e) => {
          if (e.cartypeLevel) {
            cartypeLevels.push(e.cartypeLevel)
          }
        })
        this.cartypeLevels = [...new Set(cartypeLevels)]
        return true
      }
      return true
    },
    // 产量计划点击详情过来
    handleViewConfigDetail(val) {
      const validVersion = this.configVersions.filter((e) => e.isValid)
      if (validVersion.length > 0) {
        this.searchData.riseVersionCode = validVersion[0].riseVersionCode
      }
      this.searchData.year = val.years
      this.queryCartypeConfigList().then(() => {})

      document.querySelector('.routerpage').scrollTo({
        top: this.$refs.detailPanel.offsetTop,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
