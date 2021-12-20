<template>
  <iCard class="margin-bottom20" title="基本信息" header-control collapse>
    <div class="top-buttons margin-bottom20">
      <iButton v-if="isEditPage && !editable" @click="edit"> 编辑 </iButton>
      <iButton v-show="editable" @click="save">保存</iButton>
      <iButton v-show="editable" @click="cancel"> 取消 </iButton>
    </div>
    <div class="filter-form" v-loading="saveLoading">
      <el-form
        label-position="left"
        label-width="115px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        class="validate-required-form"
      >
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.num" prop="cartypeProjectCode">
              <iInput
                :placeholder="formTitles.inputPlaceholder"
                v-model="formData.cartypeProjectCode"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.type" prop="cartypeProType">
              <iSelect
                :placeholder="formTitles.selectPlaceholder"
                v-model="formData.cartypeProType"
                :disabled="!editable"
                filterable
              >
                <el-option
                  v-for="item in carTypeSelectList"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                />
              </iSelect>
              <!-- <iInput
                :placeholder="formTitles.inputPlaceholder"
                
              /> -->
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.materail" prop="carProTypeCode">
              <iSelect
                :placeholder="formTitles.selectPlaceholder"
                v-model="formData.carProTypeCode"
                :disabled="!editable"
                filterable
              >
                <el-option
                  v-for="item in carTypeFuelSelectList"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                />
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.nameCN" prop="cartypeProjectZh">
              <iInput
                :placeholder="formTitles.inputPlaceholder"
                v-model="formData.cartypeProjectZh"
                :disabled="isEditPage"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.nameEN" prop="cartypeProjectEn">
              <iInput
                :placeholder="formTitles.inputPlaceholder"
                v-model="formData.cartypeProjectEn"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.car" prop="cartypeId">
              <iSelect
                :placeholder="formTitles.inputPlaceholder"
                v-model="formData.cartypeNameZh"
                remote
                filterable
                :remote-method="querySearchAsync"
                :disabled="!editable"
                @change="carTypeSelectedChange"
              >
                <el-option
                  v-for="item in carTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.sop" prop="sopDate">
              <iDatePicker
                v-model="formData.sopDate"
                type="date"
                :placeholder="formTitles.selectPlaceholder"
                :picker-options="endDateOptions"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.eop" prop="eopDate">
              <iDatePicker
                v-model="formData.eopDate"
                type="date"
                :placeholder="formTitles.selectPlaceholder"
                :picker-options="endDateOptions"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.factory" prop="werk">
              <iSelect
                :placeholder="formTitles.selectPlaceholder"
                v-model="formData.werk"
                :disabled="!editable"
                filterable
              >
                <el-option
                  v-for="item in procureFactorySelectList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.saler" prop="projectPurchaser">
              <iSelectorInput
                v-model="formData.projectPurchaser"
                :tagLabel="'nameZh'"
                @click.native="inputHandleClick('1')"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.controller" prop="areaController">
              <iSelectorInput
                v-model="formData.areaController"
                :tagLabel="'nameZh'"
                @click.native="inputHandleClick('2')"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.producter" prop="projectManager">
              <iSelectorInput
                v-model="formData.projectManager"
                :tagLabel="'nameZh'"
                @click.native="inputHandleClick('3')"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.sap" prop="sapCartypeProjectNum">
              <iInput
                :placeholder="formTitles.inputPlaceholder"
                v-model="formData.sapCartypeProjectNum"
                :disabled="isEditPage"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.starttime" prop="beginTime">
              <iDatePicker
                v-model="formData.beginTime"
                type="date"
                :placeholder="formTitles.selectPlaceholder"
                :picker-options="endDateOptions"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.closetime" prop="closeTime">
              <iDatePicker
                v-model="formData.closeTime"
                type="date"
                :placeholder="formTitles.selectPlaceholder"
                :picker-options="endDateOptions"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8">
            <iFormItem :label="formTitles.releasestatus" prop="publishStatus">
              <iSelect
                :placeholder="formTitles.selectPlaceholder"
                v-model="formData.publishStatus"
                :disabled="!editable"
                filterable
              >
                <el-option
                  v-for="item in publishStatusSelectList"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                />
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="formTitles.isvalid" prop="isValid">
              <iSelect
                :placeholder="formTitles.selectPlaceholder"
                v-model="formData.isValid"
                :disabled="!editable"
                filterable
              >
                <el-option
                  v-for="item in formIsValidSelect"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="language('是否TIPS同步')">
              <iSelect
                v-model="formData.isModify"
                :disabled="!editable"
                filterable
              >
                <el-option :value="true" :label="language('是')" />
                <el-option :value="false" :label="language('否')" />
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>

      <!-- 项目采购员 -->
      <i-selector-dialog
        :show.sync="dialogPurchaseVisible"
        @change="handlePurchaseCallback"
        v-model="formData.projectPurchaser"
        :tableSetting="CAR_PROJECT_SELECTOR_TableSetting"
        :filter="selectorQuery"
        :title="'项目采购员'"
        :search-method="handlePurchaseSearch"
        :tag-label="'nameZh'"
      />

      <!-- 区域控制员 -->
      <i-selector-dialog
        :show.sync="dialogAreaControllerVisible"
        @change="handleAreaControllerCallback"
        v-model="formData.areaController"
        :tableSetting="CAR_PROJECT_SELECTOR_TableSetting"
        :filter="selectorQuery"
        :title="'区域控制员'"
        :search-method="handleAreaControllerSearch"
        :tag-label="'nameZh'"
      />

      <!-- 产品经理 -->
      <i-selector-dialog
        :show.sync="dialogProjectManagerVisible"
        @change="handleProjectManagerCallback"
        v-model="formData.projectManager"
        sizeType="size"
        :tableSetting="CAR_PROJECT_SELECTOR_TableSetting"
        :filter="selectorQuery"
        :title="'产品经理'"
        :search-method="handleProjectManagerSearch"
        :tag-label="'nameZh'"
      />
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iFormItem,
  iSelect,
  iInput,
  iButton,
  iDatePicker,
  iMessage
} from 'rise'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
import iSelectorInput from '@/components/iSelector/iSelectorInput.vue'
import { CAR_PROJECT_SELECTOR_TableSetting } from './data'
import {
  getUserListByIDs,
  getPageListByParams
} from '@/api/authorityMgmt/index'
import { cartypeNameList } from '@/api/mainData/productFamily'
import {
  carTypeSelectOptions,
  carTypeFuelSelectOptions,
  procureFactorySelectOptions,
  carProjectReleaseStatusList,
  carProjectCreateBaseInfo,
  carProjectUpdateBaseInfo,
  carProjectDetail
} from '@/api/mainData/carProject'
import mixin from '@/views/mainData/mixin'
export default {
  mixins: [mixin],
  methods: {
    edit() {
      this.originalBaseForm = _.cloneDeep(this.formData)
      this.editstate = true
    },
    handlePurchaseCallback(param) {
      //
    },
    handleAreaControllerCallback(param) {
      //
    },
    handleProjectManagerCallback(param) {
      //
    },
    handlePurchaseSearch(param) {
      //采购人员
      // CRCF-3132 车型项目页面，人员选择器修改
      return this.dialogUserList({ ...param, roleCode: 'XMCGY' })
    },
    handleAreaControllerSearch(param) {
      //区域控制员
      return this.dialogUserList(param)
    },
    handleProjectManagerSearch(param) {
      //产品经理
      return this.dialogUserList(param)
    },
    carTypeSelectedChange(parma) {
      //车型选择
      this.formData.cartypeId = parma
    },
    dialogUserList(param) {
      console.log('params', param)
      // let params = param
      return getPageListByParams({ ...param, current: param.pageNo })
      // return getSapUserDropdownList({ ...param, current: param.pageNo })
    },
    searchUser(param) {
      // 人员配置
      let params = param
      return getUserListByIDs(params)
    },
    getCarTypeSelectOptions() {
      let param = {}
      carTypeSelectOptions(param).then((val) => {
        if (val.code == 200) {
          this.carTypeSelectList = val.data.TYPE_VEHICLE_PROJECT
        }
      })
    },
    getCarTypeFuelSelectOptions() {
      let param = {}
      carTypeFuelSelectOptions(param).then((val) => {
        if (val.code == 200) {
          //
          this.carTypeFuelSelectList = val.data.cartype_fuel_type
        }
      })
    },
    getProcureFactorySelectOptions() {
      let param = {}
      procureFactorySelectOptions(param).then((val) => {
        if (val.code == 200) {
          //
          this.procureFactorySelectList = val.data
        }
      })
    },
    getCarProjectReleaseStatusList() {
      let param = {}
      carProjectReleaseStatusList(param)
        .then((val) => {
          if (val.code == 200) {
            //
            this.publishStatusSelectList = val.data.cartype_pro_public_state
          }
        })
        .catch(() => {
          //
        })
    },
    inputHandleClick(type) {
      if (!this.editable) {
        return
      }
      if (type == '1') {
        this.dialogPurchaseVisible = true
      } else if (type == '2') {
        this.dialogAreaControllerVisible = true
      } else if (type == '3') {
        this.dialogProjectManagerVisible = true
      }
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.editstate ? this.updateBaseInfo() : this.createBaseInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      if (!this.$route.query.id) {
        window.close()
      }
      if (_.isEqual(this.originalBaseForm, this.formData)) {
        this.$emit('reset', this.originalBaseForm)
        this.editstate = false
      } else {
        this.$confirm('页面内容有更新,是否保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.formData = this.originalBaseForm
            this.editstate = false
          })
      }
    },
    async createBaseInfo() {
      let projectPurchaserId = this.formData.projectPurchaser
        .map((val) => {
          return val.id
        })
        .join(',')
      let areaControllerId = this.formData.areaController
        .map((val) => {
          return val.id
        })
        .join(',')
      let projectManagerId = this.formData.projectManager
        .map((val) => {
          return val.id
        })
        .join(',')

      let param = {
        ...this.formData,
        projectPurchaser: projectPurchaserId,
        areaController: areaControllerId,
        projectManager: projectManagerId
      }
      this.saveLoading = true
      let val = await carProjectCreateBaseInfo(param).finally(() => {
        this.saveLoading = false
      })
      if (val.code == 200) {
        //基本信息创建成功之后，回传数据
        let carProjectID = val.data.id
        this.$emit('save-success')
        this.formData.id = carProjectID
        iMessage.success('保存成功')
        this.$router.replace({ query: { id: carProjectID } })
      } else {
        iMessage.error(val.desZh || '保存失败')
      }
      this.editstate = false
    },
    async updateBaseInfo() {
      let carProjectID = this.$route.query.id
      if (!carProjectID) {
        return
      }
      let projectPurchaserId = this.formData.projectPurchaser
        .map((val) => {
          return val.id
        })
        .join(',')
      let areaControllerId = this.formData.areaController
        .map((val) => {
          return val.id
        })
        .join(',')
      let projectManagerId = this.formData.projectManager
        .map((val) => {
          return val.id
        })
        .join(',')

      let param = {
        ...this.formData,
        projectPurchaser: projectPurchaserId,
        areaController: areaControllerId,
        projectManager: projectManagerId,
        id: carProjectID
      }

      this.saveLoading = true
      let val = await carProjectUpdateBaseInfo(param).finally(() => {
        this.saveLoading = false
      })
      if (val.code == 200) {
        //基本信息创建成功之后，回传数据
        this.$emit('save-success', val.data.id)
        iMessage.success('保存成功')
      } else {
        iMessage.error(val.desZh || '保存失败')
      }
      this.editstate = false
    },
    async queryCarProjectBaseInfo(data) {
      let params = { idOrCode: data, type: '1' }
      this.saveLoading = true
      let val = await carProjectDetail(params).finally(() => {
        this.saveLoading = false
      })
      if (val.code == 200) {
        //purchase
        let purchaseIDs = val.data.projectPurchaser
        let areaControllerIDs = val.data.areaController
        let projectManagerIDs = val.data.projectManager

        //通过绑定员工ID获取员工数组信息
        let newFormData = { ...val.data }
        if (purchaseIDs) {
          let purchaseIDList = purchaseIDs.split(',')
          let purchaseIDNumList = purchaseIDList.map((item) => {
            return parseInt(item)
          })
          let param = { userIdList: purchaseIDNumList }
          let purchaseList = await this.searchUser(param)
          newFormData.projectPurchaser = purchaseList.data
        }

        if (areaControllerIDs) {
          let areaControllerIDList = areaControllerIDs.split(',')
          let areaControllerIDNumList = areaControllerIDList.map((item) => {
            return parseInt(item)
          })
          let param = { userIdList: areaControllerIDNumList }
          let areaControllerList = await this.searchUser(param)
          newFormData.areaController = areaControllerList.data
        }

        if (projectManagerIDs) {
          let projectManagerIDList = projectManagerIDs.split(',')
          let projectManagerIDNumList = projectManagerIDList.map((item) => {
            return parseInt(item)
          })
          let param = { userIdList: projectManagerIDNumList }
          let projectManagerList = await this.searchUser(param)
          newFormData.projectManager = projectManagerList.data
        }

        //组装车型选择
        // if(val.data.cartypeName){
        //   this.carTypes = [{
        //     id:val.data.cartypeId,
        //     name:val.data.cartypeNameZh,
        //   }];
        // }

        this.formData = newFormData
        this.$emit('PEPData', this.formData)
      }
    },
    querySearchAsync(queryString) {
      //搜索车型
      if (queryString == null || queryString.length == 0) {
        return
      }
      let param = { param: queryString }
      cartypeNameList(param)
        .then((val) => {
          if (val.code == 200) {
            this.carTypes = val.data
          }
        })
        .catch(() => {})
    }
  },
  created() {
    let carProjectID = this.$route.query.id
    // console.log('Project ID', carProjectID)
    if (carProjectID) {
      //获取车型项目基本信息
      this.queryCarProjectBaseInfo(carProjectID)
    }
    this.getCarTypeSelectOptions()
    this.getCarTypeFuelSelectOptions()
    this.getProcureFactorySelectOptions()
    this.getCarProjectReleaseStatusList()
  },
  components: {
    iCard,
    iFormItem,
    iSelect,
    iInput,
    iButton,
    iDatePicker,
    iSelectorDialog,
    iSelectorInput
  },
  computed: {
    editable() {
      if (!this.isEditPage) {
        return true
      }
      return this.editstate
    },
    isEditPage() {
      // console.log('====', this.$route.query.id)
      return this.$route.query.id
    }
  },
  data() {
    return {
      originalBaseForm: {},
      editstate: false,
      dialogPurchaseVisible: false,
      dialogAreaControllerVisible: false,
      dialogProjectManagerVisible: false,
      CAR_PROJECT_SELECTOR_TableSetting,
      carTypeSelectList: [],
      carTypeFuelSelectList: [],
      procureFactorySelectList: [],
      publishStatusSelectList: [],
      carTypes: [],
      selectorQuery: [
        {
          value: 'userNum', //v-model
          label: '工号',
          type: 'input',
          initVal: ''
        },
        {
          value: 'nameZh',
          label: '姓名',
          type: 'input',
          initVal: ''
        },
        {
          value: 'deptList',
          label: '所属部门',
          type: 'input',
          initVal: ''
        }
      ],
      formIsValidSelect: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      formData: {
        cartypeNameZh: '', //车型名字
        cartypeId: '', //车型
        cartypeProjectCode: '', // 车型项目编号
        cartypeProjectZh: '', // 车型项目中文名称
        cartypeProjectEn: '', // 车型项目英文名称
        cartypeProType: '', //  车型项目类型
        carProTypeCode: '', // 燃料类型
        werk: '', //生产工厂
        sopDate: '', //sop时间
        eopDate: '', //eop时间
        projectPurchaser: [], // 项目采购员
        areaController: [], // 区域控制员购员
        projectManager: [], // 产品经理
        sapCartypeProjectNum: '', //SAP车型项目编号
        beginTime: '', // 开始时间
        closeTime: '', //  关闭时间
        publishStatus: '', // 发布状态 0：草稿 （Draft）;1:生效(Effective)
        isValid: '', // 是否有效
        isModify: false
      },
      inputFormData: {
        projectPurchaser: [], // 项目采购员
        areaController: [], // 区域控制员购员
        projectManager: [] // 产品经理
      },
      formTitles: {
        editBtn: '编辑',
        saveBtn: '保存',
        cancel: '取消',
        num: '车型项目编号',
        nameCN: '车型项目名称(中)',
        nameEN: '车型项目名称(英)',
        type: '车型项目类型',
        car: '车型',
        materail: '燃料类型',
        factory: '生产工厂',
        sop: 'SOP时间',
        eop: 'EOP时间',
        saler: '项目采购员',
        controller: '区域控制员',
        producter: '产品经理',
        sap: 'SAP车型项目号',
        starttime: '开始时间',
        closetime: '关闭时间',
        releasestatus: '发布状态',
        isvalid: '是否有效',
        inputPlaceholder: '请输入',
        selectPlaceholder: '请选择'
      },
      rules: {
        cartypeProjectCode: [
          { required: true, message: '请输入车型项目编号', trigger: 'blur' }
        ],
        cartypeProjectZh: [
          { required: true, message: '请输入车型项目中文名称', trigger: 'blur' }
        ],
        cartypeProjectEn: [
          { required: true, message: '请输入车型项目英文名称', trigger: 'blur' }
        ],
        cartypeProType: [
          { required: true, message: '请选择车型项目类型', trigger: 'blur' }
        ],
        carProTypeCode: [
          { required: true, message: '请选择燃料类型', trigger: 'blur' }
        ],
        factoryNameStr: [
          { required: true, message: '请选择生产工厂', trigger: 'blur' }
        ],
        cartypeId: [
          { required: true, message: '请输入车型项目编', trigger: 'blur' }
        ],
        werk: [{ required: true, message: '请选择生产工厂', trigger: 'blur' }],
        sopDate: [
          { required: true, message: '请选择SOP时间', trigger: 'blur' }
        ],
        /* eopDate: [
          { required: true, message: '请选择EOP时间', trigger: 'blur' }
        ], */
        projectPurchaser: [
          { required: true, message: '请选择项目采购员', trigger: 'change' }
        ],
        areaController: [
          { required: true, message: '请选择区域控制员', trigger: 'change' }
        ],
        projectManager: [
          { required: true, message: '请选择产品经理', trigger: 'change' }
        ],
        cartypeNameZh: [
          { required: true, message: '请选择车型', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        /* closeTime: [
          { required: true, message: '请选择关闭时间', trigger: 'blur' }
        ], */
        publishStatus: [
          { required: true, message: '请选择发布状态', trigger: 'blur' }
        ],
        isValid: [
          { required: true, message: '请选择是否有效', trigger: 'blur' }
        ]
      },
      saveLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.top-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
