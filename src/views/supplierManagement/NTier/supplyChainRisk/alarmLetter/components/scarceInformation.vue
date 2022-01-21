<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2022-01-21 15:36:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="emergencyLevel">
          <span class="title">{{language('QINGXUANZHEJINGQUEJIBIEDUANDIANSHIJIANJUJIN','请选择：紧缺级别（断点时间距今）')}}</span>
          <div class="flex emergency">
            <div class="emergencyItem">
              <div class="circle"
                   :class="select==='low'?'active':''"
                   @click="selected('low')">
                <img :src="ash"
                     alt="">
                <!-- <icon symbol
                      name="iconbaojiapingfengenzong-jiedian-hei"
                      style="font-size:40px"></icon> -->
              </div>
              <span class="describe">{{language('XIAOYUYIZHOU','≦1周')}}</span>
            </div>
            <div class="emergencyItem">
              <div class="circle"
                   :class="select==='middle'?'active':''"
                   @click="selected('middle')">
                <img :src="red"
                     alt="">
                <!-- <icon symbol
                      name="iconbaojiapingfengenzong-jiedian-hong"
                      style="font-size:40px"></icon> -->
              </div>

              <span class="describe">{{language('YIZHIERZHOU','1~2周')}}</span>
            </div>
            <div class="emergencyItem">
              <div class="circle"
                   :class="select==='middleHigh'?'active':''"
                   @click="selected('middleHigh')">
                <img :src="orange"
                     alt="">
                <!-- <icon symbol
                      name="iconbaojiapingfengenzong-jiedian-cheng"
                      style="font-size:40px"></icon> -->
              </div>

              <span class="describe">{{language('ERZHISIZHOU','2~4周')}}</span>
            </div>
            <div class="emergencyItem">
              <div class="circle"
                   :class="select==='high'?'active':''"
                   @click="selected('high')">
                <img :src="yellow"
                     alt="">
                <!-- <icon symbol
                      name="iconbaojiapingfengenzong-jiedian-huang"
                      style="font-size:40px"></icon> -->
              </div>
              <span class="describe">{{language('DAYUSIZHOU','>4周')}}</span>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="reasons">
          <span class="title">{{language('QINGXUANZHEJINGQUEYUANYING','请选择：紧缺原因')}}</span>
          <div class="margin-top20">
            <el-checkbox-group v-model="checkList"
                               class="flex reasonsCheck">
              <el-checkbox class="checkItem"
                           :label="language('SHANJIANYUANCAILIAO','散件原材料')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('CHANNENG','产能')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('ZHILIANG','质量')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('SHEBEIGUZHANG','设备故障')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('TUFASHIJIAN','突发事件')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('SHANGWUJIUFEN','商务纠纷')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           :label="language('YUNSHUSOUZHU','运输受阻')"
                           size="mini"
                           border></el-checkbox>
              <el-checkbox class="checkItem"
                           size="mini"
                           :label="language('QITA','其他')"
                           border></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="flex margin-top20">
            <label style="font-size:14px;width:100px">{{language('QITAYUANYING','其他原因')}}:</label>
            <div v-if="downLoadFlag"
                 style="width:100%">{{otherShortageReason}}</div>
            <iInput v-else
                    v-model="otherShortageReason"
                    type="textarea"
                    maxlength="50"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    show-word-limit
                    :placeholder="language('QINGSHURUNEIRONG','请输入内容')"></iInput>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="supplierAddress">
      <span class="title">{{language('JINGQUELINGJIAN','紧缺零件')}} <el-tooltip :content="language('SANJIANGONGYINGSHANGXINXIHOUXUZAICISHUAXINJIKE', '散件供应商信息请于N级供应链维护页面维护,后续在此刷新即可')"
                    placement="top"
                    effect="light">
          <i style="color:blue"
             class="el-icon-warning-outline titleIcon"></i>
        </el-tooltip></span>
      <div v-show="!downLoadFlag">
        <iButton @click="del">{{language('SHANCHU','删除')}}</iButton>
        <iButton @click="add">{{language('XINZENG','新增')}}</iButton>
      </div>
    </div>
    <div class="margin-top20">
      <el-table :data="tableList"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="65">
        </el-table-column>
        <el-table-column :label="language('LINGJIANHAO','零件号')"
                         prop="partNum"
                         min-width="160">
          <template slot-scope="scope">
            <iSelect v-if="editMode"
                     filterable
                     @change="getFactoryChangeLj($event,scope.$index)"
                     v-model="scope.row.partNum">
              <el-option v-for="item in chainPartList.partNumList"
                         :key="item.partNum"
                         :label="item.partNum"
                         :value="item.partNum">
              </el-option>
            </iSelect>
            <!-- <iInput v-model="scope.row.partNum"
                    v-if="editMode"></iInput> -->
            <span v-else> {{scope.row.partNum}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.partNum">
            <span slot="content">{{row.partNum}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('LINGJIANMINGCHEN','零件名称')"
                         prop="partName"
                         min-width="180">
          <template slot-scope="scope">
            <!-- <iSelect v-if="editMode"
                     filterable
                     @change="getFactoryChangeLj($event,scope.$index)"
                     v-model="scope.row.partName">
              <el-option v-for="item in factoryList"
                         :key="item.factoryName"
                         :label="item.factoryName"
                         :value="item.factoryName">
              </el-option>
            </iSelect> -->
            <!-- <iInput v-model="scope.row.partName"
                    v-if="editMode"></iInput> -->
            <span> {{scope.row.partName}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.partName">
            <span slot="content">{{row.partName}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('DUANDIANRIQI','断点日期')"
                         prop="breakPointDate"
                         min-width="160">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.breakPointDate"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            v-if="editMode"></el-date-picker>
            <span v-else> {{scope.row.breakPointDate}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          editableComponent="el-date-picker"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :can-edit="editModeEnabled"
                          v-model="row.breakPointDate">
            <span slot="content">{{row.breakPointDate}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('CHIXUTIANSHU','持续天数')"
                         prop="continueDays"
                         min-width="150">
          <template slot-scope="scope">
            <iInput v-model="scope.row.continueDays"
                    v-if="editMode"
                    maxlength="8"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></iInput>
            <span v-else> {{scope.row.continueDays}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                          maxlength="8"
                          :can-edit="editModeEnabled"
                          v-model="row.continueDays">
            <span slot="content">{{row.continueDays}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('QUEKOUSHULIANG','缺口数量')"
                         prop="gapsNum"
                         min-width="150">
          <template slot-scope="scope">
            <iInput v-model="scope.row.gapsNum"
                    v-if="editMode"
                    maxlength="8"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></iInput>
            <span v-else> {{scope.row.gapsNum}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                          maxlength="8"
                          :can-edit="editModeEnabled"
                          v-model="row.gapsNum">
            <span slot="content">{{row.gapsNum}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('SHEJISVWCAIGOUGONGCHANG','涉及SVW采购工厂')"
                         prop="involveFactoryName"
                         min-width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.involveFactoryNum"
                       filterable
                       v-if="editMode"
                       style="width:200px">
              <el-option v-for="item in selectProcureFactory"
                         :key="item.id"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
            <span v-else> {{scope.row.involveFactoryName}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.involveFactoryName">
            <span slot="content">{{row.involveFactoryName}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('SHEJICHEXING','涉及车型')"
                         min-width="220">
          <template slot-scope="scope">
            <el-select v-model="scope.row.involveCarType"
                       multiple
                       collapse-tags
                       filterable
                       v-if="editMode"
                       style="width:200px">
              <el-option v-for="item in involveCarTypeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
            <span v-else> {{scope.row.involveCarType}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          editableComponent="el-select"
                          multiple
                          :can-edit="editModeEnabled"
                          v-model="row.involveCarType">
            <span slot="content">{{row.involveCarType}}</span>
            <span slot="edit-component-slot">
              <el-option v-for="item in involveCarTypeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.value"></el-option>
            </span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('ZONGCHENGJIANDAZONGLINGJIANHAO','总成件大众零件号')"
                         prop="assemblyPartNum"
                         min-width="200">
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.assemblyPartNum"
                    v-if="editMode"></iInput>
            <span v-else> {{scope.row.assemblyPartNum}}</span> -->
            <iSelect v-if="editMode"
                     filterable
                     v-model="scope.row.assemblyPartNum">
              <el-option v-for="item in chainPartList.svwPartNumList"
                         :key="item.partNum"
                         :label="item.partNum"
                         :value="item.partNum">
              </el-option>
            </iSelect>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.assemblyPartNum">
            <span slot="content">{{row.assemblyPartNum}}</span>
          </editTable-cell> -->
        </el-table-column>

      </el-table>
      <el-table :data="tableList"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="65">
        </el-table-column>
        <el-table-column :label="language('LINGJIANHAO','零件号')"
                         prop="partNum"
                         min-width="160">
          <template slot-scope="scope">
            <!-- <iInput disabled
                    v-model="scope.row.partNum"
                    v-if="editMode"></iInput> -->
            <span> {{scope.row.partNum}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.partNum">
            <span slot="content">{{row.partNum}}</span>
          </editTable-cell> -->
        </el-table-column>

        <el-table-column :label="language('SHANJIANGONGYINGSHANGMINGCHEN','散件供应商名称')"
                         prop="assemblyPartNum"
                         min-width="220">
          <template slot-scope="scope">
            <iSelect v-if="editMode"
                     filterable
                     @change="getFactoryChangeGysmc($event,scope.$index)"
                     v-model="scope.row.sparePartSupplierName">
              <el-option v-for="item in chainSupplierList"
                         :key="item.supplierNameCn"
                         :label="item.supplierNameCn"
                         :value="item.supplierNameCn">
              </el-option>
            </iSelect>
            <span v-else> {{scope.row.sparePartSupplierName}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierName">
            <span slot="content">{{row.sparePartSupplierName}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('SHANJIANGONGYINGSHANGTONGYISHEHUIXINGYONGDAIMA','散件供应商统一社会信用代码')"
                         prop="assemblyPartNum"
                         min-width="220">
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.sparePartSupplierCode"
                    v-if="editMode"></iInput> -->
            <span> {{scope.row.sparePartSupplierCode}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierCode">
            <span slot="content">{{row.sparePartSupplierCode}}</span>
          </editTable-cell> -->
        </el-table-column>

        <!-- <el-table-column :label="language('SHANJIANGONGYINGSHANGSHENGCHANDI','散件供应商生产地')" prop="assemblyPartNum" min-width="240">
          <template slot-scope="scope">
            <el-cascader v-model="scope.row.sparePartSupplierAddress" :options="cityOptions" @change="handleAddress(scope.row)" v-if="editMode"></el-cascader>
            <span v-else> {{scope.row.city&&scope.row.country&&scope.row.province?scope.row.city+'/'+scope.row.country+'/'+scope.row.province:''}}</span>
          </template> -->
        <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierAddress">
            <span slot="content">{{row.sparePartSupplierAddress}}</span>
          </editTable-cell> -->
        <!-- </el-table-column> -->
        <el-table-column :label="language('SANJIANGONGYINGSHANGGONGCHANGMINGCHENG','散件供应商工厂名称')"
                         prop="assemblyPartNum"
                         min-width="180">
          <template slot-scope="scope">

            <iSelect v-if="editMode"
                     filterable
                     @change="getFactoryChangeGys($event,scope.$index)"
                     v-model="scope.row.sparePartFactoryName">
              <el-option v-for="item in factorySupplierList"
                         :key="item.factoryName"
                         :label="item.factoryName"
                         :value="item.factoryName">
              </el-option>
            </iSelect>
            <!-- <iInput v-model="scope.row.sparePartSupplierDetailAddress"
                    v-if="editMode"></iInput> -->
            <span v-else> {{scope.row.sparePartFactoryName}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('SHANJIANGONGYINGSHANGGONGCHANGDIZHI','散件供应商工厂地址')"
                         prop="assemblyPartNum"
                         min-width="220">
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.sparePartSupplierDetailAddress"
                    v-if="editMode"></iInput> -->
            <span v> {{scope.row.sparePartSupplierDetailAddress}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierDetailAddress">
            <span slot="content">{{row.sparePartSupplierDetailAddress}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('YITAOJIJIAN','一套几件')"
                         prop="assemblyPartNum"
                         min-width="180">
          <template slot-scope="scope">
            <iInput v-model="scope.row.pieces"
                    v-if="editMode"></iInput>
            <span v-else> {{scope.row.pieces}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierShortageReason">
            <span slot="content">{{row.sparePartSupplierShortageReason}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('SHANJIANJINGQUEYUANYING','散件紧缺原因')"
                         prop="assemblyPartNum"
                         min-width="240">
          <template slot-scope="scope">
            <iInput v-model="scope.row.sparePartSupplierShortageReason"
                    v-if="editMode"
                    maxlength="10"></iInput>
            <span v-else> {{scope.row.sparePartSupplierShortageReason}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.sparePartSupplierShortageReason">
            <span slot="content">{{row.sparePartSupplierShortageReason}}</span>
          </editTable-cell> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { iButton, icon, iInput, iSelect } from 'rise'
import editTableCell from './editTableCell'
import red from '@/assets/images/红@3x.png'
import orange from '@/assets/images/橙@3x.png'
import yellow from '@/assets/images/黄@3x.png'
import ash from '@/assets/images/灰@3x.png'
import {
  cartypeDict,
  queryUpOrDownStream,
  selectProcureFactory
} from '@/api/supplierManagement/supplyChainRisk'
import {
  getBySupplierId,
  selectChainPart,
  // queryChainSupplier
} from '@/api/supplierManagement/supplyChainOverall/index.js'
import { getCity } from '@/api/supplierManagement/supplyChainOverall/index.js'
export default {
  data () {
    return {
      editModeEnabled: true,
      checkList: [],
      otherShortageReason: '',
      tableList: [],
      select: '',
      involveCarTypeList: [],
      cityOptions: [],
      supplierList: [],
      red,
      ash,
      yellow,
      orange,
      factoryList: [],
      chainPartList: {},
      chainSupplierList: [],
      factorySupplierList: [],
    }
  },
  props: {
    shortageReason: {
      type: String,
      default: ''
    },
    shortageLevel: {
      type: String,
      default: ''
    },
    warningLetterPartRelList: {
      type: Array,
      default: () => {
        return []
      }
    },
    downLoadFlag: {
      type: Boolean,
      default: false
    },
    editMode: {
      type: Boolean,
      default: true
    },
    supplierId: {
      type: Number
    }
  },
  watch: {
    shortageReason (val) {
      this.checkList = val.split(',')
    },
    warningLetterPartRelList: {
      handler (val) {
        this.tableList = _.cloneDeep(val)
      },
      deep: true
    },
    tableList: {
      handler (val) {
        val.forEach((item) => {
          item.involveCarType.toString()
        })
      },
      deep: true
    },
    shortageLevel (val) {
      this.select = val
    },
    supplierId (val) {
      queryUpOrDownStream({
        isRecursion: true,
        isUp: true,
        supplierFactoryId: '',
        supplierId: val
      }).then((res) => {
        this.supplierList = res.data
        this.chainSupplierList = res.data
      })
      getBySupplierId(val).then((res) => {
        this.factoryList = res.data
      })
      // queryChainSupplier(val).then((res) => {
      //   this.chainSupplierList = res.data
      //   //       getBySupplierId(res.data[0].id||0).then((res) => {
      //   //     this.factorySupplierList = res.data
      //   //   })
      // })
      selectChainPart({ supplierId: val }).then((res) => {
        this.chainPartList = res.data
      })
    }
  },
  components: { iButton, editTableCell, icon, iInput, iSelect },
  created () {
    this.$nextTick(() => {
      this.init()
      console.log(this.supplierId)
    })
  },
  // mounted() {
  //   console.log(this.supplierId)
  //   this.$nextTick(() => {
  //     this.init()
  //     console.log(this.supplierId)
  //   })
  // },
  methods: {
    init () {


      getCity().then((res) => {
        this.cityOptions = res
      })
      cartypeDict().then((res) => {
        this.involveCarTypeList = res.data
      })
      selectProcureFactory().then((res) => {
        this.selectProcureFactory = res.data
      })
    },
    getFactoryChangeLj (v, i) {
      this.tableList[i].partName = this.chainPartList.partNumList.find(
        (res) => res.partNum == v
      ).partName
    },
    getFactoryChangeGys (v, i) {
      this.tableList[i].sparePartFactoryCode = this.factorySupplierList.find(
        (res) => res.factoryName == v
      ).factoryId
      this.tableList[i].sparePartSupplierDetailAddress = this.factorySupplierList.find(
        (res) => res.factoryName == v
      ).address
    },
    getFactoryChangeGysmc (v, i) {

      this.tableList[i].sparePartSupplierCode = this.chainSupplierList.find(
        (res) => res.supplierNameCn == v
      ).creditCode
      let id = this.chainSupplierList.find(
        (res) => res.supplierNameCn == v
      ).id
      this.factorySupplierList = []
      this.tableList[i].sparePartFactoryCode = ''
      this.tableList[i].sparePartFactoryName = ''
      this.tableList[i].sparePartSupplierDetailAddress = ''
      getBySupplierId(id).then((res) => {

        this.factorySupplierList = res.data
      })

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    add () {
      console.log(this.tableList)
      let obj = {
        id: this.random(1, 100),
        partNum: '',
        partName: '',
        breakPointDate: '',
        continueDays: '',
        gapsNum: '',
        involveFactoryName: '',
        involveCarType: [],
        assemblyPartNum: '',
        sparePartFactoryName: '',
        involveFactoryNum: '',
        sparePartSupplierName: '',
        sparePartSupplierCode: '',
        spareSupplierId: '',
        sparePartSupplierAddress: '',
        pieces: '',
        sparePartSupplierShortageReason: ''
      }
      this.tableList.push(obj)
    },
    del () {
      this.multipleSelection.forEach((item) => {
        this.tableList.forEach((i, ind) => {
          if (item.id === i.id) {
            this.tableList.splice(ind, 1)
          }
        })
      })
    },
    handleAddress (val) {
      val.sparePartSupplierAddress = val.sparePartSupplierAddress.toString()
    },
    handleSpareSupplier (val) {
      console.log(val)
      this.supplierList.forEach((item) => {
        if (item.supplierId === val.spareSupplierId) {
          val.sparePartSupplierName = item.supplierName
        }
      })
    },
    selected (val) {
      this.select = val
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}
</script>

<style lang="scss" scoped>
.emergency {
  width: 100%;
  justify-content: center;
  margin-top: 60px;
  .emergencyItem {
    flex: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
    .describe {
      font-size: 16px;
      margin-top: 20px;
    }
    .circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #eef2fb;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #eef2fb;
      }
      &.active {
        background-color: #eef2fb;
        border: 1px solid #1660f1;
      }
    }
  }
}
.reasons {
  .reasonsCheck {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    .checkItem {
      width: 21%;
      margin-left: 20px;
      margin-top: 15px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
  .title {
    font-size: 14px;
    width: 20%;
  }
}

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
::v-deep .el-checkbox {
  margin: 0;
}
::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
::v-deep .el-table .el-table__row .iInput {
  width: 100% !important;
}

::v-deep .el-input {
  width: 100% !important;
}
::v-deep .iInput__inner {
  width: 100% !important;
}
::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
}
</style>
