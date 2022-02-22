<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-26 16:52:42
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iDialog :append-to-body="true"
           :title="edit?language('BIANJITUFASHIJIAN','编辑突发事件'):language('CHUANGJIANTUFASHIJIAN','创建突发事件')"
           @close="clearDiolog"
           :visible.sync="value"
           width="40%"
           height="1000px">
    <el-row :gutter="40"
            type="flex"
            justify="space-between">
      <el-form :rules="rules"
               :model="form"
               ref="form">
        <el-col :span="24">
          <el-form-item prop="eventName"
                        required
                        :label="language('SHIJIANLEIXING','事件类型')">
            <iSelect :placeholder="language('QINGXUANZHE','请选择')"
                     v-model="form.eventName">
              <el-option v-for="(item,index) in formGroup.eventType"
                         :key="index"
                         :label="item.name"
                         :value="item.name"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="language('SHIJIANXIANGQING','事件详情')">
            <iInput :placeholder="language('QINGSHURU','请输入')"
                    v-model="form.source"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required
                        prop="occurrenceTime"
                        :label="language('FASHENGSHIJIAN','发生时间')">
            <br />
            <iDatePicker width="100%"
                         v-model="form.occurrenceTime"
                         format="yyyy-MM-dd"
                         value-format="yyyy-MM-dd"
                         type="date"
                         :placeholder="language('QINGXUANZE','请选择')"
                         clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="area"
                        required
                        :label="language('ZHONGXINGWEIZHI','中心位置')">
            <br />
            <el-cascader :show-all-levels="true"
                         v-model="form.area"
                         :placeholder="language('QINGXUANZHE','请选择')"
                         :options="formGroup.areaList"
                         :clearable="true"
                         filterable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="influenceSize"
                        required
                        :label="language('BOJIBANJING','波及半径（KM）')">
            <br>
            <el-input-number :min="1"
                             controls-position="right"
                             v-model="form.influenceSize"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="language('XIAOXIYUAN','消息源(Link)')">
            <iInput :placeholder="language('QINGXUANZHE','请选择')"
                    v-model="form.sourceLink"></iInput>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer"
         class="dialog-footer">
      <iButton @click="handleAdd">{{language('QUEREN','确认')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iButton, iInput, iDatePicker, iSelect } from "rise";
import { saveOrEdit } from "@/api/supplierManagement/supplyChainRisk/index.js";
import { getCity } from "@/api/supplierManagement/supplyChainOverall/index.js";
import resultMessageMixin from "@/mixins/resultMessageMixin.js"
import { dictByCode } from "./data.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton, iInput, iDatePicker, iSelect },
  mixins: [resultMessageMixin],
  props: {
    value: { type: Boolean },
    eventDetail: { type: Object, default: {} },
    edit: { type: Boolean }
  },
  data () {
    // 这里存放数据
    return {
      rules: {
        eventName: [
          { required: true, message: '请输入事件名称', trigger: ['change', 'blur'] },
        ],
        area: [
          { required: true, message: '请选择中心位置', trigger: ['change', 'blur'] },
        ],
        influenceSize: [
          { required: true, message: '请输入波及半径', trigger: ['change', 'blur'] },
        ],
        occurrenceTime: [
          { required: true, message: '请选择发生时间', trigger: ['change', 'blur'] },
        ],
      },
      formGroup: {
        areaList: [],
        eventType: []
      },
      form: {
        area: [],
        eventName: '',
        occurrenceTime: '',
        occurrenceAddress: '',
        influenceSize: 1,
        source: '',
        occurrenceCity: '',
        sourceLink: '',
        occurrencePlace: ''
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    eventDetail: {
      handler (data) {
        this.form = data
        this.form.area = data.occurrencePlace.split('-')
      }
    }
  },
  // 方法集合
  methods: {
    async dictByCode () {
      const res = await dictByCode('risk_event_type')
      this.formGroup.eventType = res
    },
    async getCityInfo () {
      const res = await getCity()
      this.formGroup.areaList = res
    },
    // 保存
    handleAdd () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.form.occurrencePlace = this.form.area.join('-')
          this.form.occurrenceAddress = this.form.area[this.form.area.length - 1]
          this.form.occurrenceCity = this.form.area[this.form.area.length - 1]
          const res = await saveOrEdit(this.form)
          this.resultMessage(res, () => {
            this.clearDiolog()
            this.$router.push({
              path: '/supplier/NTier/supplyChainRisk/map',
              query: { id: res.data.id }
            })
          })
        }
      })
    },
    clearDiolog () {
      this.$emit('input', false);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.dictByCode()
    this.getCityInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
::v-deep .el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
    height: 2.1875rem;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border-color: transparent;
  }
  .el-input-number__decrease {
    right: 0;
    background: #fff;
    bottom: 0.0625rem;
    top: 0;
    height: 100%;
    display: flex;
    left: auto;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border-color: transparent;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
  .el-input-number__increase {
    right: 2rem;
    top: 0;
    height: 100%;
    display: flex;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border-color: transparent;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-top-right-radius: 0;
  }
}
::v-deep .is-required .el-form-item__label:after {
  content: '*';
  color: #ef3737;
  margin-left: 0.25rem;
}
::v-deep .is-required .el-form-item__label:before {
  display: none;
}
::v-deep .custom-select-input > input {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
::v-deep .el-cascader {
  width: 100%;
}
</style>
