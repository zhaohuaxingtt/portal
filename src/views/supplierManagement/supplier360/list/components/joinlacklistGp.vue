<!--
 * @Author: caopeng
 * @Date: 2021-10-17
-->
<template>
  <!-- 生产供应商加入黑名单 -->
  <iDialog top="2%" @close="closeDiolog()" :visible.sync="value" width="85%">
    <div slot="title" class="headerTitle">
      <span>{{tabVal=='GP'?language('JIARUHEIMINGDANYIBANCAIGOU', '加入黑名单 - ⼀般采购'):language('JIARUHEIMINGDANGONGYONGCAIGOU', '加入黑名单 - 共用采购')}}</span>
      <!-- <span>加入黑名单 - ⼀般采购</span> -->
    </div>
    <div class="box">
      <el-form
        :rules="rules"
        :model="form"
        ref="form"
        inline
        label-position="left"
        label-width="120px"
      >
        <div class="formStyle">
          <el-form-item
            :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
          >
            <iText style="min-width: 240px" class="text">{{
              clickTableList.nameZh
            }}</iText>
          </el-form-item>
          <el-form-item :label="language('SHOUKONGCUOSHI', '受控措施')">
            <iText style="width: 240px" class="text">{{
              language('LK_BUKEXUNJIABUKEDINGDIAN', '不可询价不可定点')
            }}</iText>
          </el-form-item>
          <el-form-item
            prop="types"
            :label="language('SHOUKONGYEWULEIXING', '受控业务类型')"
          >
            <iSelect
              multiple
              collapse-tags
              :placeholder="language('请选择')"
              v-model="form.types"
              style="width: 240px"
            >
              <el-option
                v-for="item in typeList"
                :key="item.code"
                :label="item.message"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            prop="daterange"
            :label="language('SHOUKONGQIZHISHIJIAN', '受控起止时间')"
          >
            <iDatePicker
              :picker-options="pickerOptions"
              style="width: 240px"
              type="daterange"
              :range-separator="$t('SUPPLIER_ZHI')"
              :placeholder="''"
              v-model="form.daterange"
              value-format="yyyy-MM-dd"
              clearable
            />
          </el-form-item>
        </div>

        <div>
          <div class="section-box">
            <span
              >{{ language('JIARUYUANYINA', '加入原因') }}
              <span style="color: red">*</span></span
            >
          </div>
          <div>
            <iInput
              :placeholder="
                language('QINGSHURUCHULIXIANGQING', '请输入处理详情…')
              "
              type="textarea"
              maxlength="200"
              show-word-limit
              v-model="form.reason"
            ></iInput>
          </div>
        </div>
        <div class="footer">
          <i-button @click="handleSub">{{
            language('TIJIAO', '提交')
          }}</i-button>
        </div>
      </el-form>
    </div>
  </iDialog>
</template>

<script>
// let that
import {
  gpSupplierBlackSave,
  measuresTypeList,
  measuresTypeGPList
} from '@/api/supplier360/blackList'
import {
  iSelect,
  iMessage,
  iText,
  iDatePicker,
  iInput,
  iButton,
  iMessageBox,
  iDialog
} from 'rise'
export default {
  props: {
    clickTableList: { type: Object },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iText,
    iSelect,
    iDatePicker,
    iInput,
    iButton,
    iDialog
  },

  data() {
    return {
      form: {
        reason: '',
        types: [],
        daterange: []
      },
      selectDate: '',
      takeStepsContent: '',
      typeList: [],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime()
          if (maxDate) {
            this.selectDate = ''
          }
        },
        disabledDate(time) {
          // if (that.selectDate !== '') {
          return time.getTime() < Date.now() - 8.64e7
          // }
        }
      },
      rules: {
        daterange: [
          {
            required: true,
            message: '受控时间不能为空',
            trigger: 'blur'
          }
        ],
        types: [
          {
            required: true,
            message: '受控业务类型不能为空',
            trigger: 'blur'
          }
        ]
      },
      tabVal:""
    }
  },
  beforeCreate() {
    // that = this
  },
  created() {
    // this.$nextTick(() => {
    if(this.clickTableList.supplierType){
      this.tabVal = this.clickTableList.supplierType
    }
    this.getTypeList()
    // })
  },
  computed: {},
  methods: {
    //状态
    getTypeList() {
      let params = {
        supplierType: this.tabVal,
        supplierId:this.clickTableList.subSupplierId || ""
      }

      if(this.$route.path=="/supplier/supplierListGP" || this.$route.path=="/supplier/supplierListDis"){
        measuresTypeGPList(params).then((res) => {
          if (res && res.code == 200) {
            this.typeList = res.data
            if(res.data){
              this.form.types = res.data.map((res) => {
                return res.code
              })
            }
          }
        })
      }else{
        measuresTypeList(params).then((res) => {
          if (res && res.code == 200) {
            this.typeList = res.data
            if(res.data){
              this.form.types = res.data.map((res) => {
                return res.code
              })
            }
          }
        })
      }
    },
    //提交
    handleSub() {
      let params = {
        startTime: this.form.daterange[0],
        endTime: this.form.daterange[1],
        supplierId: this.clickTableList.subSupplierId,
        measures: 1,
        reason: this.form.reason,
        types: this.form.types
      }
      if (this.form.reason == '') {
        this.$message({
          type: 'warning',
          message: this.language('QINGSHURUBITIANXIANG', '请输入必填项')
        })
      } else {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.value = false
            iMessageBox(
              this.language(
                'SHIFOUQUERENJIARUHEIMINGDAN?',
                '是否确认加入黑名单？'
              ),
              this.language('TIJIAO', '提交'),
              {
                confirmButtonText: this.language('QUEREN', '确认'),
                cancelButtonText: this.language('QUXIAO', '取消')
              }
            )
              .then(async () => {
                gpSupplierBlackSave(params).then((res) => {
                  if (res && res.code == 200) {
                    iMessage.success(res.desZh)
                    this.$emit('closeDiolog', 1)
                  } else iMessage.error(res.desZh)
                })
              })
              .catch(() => {
                this.value = true
              })
          } else {
            this.$message({
              type: 'warning',
              message: this.language('QINGSHURUBITIANXIANG', '请输入必填项')
            })
          }
        })
      }
    },

    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    }
  }
}
</script>

<style lang="scss" scoped>
.headerTitle {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
.text {
  padding: 4px 20px;
}
.formStyle {
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e3e3;
}
.section-box {
  padding: 30px 0 20px;
  > span {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
::v-deep .el-textarea {
  height: 542px;
}
::v-deep .el-textarea .el-textarea__inner {
  height: 100%;
}
::v-deep .el-form--inline .el-form-item {
  width: 460px;
  margin-right: 50px;
  padding: 10px 0;
}
</style>
