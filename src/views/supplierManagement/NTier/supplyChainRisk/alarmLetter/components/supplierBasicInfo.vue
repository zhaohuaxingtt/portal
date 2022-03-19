<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2022-03-09 17:33:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <el-form label-position="left"
             label-width="100px"
             ref="ruleForm">
      <el-row :gutter="20">
        <el-col :span='6'>
          <el-form-item :label="language('GONGYINGSHANGDAIMA','供应商代码')">
            <iInput disabled
                    v-model="baseInfo.sapCode"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item :label="language('GONGYINGSHANGMINGCHEN','供应商名称')">
            <iInput disabled
                    v-model="baseInfo.supplierName"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item :label="language('TIANBIAOREN','填表人')"
                        prop="fillingUserName">
            <iInput disabled
                    v-model="baseInfo.fillingUserName"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item :label="language('ZHIWU','职务')"
                        prop="fillingUserPost">
            <iInput disabled
                    v-model="baseInfo.fillingUserPost"></iInput>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col :span='6'>
          <el-form-item :label="language('DIANHUA','电话')"
                        prop="fillingUserPhone">
            <iInput disabled
                    v-model="baseInfo.fillingUserPhone"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item :label="language('DIANZIYOUXIANG','电子邮箱')"
                        prop="fillingUserEmail">
            <iInput disabled
                    v-model="baseInfo.fillingUserEmail"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span='10'>
          <el-form-item label-width="200px"
                        :label="language('SHIFOUZAISHANGQIDAZONGZOUBIANJIANLIZHONGZHUANKU','是否在上汽大众周边建立中转库')"
                        prop="isTurnoverStore">
            <iInput style="width:200px"
                    v-model="baseInfo.isTurnoverStore"></iInput>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <div class="supplierAddress">
      <span class="title">{{language('GONGYINGSHANGSHENGCHANDIZHI','供应商生产地址')}}</span>
      <div v-show="!downLoadFlag">
        <iButton @click="del">{{language('SHANCHU','删除')}}</iButton>
        <iButton @click="add">{{language('XINZENG','新增')}}</iButton>
      </div>
    </div>
    <div style="margin-top:20px">
      <el-table :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="65">
        </el-table-column>
        <el-table-column :label="language('GONGCHANGMINGCHEN','工厂名称')"
                         prop="factoryName"
                         min-width="180">
          <template slot-scope="scope">
            <iSelect v-if="editMode"
                     filterable
                     @change="getFactoryChange($event,scope.$index)"
                     v-model="scope.row.factoryName">
              <el-option v-for="item in factoryList"
                         :key="item.factoryName"
                         :label="item.factoryName"
                         :value="item.factoryName">
              </el-option>
            </iSelect>
            <!-- <iInput v-model="scope.row.factoryName"
                    v-if="editMode"></iInput> -->
            <span v-else> {{scope.row.factoryName}}</span>
          </template>

          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          close-event="blur"
                          v-model="row.factoryName">
            <span slot="content">{{row.factoryName}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('SUOZAIDIQU','所在地区')"
                         prop="cityList"
                         min-width="180">
          <template slot-scope="scope">
            <!-- <el-cascader v-model="scope.row.cityList"
                         :options="cityOptions"
                         v-if="editMode"></el-cascader> -->
            <span> {{scope.row.city&&scope.row.country&&scope.row.province?scope.row.city+'/'+scope.row.country+'/'+scope.row.province:''}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          editableComponent="el-cascader"
                          :can-edit="editModeEnabled"
                          :cityOptions="cityOptions"
                          close-event="change"
                          v-model="row.cityList">
            <span slot="content">{{row.city&&row.country&&row.province?row.city+'/'+row.country+'/'+row.province:''}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('XIANGXIDIZHI','详细地址')"
                         prop="addressDetail"
                         min-width="180">
          <template slot-scope="scope">
            <!-- <iInput disabled
                    v-model="scope.row.addressDetail"
                    v-if="editMode"></iInput> -->
            <span> {{scope.row.addressDetail}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          close-event="blur"
                          v-model="row.addressDetail">
            <span slot="content">{{row.addressDetail}}</span>
          </editTable-cell> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { iInput, iButton, iSelect } from 'rise'
import {
  getCity,
  listFactoryByCircle,
  getBySupplierId
} from '@/api/supplierManagement/supplyChainOverall/index.js'
import editTableCell from './editTableCell'
export default {
  data () {
    return {
      editModeEnabled: true,
      // form: {
      //   isTurnoverStore: "",
      //   fillingUserName: "",
      //   fillingUserPost: "",
      //   fillingUserPhone: "",
      //   fillingUserEmail: "",
      // },
      factoryList: [],
      cityOptions: [],
      tableData: [],
      flag: false
    }
  },
  props: {
    isTurnoverStore: {
      type: String,
      default: ''
    },
    supplierId: {
      type: Number
    },
    warningLetterProductAddressList: {
      type: Array,
      default: () => {
        return []
      }
    },
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    downLoadFlag: {
      type: Boolean,
      default: false
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    isTurnoverStore (val) {
      if (val) {
        this.baseInfo.isTurnoverStore = '是'
      } else {
        this.baseInfo.isTurnoverStore = '否'
      }
    },
    //  supplierId(val) {
    //   getBySupplierId(val).then((res) => {
    //     this.factoryList = res.data
    //   })
    // },
    warningLetterProductAddressList: {
      handler (val) {
        val.forEach((item) => {
          item.cityList = [item.city, item.country, item.province]
          item.editMode = false
        })
        this.tableData = _.cloneDeep(val)
        // val.forEach(item => {
        //   this.$set(item, 'cityList', []);
        // })
      },
      deep: true
    },
    tableData: {
      handler (val) {
        val.forEach((item) => {
          if (item.cityList.length !== 0) {
            item.city = item.cityList[0]
            item.country = item.cityList[1]
            item.province = item.cityList[2]
          }
        })
      },
      deep: true
    }
  },
  components: { iButton, editTableCell, iInput, iSelect },
  created () {
    console.log(this.supplierId)
    this.$nextTick(() => {
      this.getListFactoryByCircle()

      this.getFactoryList()
    })
  },
  watch: {
    supplierId (val) {
      getBySupplierId(val).then((res) => {
        this.factoryList = res.data
      })
    }
  },
  methods: {
    getFactoryChange (v, i) {
      this.tableData[i].addressDetail = this.factoryList.find(
        (res) => res.factoryName == v
      ).address
      this.tableData[i].city = this.factoryList.find(
        (res) => res.factoryName == v
      ).city
      this.tableData[i].country = this.factoryList.find(
        (res) => res.factoryName == v
      ).country
      this.tableData[i].province = this.factoryList.find(
        (res) => res.factoryName == v
      ).province
      console.log(this.tableData)
      // this.tableData[i].row.city

    },
    getListFactoryByCircle () {
      listFactoryByCircle({ id: this.$route.query.id }).then((res) => {
        this.tableData = res.data
        this.tableData.forEach((res) => {
          res.addressDetail = res.address
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getFactoryList () {

    },
    init () {
      getCity().then((res) => {
        this.cityOptions = res
      })
    },
    add () {
      let letterProductList = {
        id: this.random(1, 100),
        factoryName: '',
        addressDetail: '',
        cityList: [],
        city: '',
        country: '',
        province: '',
        editMode: true
      }
      this.tableData.push(letterProductList)
    },
    del () {
      this.multipleSelection.forEach((item) => {
        this.tableData.forEach((i, ind) => {
          if (item.id === i.id) {
            this.tableData.splice(item, 1)
          }
        })
      })
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    // del () {
    //   this.multipleSelection.forEach(item => {
    //     this.tableList.forEach((i, ind) => {
    //       if (item.id === i.id) {
    //         this.tableList.splice(ind, 1)
    //       }
    //     })
    //   })
    // },
    // random (min, max) {
    //   return Math.floor(Math.random() * (max - min)) + min;
    // },
    change (val) { }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.formList {
  display: flex;
  flex-wrap: wrap;
  .formItem {
    width: 24%;
  }
}
.supplierAddress {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
::v-deep .el-form-item {
  &:last-child {
    margin-bottom: 0px;
  }
}
::v-deep .el-table .el-table__row .el-input {
  width: 220px !important;
}
:v-deep .el-input__inner {
  width: 220px !important;
}
</style>
