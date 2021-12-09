<template>
  <iPage class="template">
    <pageHeader>
      <span>{{ $t('staffManagement.NEW_EMPLOYEE') }}</span>
      <div slot="actions">
        <actionButtons
          :selected-rows="selectedRows"
          @add="handleAdd"
          @reset="handleReset"
        ></actionButtons>
      </div>
    </pageHeader>
    <iCard :title="$t('staffManagement.BASICINFORMATION')" collapse>
      <el-form
        label-position="left"
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        class="addUser-form"
      >
        <el-row :gutter="30">
          <el-col :span="6">
            <iFormItem
              :label="$t('staffManagement.EMPLOYEENUMBER')"
              prop="userNum"
            >
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.userNum"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('中文名')" prop="nameZh">
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.nameZh"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.ENGLISHNAME')" prop="nameEn">
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.nameEn"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.SEX')">
              <iSelect
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                v-model="formData.gender"
              >
                <el-option
                  v-for="item in sex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.DEPARTMENT')">
              <orgSearch v-model="departmentVal" @change="selectChange" />
              <!-- <iSelect
                v-model="departmentVal"
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                filterable
                @change="selectChange"
              >
                <el-option
                  v-for="item in organizationMenu"
                  :key="item.value"
                  :label="item.nameZh"
                  :value="item.id"
                >
                </el-option>
              </iSelect> -->
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.JOBS')">
              <iSelect
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                :disabled="isDept"
                clearable
                @change="selectPositionChange"
                v-model="formData.positionListVal"
                style="width: 100%"
              >
                <el-option
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.fullNameZh"
                  :value="item.id"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.OTHERJOBS')">
              <iSelect
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                multiple
                collapse-tags
                :disabled="isDeptOther"
                @change="selectPositionChange"
                v-model="formData.otherPositionList"
              >
                <el-option
                  v-for="item in allPositionList"
                  :key="item.id"
                  :label="item.fullNameZh"
                  :value="item.id"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.STATEEMPLOYEES')">
              <iSelect
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                v-model="formData.status"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.EMAIL')">
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.email"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.MOBILEPHONE')">
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.mobile"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.PHONE')">
              <iInput
                :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                v-model="formData.phone"
                class="addUser-form-input-width"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="$t('staffManagement.ATTRIBUTE')">
              <iSelect
                :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                class="selectWidth"
                v-model="formData.property"
              >
                <el-option
                  v-for="item in property"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6" v-if="isPostionLead">
            <iFormItem :label="$t('签名照')">
              <uploadSign
                editable
                :signPic="formData.signPic"
                :userInfo="formData"
                @change="signPicChange"
              />
            </iFormItem>
          </el-col>

          <el-col :span="isPostionLead ? 18 : 24">
            <iFormItem :label="$t('staffManagement.EMPLOYEESLABEL')">
              <div class="tagform">
                <div class="v-input">
                  <span
                    class="tag"
                    v-for="(item, index) in formData.tagList"
                    :key="index"
                  >
                    {{ item.name }} {{ isEdit }}
                    <i
                      v-if="!isEdit"
                      class="el-tag__close el-icon-close"
                      @click="handleDeleteTags(index)"
                    ></i>
                  </span>
                  <i
                    slot="suffix"
                    class="el-icon-circle-plus-outline addTag"
                    style="cursor: pointer"
                    @click="handlelabels"
                  />
                </div>
              </div>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </iCard>
    <iCard style="margin-top: 20px">
      <!-- <h2>默认采购组列表</h2> -->
      <h2>{{ $t('staffManagement.DEFAULTPURCHASEGROUPLIST') }}</h2>
      <div class="OrganizationTable">
        <iTableCustom
          :loading="tableLoading"
          :data="tempPurchaseGroup"
          :columns="tempPurchaseGroupSet"
        />
      </div>
    </iCard>
    <!-- <iSearch>
        <iCard>
            <h2>{{$t('staffManagement.SUPERIOR_AND_SUBORDINATE_INFORMATION')}}</h2>
            <el-form label-width="100px" :label-position="labelPosition" :inline="true">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item :label="$t('staffManagement.SUPERIOR_INFORMATION')">
                    <i-input :disabled="isEditFromData"></i-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('staffManagement.SUBORDINATE_INFORMATION')">
                    <i-input :disabled="isEditFromData"></i-input>
                  </el-form-item>
                </el-col>
              </el-row>
             </el-form> 
      </iCard>
      </iSearch> -->
  </iPage>
