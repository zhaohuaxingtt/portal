<!--
 * @Date: 2021-11-23 16:17:58
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 11:23:40
 * @FilePath: \front-site\src\views\register\ntier\components\factory.vue
-->

<template>
  <div>
    <i-card>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{
        language('SHENGCAHNGONGCHANGXINXI', '生产工厂信息')
      }}</span>
        <div class="floatright">
          <i-button @click="()=>addTableItem({countryList: this.countryList })">{{ $t('LK_XINZENG') }}
          </i-button>
          <i-button @click="deleteCl()">
            {{ $t('delete') }}
          </i-button>
          <i-button @click="exportsTable">
            {{ $t('LK_DAOCHU') }}
          </i-button>
        </div>
      </div>
      <table-list :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  @handleSelectionChange="handleSelectionChange"
                  :input-props="['factoryName', 'postCode', 'areaCovered','address']"
                  :index="true"
                  ref="commonTable">
        <template #country="scope">
          <iSelect v-model="scope.row.country"
                   filterable
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
                   filterable
                   @change="handleLocationChange($event,scope.row, 'province',scope.$index)"
                   value-key="cityId">
            <el-option v-for="item of getSelectList('province',scope.row)"
                       :key="item.cityId"
                       :label="item.cityNameCn"
                       :value="item" />
          </iSelect>
        </template>
        <template #city="scope">
          <iSelect v-model="scope.row.city"
                   filterable
                   value-key="cityId">
            <el-option v-for="item of getSelectList('city',scope.row)"
                       :key="item.cityId"
                       :label="item.cityNameCn"
                       :value="item" />
          </iSelect>
        </template>

      </table-list>
    </i-card>
  </div>
</template>

<script>
import { iCard, iButton, iSelect, iMessageBox } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { getCityInfo } from '@/api/dictionary'
export default {
  mixins: [generalPageMixins],
  components: { iCard, iButton, iSelect, tableList },
  props: {
    tableListData: {
      type: Object,
      default: () => []
    },
    countryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      selectProps: ['country', 'province', 'city'],
      selectOthers: ['factoryName', 'postCode', 'areaCovered', 'address']
    }
  },
  watch: {},
  created() {
    console.log(this.countryList)
  },
  methods: {
    /** 删除列表行 */
    deleteCl() {
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }
      ).then(async () => {
        this.selectTableData.map((v) => {
          this.tableListData.map((val, index) => {
            if (val == v) {
              this.tableListData.splice(index, 1)
            }
          })
        })
      })
    },
    getSelectList(params, row) {
      let list = []
      if (this.tableListData.length !== 0) {
        switch (params) {
          case 'country':
            if (row.id) {
              this.tableListData.map((item) => {
                if (item.id === row.id) {
                  list = item.countryList
                }
              })
            }
            if (row.time) {
              this.tableListData.map((item) => {
                if (item.time === row.time) {
                  list = item.countryList
                }
              })
            }
            break
          case 'province':
            if (row.id) {
              this.tableListData.map((item) => {
                if (item.id === row.id) {
                  list = item.provinceList
                }
              })
            }
            if (row.time) {
              this.tableListData.map((item) => {
                if (item.time === row.time) {
                  list = item.provinceList
                }
              })
            }
            break
          case 'city':
            if (row.id) {
              this.tableListData.map((item) => {
                if (item.id === row.id) {
                  list = item.cityList
                }
              })
            }
            if (row.time) {
              this.tableListData.map((item) => {
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
    handleLocationChange(data, row, location) {
      switch (location) {
        case 'country':
          this.getLocationInfo(data.cityId, row.id, row.time, 'provinceList')
          this.setLocationEmpty(row.id, row.time, 'province')
          this.setLocationEmpty(row.id, row.time, 'city')
          this.setLocationEmpty(row.id, row.time, 'cityList')

          // this.tableListData[index].countryCode=this.tableListData[index].country.cityId
          //   v.countryCode=v.country.cityId
          //   v.country=v.country.cityNameCn
          break
        case 'province':
          this.getLocationInfo(data.cityId, row.id, row.time, 'cityList')
          this.setLocationEmpty(row.id, row.time, 'city')
          break
      }
    },

    async getLocationInfo(cityId, id, time, locationList) {
      const req = {
        parentCityId: cityId,
        cityName: ''
      }
      const res = await getCityInfo(req)
      this.tableListData = this.tableListData.map((item) => {
        if (item.id) {
          this.tableListData.map((item) => {
            if (item.id === id) {
              item[locationList] = res.data
            }
          })
        }
        if (item.time) {
          this.tableListData.map((item) => {
            if (item.time === time) {
              item[locationList] = res.data
            }
          })
        }
        return item
      })
    },
    setLocationEmpty(id, time, location) {
      if (id) {
        this.tableListData.map((item) => {
          if (item.id === id) {
            item[location] = ''
          }
        })
      }
      if (time) {
        this.tableListData.map((item) => {
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
