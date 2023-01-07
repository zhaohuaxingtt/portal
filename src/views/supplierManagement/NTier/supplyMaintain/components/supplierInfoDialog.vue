<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 14:38:15
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <iDialog
    v-if="value"
    :title="
      flag === 'edit'
        ? language('BJGYS', '编辑供应商信息')
        : language('CHUANGJIANGONGYINGSHANG', '创建新供应商')
    "
    width="90%"
    :visible.sync="value"
    show-close
    @close="clearDiolog"
  >
    <div class="title margin-bottom20">
      {{ language('GONGYINGSHANGXINXI', '供应商信息') }}
    </div>
    <iFormGroup :rules="rules" ref="ruleForm" :model="supplier" row="3">
      <iFormItem prop="supplierNameCn" :required="true">
        <iLabel
          slot="label"
          :required="true"
          :label="language('GONGYINGSHANGZh', '供应商中文名')"
        ></iLabel>
        <iInput
          :disabled="
            node.chainSource === 'SQO' && !!disabledSupplier.supplierNameCn
          "
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.supplierNameCn"
        ></iInput>
      </iFormItem>

      <iFormItem prop="supplierNameEn">
        <iLabel
          slot="label"
          :required="true"
          :label="language('GONGYINGSHANGEn', '供应商英文名')"
        ></iLabel>
        <iInput
          :disabled="
            node.chainSource === 'SQO' && !!disabledSupplier.supplierNameEn
          "
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.supplierNameEn"
        ></iInput>
      </iFormItem>

      <iFormItem prop="creditCode">
        <div slot="label" class="flex">
          <iLabel
            slot="reference"
            :required="true"
            :label="language('TONGYISHEHUIXINGYONGDAIMA', '统一社会信用代码')"
          ></iLabel>
          <el-popover width="427" trigger="hover" placement="top-start">
            <span>
              {{
                language(
                  'GSZCHTYSHXYDMSZDSYZGGYSDBTX',
                  '工商注册号/统一社会信用代码是针对所有中国供应商的必填项（15或18位）可以在全国组织机构统一社会信用代码公示查询平台'
                )
              }}
            </span>
            <a class="openLinkText" href="http://www.cods.org.cn"
              >http://www.cods.org.cn</a
            >
            <span>{{ language('ZHONGCHAXUN', '中查询') }}</span>
            <icon
              slot="reference"
              symbol
              name="iconxinxitishi"
              class="font-size16 marin-left5"
            />
          </el-popover>
        </div>
        <iInput
          :disabled="
            node.chainSource === 'SQO' && !!disabledSupplier.creditCode
          "
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.creditCode"
        ></iInput>
      </iFormItem>

      <iFormItem>
        <div slot="label" class="flex">
          <iLabel slot="reference" :label="language('DUNS', 'DUNS')"></iLabel>
          <el-popover width="427" trigger="hover" placement="top-start">
            <div v-if="flag === 'edit'">
              <span>
                {{
                  language(
                    'GSZCHZDHWGTSXYZXMDQYTRDBSDUNSMDBSDUNSMKYZ',
                    '工商注册号/针对海外供应商，需要在下面的区域填入邓白氏DUNS码。邓白氏DUNS码可以在'
                  )
                }}
              </span>
              <a class="openLinkText" href="http://www.dunsregistered.com"
                >http://www.dunsregistered.com</a
              >
              <span>{{ language('WANGYEZHONGCHAXUN', '网页中查询') }}</span>
            </div>
            <div v-if="flag === 'create'">
              <span>
                {{
                  language(
                    'ZHENDUIHAIWAIYONGYINGSHANGXUYAOZAIXIAMIANDEQUYUTIANRUDENGBAISHIDUNSMADENGBAISHIDUNSMAKEYIZAI',
                    '针对海外供应商。需要在下面的区域填入邓白氏DUNS码。邓白氏DUNS码可以在'
                  )
                }}
              </span>
              <a class="openLinkText" href="http://www.dunsregistered.com">
                http://www.dunsregistered.com
              </a>
              <span>{{ language('WANGYEZHONGCHAXUN', '网页中查询') }}</span>
            </div>
            <icon
              slot="reference"
              symbol
              name="iconxinxitishi"
              class="font-size16 marin-left5"
            />
          </el-popover>
        </div>
        <div class="duns flex-align-center">
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            maxlength="2"
            v-model="supplier.one"
          ></iInput>
          <span></span>
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            maxlength="3"
            v-model="supplier.two"
          ></iInput>
          <span></span>
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            maxlength="4"
            v-model="supplier.three"
          ></iInput>
        </div>
      </iFormItem>

      <iFormItem prop="area">
        <iLabel
          slot="label"
          :required="true"
          :label="language('GUOJIA_SHENGFEN_CHENSHI', '国家-省份-城市')"
        ></iLabel>
        <el-cascader
          :disabled="node.chainSource === 'SQO' && !!disabledSupplier.area"
          v-model="supplier.area"
          :placeholder="language('QINGXUANZHE', '请选择')"
          :options="formGroup.areaList"
          filterable
          :props="{ multiple: false }"
          :clearable="true"
          collapse-tags
        ></el-cascader>
      </iFormItem>

      <iFormItem :label="language('XIANGXIDIZHI', '详细地址')">
        <iInput
          :disabled="node.chainSource === 'SQO' && !!disabledSupplier.address"
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.address"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('YOUBIANHAO', '邮编号')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.postCode"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('GONGSIXINGZHI', '公司性质')">
        <iInput
          :disabled="
            node.chainSource === 'SQO' && !!disabledSupplier.enterpriseType
          "
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.enterpriseType"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('GONGSIGUIMO', '公司规模')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.companySize"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('ZHUCEZIJING', '注册资金')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.registeredCapital"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('ZIZHIYURENZHENG', '资质与认证')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.certification"
        ></iInput>
      </iFormItem>

      <iFormItem
        prop="email"
        v-if="flag === 'create'"
        :label="language('LIANXIYOUXIANG', '联系邮箱')"
      >
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="supplier.email"
        ></iInput>
      </iFormItem>
    </iFormGroup>
    <div class="partType" v-if="flag === 'edit'">
      <el-divider></el-divider>
      <!-- 零件类型 -->
      <iFormGroup
        :rules="rulesPartType"
        ref="ruleFormPartType"
        :model="partType"
        row="3"
      >
        <iFormItem prop="partType">
          <iLabel
            slot="label"
            :required="true"
            :label="language('LINGJIANLEIXING', '零件类型')"
          ></iLabel>
          <el-cascader
            clearable
            separator="-"
            v-model="partType.partType"
            :options="formGroup.partList"
          ></el-cascader>
        </iFormItem>

        <iFormItem> </iFormItem>

        <iFormItem>
          <iButton @click="handleDelete">{{
            language('SHANGCHU', '删除')
          }}</iButton>
          <iButton @click="handleAdd">{{
            language('XINZENG', '新增')
          }}</iButton>
        </iFormItem>
      </iFormGroup>
      <table-list
        :height="120"
        class="margin-top20"
        ref="commonTable"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
      >
        <template #partName="scope">
          <div v-if="scope.row.isEdit">
            <iInput
              :placeholder="language('QINGSHURU', '请输入')"
              v-model="scope.row.partName"
            ></iInput>
          </div>
          <span v-else>{{ scope.row.partName }}</span>
        </template>
        <template #partNum="scope">
          <div v-if="scope.row.isEdit">
            <iInput
              :placeholder="language('QINGSHURU', '请输入')"
              v-model="scope.row.partNum"
            ></iInput>
          </div>
          <span v-else>{{ scope.row.partNum }}</span>
        </template>
      </table-list>
    </div>
    <!-- 生产工厂信息 -->
    <el-divider></el-divider>
    <div class="title margin-top20 margin-bottom20">
      {{ language('SHENGCHANGONGCHANGXINGXI', '生产工厂信息') }}
    </div>
    <iFormGroup :rules="rulesPlant" ref="ruleFormPlant" :model="plant" row="3">
      <iFormItem prop="factoryName">
        <iLabel
          slot="label"
          :required="true"
          :label="language('GONGCHANGMINGCHENG', '工厂名称')"
        ></iLabel>
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="plant.factoryName"
        ></iInput>
      </iFormItem>

      <iFormItem prop="area">
        <iLabel
          slot="label"
          :required="true"
          :label="language('GUOJIA_SHENGFEN_CHENSHI', '国家-省份-城市')"
        ></iLabel>
        <el-cascader
          v-model="plant.area"
          :placeholder="language('QINGXUANZHE', '请选择')"
          :options="formGroup.areaList"
          filterable
          :props="{ multiple: false }"
          :clearable="true"
          collapse-tags
        ></el-cascader>
      </iFormItem>

      <iFormItem :label="language('XIANGXIDIZHI', '详细地址')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="plant.address"
        ></iInput>
      </iFormItem>

      <iFormItem :label="language('YOUBIANHAO', '邮编号')">
        <iInput
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="plant.postCode"
        ></iInput>
      </iFormItem>

      <iFormItem
        :label="language('GONGCHANGZHANDIMIANJI', '工厂占地面积（平方米）')"
      >
        <iInput
          :disabled="node.chainSource === 'SQO' && !!disabledPlant.areaCovered"
          :placeholder="language('QINGSHURU', '请输入')"
          v-model="plant.areaCovered"
        ></iInput>
      </iFormItem>
    </iFormGroup>
    <span slot="footer" class="dialog-footer">
      <iButton v-if="flag === 'create'" @click="handleBack">{{
        language('FANHUI', '返回')
      }}</iButton>
      <iButton v-if="flag === 'create'" @click="handleCreate">{{
        language('QUERENCHUANGJIAN', '确认创建')
      }}</iButton>
      <iButton v-if="flag === 'edit'" @click="handleSubmit">{{
        language('QUERENXIUGAI', '确认修改')
      }}</iButton>
    </span>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
  iDialog,
  iButton,
  iInput,
  iLabel,
  iFormGroup,
  iFormItem,
  icon,
  iSelect,
  iMessage
} from 'rise'
import {
  querycardChainId,
  mainSave
} from '@/api/supplierManagement/supplyMaintain/index.js'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import resultMessageMixin from '@/mixins/resultMessageMixin.js'
import { partTableTitle } from './data'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    iDialog,
    iButton,
    iInput,
    iLabel,
    iFormGroup,
    iFormItem,
    icon,
    iSelect,
    tableList
  },
  mixins: [generalPageMixins, resultMessageMixin],
  props: {
    value: { type: Boolean },
    node: { type: Object },
    flag: { type: String, default: 'create' },
    formGroup:{
      type: Object,
      default:{
        partList: [],
        areaList: []
      }
    }
  },
  data() {
    // 这里存放数据
    return {
      // 供应商信息
      supplier: {
        supplierNameCn: '',
        supplierNameEn: '',
        creditCode: '',
        duns: '',
        newDuns: [],
        address: '',
        postCode: '',
        enterpriseType: '',
        companySize: '',
        registeredCapital: '',
        certification: '',
        area: '',
        one: '',
        two: '',
        three: '',
        email: ''
      },
      disabledSupplier: {},
      disabledPlant: {},
      // 零件类型
      partType: {
        partType: []
      },
      // 生产工厂信息
      plant: {
        address: '',
        postCode: '',
        areaCovered: '',
        area: [],
        factoryName: ''
      },
      // 零件类型
      part: '',
      tableListData: [],
      tableLoading: false,
      tableTitle: partTableTitle,
      selectTableData: [],
      rules: {
        supplierNameCn: [
          {
            required: true,
            message: '请输入供应商中文名',
            trigger: ['change', 'blur']
          }
        ],
        supplierNameEn: [
          {
            required: true,
            message: '请输入供应商英文名',
            trigger: ['change', 'blur']
          }
        ],
        creditCode: [
          {
            required: true,
            message: '请输入统一社会信用代码',
            trigger: ['change', 'blur']
          }
        ],
        area: [
          {
            required: true,
            message: '请选择国家-省份-城市',
            trigger: ['change', 'blur']
          }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的联系邮箱',
            trigger: ['blur', 'change']
          }
        ]
      },
      rulesPlant: {
        area: [
          {
            required: true,
            message: '请选择国家-省份-城市',
            trigger: ['change', 'blur']
          }
        ],
        factoryName: [
          {
            required: true,
            message: '请输入工厂名称',
            trigger: ['change', 'blur']
          }
        ]
      },
      rulesPartType: {
        partType: [
          {
            required: true,
            message: '请选择零件类型',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    value: {
      handler(val) {
        if (this.flag === 'edit' && val) {
          this.querycardChainId(this.node.id)
        } else {
          this.node = {}
        }
      }
    }
  },
  // 方法集合
  methods: {
    handleBack() {
      this.clearDiolog()
      this.$parent.$parent.addNodeDialog = true
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // 新增
    handleAdd() {
      this.tableListData.push({
        partName: '',
        partNum: '',
        isEdit: true,
        time: new Date().getTime()
      })
    },
    // 删除
    async handleDelete() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(
          this.language('QINGXUANZHEYITIAOYITIAOSHUJU', '请选择一条数据')
        )
      } else {
        let ids = [],
          times = []
        this.selectTableData.map((item) => {
          if (item.id) {
            ids.push(item.id)
          }
          if (item.time) {
            times.push(item.time)
          }
        })
        if (times.length !== 0) {
          this.tableListData = this.tableListData.filter((item) => {
            return !times.includes(item.time)
          })
        }
        if (ids.length !== 0) {
          this.tableListData = this.tableListData.filter((item) => {
            return !ids.includes(item.id)
          })
        }
      }
    },
    // 确认创建
    handleCreate() {
      this.$refs.ruleForm.validate((valid) => {
        this.$refs.ruleFormPlant.validate((validPlant) => {
          if (valid && validPlant) {
            this.submit()
          } else {
            iMessage.warn(
              this.language('QINGTIANXIEBITIANXIANG', '请填写必填项')
            )
          }
        })
      })
    },
    // 确认添加
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        this.$refs.ruleFormPartType.validate((validPartType) => {
          this.$refs.ruleFormPlant.validate((validPlant) => {
            if (valid && validPartType && validPlant) {
              var iscity = this.supplier.area.some((v) => {
                return v && v != ''
              })
              var iscity2 = this.plant.area.some((v) => {
                return v && v != ''
              })
              if (!iscity || !iscity2) {
                iMessage.warn(
                  this.language(
                    'QINGXUANZEGUOJIASHENGFENCHENGSHI',
                    '请选择国家-省份-城市'
                  )
                )
                return false
              }

              this.submit()
            } else {
              iMessage.warn(
                this.language('QINGTIANXIEBITIANXIANG', '请填写必填项')
              )
            }
          })
        })
      })
    },
    async submit() {
      this.supplier.country = this.supplier.area[0]
      this.supplier.province = this.supplier.area[1]
      this.supplier.city = this.supplier.area[2]
      this.plant.country = this.supplier.area[0]
      this.plant.province = this.supplier.area[1]
      this.plant.city = this.supplier.area[2]
      this.supplier.duns =
        this.supplier.one + '-' + this.supplier.two + '-' + this.supplier.three
      const pms = {
        supplier: this.supplier,
        plant: this.plant,
        partList: this.tableListData,
        chainId: this.node.id,
        partType: (this.partType.partType && this.partType.partType[1]) || '',
        isJump: false
      }
      pms.supplier.registeredCapital =
        pms.supplier.registeredCapital &&
        pms.supplier.registeredCapital.replace(/,/g, '')
      pms.plant.areaCovered =
        pms.plant.areaCovered && pms.plant.areaCovered.replace(/,/g, '')
      const res = await mainSave(pms)
      this.resultMessage(res, () => {
        if (this.flag === 'create') {
          this.$parent.$parent.$children[0].$children[1].form.supplierName =
            this.supplier.supplierNameCn
          this.handleBack()
          this.$nextTick(async () => {
            await this.$parent.$parent.$children[0].$children[1].toggleRowSelection(
              res.data
            )
          })
        } else {
          this.$parent.$parent.$parent.$children[0].getTableList()
          this.clearDiolog()
        }
      })
    },
    clearDiolog() {
      this.supplier = {}
      this.tableListData = []
      this.plant = {}
      this.partType.partType = []
      this.$emit('input', false)
    },
    // n-tier供应商信息综合查询
    async querycardChainId(id) {
      const res = await querycardChainId(id)
      // 供应商
      let obj = _.cloneDeep(res.data.supplier)
      obj['one'] = ''
      obj['two'] = ''
      obj['three'] = ''
      this.supplier = obj
      if (this.supplier.duns) {
        this.supplier.duns = this.supplier.duns.replace(/-/g, '')
        this.supplier['one'] = this.supplier.duns.slice(0, 2)
        this.supplier['two'] = this.supplier.duns.slice(2, 5)
        this.supplier['three'] = this.supplier.duns.slice(5, 9)
      }
      this.supplier.registeredCapital =
        (this.supplier.registeredCapital &&
          String(this.supplier.registeredCapital).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )) ||
        ''
      this.supplier.area = [
        this.supplier.country || '',
        this.supplier.province || '',
        this.supplier.city || ''
      ]
      this.disabledSupplier = _.cloneDeep(this.supplier)
      // 零件
      this.partType.partType = []
      res.data.partType.parentTypeCode &&
        this.partType.partType.push(res.data.partType.parentTypeCode)
      res.data.partType.partTypeCode &&
        this.partType.partType.push(res.data.partType.partTypeCode)
      this.tableListData = res.data.part
      this.tableListData.map((item) => (item.isEdit = false))
      // 工厂
      this.plant = Object.assign(res.data.plant, {
        id: res.data.plant['factoryId']
      })
      delete this.plant['factoryId']
      this.plant.area = [
        this.plant.country || '',
        this.plant.province || '',
        this.plant.city || ''
      ]
      this.disabledPlant = _.cloneDeep(this.plant)
      this.plant.areaCovered =
        (this.plant.areaCovered &&
          String(this.plant.areaCovered).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )) ||
        ''
    },
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.duns {
  > span {
    display: inline-block;
    width: 18px;
    height: 1px;
    margin: 0 10px;
    background-color: $color-black;
  }
}
.openLinkText {
  color: $color-blue;
}
.el-col-5,
.el-col-12 {
  display: flex;
  justify-content: flex-end;
}
::v-deep .row3 .el-form-item__label {
  width: 13.5rem;
}
.title {
  font-weight: bold;
  font-size: 1rem;
}
::v-deep .el-cascader {
  width: 100%;
}
::v-deep .custom-select-input > input {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .partType .el-form-item:nth-child(3) .el-form-item__content {
  display: flex;
  justify-content: flex-end;
}
::v-deep .partType .el-form-item:nth-child(1) span {
  font-weight: bold;
  font-size: 1rem;
}
</style>
