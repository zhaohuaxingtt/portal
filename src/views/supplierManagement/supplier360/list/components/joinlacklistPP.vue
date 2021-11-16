<!--
 * @Author: caopeng
 * @Date: 2021-10-17 
-->
<template>
  <iDialog @close="closeDiolog()"
           title="加⼊⿊名单 - ⽣产采购"
           :visible.sync="value"
           width="85%"
           top="2%">
    <div class="box">
      <el-form inline
               :model="form"
               label-position="left"
               label-width="120px"
               :rules="rules"
               ref="form">
        <div class="formStyle">
          <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
            <iText style="min-width:240px"
                   class="text">{{
              clickTableList.nameZh
            }}</iText>
          </el-form-item>
          <el-form-item prop="categoryCodes"
                        :label="language('CAILIAOZU', '材料组')">
            <iSelect multiple
                     collapse-tags
                     filterable
                     @change="getStuffFitel"
                     style="width:240px"
                     :placeholder="language('QINGSHURUBIANHAOHUOMINGCHENG', '请输入编号或名称')"
                     v-model="form.categoryCodes">
              <el-option v-for="item in categoryArr"
                         :key="item.categoryCode"
                         :label="item.categoryName+'-'+item.categoryCode"
                         :value="item.categoryCode">
              </el-option>
            </iSelect>
            <!-- <custom-select style="width:240px"
                           v-model="form.categoryCodes"
                           :user-options="categoryArr"
                           multiple
                           clearable
                           @change="getStuffFitel"
                           :placeholder="language('QINGSHURUBIANHAOHUOMINGCHENG', '请输入编号或名称')"
                           display-member="categoryName"
                           value-member="categoryCode"
                           value-key="categoryCode">
              <template v-slot:selected="scope">
                <span>{{scope.data.categoryName}}+{{scope.data.categoryCode}}</span>
              </template>
              <template v-slot:unselected="scope">
                <span>{{scope.data.categoryName}}+{{scope.data.categoryCode}}</span>
              </template>
            </custom-select> -->

          </el-form-item>
          <el-form-item prop="ppStuffSaveDTOList"
                        :label="language('GONGYIZU', '工艺组')">
            <iSelect multiple
                     collapse-tags
                     filterable
                     style="width:240px"
                     :placeholder="language('QINGSHURUBIANHAOHUOMINGCHENG', '请输入编号或名称')"
                     v-model="form.ppStuffSaveDTOList">
              <el-option  v-for="item in stuffByArr"
                         :key="item.stuffCode"
                         :label="item.stuffName+'-'+item.stuffCode"
                         :value="item">
              </el-option>
            </iSelect>
            <!-- <custom-select style="width:240px"
                           v-model="form.ppStuffSaveDTOList"
                           :user-options="stuffByArr"
                           multiple
                           clearable
                           :placeholder="language('QINGSHURUBIANHAOHUOMINGCHENG', '请输入编号或名称')"
                           display-member="stuffName"
                           value-member="stuffCode"
                           value-key="stuffCode">
            </custom-select> -->
          </el-form-item>
          <el-form-item prop="daterange"
                        :label="language('SHOUKONGQIZHISHIJIAN', '受控起止时间')">

            <iDatePicker :picker-options="pickerOptions"
                         style="width:240px"
                         type="daterange"
                         :range-separator="$t('SUPPLIER_ZHI')"
                         :placeholder="''"
                         v-model="form.daterange"
                         value-format="yyyy-MM-dd"
                         clearable />
          </el-form-item>
          <el-form-item prop="preDeptId"
                        v-if="userType=='LINIE'"
                        :label="language('KESHI', '科室')">
            <iSelect style="width:240px"
                     filterable
                     @change="changeData($event,'keshi')"
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.preDeptId">
              <el-option v-for="item in prePurchaseDeptArr"
                         :key="item.deptId"
                         :label="item.deptName"
                         :value="item.deptId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item prop="linieDeptId"
                        v-if="userType=='PRE'"
                        :label="language('LINIEKESHI', 'LINIE科室')">
            <iSelect style="width:240px"
                     filterable
                     @change="changeData($event,'liniekeshi')"
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.linieDeptId">
              <el-option v-for="item in liniePurchaseDeptArr"
                         :key="item.linieDeptId"
                         :label="item.linieDeptName"
                         :value="item.linieDeptId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item prop="purchaserId"
                        v-if="userType=='LINIE'"
                        :label="language('QIANQICAIGOUYUAN', '前期采购员')">
            <iSelect style="width:240px"
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     filterable
                     @change="changeData($event,'cgy')"
                     v-model="form.purchaserId">
              <el-option v-for="item in prePurchaseArr"
                         :key="item.purchaserId"
                         :label="item.purchaserName"
                         :value="item.purchaserId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item prop="liniePurchaserId"
                        v-if="userType=='PRE'"
                        :label="language('LINIECAIGOUYUAN', 'LINIE采购员')">
            <iSelect style="width:240px"
                     filterable
                     @change="changeData($event,'liniecgy')"
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.liniePurchaserId">
              <el-option v-for="item in liniePurchaseArr"
                         :key="item.liniePurchaserId"
                         :label="item.liniePurchaserName"
                         :value="item.liniePurchaserId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item prop="measures"
                        :label="language('SHOUKONGCUOSHI', '受控措施')">
            <iSelect style="width:240px"
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.measures">
              <el-option v-for="item in measuresList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
        </div>

        <div>
          <div class="section-box">
            <span>{{ language('JIARUYUANYINA', '加入原因') }}
              <span style="color:red">*</span></span>
          </div>
          <div>
            <iInput :placeholder="
                language('QINGSHURUCHULIXIANGQING', '请输入处理详情…')
              "
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                    v-model="form.reason"></iInput>
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
let that
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
import {
  listStuffByCategory,
  ppSupplerBlackSave,
  prePurchaseList,
  categoryList,
  liniePurchaseList,
  getBuyerType,
//   prePurchaseDeptList,
  liniePurchaseDeptList
} from '@/api/supplier360/blackList'
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
      userType: '',
      form: {
        reason: '',
        daterange: [],
        purchaserId: '',
        liniePurchaserId: ''
      },
      selectDate: '',
      prePurchaseDeptArr: [],
      liniePurchaseDeptArr: [],
      prePurchaseArr: [],
      liniePurchaseArr: [],
      stuffByArr: [],
      categoryArr: [],
      measuresList: [
        {
          label: this.language('LK_BUKEXUNJIABUKEDINGDIAN', '不可询价不可定点'),
          value: 1
        },
        {
          label: this.language('LK_KEXUNJIABUKEDINGDIAN', '可询价不可定点'),
          value: 2
        }
      ],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime()
          if (maxDate) {
            this.selectDate = ''
          }
        },
        disabledDate(time) {
          if (that.selectDate !== '') {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      rules: {
        liniePurchaserId: [
          {
            required: true,
            message: 'LINIE采购员不能为空',
            trigger: 'blur'
          }
        ],
        linieDeptId: [
          {
            required: true,
            message: 'LINIE科室不能为空',
            trigger: 'blur'
          }
        ],
        preDeptId: [
          {
            required: true,
            message: '科室不能为空',
            trigger: 'blur'
          }
        ],
        purchaserId: [
          {
            required: true,
            message: '前期采购员不能为空',
            trigger: 'blur'
          }
        ],
        daterange: [
          {
            required: true,
            message: '受控时间不能为空',
            trigger: 'blur'
          }
        ],
        ppStuffSaveDTOList: [
          {
            required: true,
            message: '工艺组不能为空',
            trigger: 'blur'
          }
        ],
        categoryCodes: [
          {
            required: true,
            message: '材料组不能为空',
            trigger: 'blur'
          }
        ],
        measures: [
          {
            required: true,
            message: '受控措施不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  beforeCreate() {
    that = this
  },

  created() {
    let pramas = {}
    this.$nextTick(() => {
      getBuyerType(pramas).then((res) => {
        if (res && res.code == 200) {
          this.userType = res.data
          if (res.data == 'LINIE') {
            this.getprePurchase()
            // this.getprePurchaseDept()
          } else if (res.data == 'PRE') {
            //   this.getliniePurchase()
            this.getliniePurchaseDept()
          }
          this.getLinieList()
        } else iMessage.error
      })
    })
  },
  methods: {
    changeData(type, v) {
      switch (v) {
        case 'keshi':
          this.form.purchaserId = ''
          //科室名称
          this.form.deptName = this.prePurchaseDeptArr.find(
            (res) => res.deptId == type
          ).deptName
          this.getprePurchase()
          break
        case 'liniekeshi':
          this.form.liniePurchaserId = ''
          //linie科室名称
          this.form.linieDeptName = this.liniePurchaseDeptArr.find(
            (res) => res.linieDeptId == type
          ).linieDeptName
          this.getliniePurchase()
          break
        case 'cgy':
          //采购员名称
          this.form.purchaserName = this.prePurchaseArr.find(
            (res) => res.purchaserId == type
          ).purchaserName
          break
        case 'liniecgy':
          //linie采购员名称
          this.form.liniePurchaserName = this.liniePurchaseArr.find(
            (res) => res.liniePurchaserId == type
          ).liniePurchaserName
          break
        default:
          break
      }
      console.log(this.form)
    },
    // //前期采购员科室
    // getprePurchaseDept() {
    //   prePurchaseDeptList({
    //     supplierId: this.clickTableList.subSupplierId
    //   }).then((res) => {
    //     if (res && res.code == 200) {
    //       this.prePurchaseDeptArr = res.data
    //     }
    //   })
    // },
    //line采购员科室
    getliniePurchaseDept() {
      liniePurchaseDeptList({
        supplierId: this.clickTableList.subSupplierId
      }).then((res) => {
        if (res && res.code == 200) {
          this.liniePurchaseDeptArr = res.data
        }
      })
    },
    //前期采购员
    getprePurchase() {
      prePurchaseList({
        supplierId: this.clickTableList.subSupplierId
        // purchaserDeptId: this.form.preDeptId
      }).then((res) => {
        if (res && res.code == 200) {
          this.prePurchaseArr = res.data
          if (this.prePurchaseArr.length != 0) {
            this.form.purchaserId = this.prePurchaseArr[0].purchaserId
            this.form.purchaserName = this.prePurchaseArr[0].purchaserName
            this.form.preDeptId = this.prePurchaseArr[0].deptId
            this.form.deptName = this.prePurchaseArr[0].deptName
          }
          this.prePurchaseArr.forEach((res) => {
            this.prePurchaseDeptArr.push({
              deptId: res.deptId,
              deptName: res.deptName
            })
          })
        }
      })
    },
    //line采购员
    getliniePurchase() {
      liniePurchaseList({
        supplierId: this.clickTableList.subSupplierId,
        purchaserDeptId: this.form.linieDeptId
      }).then((res) => {
        if (res && res.code == 200) {
          this.liniePurchaseArr = res.data
        }
      })
    },
    //工艺组
    getStuffByList() {
      if (this.form.categoryCodes.length != 0) {
        listStuffByCategory({
          supplierId: this.clickTableList.subSupplierId,
          categoryCodes: this.form.categoryCodes
        }).then((res) => {
          if (res && res.code == 200) {
            this.stuffByArr = res.data
            this.form.ppStuffSaveDTOList = res.data
          }
        })
      }
    },
    //材料组
    getLinieList() {
      categoryList({ supplierId: this.clickTableList.subSupplierId }).then(
        (res) => {
          if (res && res.code == 200) {
            this.categoryArr = res.data
            this.form.categoryCodes = res.data.map((res) => {
              return res.categoryCode
            })
            this.getStuffByList()
          }
        }
      )
    },
    getStuffFitel() {
      this.form.ppStuffSaveDTOList = []
      this.stuffByArr = []
      this.getStuffByList()
    },
    //提交
    handleSub() {
      let params = {
        startTime: this.form.daterange[0],
        endTime: this.form.daterange[1],
        supplierId: this.clickTableList.subSupplierId,
        ...this.form
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
                params.daterange = undefined
                params.categoryCodes = undefined
                ppSupplerBlackSave(params).then((res) => {
                  if (res && res.code == 200) {
                    // this.$emit('closeDiolog',1)
                    iMessage.success(res.desZh)
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
.box {
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
