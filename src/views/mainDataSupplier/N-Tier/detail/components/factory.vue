<!--
 * @Date: 2021-11-23 16:17:58
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 11:23:40
 * @FilePath: \front-site\src\views\register\ntier\components\factory.vue
-->

<template>
  <div class="ntier-factorys">
    <i-card
      tabCard
      collapse
      :title="language('SHENGCAHNGONGCHANGXINXI', '生产工厂信息')"
    >
      <div slot="header-control">
        <iButton v-show="editable" @click="addTableItem">
          {{ language('新增') }}
        </iButton>
        <iButton
          v-show="editable"
          :disabled="selectTableData.length === 0"
          @click="deleteCl()"
        >
          {{ $t('删除') }}
        </iButton>
      </div>

      <el-form
        v-if="editable"
        ref="ruleForm"
        label-width="0px"
        class="edit-form full-table-form factory-table"
        :rules="ruleData.rules"
        :model="ruleData"
      >
        <el-table
          :data="ruleData.data"
          :loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
          />
          <el-table-column
            type="index"
            header-align="center"
            align="center"
            :label="language('序号')"
          />
          <el-table-column
            :label="language('工厂名称')"
            header-align="center"
            align="center"
            prop="factoryName"
            class-name="is-required"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.factoryName'"
                :rules="ruleData.rules.factoryName"
              >
                <iInput size="mini" v-model="scope.row.factoryName" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="language('国家')"
            header-align="center"
            align="center"
            prop="countryCode"
            class-name="is-required"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.countryCode'"
                :rules="ruleData.rules.countryCode"
              >
                <iSelect
                  v-model="scope.row.countryCode"
                  filterable
                  @change="handleLocationChange(scope.row, 'country')"
                  value-key="cityId"
                >
                  <el-option
                    v-for="item in countryList"
                    :key="item.cityId"
                    :label="item.cityNameCn"
                    :value="item.cityId"
                  />
                </iSelect>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="language('省份')"
            header-align="center"
            align="center"
            prop="provinceCode"
            class-name="is-required"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.provinceCode'"
                :rules="
                  scope.row.countryCode === '300001'
                    ? ruleData.rules.provinceCode
                    : null
                "
              >
                <iSelect
                  v-model="scope.row.provinceCode"
                  filterable
                  @change="
                    handleLocationChange(scope.row, 'province', scope.$index)
                  "
                  value-key="cityId"
                >
                  <el-option
                    v-for="item of scope.row.provinceOptions"
                    :key="item.cityId"
                    :label="item.cityNameCn"
                    :value="item.cityId"
                  />
                </iSelect>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            :label="language('城市')"
            header-align="center"
            align="center"
            prop="cityCode"
            class-name="is-required"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.cityCode'"
                :rules="
                  scope.row.countryCode === '300001'
                    ? ruleData.rules.cityCode
                    : null
                "
              >
                <iSelect
                  v-model="scope.row.cityCode"
                  filterable
                  @change="
                    handleLocationChange(scope.row, 'city', scope.$index)
                  "
                >
                  <el-option
                    v-for="item in scope.row.cityOptions"
                    :key="item.cityId"
                    :label="item.cityNameCn"
                    :value="item.cityId"
                  />
                </iSelect>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            :label="language('详细地址')"
            header-align="center"
            align="center"
            prop="address"
            class-name="is-required"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.address'"
                :rules="ruleData.rules.address"
              >
                <iInput size="mini" v-model="scope.row.address" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            :label="language('邮编')"
            header-align="center"
            align="center"
            prop="postCode"
          >
            <template slot-scope="scope">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.postCode'"
                :rules="ruleData.rules.postCode"
              >
                <iInput size="mini" v-model="scope.row.postCode" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            :label="language('占地面积')"
            header-align="center"
            align="center"
            prop="areaCovered"
          >
            <template slot-scope="scope">
              <el-form-item label="">
                <iInput size="mini" v-model="scope.row.areaCovered" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <iTableCustom
        v-else
        :data="tableListData"
        :columns="factoryViewSettings"
      />
    </i-card>
  </div>
</template>

<script>
import { iCard, iButton, iSelect, iMessageBox, iInput } from 'rise'
import { tableTitle, FACTORY_VIEW_SETTINGS } from './data'
import { getCityInfo } from '@/api/dictionary'
import iTableCustom from '@/components/iTableCustom'
export default {
  components: { iCard, iButton, iSelect, iTableCustom, iInput },
  props: {
    tableListData: {
      type: Object,
      default: () => []
    },
    countryList: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ruleData() {
      return {
        data: this.tableListData,
        rules: {
          factoryName: [
            {
              required: true,
              message: '请输入工厂名称',
              trigger: 'blur'
            }
          ],
          countryCode: [
            {
              required: true,
              message: '请选择国家',
              trigger: 'change'
            }
          ],
          provinceCode: [
            { required: true, message: '请选择省份', trigger: 'blur' }
          ],
          cityCode: [
            {
              required: true,
              message: '请选择城市',
              trigger: 'blur'
            }
          ],
          address: [
            {
              required: true,
              message: '请输入详细地址',
              trigger: 'blur'
            }
          ],
          postCode: [
            {
              required: true,
              pattern: /^[A-Za-z0-9]+$/,
              message: '请输入合法的邮编',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      selectProps: ['country', 'province', 'city'],
      selectOthers: ['factoryName', 'postCode', 'areaCovered', 'address'],
      factoryViewSettings: FACTORY_VIEW_SETTINGS
    }
  },
  watch: {
    tableListData(val) {
      if (val && val.length) {
        val.forEach((e) => {
          if (e.countryCode) {
            this.getLocationOptions(e, e.countryCode, 'country')
          }
          if (e.provinceCode) {
            this.getLocationOptions(e, e.provinceCode, 'province')
          }
        })
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    /** 删除列表行 */
    deleteCl() {
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }
      ).then(() => {
        this.tableListData = this.tableListData.filter(
          (e) => this.selectTableData.indexOf(e) === -1
        )
      })
    },
    getLocationName(list, code) {
      if (list && list.length) {
        const items = list.filter((e) => e.cityId === code)
        if (items.length > 0) {
          return items[0].cityNameCn
        }
      }
      return code
    },
    handleLocationChange(row, location) {
      switch (location) {
        case 'country':
          row.country = this.getLocationName(this.countryList, row.countryCode)
          row.province = ''
          row.provinceCode = ''
          row.cityCode = ''
          row.city = ''
          Vue.set(row, 'provinceOptions', [])
          Vue.set(row, 'cityOptions', [])
          this.getLocationOptions(row, row.countryCode, 'country')
          break
        case 'province':
          row.province = this.getLocationName(
            row.provinceOptions,
            row.provinceCode
          )
          row.cityCode = ''
          row.city = ''
          Vue.set(row, 'cityOptions', [])
          this.getLocationOptions(row, row.provinceCode, 'city')
          break
        default:
          row.city = this.getLocationName(row.cityOptions, row.cityCode)
          break
      }
    },
    async getLocationOptions(row, parentId, location) {
      const res = await getCityInfo({ parentCityId: parentId })
      if (location === 'country') {
        Vue.set(row, 'provinceOptions', res.data)
      } else {
        Vue.set(row, 'cityOptions', res.data)
      }
    },
    addTableItem() {
      this.$emit('add')
    }
  }
}
</script>
<style lang="scss" scoped>
.factory-table {
  ::v-deep .el-table__header-wrapper th.is-required > div.cell::after {
    content: '*';
    color: #d00;
  }
}
</style>
