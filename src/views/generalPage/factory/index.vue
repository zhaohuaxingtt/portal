<!--
* @author:shujie
* @Date: 2021-4-13 17:23:55
* @Description: 工厂信息
 -->
<template>
  <div>
    <baseInfo ref="basic" v-if="supplierType>3" class="margin-bottom20"></baseInfo>
    <i-card>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <i-button @click="saveInfos('')" v-if="supplierType>3">{{ $t('LK_BAOCUN') }}</i-button>
          <i-button v-permission="SUPPLIER_FACTORY_TABLE_ADD"
                    @click="()=>addTableItem({countryList: this.countryList })">{{ $t('LK_XINZENG') }}
          </i-button>
          <i-button v-permission="SUPPLIER_FACTORY_TABLE_DELETE" @click="deleteItem('ids', deleteFactory)">
            {{ $t('delete') }}
          </i-button>
          <i-button v-permission="SUPPLIER_FACTORY_TABLE_EXPORT" @click="exportsTable" v-if="showExportsButton">
            {{ $t('LK_DAOCHU') }}
          </i-button>
        </div>
      </div>
      <table-list v-permission="SUPPLIER_FACTORY_TABLE"
                  :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  @handleSelectionChange="handleSelectionChange"
                  :input-props="inputProps"
                  :index="true"
                  ref="commonTable"
      >
        <template #country="scope">
          <iSelect v-model="scope.row.country" @change="handleLocationChange($event,scope.row, 'country')"
                   value-key="cityId">
            <el-option v-for="item of getSelectList('country',scope.row)" :key="item.cityId" :label="item.cityNameCn"
                       :value="item"/>
          </iSelect>
        </template>
        <template #province="scope">
          <iSelect v-model="scope.row.province" @change="handleLocationChange($event,scope.row, 'province')"
                   value-key="cityId">
            <el-option v-for="item of getSelectList('province',scope.row)" :key="item.cityId" :label="item.cityNameCn"
                       :value="item"/>
          </iSelect>
        </template>
        <template #city="scope">
          <iSelect v-model="scope.row.city" value-key="cityId">
            <el-option v-for="item of getSelectList('city',scope.row)" :key="item.cityId" :label="item.cityNameCn"
                       :value="item"/>
          </iSelect>
        </template>
        <template #isNominate="scope">
          <iSelect v-model="scope.row.isNominate" v-if="isSupplierViewDetail">
            <el-option label="是" :value="true"/>
            <el-option label="否" :value="false"/>
          </iSelect>
          <span v-else>{{ handleIsNominateText(scope.row.isNominate) }}</span>
        </template>
        <template #effectFlag="scope">
          <iSelect v-model="scope.row.effectFlag" v-if="isSupplierViewDetail">
            <el-option label="无效" :value="0"/>
            <el-option label="有效" :value="1"/>
          </iSelect>
          <span v-else>{{ handleEffectFlagText(scope.row.effectFlag) }}</span>
        </template>
      </table-list>
    </i-card>
  </div>
</template>

<script>
import {iCard, iButton, iSelect} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import tableList from '@/components/commonTable';
import {tableTitle} from './data';
import {getFactory, saveFactory, deleteFactory} from '@/api/register/factory';
import {getCityInfo} from '@/api/dictionary';
import {cloneDeep} from 'lodash';
import baseInfo from "../components/baseInfoCard";

export default {
  mixins: [generalPageMixins],
  components: {iCard, iButton, iSelect, tableList, baseInfo},
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      countryList: [],
      selectProps: ['country', 'province', 'city'],
      selectOthers: ['isNominate', 'effectFlag', 'factoryCode']
    }
  },
  created() {
    this.setInputProps()
    this.getTableList()
  },
  methods: {
    deleteFactory,
    setInputProps() {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props) && !this.selectOthers.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    async getTableList() {
      this.tableLoading = true
      await this.getCountryInfo()
      let req = {
        step: 'register'
      }
      if (this.supplierType > 3) {
        req.step = 'submit'
      }
      getFactory(req, this.supplierType).then(res => {
        if (res.data) {
          this.tableListData = res.data
          if (this.tableListData.length !== 0) {
            this.tableListData = this.tableListData.map(item => {
              item.countryList = this.countryList
              return item
            })
          }
        }
        this.tableLoading = false
      })
    },
    async saveInfos(step = '') {
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
            const req = {
              saveSupplierPlantDTOList: reqTableList,
              step: 'register',
              supplierToken: this.$store.state.home.valiCode
            }
            if (this.supplierType > 3) {
              req.step = 'submit'
            }
            if (step !== '') {
              req.step = step
            }
            const res = await saveFactory(req, this.supplierType)
            this.resultMessage(res, () => {
              this.nextStep = true
              this.getTableList()
              resolve(true)
            }, () => {
              this.tableLoading = false
              this.nextStep = false
              reject(false)
            })
          } else {
            this.tableLoading = false
            return false
          }
        })
      })
    },
    async handleNextStep() {
      await this.saveInfos()
      return this.nextStep
    },
    async getCountryInfo() {
      const req = {
        parentCityId: -1,
        cityName: ''
      }
      const res = await getCityInfo(req)
      this.countryList = res.data
    },
    handleLocationChange(data, row, location) {
      switch (location) {
        case 'country':
          this.getLocationInfo(data.cityId, row.id, row.time, 'provinceList')
          this.setLocationEmpty(row.id, row.time, 'province')
          this.setLocationEmpty(row.id, row.time, 'city')
          this.setLocationEmpty(row.id, row.time, 'cityList')
          break;
        case 'province':
          this.getLocationInfo(data.cityId, row.id, row.time, 'cityList')
          this.setLocationEmpty(row.id, row.time, 'city')
          break;
      }
    },
    async getLocationInfo(cityId, id, time, locationList) {
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
    getSelectList(params, row) {
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
            break;
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
            break;
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
            break;
        }
      }
      return list
    },
    setLocationEmpty(id, time, location) {
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
    },
    handleEffectFlagText(val) {
      if (val === 0) {
        return '无效'
      } else if (val === 1) {
        return '有效'
      } else {
        return ''
      }
    },
    handleIsNominateText(val) {
      if (val === true) {
        return '是'
      } else if (val === false) {
        return '否'
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>

</style>
