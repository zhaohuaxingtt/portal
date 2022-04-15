<!--
 * @Author: moxuan
 * @Date: 2021-04-21 17:30:36
 * @Description: 分供方
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight" v-if="$route.query.subSupplierType=='GP'">{{ $t('SUPPLIER_ZHUYAOFENGONGFANGMINGCHENGJICHANPIN') }}</span>
      <span class="font18 font-weight" v-else>{{ $t('SUPPLIER_ZHUYAOFENGONGFANGMING') }}</span>
      <div class="floatright">
        <i-button @click="()=>addTableItem({countryList: this.countryList })"
                  v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_SUBSUPPLIERNAME_TABLE_ADD">
          {{ $t('LK_XINZENG') }}
        </i-button>
        <i-button @click="deleteItem('ids', deleteSubSupplierInfos)"
                  v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_SUBSUPPLIERNAME_TABLE_DELETE">
          {{ $t('delete') }}
        </i-button>
        <i-button @click="exportsTable"
                  v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_SUBSUPPLIERNAME_TABLE_EXPORT">
          {{ $t('LK_DAOCHU') }}
        </i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_SUBSUPPLIERANDPRODUCT_SUBSUPPLIERNAME_TABLE" -->
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="inputProps"
                :index="true"
                ref="commonTable"
                border
                >
      <template #country="scope">
        <iSelect v-model="scope.row.country"
                 @change="handleLocationChange($event,scope.row, 'country')"
                 value-key="cityId">
          <el-option v-for="item of getSelectList('country',scope.row)"
                     :key="item.cityId"
                     :label="item.cityNameCn"
                     :value="item" />
        </iSelect>
      </template>
      <template #province="scope">
        <iSelect v-model="scope.row.province"
                 @change="handleLocationChange($event,scope.row, 'province')"
                 value-key="cityId">
          <el-option v-for="item of getSelectList('province',scope.row)"
                     :key="item.cityId"
                     :label="item.cityNameCn"
                     :value="item" />
        </iSelect>
      </template>
      <template #city="scope">
        <iSelect v-model="scope.row.city"
                 value-key="cityId">
          <el-option v-for="item of getSelectList('city',scope.row)"
                     :key="item.cityId"
                     :label="item.cityNameCn"
                     :value="item" />
        </iSelect>
      </template>
    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton, iSelect, iMessage } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { subSupplierTableTitle } from './data'
