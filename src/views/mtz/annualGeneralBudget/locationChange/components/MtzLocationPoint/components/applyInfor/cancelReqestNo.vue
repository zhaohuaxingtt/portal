<template>
  <div style="padding-bottom:30px;">
      <el-form :rules="formRules"
             :model="{tableData}"
             ref="contractForm"
             class="formStyle">
                <!-- @selection-change="handleSelectionChange" -->
      <el-table :data="tableData"
                ref="moviesTable"
                >
        <!-- <el-table-column type="selection"
                         width="60">
        </el-table-column> -->
        <el-table-column label="#"
                         type="index"
                         width="60">
        </el-table-column>
        <el-table-column prop="remark"
                         align="center"
                         width="250"
                         :label="language('CUOWUTISHI','错误提示')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'remark'"
                          :rules="formRules.remark ? formRules.remark : ''">
              <!-- <iInput v-model="scope.row.assemblyPartnum" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{scope.row.remark}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="assemblyPartnum"
                         align="center"
                         width="150"
                         :label="language('LINGJIANHAO','零件号')">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'assemblyPartnum'"
                          :rules="formRules.assemblyPartnum ? formRules.assemblyPartnum : ''">
              <!-- <iInput v-model="scope.row.assemblyPartnum" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{scope.row.assemblyPartnum}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="partName"
                         align="center"
                         
                         width="150"
                         :label="language('LINGJIANMINGCHENG','零件名称')">
          <template slot-scope="scope">
            <span>{{scope.row.partName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ruleNo"
                         align="center"
                         :label="language('GUIZEBIANHAO','规则编号')"
                         
                         width="150">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
                          :rules="formRules.ruleNo ? formRules.ruleNo : ''">
              <el-select v-model="scope.row.ruleNo"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         v-if="editId.indexOf(scope.row.id)!==-1"
                         @change="choiseGZ(scope,$event)">
                <el-option v-for="item in ruleNo"
                           :key="item.id"
                           :label="item.ruleNo"
                           :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{scope.row.ruleNo}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="supplierId"
                         align="center"
                         :label="language('GONGYINGSHANGBIANHAOMINGCHENG','供应商编号/名称')"
                         
                         width="150">
          <!-- supplierName供应商名称 -->
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'supplierId'"
                          :rules="formRules.supplierId ? formRules.supplierId : ''">
              <!-- <el-select v-model="scope.row.supplierId"
                                clearable
                                filterable
                                :disabled="true"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                :placeholder="language('QINGSHURU', '请输入')"
                                >
                            <el-option
                                v-for="item in supplierList"
                                :key="item.code"
                                :label="item.codeMessage"
                                :value="item.code">
                            </el-option>
                        </el-select> -->
                        <span>{{scope.row.supplierId}}/{{scope.row.supplierName}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="partUnit"
                            align="center"
                            width="150"
                            :label="language('LINGJIANSHULIANGDANWEI','零件数量单位')"
                            >
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'partUnit'"
                        :rules="formRules.partUnit ? formRules.partUnit : ''"
                    >
                        <!-- <iInput v-model="scope.row.partUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
                        <span>{{scope.row.partUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="priceUnit"
                            align="center"
                            :label="language('MEI','每')"
                            
                            width="150">
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'priceUnit'"
                        :rules="formRules.priceUnit ? formRules.priceUnit : ''"
                    >
                        <iInput v-model="scope.row.priceUnit" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.priceUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="dosage"
                            align="center"
                            width="150"
                            :label="language('YONGLIANG','用量')"
                            >
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'dosage'"
                        :rules="formRules.dosage ? formRules.dosage : ''"
                    >
                        <iInput v-model="scope.row.dosage" v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
                        <span v-else>{{scope.row.dosage}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="dosageMeasureUnit"
                            align="center"
                            width="150"
                            :label="language('YONGLIANGJILIANGDANEWI','用量计量单位')"
                            >
                <template slot-scope="scope">
                    <el-form-item
                        :prop="'tableData.' + scope.$index + '.' + 'dosageMeasureUnit'"
                        :rules="formRules.dosageMeasureUnit ? formRules.dosageMeasureUnit : ''"
                    >
                        <el-select v-model="scope.row.dosageMeasureUnit"
                                clearable
                                filterable
                                :placeholder="language('QINGSHURU', '请输入')"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                            <el-option
                                v-for="item in dosageMeasureUnit"
                                :key="item.code"
                                :label="item.code"
                                :value="item.code">
                            </el-option>
                        </el-select>
                        <span v-else>{{scope.row.dosageMeasureUnit}}</span>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column prop="startDate"
                            align="center"
                            width="200"
                            :label="language('YOUXIAOQIQI','有效期起')"
                            >
                <template slot-scope="scope">
                    <!-- <iDatePicker v-model="scope.row.startDate"
                                style="width: 180px!important;"
                                :disabled="true"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker> -->
            <span>{{scope.row.startDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endDate"
                         align="center"
                         width="200"
                         :label="language('YOUXIAOQIZHI','有效期止')"
                         >
          <template slot-scope="scope">
            <!-- <iDatePicker v-model="scope.row.endDate"
                                style="width: 180px!important;"
                                :disabled="true"
                                type="datetime"
                                v-if="editId.indexOf(scope.row.id)!==-1"
                                >
                    </iDatePicker> -->
            <span>{{scope.row.endDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mark"
                         align="center"
                         width="200"
                         :label="language('BEIZHU','备注')"
                         >
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'mark'"
                          :rules="formRules.mark ? formRules.mark : ''">
              <iInput v-model="scope.row.mark"
                      v-if="editId.indexOf(scope.row.id)!==-1"></iInput>
              <span v-else>{{scope.row.mark}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="materialCode"
                         align="center"
                         width="150"
                         :label="language('YUANCAILIAOPAIHAO','原材料牌号')"
                         >
          <template slot-scope="scope">
            <!-- <el-select v-model="scope.row.materialCode"
                            clearable
                            :disabled="true"
                            :placeholder="language('QINGSHURU', '请输入')"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                        <el-option
                            v-for="item in materialCode"
                            :key="item.code"
                            :label="item.codeMessage"
                            :value="item.code">
                        </el-option>
                    </el-select> -->
            <span>{{scope.row.materialCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="materialName"
                         align="center"
                         width="150"
                         :label="language('YUANCAILIAO','原材料')"
                         >
          <template slot-scope="scope">
            <span>{{scope.row.materialName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price"
                         align="center"
                         width="150"
                         :label="language('JIJIA','基价')"
                         >
          <template slot-scope="scope">
            <!-- <iInput :disabled="true" v-model="scope.row.price" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="priceMeasureUnit"
                         align="center"
                         width="150"
                         :label="language('JIJIAJILIANGDANWEI','基价计量单位')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.priceMeasureUnit" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.priceMeasureUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tcCurrence"
                         align="center"
                         width="150"
                         :label="language('HUOBI','货币')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.tcCurrence" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.tcCurrence}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tcExchangeRate"
                         align="center"
                         width="150"
                         :label="language('HUILV','汇率')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.tcExchangeRate" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.tcExchangeRate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="priceSource"
                         align="center"
                         width="150"
                         :label="language('SHICHANGJIALAIYUAN','市场价来源')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.priceSource" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.priceSource}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="compensationRatio"
                         align="center"
                         width="150"
                         :label="language('BUCHAXISHU','补差系数')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.compensationRatio" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.compensationRatio}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="compensationPeriod"
                         align="center"
                         width="150"
                         :label="language('BUCHAZHOUQI','补差周期')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.compensationPeriod" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="threshold"
                         align="center"
                         width="150"
                         :label="language('YUZHI','阈值')"
                         >
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.threshold" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.threshold}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="thresholdCompensationLogic"
                         align="center"
                         width="150"
                         :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')"
                         >
          <template slot-scope="scope">
            <!-- <el-select v-model="scope.row.thresholdCompensationLogic"
                            clearable
                            :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true"
                            v-if="editId.indexOf(scope.row.id)!==-1"
                            >
                        <el-option
                            v-for="item in thresholdCompensationLogic"
                            :key="item.code"
                            :label="item.message"
                            :value="item.code">
                        </el-option>
                    </el-select> -->
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="platinumPrice"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('BOJIJIA','铂基价')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006002-Pt</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.platinumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.platinumPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="platinumDosage"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('BOYONGLIANG','铂用量')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006002-Pt</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.platinumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.platinumDosage}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="palladiumPrice"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('BAJIJIA','钯基价')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006001-Pd</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.palladiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.palladiumPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="palladiumDosage"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('BAYONGLIANG','钯用量')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006001-Pd</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.palladiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.palladiumDosage}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rhodiumPrice"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('LAOJIJIA','铑基价')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006003-Rh</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.rhodiumPrice" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.rhodiumPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rhodiumDosage"
                         align="center"
                         width="150"
                         >
          <template slot="header">
            <div>
              <span>{{language('LAOYONGLIANG','铑用量')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>M01006003-Rh</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <iInput v-model="scope.row.rhodiumDosage" :disabled="true" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
            <span>{{scope.row.rhodiumDosage}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'cancelReqestNo',
    data(){
        return{
            tableData:[],
            formRules:[],//规则验证
            editId:[],
        }
    },
    props:["errorList"],
    created(){
        this.tableData = this.errorList;
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>