<template>
  <el-form
    ref="ruleForm"
    label-width="0px"
    class="edit-form"
    :rules="ruleData.rules"
    :model="ruleData"
  >
    <el-table :data="ruleData.data" v-loading="loading">
      <!-- <el-table-column type="selection" header-align="center" align="center" /> -->
      <el-table-column type="index" header-align="center" align="center" />
      <!-- <el-table-column
        :label="language('配置ID')"
        prop="id"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iInput size="mini" :value="scope.row.id" disabled />
        </template>
      </el-table-column> -->
      <el-table-column
        :label="language('用于的车型项目')"
        prop="vehicleProjectId"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iSelect
              :placeholder="language('请输入')"
              v-model="scope.row.vehicleProjectId"
              filterable
            >
              <el-option
                v-for="item in carTypeNames"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </iSelect>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('发动机类型')"
        prop="engineType"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iSelect v-model="scope.row.engineId" filterable :placeholder="language('请选择')">
            <el-option
              v-for="e in extraData.engineSelectOptions"
              :value="e.id"
              :label="e.name"
              :key="e.id"
            />
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('变速箱型号')"
        prop="gearboxName"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iSelect v-model="scope.row.gearboxId" filterable :placeholder="language('请选择')">
            <el-option
              v-for="e in extraData.boxSelectOptions"
              :value="e.id"
              :label="e.name"
              :key="e.id"
            />
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('电池容量')"
        prop="batteryId"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iSelect v-model="scope.row.batteryId" filterable :placeholder="language('请选择')">
            <el-option
              v-for="e in extraData.batterySelectOptions"
              :value="e.id"
              :label="e.name"
              :key="e.id"
            />
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('其它配置')"
        prop="otherConf"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iInput size="mini" v-model="scope.row.otherConf" :placeholder="language('请输入')"/>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('车型等级')"
        prop="cartypeLevel"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <iSelect v-model="scope.row.cartypeLevel" filterable :placeholder="language('请选择')">
            <el-option
              v-for="e in extraData.cartypeConfigLevelOptions"
              :value="e.name"
              :label="e.name"
              :key="e.code"
            />
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column
        :label="language('配置比例') + '%'"
        prop="id"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-form-item
            label=""
            :prop="'data.' + scope.$index + '.cartypeLevelRate'"
            :rules="ruleData.rules.cartypeLevelRate"
          >
            <iInput
              size="mini"
              v-model="scope.row.cartypeLevelRate"
              :ref="'inputRate' + scope.$index"
              @focus="() => cartypeLevelRateFocus('inputRate' + scope.$index)"
              :placeholder="language('请选择')"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="" header-align="center" align="center">
        <template slot-scope="scope">
          <span @click="removeRow(scope.$index)">
            <Icon symbol name="icondingdianshenqingyusheluoji-shanchu" />
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import {
  carProjectNameList,
} from '@/api/mainData/carProject'
import { Icon, iInput, iSelect } from 'rise'
export default {
  name: 'detailConfigModifyView',
  components: { Icon, iInput, iSelect },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    cartypeLevels: {
      type: Array,
      default: function () {
        return []
      }
    },
    extraData: {
      type: Object,
      default: function () {
        return {
          engineSelectOptions: [],
          boxSelectOptions: [],
          batterySelectOptions: [],
          cartypeConfigLevelOptions: []
        }
      }
    }
  },
  computed: {
    ruleData() {
      return {
        data: this.data,
        rules: {
          cartypeLevelRate: [
            {
              required: true,
              message: '请输入配置比例',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      carTypeNames:[]
    }
  },
  created(){
    this.querySearchCarTypeNameAsync('')
  },
  methods: {
    querySearchCarTypeNameAsync(keyword) {
      let param = { param: keyword }
      carProjectNameList(param).then((val) => {
        if (val.code == 200) {
          this.carTypeNames = val.data
        }
      })
    },
    removeRow(index) {
      this.$emit('remove', index)
    },
    validateForm() {
      let validResult = false
      this.$refs.ruleForm.validate((valid) => {
        validResult = valid
      })
      return validResult
    },
    cartypeLevelRateFocus(refName) {
      this.$refs[refName].select()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-form {
  ::v-deep .el-form-item {
    margin-bottom: 0;
    .el-form-item__content {
      line-height: auto;
    }
  }
  ::v-deep .el-table .el-table__row .el-input {
    width: 100% !important;
  }
  ::v-deep .el-table .el-table__row .el-autocomplete {
    width: 100% !important;
  }
  ::v-deep .el-table .el-table__row .el-input {
    width: 100% !important;
  }
  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
  }
  ::v-deep .el-select .el-input__icon {
    line-height: 100% !important;
  }
  ::v-deep .el-input__suffix {
    top: 5px;
  }
}
</style>
