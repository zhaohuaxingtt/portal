<template>
  <iCard
    class="margin-bottom20"
    :title="language('车型项目PEP节点时间')"
    header-control
    collapse
  >
    <div
      class="top-buttons margin-bottom20"
      v-permission="'BUTTON_MAIN_DATA_CAR_PROJECT_PEP_NODE_TIME_MODIFY'"
    >
      <iButton v-if="isEditPage && !editable" @click="edit">
        {{ language('编辑') }}
      </iButton>
      <iButton v-show="editable" @click="save">{{ language('保存') }}</iButton>
      <iButton v-show="editable" @click="cancel">{{
        language('取消')
      }}</iButton>
    </div>
    <carTypeLifeCycle
      class="margin-bottom20"
      :highlightItems="formData"
      :pepData="pepData"
    />
    <div class="date-content">
      <el-form
        label-position="left"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        class="validate-required-form"
      >
        <el-row gutter="20">
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.PDTBT)"
              prop="pepPd"
            >
              <iDatePicker
                v-model="formData.pepPd"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.PFTBT)"
              prop="pepPf"
            >
              <iDatePicker
                v-model="formData.pepPf"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="pfOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.KFTBT)"
              prop="pepKf"
            >
              <iDatePicker
                v-model="formData.pepKf"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="kfOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.PLFTBT)"
              prop="pepPlf"
            >
              <iDatePicker
                v-model="formData.pepPlf"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="plfOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.BFTBT)"
              prop="pepBf"
            >
              <iDatePicker
                v-model="formData.pepBf"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="bfOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item
              label-width="100px"
              :label="language(formTitles.LFTBT)"
              prop="pepLf"
            >
              <iDatePicker
                v-model="formData.pepLf"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="lfOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </el-form-item>
          </el-col>
          <el-col span="6">
            <iFormItem
              label-width="100px"
              :label="language(formTitles.VFFTBT)"
              prop="pepVff"
            >
              <iDatePicker
                v-model="formData.pepVff"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="vffOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col span="6">
            <iFormItem
              label-width="100px"
              :label="language(formTitles.PVSTBT)"
              prop="pepPvs"
            >
              <iDatePicker
                v-model="formData.pepPvs"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="pvsOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col span="6">
            <iFormItem
              label-width="100px"
              :label="language(formTitles.oSTBT)"
              prop="pepOs"
            >
              <iDatePicker
                v-model="formData.pepOs"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="osOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col span="6">
            <iFormItem
              label-width="100px"
              :label="language(formTitles.SOPTBT)"
              prop="pepSop"
            >
              <iDatePicker
                v-model="formData.pepSop"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="sopOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
          <el-col span="6">
            <iFormItem
              label-width="100px"
              :label="language(formTitles.ME)"
              prop="pepMe"
            >
              <iDatePicker
                v-model="formData.pepMe"
                type="date"
                :placeholder="language(formTitles.selectPlaceholder)"
                :picker-options="meOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :disabled="!editable"
              />
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iDatePicker, iFormItem, iMessage } from 'rise'
import carTypeLifeCycle from '../../components/carTypeLifeCycleLine/carTypeLifeCycle'
import { fetchPepDateNode, savePepDateNode } from '@/api/mainData/carProject'
import Moment from 'moment'
import mixin from '@/views/mainData/mixin'
export default {
  mixins: [mixin],
  props: {
    pepData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    var validateDateRange = (rule, value, callback) => {
      // console.log("======",rule,value)
      if (!value || value.length == 0) {
        callback()
        return
      }
      let key = rule.field
      let valueFormat = moment(new Date(value)).format('YYYY-MM-DD')
      let currentDate = new Date(valueFormat).getTime()
      let lastNextNodeDateObj = this.checkNode(key)
      let lastDateStr = lastNextNodeDateObj['last']
      let lastDateFormat = moment(new Date(lastDateStr)).format('YYYY-MM-DD')
      let lastDateTimeStamp = new Date(lastDateFormat).getTime()
      let lastDate = lastDateStr.length > 0 ? lastDateTimeStamp : 0
      let nextDateStr = lastNextNodeDateObj['next']
      let nextDateFormat = moment(new Date(nextDateStr)).format('YYYY-MM-DD')
      let nextDateTimeStamp = new Date(nextDateFormat).getTime()
      let nextDate =
        nextDateStr.length > 0 ? nextDateTimeStamp : Number.POSITIVE_INFINITY
      //当前时间节点必须小于下一个时间节点且要大于上一个时间节点
      let result = currentDate > lastDate && currentDate < nextDate

      // let formatStr = "key:"+key+"\n"+"lastDateStr:"+lastDateFormat+"\n"+"nextDateStr:"+nextDateFormat+"\n"+"lastNextNodeDateObj:"+lastNextNodeDateObj+"\n"
      // console.log('lastDateTimeStamp==', lastDateTimeStamp)
      // console.log('nextDateTimeStamp==', nextDateTimeStamp)
      // console.log('===验证规则', rule, value)
      // console.log('lastDateStr==', lastDateStr)
      // console.log('nextDateStr==', nextDateStr)
      // console.log(formatStr)
      // console.log('result', result)

      if (!result) {
        callback(new Error('当前时间选择不正确'))
      } else {
        callback()
      }
    }

    return {
      editstate: false,
      formData: {
        pepBf: '2021-09-11', //PEP节点-BF TBT
        pepKf: '', //PEP节点-KF TBT
        pepLf: '', //PEP节点-LF TBT
        pepMe: '', //PEP节点-ME TBT
        pepOs: '', //pepOs
        pepPd: '', //PEP节点-PD TBT
        pepPf: '', //PEP节点-PF TBT
        pepPlf: '', //PEP节点-PLF TBT
        pepPvs: '', //PEP节点-PVS TBT
        pepSop: '', //PEP节点-SOP TBT
        pepVff: '' //PEP节点-VFF TBT
      },
      formTitles: {
        PDTBT: 'PD',
        PFTBT: 'PF',
        KFTBT: 'KF',
        PLFTBT: 'PLF',
        BFTBT: 'BF',
        LFTBT: 'LF',
        VFFTBT: 'VFF',
        PVSTBT: 'PVS',
        oSTBT: '0S',
        SOPTBT: 'SOP',
        ME: 'ME',
        selectPlaceholder: '请选择时间'
      },
      timeNodes: {
        pepPm: {
          last: '',
          next: 'pepPp'
        },
        pepPp: {
          last: 'pepPm',
          next: 'pepPd'
        },
        pepPd: {
          last: 'pepPp',
          next: 'pepPf'
        },
        pepPf: {
          last: 'pepPd',
          next: 'pepKf'
        },
        pepKf: {
          last: 'pepPf',
          next: 'pepPlf'
        },
        pepPlf: {
          last: 'pepKf',
          next: 'pepBf'
        },
        pepBf: {
          last: 'pepPlf',
          next: 'pepLf'
        },
        pepLf: {
          last: 'pepBf',
          next: 'pepVff'
        },
        pepVff: {
          last: 'pepLf',
          next: 'pepPvs'
        },
        pepPvs: {
          last: 'pepVff',
          next: 'pepOs'
        },
        pepOs: {
          last: 'pepPvs',
          next: 'pepSop'
        },
        pepSop: {
          last: 'pepOs',
          next: 'pepMe'
        },
        pepMe: {
          last: 'pepSop',
          next: ''
        }
      },
      rules: {
        pepBf: [{ validator: validateDateRange }],
        pepKf: [{ validator: validateDateRange }],
        pepLf: [{ validator: validateDateRange }],
        pepPd: [{ validator: validateDateRange }],
        pepPf: [{ validator: validateDateRange }],
        pepPlf: [{ validator: validateDateRange }],
        pepVff: [
          { required: true, message: '请选择VFF时间', trigger: 'blur' },
          { validator: validateDateRange, trigger: 'blur' }
        ],
        pepPvs: [
          {
            required: true,
            message: '请选择PVS时间',
            trigger: 'blur'
          },
          { validator: validateDateRange, trigger: 'blur' }
        ],
        pepOs: [
          {
            required: true,
            message: '请选择0S时间',
            trigger: 'blur'
          },
          { validator: validateDateRange, trigger: 'blur' }
        ],
        pepSop: [
          { required: true, message: '请选择SOP时间', trigger: 'blur' },
          { validator: validateDateRange, trigger: 'blur' }
        ],
        pepMe: [
          { required: true, message: '请选择ME时间', trigger: 'blur' },
          { validator: validateDateRange, trigger: 'blur' }
        ]
      },
      pfOptions: {},
      kfOptions: {},
      plfOptions: {},
      bfOptions: {},
      lfOptions: {},
      vffOptions: {},
      pvsOptions: {},
      osOptions: {},
      sopOptions: {},
      meOptions: {},
      loading: false,
      originalData: {}
    }
  },
  components: { iCard, iButton, carTypeLifeCycle, iDatePicker, iFormItem },
  created() {
    if (this.carTypeProId) {
      this.queryPepDateNode()
    }
  },
  computed: {
    carTypeProId() {
      return this.$route.query.id
    },
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
  methods: {
    async queryPepDateNode() {
      this.loading = true
      const params = { carTypeProId: this.carTypeProId }
      const { data } = await fetchPepDateNode(params).finally(
        () => (this.loading = false)
      )
      this.formData = data
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.saveToServer()
        }
      })
    },
    edit() {
      this.originalData = _.cloneDeep(this.formData)
      this.editstate = true
    },
    cancel() {
      if (!this.$route.query.id) {
        this.$router.go(-1)
      } else {
        this.editstate = false
      }
      if (_.isEqual(this.originalData, this.formData)) {
        this.editstate = false
      } else {
        this.cancelAlert()
          .then(() => {
            this.save()
          })
          .catch(() => {
            this.formData = this.originalData
            this.editstate = false
          })
      }
    },
    saveToServer() {
      const data = {
        // cartypeProId: this.carTypeProId,
        // carProjectId:this.carTypeProId,
        // createBy: this.$store.state.permission.userInfo.id,
        ...this.formData,
        cartypeProId: this.carTypeProId,
        carProjectId: this.carTypeProId,
        createBy: this.$store.state.permission.userInfo.id
      }
      savePepDateNode(data)
        .then((res) => {
          if (res.result) {
            this.editstate = false
            iMessage.success('保存成功')
          } else {
            iMessage.error('保存失败')
          }
        })
        .catch((err) => {
          iMessage.error('保存失败')
          console.log('savePepDateNode err', err)
        })
    },
    checkNode(key) {
      let currentNode = this.timeNodes[key]
      let lastNodeDate = this.lastNodeDate(currentNode)
      let nextNodeDate = this.nextNodeDate(currentNode)
      // console.log('😄😄😄😄lastNodeDate ==', lastNodeDate)
      // console.log('😄😄😄😄nextNodeDate ==', nextNodeDate)
      return { last: lastNodeDate, next: nextNodeDate }
    },
    lastNodeDate(node) {
      let lastNodeKey = node.last
      let date = ''
      if (lastNodeKey && lastNodeKey.length > 0) {
        date = this.nodeDateByKey(lastNodeKey)
        while ((!date || date.length == 0) && lastNodeKey.length > 0) {
          // console.log('lastNodeKey====', lastNodeKey)
          let n = this.timeNodes[lastNodeKey]
          lastNodeKey = n.last
          date = this.nodeDateByKey(lastNodeKey)
        }
        return date
      }
      //当没有上级节点 返回当前时间
      // date = Moment(new Date()).format('YYYY-MM-DD')
      date = ''
      return date
    },
    nextNodeDate(node) {
      let nextNodeKey = node.next
      let date = ''
      if (nextNodeKey && nextNodeKey.length > 0) {
        date = this.nodeDateByKey(nextNodeKey)
        while ((!date || date.length == 0) && nextNodeKey.length > 0) {
          let n = this.timeNodes[nextNodeKey]
          nextNodeKey = n.next
          date = this.nodeDateByKey(nextNodeKey)
        }
        return date
      }
      //时间不限
      return date
    },
    nodeDateByKey(key) {
      //通过节点获取时间
      if (key == 'PM') {
        return ''
      } else if (key == 'pepPp') {
        return ''
      } else if (key == 'pepPd') {
        return this.formData.pepPd
      } else if (key == 'pepPf') {
        return this.formData.pepPf
      } else if (key == 'pepKf') {
        return this.formData.pepKf
      } else if (key == 'pepPlf') {
        return this.formData.pepPlf
      } else if (key == 'pepBf') {
        return this.formData.pepBf
      } else if (key == 'pepLf') {
        return this.formData.pepLf
      } else if (key == 'pepVff') {
        return this.formData.pepVff
      } else if (key == 'pepPvs') {
        return this.formData.pepPvs
      } else if (key == 'pepOs') {
        return this.formData.pepOs
      } else if (key == 'pepSop') {
        return this.formData.pepSop
      } else if (key == 'pepMe') {
        return this.formData.pepMe
      } else {
        return ''
      }
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
