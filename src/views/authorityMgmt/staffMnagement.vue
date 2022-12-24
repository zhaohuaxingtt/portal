<template>
  <div>
    <iPage>
      <pageHeader>
        <span>{{ language('员工') }} {{ this.formData.nameZh }}</span>
      </pageHeader>
      <div class="Main">
        <!-- 搜索条件 -->
        <div class="SearchMenu">
          <div class="SearchOptions margin-bottom20" :loading="saveLoading">
            <!-- hiddenRight -->
            <Fold
              :btnList="btnList"
              :foldName="$t('staffManagement.BASICINFORMATION')"
              @handleType="handleActions"
            >
              <el-form
                label-position="left"
                label-width="80px"
                :model="formData"
                :rules="rules"
                ref="ruleForm"
                class="addUser-form"
              >
                <el-row type="flex" :gutter="30" justify="space-between">
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.EMPLOYEENUMBER')"
                      class="SearchOption"
                      prop="userNum"
                    >
                      <iInput
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class=""
                        v-model="formData.userNum"
                        disabled
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('中文名')"
                      class="SearchOption"
                      prop="nameZh"
                    >
                      <iInput
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class=""
                        v-model="formData.nameZh"
                        :disabled="isEdit"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.ENGLISHNAME')"
                      class="SearchOption"
                      prop="nameEn"
                    >
                      <iInput
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class="eng-name"
                        v-model="formData.nameEn"
                        :disabled="isEdit"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.SEX')"
                      class="SearchOption"
                    >
                      <iSelect
                        :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                        disabled
                        class="selectWidth"
                        v-model="formData.gender"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="30" justify="space-between">
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.DEPARTMENT')"
                      class="SearchOption"
                    >
                      <orgSearch
                        v-model="formData.department"
                        :default-options="defaultDeptOptions"
                        :disabled="isEdit"
                        @change="handleChangeDept"
                      />
                      <!-- <iSelect
                        :placeholder="$t('staffManagement.DEPARTMENT')"
                        v-model="formData.department"
                        :disabled="isEdit"
                        filterable
                        @change="handleChangeDept"
                      >
                        <el-option
                          v-for="item in organizationMenu"
                          :key="item.id"
                          :label="item.nameZh"
                          :value="item.id"
                        >
                        </el-option>
                      </iSelect> -->
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.JOBS')"
                      class="LastSearchOption"
                    >
                      <iSelect
                        :placeholder="language('请选择岗位')"
                        v-model="positionListId"
                        clearable
                        @change="jobChange"
                        :disabled="isEdit"
                      >
                        <el-option
                          v-for="item in positionListDrpList"
                          :key="item.id"
                          :label="item.fullNameZh"
                          :value="item.id"
                        >
                        </el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.OTHERJOBS')"
                      class="LastSearchOption"
                    >
                      <iInput :value="otherPositionId" disabled />
                      <!-- <iSelect
                        :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                        class="selectWidth"
                        multiple
                        collapse-tags
                        :disabled="isDeptOther"
                        @change="selectPositionChange"
                        v-model="otherPositionId"
                      >
                        <el-option
                          v-for="item in allPositionList"
                          :key="item.id"
                          :label="item.fullNameZh"
                          :value="item.id"
                        >
                        </el-option>
                      </iSelect> -->
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.STATEEMPLOYEES')"
                      class="LastSearchOption"
                    >
                      <iSelect
                        :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                        v-model="formData.status"
                        :disabled="isEdit"
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
                <el-row type="flex" :gutter="30" justify="space-between">
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.EMAIL')"
                      class="LastSearchOption"
                    >
                      <!-- <iInput
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class=""
                        v-model="formData.email"
                        disabled
                      /> -->
                      <i-text class="text-cell">{{ desensitizationEmail(formData.email) }}</i-text>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.MOBILEPHONE')"
                      class="LastSearchOption"
                    >
                      <iInput
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class=""
                        v-model="formData.mobile"
                        v-if="!isEdit"
                      />
                      <i-text v-else class="text-cell">{{ desensitizationPhone(formData.mobile) }}</i-text>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.PHONE')"
                      class="LastSearchOption"
                    >
                      <iInput
                      v-if="!isEdit"
                        :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                        class=""
                        v-model="formData.phone"
                      />
                      <i-text v-else class="text-cell">{{ desensitizationPhone(formData.phone) }}</i-text>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6">
                    <iFormItem
                      :label="$t('staffManagement.ATTRIBUTE')"
                      class="LastSearchOption"
                    >
                      <iSelect
                        :placeholder="$t('staffManagement.ATTRIBUTE')"
                        v-model="formData.property"
                        :disabled="isEdit"
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
              </el-form>
              <el-form label-position="left" label-width="80px">
                <el-row :gutter="30" justify="space-between">
                  <el-col :span="6" v-if="isPositionLead">
                    <iFormItem :label="$t('签名照')">
                      <uploadSign
                        :editable="!isEdit"
                        :signPic="formData.signPic"
                        :userInfo="formData"
                        @change="signPicChange"
                      />
                    </iFormItem>
                  </el-col>
                  <el-col :span="isPositionLead ? 18 : 24">
                    <iFormItem
                      style="width: 100%"
                      :label="$t('staffManagement.EMPLOYEESLABEL')"
                    >
                      <div class="tagform">
                        <div class="v-input">
                          <span
                            class="tag"
                            :class="{ readonly: isEdit }"
                            v-for="(item, index) in formData.tagList"
                            :key="index"
                          >
                            {{ item.name }}
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
            </Fold>
          </div>
          <!-- 默认采购列表 -->
          <purchaseGroup :positionIds="positionIds" />
          <!-- <div>
            <iCard :title="language('采购组列表')" collapse>
              <div class="OrganizationTable">
                <iTableCustom
                  :loading="tableLoadingGroup"
                  :data="tempPurchaseGroup"
                  :columns="tempPurchaseGroupSet"
                />
              </div>
            </iCard>
          </div> -->
          <!-- 上下级列表 -->
          <div class="OrganizationListContainer">
            <iCard>
              <Fold
                :foldName="
                  $t('staffManagement.SUPERIOR_AND_SUBORDINATE_INFORMATION')
                "
              >
                <div class="OrganizationTable">
                  <iTableCustom
                    :loading="tableLoading"
                    :data="tableListData"
                    :columns="levelSetting"
                    :isColSpan="true"
                    :span-method="getSpanMethod"
                  />
                </div>
              </Fold>
            </iCard>
          </div>
          <!-- 角色信息 -->
          <div class="RoleListContainer">
            <iCard>
              <Fold :foldName="$t('staffManagement.ROLEOFINFORMATION')">
                <div class="OrganizationTable">
                  <iTableCustom
                    :loading="tableLoading"
                    :data="tableListData2"
                    :columns="roleTableSetting"
                    :isColSpan="true"
                    :span-method="getSpanMethodRole"
                  />
                </div>
              </Fold>
            </iCard>
          </div>
        </div>
      </div>
    </iPage>
  </div>
