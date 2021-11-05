<!--
/**
 * 自定义下拉框，支持多选，单选
 * @param   {array}        data             required:true      选项列表options              ——
 * @param   {string}       label            required:false     选项列表options中显示的名字   默认：label
 * @param   {string}       sortVal          required:false     用于前端排序(字母排序)的key   默认：nameEn
 * @param   {string}       value            required:false     选项列表options中唯一标识     默认：value
 * @param   {function}     search-method    required:false     搜索函数                     默认：null
 * @param   {string}       popoverClass     required:false     下拉框class                  默认：''         注：下拉框默认width:300px, 如需自定义，自行增加popover-class
 * @param   {string}       inputClass       required:false     input框 class                默认：''
 * @param   {boolean}      multiple         required:false     是否多选                      默认：false
 * @param   {number}       multiple-limit   required:false     多选上限                      默认：0 无上限   注：多选且多选上限大于0的情况 全选按钮disabled
 * @param   {boolean}      disabled         required:false     是否disabled                 默认：false
 * @param   {object}       v-model          required:true      绑定值                       ——
 * @events  change         选中值发生变化时触发
 */
 -->
<template>
  <div class="custom-select-wrapper">
    <div>
      <h1 class="margin-bottom15">在表单中使用</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="城市多选" prop="cityMultiple">
          <iSelectCustom
            :data="multipleData"
            label="cityNameCn"
            sortVal="cityNameEn"
            value="cityId"
            @change="handleFormMultiChange"
            v-model="ruleForm.cityMultiple"
            :multiple="multiple"
            :disabled="false"
            :search-method="handleMultiSearch"
            :multiple-limit="6"
            :popoverClass="'popover-class'"
            :inputClass="'input-class'"
          />
        </el-form-item>
        <el-form-item label="城市单选" prop="citySingle">
          <iSelectCustom
            :data="singleData"
            @change="handleFormSingleChange"
            v-model="ruleForm.citySingle"
            label="cityNameCn"
            sortVal="cityNameEn"
            value="cityId"
            :search-method="handleSingleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFormSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <h1 class="margin-bottom15">在iSearch中使用</h1>
      <div class="margin10 iSearch-wrapper">
        <i-search @sure="sure" @reset="reset" class="margin-bottom20">
          <el-form row="2" :model="queryForm" ref="queryForm">
            <el-form-item label="城市多选" class="margin-right20">
              <iSelectCustom
                :data="multipleData"
                label="cityNameCn"
                sortVal="cityNameEn"
                value="cityId"
                @change="handleSearchMultiChange"
                v-model="queryForm.cityMultiple"
                :multiple="multiple"
                :disabled="false"
                :search-method="handleMultiSearch"
                :multiple-limit="6"
                :popover-class="'popover1-class'"
              />
            </el-form-item>
            <el-form-item label="城市单选">
              <iSelectCustom
                :data="singleData"
                @change="handleSearchSingleChange"
                v-model="queryForm.citySingle"
                label="cityNameCn"
                sortVal="cityNameEn"
                value="cityId"
                :search-method="handleSingleSearch"
              />
            </el-form-item>
          </el-form>
        </i-search>
      </div>
    </div>
  </div>
</template>

<script>
import { iSearch, iSelectCustom } from 'rise'
import { getCityInfo } from '@/api/demo'
export default {
  components: { iSelectCustom, iSearch },
  data() {
    return {
      rules: {
        citySingle: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        cityMultiple: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ]
      },
      ruleForm: {
        name: '',
        citySingle: {
          centerPoint: '121.509062,25.044332',
          cityId: 300035,
          cityIdStr: '300035',
          cityLevel: null,
          cityNameCn: '台湾省',
          cityNameDe: 'Taiwan',
          cityNameEn: 'Taiwan',
          createBy: 0,
          createDate: '2021-07-12 15:26:37',
          id: 300035,
          locationNum: 710000,
          locationType: 'Province',
          parentCityId: 300001,
          parentCityIdStr: '300001',
          sapLocationCode: '310',
          sortBy: null,
          updateBy: null,
          updateDate: null
        },
        cityMultiple: [
          {
            centerPoint: '116.405285,39.904989',
            cityId: 300002,
            cityIdStr: '300002',
            cityLevel: null,
            cityNameCn: '北京市',
            cityNameDe: 'Beijing',
            cityNameEn: 'Beijing',
            createBy: 0,
            createDate: '2021-07-12 15:26:37',
            id: 300002,
            locationNum: 110000,
            locationType: 'Province',
            parentCityId: 300001,
            parentCityIdStr: '300001',
            sapLocationCode: '010',
            selected: true,
            sortBy: null,
            updateBy: null,
            updateDate: null
          },
          {
            centerPoint: '117.283042,31.86119',
            cityId: 300013,
            cityIdStr: '300013',
            cityLevel: null,
            cityNameCn: '安徽省',
            cityNameDe: 'Anhui',
            cityNameEn: 'Anhui',
            createBy: 0,
            createDate: '2021-07-12 15:26:37',
            id: 300013,
            locationNum: 340000,
            locationType: 'Province',
            parentCityId: 300001,
            parentCityIdStr: '300001',
            sapLocationCode: '110',
            selected: true,
            sortBy: null,
            updateBy: null,
            updateDate: null
          }
        ]
      },
      queryForm: {
        citySingle: {},
        cityMultiple: []
      },
      singleData: [],
      multipleData: [],
      multiple: true,
      query: {
        cityName: '',
        locationNum: '',
        parentCityId: '300001',
        sapLocationCode: ''
      }
    }
  },
  async mounted() {
    this.getProvince()
  },
  methods: {
    sure() {
      console.log('queryForm', this.queryForm)
    },
    reset() {
      this.queryForm = {
        citySingle: {},
        cityMultiple: []
      }
    },
    handleFormSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getProvince() {
      const result = await getCityInfo(this.query)
      if (result?.code === '200' && result?.data) {
        const data = result.data.sort((a, b) => {
          const a_swname = a.cityNameEn?.toLowerCase()
          const b_swname = b.cityNameEn?.toLowerCase()
          if (a_swname < b_swname) return -1
          if (a_swname > b_swname) return 1
          return 0
        })
        this.singleData = _.cloneDeep(data)
        this.multipleData = _.cloneDeep(data)
      } else {
        this.singleData = []
        this.multipleData = []
      }
    },
    handleMultiSearch(val) {
      this.query.cityName = val
      this.getProvince()
    },
    handleSingleSearch(val) {
      this.query.cityName = val
      this.getProvince()
    },
    handleFormMultiChange() {
      console.log('form multi model', this.ruleForm.cityMultiple)
    },
    handleFormSingleChange() {
      console.log('form single model', this.ruleForm.citySingle)
    },
    handleSearchSingleChange() {
      console.log('iSearch single model', this.citySingle)
    },
    handleSearchMultiChange() {
      console.log('iSearch multi model', this.cityMultiple)
    }
  }
}
</script>

<style lang="scss">
.custom-select-wrapper {
  padding-top: 30px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.iSearch-wrapper {
  width: 1000px;
}

.popover-class {
  width: 400px;
}
.input-class {
  width: 400px;
}
.popover1-class {
  width: 220px;
}
</style>