</template>

<script>
import { iInput, iSelect, iPage, iCard, iFormItem, iMessage } from 'rise'
import pageHeader from '@/components/pageHeader'
import actionButtons from './components/actionButtons'
import iTableCustom from '@/components/iTableCustom'
import { tempPurchaseGroupSet } from './data.js'
import { tableSetting, exportTableSetting } from './data1.js'
import {
  addUser,
  positionList,
  getPosition,
  purchasegroup
} from '@/api/authorityMgmt'
import { orgSelect } from '@/components/remoteSelect'
import { debounce } from 'vue-debounce'
import uploadSign from './components/uploadSignCutter'
export default {
  components: {
    iPage,
    pageHeader,
    iCard,
    iInput,
    actionButtons,
    iSelect,
    iTableCustom,
    iFormItem,
    orgSearch: orgSelect,
    uploadSign
  },
  computed: {
    isPostionLead() {
      const positionId = this.formData.positionListVal
      const position = this.positionList.find((e) => e.id === positionId)
      if (position) {
        return position.isDeptLead
      }
      return false
    }
  },
  data() {
    return {
      labelPosition: 'left',
      tableSetting: tableSetting,
      exportTableSetting: exportTableSetting,
      tempPurchaseGroupSet: tempPurchaseGroupSet,
      isDept: true,
      sex: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      status: [
        {
          value: true,
          label: '有效'
        },
        {
          value: false,
          label: '无效'
        }
      ],
      property: [
        {
          value: 1,
          label: '中方'
        },
        {
          value: 2,
          label: '外方'
        }
      ],
      isShowCall: false,
      formData: {
        positionList: [],
        positionListVal: '',
        signPic: {
          name: '',
          path: '',
          size: 0,
          type: 1,
          extensionName: 'jpg',
          isTemp: false,
          businessId: 0,
          createDate: null,
          createBy: null,
          updateBy: null,
          updateDate: null,
          createUserName: '',
          updateUserName: null
        }
      },
      positionList: [],
      tagList: '', //员工标签
      organizationMenu: [],
      isEditFromData: true,
      departmentVal: '',
      tempPurchaseGroup: [],
      debounceFn: debounce((val) => this.positionDetail(val), '700ms'),
      tagListString: '',
      allPositionList: [],
      onlyPosition: [],
      otherPosition: [],
      isDeptOther: true,
      rules: {
        userNum: [{ required: true, message: '请输入员工号', trigger: 'blur' }],
        nameZh: [{ required: true, message: '请输入中文名', trigger: 'blur' }]
      }
    }
  },
  created() {
    console.log(this.$route.query)
    // 其它岗位数据
    positionList({}).then((res) => {
      //岗位下拉信息
      this.allPositionList = res.data
    })
    const tagList = this.$route.query.tagList
    //回填新增列表信息
    if (tagList) {
      if (tagList[tagList.length - 1].type == 2) {
        this.tagList = tagList[tagList.length - 1].name
      } else {
        this.tagList = ''
      }
      this.formData = this.$route.query
    }
    // 标签String字段
    if (tagList && tagList.length > 0) {
      let str = []
      tagList.map((tag) => {
        return str.push(tag.name)
      })
      this.tagListString = str.join(',')
    }
    // 员工状态，属性 string 转 int
    if (this.formData.status) {
      this.$route.query.status === 'true'
        ? (this.formData.status = true)
        : (this.formData.status = false)
    }
    if (this.formData.property) {
      this.formData.property = parseInt(this.formData.property)
    }
    // 主要岗位string 转 int
    if (this.$route.query.positionListVal) {
      this.formData.positionListVal = parseInt(this.formData.positionListVal)
    }
    // 其它岗位
    // if(this.$route.query.positionListVal.length>0){
    //   this.formData.positionListVal=this.formData.positionListVal.map(Number);
    // }
    // 回填采购组信息
    this.departmentVal = this.formData?.deptDTO?.nameZh || ''
    if (this.formData?.deptDTO?.id) {
      this.isDept = false
      positionList({ deptId: this.formData.deptDTO.id }).then((res) => {
        //岗位下拉信息
        this.positionList = res.data
      })
    }
    // this.positionListVal=this.formData.positionList[0].fullNameZh
    // 循环请求采购组接口
    let totalData = []
    totalData = totalData.concat(
      this.formData.positionListVal,
      this.otherPosition
    )
    if (totalData.length > 0) {
      totalData.forEach((x) => {
        this.getGroup(x)
      })
    }
  },
  methods: {
    handleAdd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addUser(this.formData)
            .then((res) => {
              // this.$router.push('/authorityMgmt/index')
              if (res.code == 200) {
                // this.go(-1)
                iMessage.success(res.desZh || '创建成功')
              } else {
                iMessage.error(res.desZh || '创建失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.desZh || '创建失败')
            })
        }
      })
    },
    handleReset() {
      this.formData = {}
      this.tempPurchaseGroup = []
      this.tagListString = ''
      this.formData.positionListVal = ''
    },
    selectChange(id, options) {
      this.isDept = false
      this.formData.positionListVal = []
      options.forEach((x) => {
        if (x.id == id) {
          this.departmentVal = x.nameZh
          this.formData.department = x.nameZh
          this.formData.deptDTO = { ...x }
        }
      })
      positionList({ deptId: id }).then((res) => {
        //岗位下拉信息
        this.positionList = res.data
      })
    },
    selectPositionChange(val) {
      let totalData = []
      this.onlyPosition = []
      this.onlyPosition.push(val)
      //合并单个岗位和其它岗位的数据
      totalData = totalData.concat(this.onlyPosition, this.otherPosition)
      this.formData.positionList = []
      // 主岗位数据
      this.positionList.forEach((x) => {
        x.id == val ? this.formData.positionList.push(x) : ''
      })
      this.tempPurchaseGroup = [] //初始化采购组列表
      this.debounceFn(totalData) //去抖函数
    },
    positionDetail(slectArray) {
      // 循环查询岗位详情
      slectArray.forEach((x) => {
        this.getGroup(x)
      })
    },
    handlelabels() {
      this.$router.push({
        path: '/addLabel',
        query: { addData: this.formData, isEdit: false }
      })
    },
    getGroup(val) {
      getPosition(val).then((res) => {
        if (res.code == 200 && res.data) {
          this.formData.roleList = res.data.roleDTOList
          this.formData.subUserList = res.data.subUserList
          this.formData.supUserList = res.data.supUserList
          if (res.data.tempPurchaseGroup) {
            purchasegroup(res.data.tempPurchaseGroup).then((res) => {
              if (res.code == 200 && res.data.length > 0) {
                res.data[0].isProvisionalPrice
                  ? (res.data[0].provisionalPriceZh = '是')
                  : (res.data[0].provisionalPriceZh = '否')
                this.tempPurchaseGroup.push(res.data[0])
              }
            })
          }
        }
      })
    },
    handleDeleteTags(index) {
      this.formData.tagList.splice(index, 1)
    },
    signPicChange(val) {
      if (val) {
        this.formData.signPic = val
        this.formData.fileId = val.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ::v-deep.addUser-form {
  .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: calc(100% - 102px);
      .el-input {
        input {
          width: calc(100%);
        }
      }
    }
  }
} */

h2 {
  margin-bottom: 25px;
}
.icardBottom {
  margin-bottom: 20px;
}
// .selectWidth {
//   width: 115%;
// }

// .iSearch-content .serch .el-form-item {
//   width: 400px;
//   line-height: 50px;
// }
.OrganizationTable {
  margin-top: 20px;
}
.tagform {
  display: flex;
  justify-content: flex-start;
  .lab {
    width: 100px;
  }
  .v-input {
    width: 100%;
    min-height: 40px;
    padding: 0px 20px 5px 10px;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border-color: transparent;
    position: relative;
    .tag {
      background-color: #e8effe;
      border-color: #d1e0fd;
      color: #1763f7;
      margin-right: 10px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 5px;
      i {
        cursor: pointer;
      }
    }
    .addTag {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 16px;
      color: #ccc;
    }
  }
}
</style>
