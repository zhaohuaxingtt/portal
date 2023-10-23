<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2022-01-28 16:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="emergencyLevel">
          <span class="title">{{
            language(
              'QINGXUANZHEJINGQUEJIBIEDUANDIANSHIJIANJUJIN',
              '请选择：紧缺级别（断点时间距今）'
            )
          }}</span>
          <div class="flex emergency">
            <div class="emergencyItem">
              <div
                class="circle"
                :class="baseInfo.shortageLevel === 'low' ? 'active' : ''"
              >
                <img :src="ash" alt="" />
              </div>
              <span class="describe">{{
                language('XIAOYUYIZHOU', '≦1周')
              }}</span>
            </div>
            <div class="emergencyItem">
              <div
                class="circle"
                :class="baseInfo.shortageLevel === 'middle' ? 'active' : ''"
              >
                <img :src="red" alt="" />
              </div>

              <span class="describe">{{
                language('YIZHIERZHOU', '1~2周')
              }}</span>
            </div>
            <div class="emergencyItem">
              <div
                class="circle"
                :class="baseInfo.shortageLevel === 'middleHigh' ? 'active' : ''"
              >
                <img :src="orange" alt="" />
              </div>

              <span class="describe">{{
                language('ERZHISIZHOU', '2~4周')
              }}</span>
            </div>
            <div class="emergencyItem">
              <div
                class="circle"
                :class="baseInfo.shortageLevel === 'high' ? 'active' : ''"
              >
                <img :src="yellow" alt="" />
              </div>
              <span class="describe">{{ language('DAYUSIZHOU', '>4周') }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="reasons">
          <span class="title">{{
            language('QINGXUANZHEJINGQUEYUANYING', '请选择：紧缺原因')
          }}</span>
          <div class="margin-top20">
            <el-checkbox-group
              v-model="baseInfo.shortageReason"
              class="flex reasonsCheck"
            >
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('SHANJIANYUANCAILIAO', '散件原材料')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('CHANNENG', '产能')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('ZHILIANG', '质量')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('SHEBEIGUZHANG', '设备故障')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('TUFASHIJIAN', '突发事件')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('SHANGWUJIUFEN', '商务纠纷')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                :label="language('YUNSHUSOUZHU', '运输受阻')"
                size="mini"
                border
              ></el-checkbox>
              <el-checkbox
                disabled
                class="checkItem"
                size="mini"
                :label="language('QITA', '其他')"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="flex margin-top20">
            <label style="font-size: 14px; width: 100px"
              >{{ language('QITAYUANYING', '其他原因') }}:</label
            >
            <div style="width: 100%">
              {{ baseInfo.otherShortageReason }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="supplierAddress">
      <span class="title">{{ language('JINGQUELINGJIAN', '紧缺零件') }}</span>
    </div>
    <div class="margin-top20">
      <el-table :data="baseInfo.warningLetterPartRelList" style="width: 100%">
        <el-table-column label="#" type="index" width="65"> </el-table-column>
        <el-table-column
          :label="language('LINGJIANHAO', '零件号')"
          prop="partNum"
          min-width="160"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.partNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LINGJIANMINGCHEN', '零件名称')"
          prop="partName"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.partName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('DUANDIANRIQI', '断点日期')"
          prop="breakPointDate"
          min-width="160"
          ><template slot-scope="scope">
            <span> {{ scope.row.breakPointDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('CHIXUTIANSHU', '持续天数')"
          prop="continueDays"
          min-width="150"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.continueDays }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('QUEKOUSHULIANG', '缺口数量')"
          prop="gapsNum"
          min-width="150"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.gapsNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('SHEJISVWCAIGOUGONGCHANG', '涉及SVW采购工厂')"
          prop="involveFactoryName"
          min-width="200"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.involveFactoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('SHEJICHEXING', '涉及车型')"
          min-width="220"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.involveCarType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="
            language('ZONGCHENGJIANDAZONGLINGJIANHAO', '总成件大众零件号')
          "
          prop="assemblyPartNum"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.assemblyPartNum }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="baseInfo.warningLetterPartRelList" style="width: 100%">
        <el-table-column label="#" type="index" width="65"> </el-table-column>
        <el-table-column
          :label="language('LINGJIANHAO', '零件号')"
          prop="partNum"
          min-width="160"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.partNum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="language('SHANJIANGONGYINGSHANGMINGCHEN', '散件供应商名称')"
          prop="assemblyPartNum"
          min-width="220"
        >
          <template slot-scope="scope">
            <iSelect
              v-if="editMode"
              filterable
              @change="getFactoryChangeGysmc($event, scope.$index)"
              v-model="scope.row.sparePartSupplierName"
            >
              <el-option
                v-for="item in supplierList"
                :key="item.supplierName"
                :label="item.supplierName"
                :value="item.supplierName"
              >
              </el-option>
            </iSelect>
            <span v-else> {{ scope.row.sparePartSupplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="
            language(
              'SHANJIANGONGYINGSHANGTONGYISHEHUIXINGYONGDAIMA',
              '散件供应商统一社会信用代码'
            )
          "
          prop="assemblyPartNum"
          min-width="220"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.sparePartSupplierCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="
            language(
              'SANJIANGONGYINGSHANGGONGCHANGMINGCHENG',
              '散件供应商工厂名称'
            )
          "
          prop="assemblyPartNum"
          min-width="180"
        >
          <template slot-scope="scope">
            <iSelect
              v-if="editMode"
              filterable
              @change="getFactoryChangeGys($event, scope.$index)"
              v-model="scope.row.sparePartFactoryName"
            >
              <el-option
                v-for="item in factorySupplierList"
                :key="item.factoryName"
                :label="item.factoryName"
                :value="item.factoryName"
              >
              </el-option>
            </iSelect>
            <span v-else> {{ scope.row.sparePartFactoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="
            language(
              'SHANJIANGONGYINGSHANGGONGCHANGDIZHI',
              '散件供应商工厂地址'
            )
          "
          prop="assemblyPartNum"
          min-width="220"
        >
          <template slot-scope="scope">
            <span v> {{ scope.row.sparePartSupplierDetailAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('YITAOJIJIAN', '一套几件')"
          prop="assemblyPartNum"
          min-width="180"
        >
          <template slot-scope="scope">
            <iInput v-model="scope.row.pieces" v-if="editMode"></iInput>
            <span v-else> {{ scope.row.pieces }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('SHANJIANJINGQUEYUANYING', '散件紧缺原因')"
          prop="assemblyPartNum"
          min-width="240"
        >
          <template slot-scope="scope">
            <iInput
              v-model="scope.row.sparePartSupplierShortageReason"
              v-if="editMode"
              maxlength="10"
            ></iInput>
            <span v-else> {{ scope.row.sparePartSupplierShortageReason }}</span>
          </template>
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
export default {
  data() {
    return {
      red,
      ash,
      yellow,
      orange
    }
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: { iButton, editTableCell, icon, iInput, iSelect }
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
        border: 1px solid #67C23A;
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