import {
  getSupplierProduct,
  saveSubSupplierInfos,
  deleteSubSupplierInfos
} from '../../../../api/register/mainSubSuppliersAndProductNames'
import { getCityInfo } from '../../../../api/dictionary'
import { cloneDeep } from 'lodash'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    iSelect,
    tableList
  },
  data () {
    return {
      tableListData: [],
      tableTitle: subSupplierTableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      countryList: [],
      selectProps: ['country', 'province', 'city']
    }
  },
  created () {
    this.setInputProps()
    this.getTableList()
  },
  methods: {
    deleteSubSupplierInfos,
    setInputProps () {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    async getTableList () {
      this.tableLoading = true
      try {
        const req = {
          pageNo: 1,
          pageSize: 9999,
          step: 'submit'
        }
        await this.getCountryInfo()
        const res = await getSupplierProduct(req)
        this.tableListData = res.data
        if (this.tableListData.length !== 0) {
          this.tableListData = this.tableListData.map(item => {
            item.countryList = this.countryList
            return item
          })
        }
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    saveInfos (step = '') {
      return new Promise((resolve, reject) => {
        this.$refs.commonTable.$refs.commonTableForm.validate(async (valid) => {
          if (valid) {
            this.tableLoading = true
            const reqTableList = cloneDeep(this.tableListData)
            reqTableList.map(item => {
              item['country'] = item.country.cityNameCn ? item.country.cityNameCn : item.country
              item['province'] = item.province.cityNameCn ? item.province.cityNameCn : item.province
              item['city'] = item.city.cityNameCn ? item.city.cityNameCn : item.city
              return item
            })
            for (const iten of reqTableList) {
              if (iten.country === '中国') {
                if (!iten.province || !iten.city) {
                  iMessage.error(this.language('SHENGFENCHENGSHIBUNENGWEIKONG', '省份、城市不能为空！'))
                  this.tableLoading = false
                  return
                }
              }
            }
            const req = {
              saveSubSupplierDTOList: reqTableList,
              step: 'submit'
            }
            if (step !== '') {
              req.step = step
            }
            const res = await saveSubSupplierInfos(req)
            res.moduleName = this.$t('SUPPLIER_ZHUYAOFENGONGFANGMING')
            await this.resultMessage(res, () => {
              this.getTableList()
              resolve(true)
            }, () => {
              this.tableLoading = false
              reject(false)
            })
          } else {
            return false
          }
        })
      })
    },
    async handleNextStep () {
      return await this.saveInfos()
    },
    async getCountryInfo () {
      const req = {
        parentCityId: -1,
        cityName: ''
      }
      const res = await getCityInfo(req)
      this.countryList = res.data
    },
    handleLocationChange (data, row, location) {
      switch (location) {
        case 'country':
          this.tableTitle.forEach((item) => {
            if (item.props === 'province' || item.props === 'city' || item.props === 'socialcreditNo') {
              if (data.sapLocationCode !== 'CN') {
                this.$set(item, 'required', false)
                this.$set(item, 'rule', [])
                this.$refs.commonTable.$refs.commonTableForm.clearValidate(['socialcreditNo'])
              } else {
                this.$set(item, 'required', true)
                this.$set(item, 'rule', [
                  { required: true, message: '请选择', trigger: 'change' }
                ])
              }
            }
          })
          this.getLocationInfo(data.cityId, row.id, row.time, 'provinceList')
          this.setLocationEmpty(row.id, row.time, 'province')
          this.setLocationEmpty(row.id, row.time, 'city')
          this.setLocationEmpty(row.id, row.time, 'cityList')
          break
        case 'province':
          this.getLocationInfo(data.cityId, row.id, row.time, 'cityList')
          this.setLocationEmpty(row.id, row.time, 'city')
          break
      }
    },
    async getLocationInfo (cityId, id, time, locationList) {
      const req = {
        parentCityId: cityId,
        cityName: ''
      }
      const res = await getCityInfo(req)
      this.tableListData = this.tableListData.map(item => {
        if (item.id) {
          this.tableListData.map(item => {
            if (item.id === id) {
              item[locationList] = res.data
            }
          })
        }
        if (item.time) {
          this.tableListData.map(item => {
            if (item.time === time) {
              item[locationList] = res.data
            }
          })
        }
        return item
      })
    },
    getSelectList (params, row) {
      let list = []
      if (this.tableListData.length !== 0) {
        switch (params) {
          case 'country':
            if (row.id) {
              this.tableListData.map(item => {
                if (item.id === row.id) {
                  list = item.countryList
                }
              })
            }
            if (row.time) {
              this.tableListData.map(item => {
                if (item.time === row.time) {
                  list = item.countryList
                }
              })
            }
            break
          case 'province':
            if (row.id) {
              this.tableListData.map(item => {
                if (item.id === row.id) {
                  list = item.provinceList
                }
              })
            }
            if (row.time) {
              this.tableListData.map(item => {
                if (item.time === row.time) {
                  list = item.provinceList
                }
              })
            }
            break
          case 'city':
            if (row.id) {
              this.tableListData.map(item => {
                if (item.id === row.id) {
                  list = item.cityList
                }
              })
            }
            if (row.time) {
              this.tableListData.map(item => {
                if (item.time === row.time) {
                  list = item.cityList
                }
              })
            }
            break
        }
      }
      return list
    },
    setLocationEmpty (id, time, location) {
      if (id) {
        this.tableListData.map(item => {
          if (item.id === id) {
            item[location] = ''
          }
        })
      }
      if (time) {
        this.tableListData.map(item => {
          if (item.time === time) {
            item[location] = ''
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
