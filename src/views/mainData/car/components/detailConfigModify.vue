<template>
  <div class="detail-config-modify">
    <pageHeader>
      <el-form inline>
        <el-form-item :label="$t('版本号')" v-if="configVersions.length > 0">
          <iSelect
            v-model="searchData.riseVersionCode"
            @change="configVersionChange"
          >
            <el-option
              v-for="item in configVersions"
              :key="item.riseVersionCode"
              :value="item.riseVersionCode"
              :label="item.riseVersionCode"
            />
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('年份')" v-if="configVersions.length > 0">
          <iSelect v-model="searchData.year" @change="yearChange">
            <el-option
              v-for="item in yearOptions"
              :key="item"
              :value="item"
              :label="item"
            />
          </iSelect>
        </el-form-item>
      </el-form>

      <div slot="actions" ref="detailPanel" id="detailPanel">
        <div class="flex-end-center margin-bottom20">
          <iButton v-show="editable" :disabled="loading" @click="add">
            {{ $t('新增配置') }}
          </iButton>
          <iButton
            v-show="isEditPage && !editable"
            :disabled="loading"
            @click="setYearVisible = true"
          >
            {{ $t('应用年份') }}
          </iButton>
          <iButton v-show="!editable" :disabled="loading" @click="edit">
            {{ $t('编辑') }}
          </iButton>
          <iButton v-show="editable" :disabled="loading" @click="save">
            {{ $t('保存') }}
          </iButton>
          <iButton v-show="editable" :disabled="loading" @click="cancel">
            {{ $t('取消') }}
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

    <detailConfigModifySetYear
      v-if="setYearVisible"
      :rise-version-code="searchData.riseVersionCode"
      @close="setYearVisible = false"
    />
  </div>
</template>

