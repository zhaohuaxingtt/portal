<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2022-03-09 19:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <el-form label-position="left" label-width="140px" ref="ruleForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="language('GONGYINGSHANGDAIMA', '供应商代码')">
            <iText>{{ baseInfo.sapCode }}</iText>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="language('GONGYINGSHANGMINGCHEN', '供应商名称')"
          >
            <iText>{{ baseInfo.supplierName }}</iText>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="language('TIANBIAOREN', '填表人')"
            prop="fillingUserName"
          >
            <iText>{{ baseInfo.fillingUserName }}</iText>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="language('ZHIWU', '职务')"
            prop="fillingUserPost"
          >
            <iText>{{ baseInfo.fillingUserPost }}</iText>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="margin-top20">
        <el-col :span="6">
          <el-form-item
            :label="language('DIANHUA', '电话')"
            prop="fillingUserPhone"
          >
            <iText>{{ baseInfo.fillingUserPhone }}</iText>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="language('DIANZIYOUXIANG', '电子邮箱')"
            prop="fillingUserEmail"
          >
            <iText>{{ baseInfo.fillingUserEmail }}</iText>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            label-width="240px"
            :label="
              language(
                'SHIFOUZAISHANGQIDAZONGZOUBIANJIANLIZHONGZHUANKU',
                '是否在上汽大众周边建立中转库'
              )
            "
            prop="isTurnoverStore"
          >
            <iText>{{ baseInfo.isTurnoverStore }}</iText>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <div class="supplierAddress">
      <span class="title">{{
        language('GONGYINGSHANGSHENGCHANDIZHI', '供应商生产地址')
      }}</span>
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="baseInfo.tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="#" type="index" width="65" align="center">
        </el-table-column>
        <el-table-column
          :label="language('GONGCHANGMINGCHEN', '工厂名称')"
          prop="factoryName"
          min-width="180"
        >
          <template slot-scope="scope">
            <iSelect
              v-if="editMode"
              filterable
              @change="getFactoryChange($event, scope.$index)"
              v-model="scope.row.factoryName"
            >
              <el-option
                v-for="item in factoryList"
                :key="item.factoryName"
                :label="item.factoryName"
                :value="item.factoryName"
              >
              </el-option>
            </iSelect>
            <span v-else> {{ scope.row.factoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('SUOZAIDIQU', '所在地区')"
          prop="cityList"
          min-width="180"
        >
          <template slot-scope="scope">
            <span>
              {{
                scope.row.city && scope.row.country && scope.row.province
                  ? scope.row.city +
                    '/' +
                    scope.row.country +
                    '/' +
                    scope.row.province
                  : ''
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="language('XIANGXIDIZHI', '详细地址')"
          prop="addressDetail"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.addressDetail }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { iText } from 'rise'
export default {
  components: {
    iText
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => ({})
    }
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