</template>

<script>
import { iInput, iSelect, iPage, iCard, iFormItem, iMessage, iText } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { levelSetting, roleTableSetting, tempPurchaseGroupSet } from './data.js'
import pageHeader from '@/components/pageHeader'
import Fold from './components/folding'
import { detail, update } from '@/api/authorityMgmt'
import { positionList, getPosition, purchasegroup } from '@/api/authorityMgmt'
import { orgSelect } from '@/components/remoteSelect'
import { debounce } from 'vue-debounce'
import uploadSign from './components/uploadSignCutter'
import purchaseGroup from './components/purchaseGroup'
import { desensitizationPhone, desensitizationEmail } from "@/utils";
export default {
  components: {
    iInput,
    iSelect,
    iPage,
    iCard,
    iTableCustom,
    pageHeader,
    // iPagination,
    Fold,
    iFormItem,
    orgSearch: orgSelect,
    uploadSign,
    purchaseGroup,
    iText
  },
  computed: {
    isPositionLead() {
      if (this.formData.positionList && this.formData.positionList.length > 0) {
        return this.formData.positionList[0].isDeptLead
      }
      return false
    },
    positionIds() {
      const positionList = this.formData?.positionList || []
      if (positionList) {
        return positionList.map((e) => e.id)
      }
      return []
    }
  },
  data() {
    return {
      levelSetting: levelSetting,
      roleTableSetting: roleTableSetting,
      tempPurchaseGroupSet: tempPurchaseGroupSet,
      tableListData: [],
      tableListData2: [],
      formData: {},
      positionListId: '',
      positionListDrpList: [],
      foldName: '基本信息',
      btnList: [{ name: '编辑', type: 'edit' }],
      saveLoading: false,
      isEdit: true,
      organizationMenu: [],
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
      sexOptions: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      tagList: '',
      departmentVal: '',
      roleListLength: 1,
      levelListLength: 1,
      tempPurchaseGroup: [],
      debounceFn: debounce((val) => this.positionDetail(val), '700ms'),
      tagListString: '',
      isDeptOther: true,
      tableLoadingGroup: false,
      tableLoading: false,
      rules: {
        nameZh: [{ required: true, message: '请输入中文名', trigger: 'blur' }]
      },
      defaultDeptOptions: [],
      otherPositionId: ''
    }
  },
  created() {
    if (this.$route.query.tagList) {
      // 回填按钮状态
      this.btnList = [
        { name: '确认', type: 'sure' },
        { name: '重置', type: 'reset' },
        { name: '取消', type: 'cancel' }
      ]
      this.isEdit = false
      // 回填新增的最后一个标签
      if (
        this.$route.query.tagList !== null &&
        this.$route.query.tagList.length > 0 &&
        this.$route.query.tagList[this.$route.query.tagList.length - 1].type ==
          '2'
      ) {
        this.tagList =
          this.$route.query.tagList[this.$route.query.tagList.length - 1].name
      } else {
        this.tagList = ''
      }
      this.formData = this.$route.query
      // 员工状态，属性 string 转 int
      if (this.formData.status) {
        this.$route.query.status === 'true'
          ? (this.formData.status = true)
          : (this.formData.status = false)
      }
      if (this.formData.property) {
        this.formData.property = parseInt(this.formData.property)
      }
      // 初始化岗位
      if (this.$route.query.deptDTO !== null) {
        if (this.formData.positionList && this.formData.positionList.length) {
          this.positionListId = this.formData.positionList[0].id
        }

        this.getPositionCommonFn(this.$route.query.deptDTO.id)
        const deptDTO = this.$route.query.deptDTO
        this.defaultDeptOptions = [
          {
            id: deptDTO.id + '',
            nameZh: deptDTO.nameZh
          }
        ]
      }
      // 回填采购组列表信息
      if (
        this.$route.query.positionList !== null &&
        this.$route.query.positionList.length > 0
      ) {
        let reqData = []
        this.$route.query.positionList.map((x) => {
          return reqData.push(x.id)
        })
        this.debounceFn(reqData) //去抖函数
      }
      // 标签String字段
      if (this.$route.query.tagList.length > 0) {
        let str = []
        this.$route.query.tagList.map((tag) => {
          return str.push(tag.name)
        })
        this.tagListString = str.join(',')
      }
      // 角色，上下级
      this.tableListData2 = this.formData.level
      this.tableListData = this.formData.role
    } else {
      this.getDetail()
    }
  },
  methods: {
    desensitizationPhone,
    desensitizationEmail,
    getDetail() {
      this.tableLoading = true
      detail({ ...this.$route.query }).then((res) => {
        this.tableLoading = false //loading
        this.departmentVal = res.data.department //初始化部门字段
        if (
          res.data.positionList !== null &&
          res.data.positionList.length > 0
        ) {
          //回填岗位
          const selfPosition = res.data.positionList.filter((e) => e.type === 1)
          const otherPosition = res.data.positionList.filter(
            (e) => e.type !== 1
          )
          if (selfPosition.length > 0) {
            this.positionListId = selfPosition[0].id
          }
          if (otherPosition.length > 0) {
            this.otherPositionId = otherPosition
              .map((e) => e.fullNameZh)
              .join(',')
          }
          //this.positionListId = res.data.positionList[0].id
          // res.data.positionList.map(x=>{return this.positionList.push(x.id)})
        }
        this.formData = { ...res.data }
        let resLeng = res.data.tagList.length
        if (resLeng > 0 && res.data.tagList[resLeng - 1].type == 2) {
          //回填标签
          this.tagList = res.data.tagList[resLeng - 1].name
        } else {
          this.tagList = ''
        }
        // 初始化岗位
        if (res.data.deptDTO !== null && res.data.deptDTO.id) {
          this.defaultDeptOptions = [
            { id: res.data.deptDTO.id + '', nameZh: res.data.deptDTO.nameZh }
          ]
          this.getPositionCommonFn(res.data.deptDTO.id)
        }
        // 回填采购组列表信息
        if (
          res.data.positionList !== null &&
          res.data.positionList.length > 0
        ) {
          let reqData = []
          res.data.positionList.map((x) => {
            return reqData.push(x.id)
          })
          //去抖函数
          this.debounceFn(reqData)
        }
        if (res.data.gender === 'male' || res.data.gender === '男') {
          this.formData.gender = '1'
        }
        if (res.data.gender === 'female' || res.data.gender === '女') {
          this.formData.gender = '2'
        }
        //上下级信息表格数据格式拼接
        res.data.subUserList == null ? (res.data.subUserList = []) : ''
        res.data.supUserList == null ? (res.data.supUserList = []) : ''
        this.tableListData = []
        let subUserList = []
        let supUserList = []
        if (res.data.subUserList.length > 0) {
          res.data.subUserList.forEach((x) => {
            subUserList.push({
              ...x,
              levelName: '下级',
              status: x.status ? '有效' : '无效',
              updateDate: x.updateDate ? x.updateDate.substring(0, 10) : ''
            })
          })
        }
        if (res.data.supUserList.length > 0) {
          res.data.supUserList.forEach((x) => {
            supUserList.push({
              ...x,
              levelName: '上级',
              status: x.status ? '有效' : '无效',
              updateDate: x.updateDate ? x.updateDate.substring(0, 10) : ''
            })
          })
        }
        //下级
        supUserList.forEach((e, index) => {
          if (index === 0) {
            e.rowspan = supUserList.length
          } else {
            e.rowspan = 0
          }
        })
        subUserList.forEach((e, index) => {
          if (index === 0) {
            e.rowspan = subUserList.length
          } else {
            e.rowspan = 0
          }
        })
        this.tableListData = supUserList.concat(subUserList)
        // 角色数据结构
        if (res.data.roleList.length > 0) {
          this.tableListData2 = []
          let baseRole = []
          let hightRole = []
          res.data.roleList.forEach((x) => {
            //角色表格数据结构
            if (x.level == '1') {
              baseRole.push({ ...x, roleName: '基础角色' })
            } else {
              hightRole.push({ ...x, roleName: '高级角色' })
            }
          })

          baseRole.forEach((e, index) => {
            if (index === 0) {
              e.rowspan = baseRole.length
            } else {
              e.rowspan = 0
            }
          })
          hightRole.forEach((e, index) => {
            if (index === 0) {
              e.rowspan = hightRole.length
            } else {
              e.rowspan = 0
            }
          })
          this.tableListData2 = hightRole.concat(baseRole)
        } else {
          this.tableListData2 = []
        }
        // 标签String字段
        if (res.data.tagList.length > 0) {
          let str = []
          res.data.tagList.map((tag) => {
            return str.push(tag.name)
          })
          this.tagListString = str.join(',')
        }
      })
    },
    positionDetail(slectArray) {
      // 循环查询岗位详情
      slectArray.forEach((x) => {
        this.getGroup(x)
      })
    },
    reset() {
      this.$router.push('/labels')
    },
    sure() {},
    getColumnFn(val) {
      return { rowspan: 2, colspan: 1 }
    },
    getColumnFn2(val) {
      return { rowspan: val, colspan: 1 }
    },
    handleActions(x) {
      if (x == 'edit') {
        this.btnList = [
          { name: '确认', type: 'sure' },
          { name: '重置', type: 'reset' },
          { name: '取消', type: 'cancel' }
        ]
        this.isEdit = false
      }
      if (x == 'cancel') {
        // this.btnList=[{name:'编辑',type:'edit'}]
        // this.isEdit=true
        this.$router.push('/authorityMgmt/index')
      }
      if (x == 'sure') {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.handleSave()
          }
        })
      }
      if (x == 'reset') {
        this.getDetail()
      }
    },
    handleSave() {
      this.saveLoading = true
      update(this.formData)
        .then((res) => {
          if (res.code == 200) {
            // this.go(-1)
            this.isEdit = true
            this.btnList = [{ name: '编辑', type: 'edit' }]
            iMessage.success(res.desZh || '更新成功')
          } else {
            iMessage.error(res.desZh || '更新失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '更新失败')
        })
        .finally(() => {
          this.saveLoading = false
        })
    },
    handleChangeDept(id, options) {
      this.positionList = []
      options.forEach((x) => {
        if (x.id == id) {
          this.departmentVal = x.nameZh
          this.formData.department = x.nameZh
          this.formData.deptDTO = { ...x }
        }
      })
      this.getPositionCommonFn(id)
    },
    // 更具当前部门获取岗位
    getPositionCommonFn(id) {
      positionList({ deptId: id }).then((res) => {
        this.positionListDrpList = res.data
        if (res.data.length === 0) {
          this.formData.positionList = []
          this.positionListId = ''
        }
      })
    },
    jobChange(val) {
      //岗位+其它岗位合并查询采购组
      let queryData = []
      queryData.push(val)
      //queryData=queryData.concat("其它岗位的数据")

      // 更新岗位数据
      if (queryData.length > 0) {
        this.formData.positionList = []
        queryData.map((x) => {
          return this.positionListDrpList.filter((y) => {
            return y.id == x ? this.formData.positionList.push(y) : ''
          })
        })
      }
      if (queryData.length < 1) {
        this.formData.positionList = []
      }

      this.tempPurchaseGroup = [] //初始化采购组列表
      this.debounceFn(queryData) //去抖函数
    },
    handlelabels() {
      if (!this.isEdit) {
        this.$router.push({
          path: '/addLabel',
          query: {
            addData: this.formData,
            isEdit: true,
            role: this.tableListData,
            level: this.tableListData2
          }
        })
      }
    },
    getGroup(val) {
      getPosition(val).then((res) => {
        if (res.code == 200) {
          this.formData.roleList = res.data?.roleDTOList || []
          this.formData.subUserList = res.data?.subUserList || []
          this.formData.supUserList = res.data?.supUserList || []
          if (!res.data.tempPurchaseGroup) return
          this.tableLoadingGroup = true
          if (res.data.tempPurchaseGroup) {
            purchasegroup(res.data.tempPurchaseGroup).then((res) => {
              this.tableLoadingGroup = false
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
      if (!this.isEdit) {
        this.formData.tagList.splice(index, 1)
      }
    },
    getSpanMethod({ row, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.rowspan > 0 ? 1 : 0
        }
      }
    },
    getSpanMethodRole({ row, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.rowspan > 0 ? 1 : 0
        }
      }
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
.LastSearchOption {
  margin-top: 0;
}
.Main {
  width: 100%;
}
.OrganizationListContainer {
  margin-top: 20px;
}
.RoleListContainer {
  margin: 20px 0px 80px 0px;
}
.OrganizationTable {
  margin-top: 20px;
}

.OperationButtonContainer {
  display: flex;
  justify-content: flex-end;
}
.SearchOptions {
  margin-top: 20px;
  background-color: #fff;
  padding: 30px 40px;
}

::v-deep.el-form {
  .el-form-item__label {
    margin-bottom: 0 !important;
  }
  .el-input__inner {
    width: calc(100%);
  }
}
::v-deep.content {
  .app-content {
    overflow-y: scroll;
  }
}

::v-deep.el-select {
  .el-select__tags {
    overflow: hidden;
  }
  .el-select__tags {
    .el-tag {
      max-width: calc(100% - 68px);
      display: inline-block;
      overflow: hidden;
    }
  }
}
.tagform {
  display: flex;
  justify-content: space-between;
  // .lab {
  //   width: 100px;
  // }
  .v-input {
    width: calc(100%);
    min-height: 40px;
    padding: 0px 20px 5px 10px;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border-color: transparent;
    position: relative;
    border-radius: 4px;
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

      &.readonly {
        background: #f7f7f7;
        border-color: #f7f7f7;
        color: #41434a;
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
.routerpage {
  height: calc(100vh - 50px);
}
.eng-name {
  ::v-deep .el-input__inner {
    text-transform: capitalize;
  }
}
// iText 模拟 iInput 样式
.text-cell{
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #DCDFE6;
  box-shadow: 0 0 3px rgba(0,38,98,0.15);
  padding-left: 20px;
  text-align: left;
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #C0C4CC;
  cursor: not-allowed;
}
// ::v-deep.el-table tr:nth-child(even){
//   background-color: #fff;
// }
</style>