<script>
import { iButton, iSelect, iMessage } from 'rise'
import pageHeader from '@/components/pageHeader'
import detailConfigModifySetYear from './detailConfigModifySetYear'
import detailConfigModifyView from './detailConfigModifyView'
import detailConfigModifyEdit from './detailConfigModifyEdit'
import { CAR_CONFIG_EDIT_ROW } from './data'
import {
  fetchEngineSelectData,
  fetchBoxSelectData,
  fetchBatterySelectData,
  fetchCartypeConfigList,
  saveOrUpdCartypeConfig
} from '@/api/mainData/car'
import { arrayToMap } from '@/utils'
import { fetchSelectDicts } from '@/api/baseInfo'
import { getYearOptions } from '@/views/mainData/util'
import mixin from '@/views/mainData/mixin'
export default {
  name: 'detailConfigModify',
  mixins: [mixin],
  components: {
    iButton,
    pageHeader,
    iSelect,
    detailConfigModifySetYear,
    detailConfigModifyView,
    detailConfigModifyEdit
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    configVersions: {
      type: Array,
      default: function() {
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
    configVersions() {
      this.getSearchRiseVersionCode()
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
      this.tableData.forEach(e => {
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
    this.getSearchRiseVersionCode()
  },
  methods: {
    getSearchRiseVersionCode() {
      if (this.configVersions.length > 0) {
        const effectVersion = this.configVersions.filter(e => e.isValid)
        this.searchData.riseVersionCode =
          effectVersion.length > 0
            ? effectVersion[0].riseVersionCode
            : this.configVersions[0].riseVersionCode
        this.queryCartypeConfigList()
      }
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    edit() {
      this.originalData = _.cloneDeep(this.tableData)
      if (this.$store.state.mainData.mainDataConfigEditMode === 'version') {
        this.editConfigDetailAlert()
      } else {
        this.$store.dispatch('setMainDataConfigEditMode', 'detail')
        this.extraData.editable = true
      }
    },
    cancel() {
      if (_.isEqual(this.tableData, this.originalData)) {
        this.$store.dispatch('setMainDataConfigEditMode', '')
        this.extraData.editable = false
      } else {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.$store.dispatch('setMainDataConfigEditMode', '')
            this.extraData.editable = false
            this.tableData = this.originalData
          })
      }
    },
    add() {
      if (!this.extraData.editable) {
        this.edit()
      }
      this.tableData.push({
        ...CAR_CONFIG_EDIT_ROW,
        createBy: this.$store.state.permission.userInfo.id,
        riseVersionCode: this.searchData.riseVersionCode,
        cartypeId: this.$route.query.id
      })
    },
    async save() {
      console.log(this.$refs.editTable.validateForm())
      const formValide = this.$refs.editTable.validateForm()
      if (!formValide) {
        return false
      }
      // 检查是不是超出100%
      let totalRate = 0
      this.tableData.forEach(e => {
        totalRate += parseFloat(e.cartypeLevelRate)
      })

      if (totalRate > 100) {
        iMessage.error('配置比例总数不能超过100%')
        return
      }

      const detailDtos = this.tableData.map(e => {
        const cartypeLevelRate = e.cartypeLevelRate
          ? parseFloat((e.cartypeLevelRate / 100).toFixed(4))
          : 0
        return { ...e, cartypeLevelRate: cartypeLevelRate }
      })

      this.loading = true

      const reqData = {
        cartypeId: this.$route.query.id,
        detailDtos: detailDtos,
        createBy: this.$store.state.permission.userInfo.id,
        riseVersionCode: this.searchData.riseVersionCode
      }
      await saveOrUpdCartypeConfig(reqData)
        .then(res => {
          if (res.result) {
            iMessage.success('保存成功')
            this.$store.dispatch('setMainDataConfigEditMode', '')
            this.extraData.editable = false
            this.$emit('save-success')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch(error => {
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
      const { data } = await fetchEngineSelectData({ type: 1 })
      Object.assign(
        this.extraData,
        { engineSelectOptions: data },
        { engineSelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 变速箱下拉查询数据接口
    async queryBoxSelectData() {
      const { data } = await fetchBoxSelectData({ type: 1 })
      Object.assign(
        this.extraData,
        { boxSelectOptions: data },
        { boxSelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 电池电量下拉
    async queryBatterySelectData() {
      const { data } = await fetchBatterySelectData({ type: 1 })
      Object.assign(
        this.extraData,
        { batterySelectOptions: data },
        { batterySelectMap: arrayToMap(data, 'id', 'name') }
      )
    },
    // 数据字典下拉，车型等级
    async querySelectDicts() {
      const req = ['cartype_config_level']
      const { data } = await fetchSelectDicts(req)
      const { cartype_config_level } = data
      Object.assign(
        this.extraData,
        {
          cartypeConfigLevelOptions: cartype_config_level
        },
        {
          cartypeConfigLevelMap: arrayToMap(cartype_config_level, 'id', 'name')
        }
      )
    },
    // 详情列表
    async queryCartypeConfigList() {
      if (this.searchData.riseVersionCode) {
        this.loading = true
        const reqData = {
          cartypeId: this.$route.query.id,
          riseVersionCode: this.searchData.riseVersionCode
        }
        if (this.searchData.year !== '全部' && this.searchData.year !== '') {
          reqData.userYear = this.searchData.year
        }
        const { data } = await fetchCartypeConfigList(reqData).finally(
          () => (this.loading = false)
        )
        this.tableData = data || []

        // 转化为百分比
        this.tableData.forEach(e => {
          if (e.cartypeLevelRate) {
            e.cartypeLevelRate = parseFloat(e.cartypeLevelRate * 100).toFixed(2)
          }
        })

        const cartypeLevels = []
        this.tableData.forEach(e => {
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
      if (val.fixRatioRiseVersionCode) {
        this.searchData.riseVersionCode = val.fixRatioRiseVersionCode
      } else {
        const validVersion = this.configVersions.filter(e => e.isValid)
        if (validVersion.length > 0) {
          this.searchData.riseVersionCode = validVersion[0].riseVersionCode
        }
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
