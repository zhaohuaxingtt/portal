<template>
  <iPage class="template">
    <iDialog
      :visible.sync="dialogVisible"
      :title="$t('ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.TITLE')"
      destroy-on-close
      width="80vw"
    >
      <alertDownLevelOrgTable
        @getSelectedDownLevelOrg="getSelectedDownLevelOrg"
        :selectedDataList="formCommitData.supDeptList"
      >
      </alertDownLevelOrgTable>
    </iDialog>
    <div class="Main">
      <div class="Header">
        <div class="HeaderTitle">
          <span> {{ language(pageTitle) }} </span>
        </div>
        <div class="HeaderButtons">
          <iButton class="True" :loading="loading" @click="trueBtnClick">{{
            $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.TRUE_BTN')
          }}</iButton>
          <iButton class="ReSet" @click="resetOrg">{{
            $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.RESET_BTN')
          }}</iButton>
        </div>
      </div>
      <div class="CreateOrgTopOptions" v-loading="loading">
        <iCard class="CreateOrgTopCard">
          <div class="CreateOrgCard">
            <div class="Top">
              <el-form
                class="OrgOptionsFrom validate-required-form"
                enctype="multipart/form-data"
                label-position="left"
                :rules="rules"
                ref="orgForm"
                :model="formCommitData"
              >
                <el-row
                  class="OrgOptionFromOne"
                  :gutter="appearance.itemSpace"
                  label-position="left"
                  :span="24"
                >
                  <el-col :span="6" class="Col-One">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.UP_LEVEL')
                      "
                      :label-width="appearance.labelWidth"
                      class="Col-OneItem"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.parentName"
                        disabled="true"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Two">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_CODE')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-TwoItem"
                      prop="fullCode"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.fullCode"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Three">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_CN_NAME')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-ThreeItem"
                      prop="nameZh"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.nameZh"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Four">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_EN_NAME')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-FourItem"
                      prop="nameEn"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.nameEn"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                </el-row>
                <el-row
                  class="OrgOptionFromTwo"
                  :gutter="appearance.itemSpace"
                  :span="24"
                >
                  <el-col :span="6" class="Col-One">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_LEVEL')
                      "
                      :label-width="appearance.labelWidth"
                      class="Col-OneItem"
                      prop="level"
                    >
                      <i-select
                        :placeholder="language('请选择')"
                        v-model="formCommitData.level"
                      >
                        <el-option
                          v-for="item in downLevelCanSelectList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.name"
                        >
                        </el-option>
                      </i-select>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Two">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.SVCD_ORG_CODE')
                      "
                      class="Col-TwoItem"
                      :label-width="appearance.labelWidthThree"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.svcdCode"
                        disabled
                      ></iInput>
                    </iFormItem>
                  </el-col>
                  <el-col :span="12" class="Col-Three">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_DESC')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-ThreeItem"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.description"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                </el-row>
                <el-row
                  class="OrgOptionFromThree"
                  :gutter="appearance.itemSpace"
                  :span="24"
                >
                  <el-col :span="12" class="Col-One">
                    <iFormItem
                      :label="$t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_TAG')"
                      :label-width="appearance.labelWidth"
                      class="Col-OneItem"
                    >
                      <div class="chooseOrgTag chooseOrgTagLayout" style="">
                        <span
                          v-if="formCommitData.tagList.length == 0"
                          style="position: absolute; left: 12px"
                        >
                          {{ language('请选择') }}
                        </span>
                        <div class="chooseOrgTagList">
                          <el-tag
                            size="medium"
                            closable
                            v-for="item in formCommitData.tagList"
                            :key="item.name"
                            @close="deleteOrgTag(item)"
                            style="margin-right: 5px"
                          >
                            {{ item.name }}
                          </el-tag>
                        </div>
                        <span
                          @click.stop="enterOrgTagPage"
                          style="
                            position: absolute;
                            font-size: 16px;
                            top: 50%;
                            right: 5px;
                            transform: translateY(-50%);
                          "
                        >
                          <icon symbol name="icontianjia"></icon>
                        </span>
                      </div>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Two">
                    <iFormItem
                      :label="
                        $t(
                          'ORGANIZATION_MANAGERMENT.ORG_CREATE.IS_SHOW_ORG_TREE'
                        )
                      "
                      class="Col-TwoItem"
                      :label-width="appearance.labelWidthThree"
                      prop="isVisible"
                    >
                      <i-select
                        :placeholder="language('请选择')"
                        v-model="formCommitData.isVisible"
                      >
                        <el-option
                          v-for="item in trueFalseList"
                          :key="item.label"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </i-select>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Three">
                    <iFormItem
                      class="Col-ThreeItem"
                      :label-width="appearance.labelWidthThree"
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.IS_COMMODITY')
                      "
                      prop="isCommodity"
                    >
                      <i-select
                        :placeholder="language('请输入')"
                        v-model="formCommitData.isCommodity"
                      >
                        <el-option
                          v-for="item in trueFalseList"
                          :key="item.label"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </i-select>
                    </iFormItem>
                  </el-col>
                </el-row>
                <el-row
                  class="OrgOptionFromFour"
                  :gutter="appearance.itemSpace"
                  :span="24"
                >
                  <el-col :span="6" class="Col-One">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.IS_SYNC_SVCD')
                      "
                      :label-width="appearance.labelWidth"
                      class="Col-OneItem"
                    >
                      <i-select
                        :placeholder="language('请选择')"
                        disabled
                        v-model="formCommitData.syncStatus"
                      >
                        <el-option
                          v-for="item in trueFalseList"
                          :key="item.label"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </i-select>
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Two">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_LOGO')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-TwoItem"
                      prop="logoName"
                      ref="logoFile"
                    >
                      <div class="uploadBtnContainer">
                        <div class="uploadBtn">
                          <span
                            style="
                              width: 95%;
                              overflow: hidden;
                              white-space: nowrap;
                              text-overflow: ellipsis;
                            "
                            v-if="fileExist"
                            >{{ fileExist }}</span
                          >
                          <span style="width: 95%" v-else>{{
                            language('请选择')
                          }}</span>
                          <input
                            type="file"
                            style="display: none"
                            id="upload"
                            accept="image/jpeg,image/gif,image/png"
                            @change="openFile"
                            ref="file"
                          />
                          <span @click="uploadLogoFile">
                            <icon
                              class="icon"
                              symbol
                              name="iconshenpi-fujian"
                              style="font-size: 16px"
                            ></icon>
                          </span>
                        </div>
                      </div>
                      <!-- </el-upload> -->
                    </iFormItem>
                  </el-col>
                  <el-col :span="6" class="Col-Three">
                    <p style="white-space: nowrap">
                      <span
                        class="DepartmentLogoTipSuffix"
                        style="zoom: 0.85; line-height: 28px; color: red"
                      >
                        {{
                          $t(
                            'ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_LOGO_SIZE'
                          )
                        }}
                      </span>
                    </p>
                  </el-col>
                  <el-col :span="6" class="Col-Four">
                    <iFormItem
                      :label="
                        $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_REMARK')
                      "
                      :label-width="appearance.labelWidthThree"
                      class="Col-FourItem"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.remark"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                </el-row>
                <el-row
                  class="OrgOptionFromFive"
                  :gutter="appearance.itemSpace"
                >
                  <el-col :span="12" class="Col-One" v-if="isEdit">
                    <el-popover
                      ref="hover"
                      placement="right"
                      title=""
                      width="285px"
                      height="53px"
                      trigger="hover"
                      content=""
                    >
                      <div style="font-size: 12px; text-align: center">
                        <div style="float: left">
                          <p>
                            {{
                              $t(
                                'ORGANIZATION_MANAGERMENT.ORG_CREATE.DOWN_LEVEL_DESC'
                              )
                            }}：
                          </p>
                        </div>
                        <div style="float: right; text-align: left">
                          <p>
                            {{
                              $t(
                                'ORGANIZATION_MANAGERMENT.ORG_CREATE.DOWN_LEVEL_DESC_ONE'
                              )
                            }}
                          </p>
                          <p>
                            {{
                              $t(
                                'ORGANIZATION_MANAGERMENT.ORG_CREATE.DOWN_LEVEL_DESC_TWO'
                              )
                            }}
                          </p>
                        </div>
                      </div>
                      <iFormItem
                        :label="
                          $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.ORG_CODE')
                        "
                        slot="reference"
                        :label-width="appearance.labelWidth"
                        class="Col-OneItem"
                      >
                        <div slot="label">
                          <i-checkbox v-model="formCommitData.subDeptId">
                            <span
                              >{{
                                $t(
                                  'ORGANIZATION_MANAGERMENT.ORG_CREATE.DOWN_LEVEL'
                                )
                              }}
                            </span>
                            <i class="iconfont" style="color: #72809c"
                              >&#xe652;</i
                            >
                          </i-checkbox>
                        </div>
                        <div class="chooseOrgTag chooseDownLevelOrgTag">
                          <span
                            v-if="formCommitData.supDeptList.length == 0"
                            style="position: absolute; left: 12px"
                            >{{ language('请选择') }}</span
                          >

                          <el-tag
                            size="medium"
                            closable
                            v-for="item in formCommitData.supDeptList"
                            :key="item.nameZh"
                            @close="deleteDownLevelOrgTag(item)"
                            style="margin-right: 5px"
                          >
                            {{ item.nameZh }}
                          </el-tag>
                          <span
                            @click.stop="alertDownLevelOrg"
                            style="
                              position: absolute;
                              font-size: 16px;
                              top: 50%;
                              right: 5px;
                              transform: translateY(-50%);
                            "
                          >
                            <icon symbol name="icontianjia"></icon>
                          </span>
                        </div>
                      </iFormItem>
                    </el-popover>
                  </el-col>
                  <el-col :span="6" class="Col-Three">
                    <iFormItem
                      :label="language('成本中心')"
                      :label-width="appearance.labelWidth"
                      class="Col-ThreeItem"
                    >
                      <iInput
                        :placeholder="language('请输入')"
                        v-model="formCommitData.costCenterId"
                      ></iInput>
                    </iFormItem>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="Bottom">
              <div class="Dimension">
                <iButton
                  @click="incrementDimension"
                  :disabled="
                    table.extraData.dimensionLeftMenu == null ||
                    table.extraData.dimensionLeftMenu.length == 0
                  "
                >
                  {{ $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.INCREMENT_BTN') }}
                </iButton>
                <iButton @click="decrementDimension" :disabled="isCanDeleted">
                  {{ $t('ORGANIZATION_MANAGERMENT.ORG_CREATE.DECREMENT_BTN') }}
                </iButton>
              </div>
              <div class="DimensionTable">
                <iTableCustom
                  :loading="tableSetting.tableLoading"
                  :data="table.tableListData"
                  :columns="tableSetting.tableSetting"
                  :extra-data="table.extraData"
                  @handle-selection-change="handleSelectionChange"
                >
                </iTableCustom>
              </div>
            </div>
          </div>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import {
  iFormItem,
  iCard,
  iPage,
  iInput,
  iSelect,
  iButton,
  iMessage,
  Icon,
  iDialog
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import alertDownLevelOrgTable from './components/alertDownLevelOrgTable'
import {
  tableSetting,
  defaultValue,
  orgLevelList,
  trueFalseList,
  dimensionList
} from './data.js'

import {
  createOrganization,
  orgLevelListData,
  orgDimensionList,
  parentOrgDimensionList,
  searchOrganizationByID,
  editOrganization
} from '@/api/organization/index'
// import { EventBus, EventBusName } from '@/utils/eventbus'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload.js'
export default {
  components: {
    iCard,
    iPage,
    iInput,
    iSelect,
    iButton,
    iTableCustom,
    Icon,
    iDialog,
    alertDownLevelOrgTable,
    iFormItem
  },
  methods: {
    trueBtnClick() {
      this.$refs.orgForm.validate((valid) => {
        if (valid) {
          console.log('id', typeof this.$route.params.id)
          if (this.$route.params.id && this.$route.params.id !== '0') {
            //编辑组织
            this.editOrg()
          } else {
            //创建
            this.createOrg()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadLogoFile() {
      this.openFile()
    },
    openFile(e) {
      document.getElementById('upload').click()
      let file = document.getElementById('upload')
      if (file.files.length > 0) {
        this.$refs.logoFile.clearValidate()
        this.fileLoge = file.files[0]
        let fileName = file.files[0].name
        this.fileExist = fileName
        let commitData = { ...this.formCommitData }
        commitData.logoName = fileName
        this.$store.commit('SET_ORG_INFO', commitData)
      }
    },
    //上传文件接口
    uploadFileLogo() {
      let data = new FormData()
      data.append('businessId', 1)
      data.append('type', 1)
      data.append('isTemp', 0)
      data.append('applicationName', 'rise')
      data.append('file', this.fileLoge)
      data.append('currentUserId', this.$store.state.permission.userInfo.id)
      data.append('currentUser', this.$store.state.permission.userInfo.userName)
      return new Promise((reslove, reject) => {
        uploadFileWithNOTokenTwo(data)
          .then((val) => {
            if (val) {
              const data = val.data
              let commitData = { ...this.formCommitData }
              commitData.logoName = data.name
              commitData.filePath = data.path
              commitData.fileId = data.id
              this.$store.commit('SET_ORG_INFO', commitData)
              console.log('commitData ==', commitData)
              console.log('FormcommitData ==', this.formCommitData)
              reslove(data)
            } else {
              // console.log('上传文件失败')
              reject(false)
            }
          })
          .catch((error) => {
            iMessage.error('上传文件失败', error)
            reject(false)
          })
      })
    },
    enterOrgTagPage() {
      // console.log("TagList === ", this.formCommitData.tagList);
      let orgID = this.isEdit ? this.$route.params.id : 0
      console.log('====', orgID)
      orgID = orgID ? orgID : 0
      this.$router.push({
        name: 'orgTagCreate',
        query: { id: orgID, tags: this.formCommitData.tagList }
      })
    },
    incrementDimension() {
      let row = {
        leftSelect: null,
        rightSelect: null,
        optionsSelect: null,
        rightSelectValues: [],
        originValueList: []
      }
      this.table.tableListData.push(row)
    },
    decrementDimension() {
      //删除维度
      if (this.isEdit) {
        this.table.tableListData = this.table.tableListData.filter((value) => {
          return this.selectDimensionRows.indexOf(value) < 0
        })
      } else {
        //删除维度
        // console.log(this.table.tableListData);
        this.table.tableListData = this.table.tableListData.filter((value) => {
          return this.selectDimensionRows.indexOf(value) < 0
        })
      }
    },
    async createOrg() {
      //提交数据到后台
      let param = this.formCommitData
      let dimensions = []
      for (let item of this.table.tableListData) {
        let newSelects = item.optionsSelect.filter((val) => {
          return item.rightSelect.indexOf(val.valueId) > -1
        })
        /* newSelects = newSelects.map(val => {
          return { valueId: parseInt(val.valueId), value: val.value }
        }) */
        newSelects = newSelects.map((val) => {
          return { valueId: val.valueId, value: val.value }
        })
        let obj = { id: item.leftSelect, valueList: newSelects }
        dimensions.push(obj)
      }
      if (dimensions.length > 0) {
        //添加维度
        param.permissionDTOList = dimensions
      }
      let result = false
      if (this.fileLoge) {
        result = await this.uploadFileLogo()
        param['logoName'] = result.name
        param['filePath'] = result.path
        param['fileId'] = result.id
      }
      if (this.fileLoge && !result) {
        return
      }
      this.loading = true
      createOrganization(null, param)
        .then((value) => {
          this.loading = false
          if (value.code == 200) {
            //创建成功
            iMessage.success(value.desZh || '创建成功')
            /* setTimeout(() => {
              window.close()
            }, 2000) */
            this.isEdit = true
            const { data } = value
            this.$router.replace({
              params: {
                id: data.id,
                type: 'editOrg',
                upLevelID: data.parentId || '0',
                upLevelName: data.parentName || '0'
              }
            })
          } else {
            //创建失败
            iMessage.error(value.desZh || '创建失败')
          }
        })
        .catch((err) => {
          //异常处理
          this.loading = false
          iMessage.error(err.desZh || '创建失败')
        })
    },
    async editOrg() {
      let param = { ...this.formCommitData }

      // console.log("===UUUU",param);
      // console.log('出入后台的数据', param)
      // if (this.downLevelOrgList.length > 0) {
      //   //编辑情况下才有编辑下级组织
      //   param.supDeptList = this.downLevelOrgList
      // }
      let dimensions = []
      for (let item of this.table.tableListData) {
        if (item.optionsSelect && item.optionsSelect.length > 0) {
          let newSelects = item.optionsSelect.filter((val) => {
            return item.rightSelect.indexOf(val.valueId) > -1
          })
          /* newSelects = newSelects.map(val => {
            return { valueId: parseInt(val.valueId), value: val.value }
          }) */
          newSelects = newSelects.map((val) => {
            return { valueId: val.valueId, value: val.value }
          })
          let obj = { id: item.leftSelect, valueList: newSelects }
          dimensions.push(obj)
        }
      }
      if (dimensions.length > 0) {
        //添加维度
        param.permissionDTOList = dimensions
      }
      let result = false
      // console.log("===8888",this.formCommitData.logoName);
      if (this.fileLoge) {
        result = await this.uploadFileLogo()
        /* param['logoName'] = this.formCommitData.logoName
        param['filePath'] = this.formCommitData.path
        param['fileId'] = this.formCommitData.fileId */
        param['logoName'] = result.name
        param['filePath'] = result.path
        param['fileId'] = result.id
      }
      if (this.fileLoge && !result) {
        return
      }
      param.id = this.$route.params.id //调试使用
      this.loading = true
      editOrganization(null, param)
        .then((value) => {
          this.loading = false
          if (value.code == 200) {
            //编辑成功
            iMessage.success(value.desZh || '创建成功')
          } else {
            //编辑失败
            iMessage.error(value.desZh || '编辑失败')
          }
        })
        .catch((err) => {
          //异常处理
          this.loading = false
          iMessage.error(err.desZh || '编辑失败')
        })
    },
    resetOrg() {
      //重置，清空所有输入的及选中的内容
      let commitData = _.cloneDeep(defaultValue)
      let tableData = {
        tableLoading: false,
        tableSetting: tableSetting,
        tableListData: dimensionList,
        extraData: {
          dimensionLeftMenu: [],
          dimensionRightMenu: []
        }
      }
      let newTableData = _.cloneDeep(tableData)
      this.table.tableListData = []
      this.table.extraData = {
        dimensionLeftMenu: [],
        dimensionRightMenu: []
      }
      this.$store.commit('SET_ORG_INFO', commitData)
      this.$store.commit('SET_ORG_TABLE', newTableData)
    },
    getOrgLevelList() {
      //获取组织级别
      if (this.isMock) {
        let data = [
          { id: 1, level: 'K1', name: 'K1' },
          { id: 2, level: 'K2', name: 'K2' },
          { id: 3, level: 'K3', name: 'K3' }
        ]
        Vue.set(this, 'orgLevelList', data)
      } else {
        let param = { keys: 'ORG_LEVEL' }
        orgLevelListData(param, null)
          .then((value) => {
            // orgLevelList
            if (value.code == 200) {
              Vue.set(this, 'orgLevelList', value.data.ORG_LEVEL)
            }
          })
          .catch(() => {})
      }
    },
    getOrgDimesionList() {
      //获取组织维度

      let parentID = this.$route.params.upLevelID
      console.log('parentID----------------:', parentID)
      // console.log('===😝😝😝😝😝', parentID)
      if (parentID != null && parentID != '0') {
        let param = { parentId: parentID }
        parentOrgDimensionList(param)
          .then((value) => {
            if (value.code == 200) {
              Vue.set(this.table, 'extraData', {
                ...this.table.extraData,
                dimensionLeftMenu: value.data
              })
              // Vue.set(this.table.extraData, 'dimensionLeftMenu', value.data)
              // console.log("=====", this.table.extraData.dimensionLeftMenu);
              // this.$forceUpdate()
            }
          })
          .catch(() => {})
      } else {
        orgDimensionList(null, {})
          .then((value) => {
            if (value.code == 200) {
              Vue.set(this.table, 'extraData', {
                ...this.table.extraData,
                dimensionLeftMenu: value.data
              })
              // Vue.set(this.table.extraData, 'dimensionLeftMenu', value.data)
              // console.log("=====", this.table.extraData.dimensionLeftMenu);
              // this.$forceUpdate()
            }
          })
          .catch(() => {})
      }
    },
    getOrgInfo() {
      this.loading = true //打开提示状态
      // let value = null
      let param = { id: this.$route.params.id }
      searchOrganizationByID(param, null)
        .then((value) => {
          this.loading = false //关闭提示状态
          if (value.code == 200) {
            let obj = value.data
            let commitData = {}
            commitData.costCenterId = obj.costCenterId
            commitData.superDeptId = obj.superDeptId
            commitData.subDeptId = obj.subDeptId
            commitData.fullCode = obj.fullCode
            commitData.parentName = obj.parentName
            commitData.parentId = obj.parentId
            commitData.nameZh = obj.nameZh
            commitData.nameEn = obj.nameEn
            commitData.level = obj.level
            commitData.svcdCode = obj.svcdCode
            commitData.description = obj.description
            commitData.tagList = obj.tagList
            commitData.isVisible = obj.isVisible
            commitData.isCommodity = obj.isCommodity
            commitData.syncStatus = obj.syncStatus
            // commitData.deptLogo = obj.deptLogo
            commitData.remark = obj.remark //备注
            commitData.supDeptList = obj.supDeptList //
            this.downLevelOrgList = obj.supDeptList
            let file = obj.deptLogo
            if (file) {
              commitData.logoName = file.name
              commitData.filePath = file.path
              commitData.fileId = file.id
              this.fileExist = commitData.logoName //文件名字
            }
            this.$store.commit('SET_ORG_INFO', commitData)
            if (obj.permissionDTOList.length > 0) {
              let newDimension = []
              for (let item of obj.permissionDTOList) {
                let valueIdList = item.valueList.map((value) => {
                  return value.valueId.toString()
                })
                let obj = {
                  leftSelect: item.id,
                  rightSelect: valueIdList,
                  url: null,
                  optionsSelect: null,
                  originValueList: item.valueList
                }
                newDimension.push(obj)
              }
              this.table.tableListData = newDimension
            }
          }
        })
        .catch(() => {})
    },
    handleSelectionChange(value) {
      //选中维度
      this.selectDimensionRows = value
      this.isCanDeleted = !this.selectDimensionRows.length > 0
    },
    pageInit() {
      this.isEdit = this.$route.params.type == 'editOrg'
      if (!this.isMock && !this.isEdit) {
        let commitData = this.formCommitData
          ? this.formCommitData
          : _.cloneDeep(defaultValue)
        commitData.parentName = this.$route.params.upLevelName
        commitData.parentId = this.$route.params.upLevelID
        if (commitData.parentName) {
          commitData.parentName =
            commitData.parentName == '0' ? null : commitData.parentName
        }

        if (commitData.parentId) {
          commitData.parentId =
            commitData.parentId == '0' ? null : commitData.parentId
        }
        this.$store.commit('SET_ORG_INFO', commitData)
      }
    },
    deleteOrgTag(val) {
      let array = this.formCommitData.tagList
      let index = array.indexOf(val)
      if (index > -1) {
        array.splice(index, 1)
      }
    },
    deleteDownLevelOrgTag(val) {
      console.log('this.downLevelOrgList', this.downLevelOrgList)
      let index = this.downLevelOrgList.indexOf(val)
      if (index > -1) {
        this.downLevelOrgList.splice(index, 1)
      }
    },
    alertDownLevelOrg() {
      // iDialog
      this.dialogVisible = true
    },
    getSelectedDownLevelOrg(value) {
      this.dialogVisible = false
      this.downLevelOrgList = value
      let data = { ...this.formCommitData }
      data.supDeptList = value
      this.$store.commit('SET_ORG_INFO', data)
    }
  },
  computed: {
    formCommitData() {
      return this.$store.state.org.orgInfo
    },
    table() {
      return this.$store.state.org.table
    },
    downLevelCanSelectList() {
      if (
        this.formCommitData.parentId == null ||
        this.formCommitData.parentId == '0'
      ) {
        return this.orgLevelList.filter((val) => {
          return val.name == 'K0'
        })
      } else {
        return this.orgLevelList.filter((val) => {
          return val.name != 'K0'
        })
      }
    }
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //初始化路由数据
      vm.pageInit()

      vm.pageTitle = vm.isEdit ? '编辑组织机构' : '新建组织机构'
      //获取组织级别
      vm.getOrgLevelList()

      //维度列表
      vm.getOrgDimesionList()

      //编辑状态获取组织数据
      if (vm.isEdit && from.name != 'orgTagCreate') {
        vm.getOrgInfo()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // console.log('😝😝😝😝 Create beforeRouteLeave')
    if (to.name !== 'orgTagCreate') {
      this.resetOrg()
    }
    next()
  },
  data() {
    // const validateLogo = (rule, value, callback) => {
    //   const uploadValue = document.getElementById('upload').value
    //   if(value === '' && uploadValue === '') {
    //     return callback(new Error('LOGOxxxx'))
    //   }
    //   callback()
    // }
    return {
      fileLoge: null,
      fileExist: false,
      appearance: {
        labelWidth: '100px',
        labelWidthTwo: '85px',
        labelWidthThree: '123px',
        itemSpace: 20,
        dimensionCount: 0
      },
      tableSetting: {
        tableLoading: false,
        tableSetting: tableSetting
      },
      selectedOrganizationArray: [],
      orgLevelList: orgLevelList,
      downLevelOrgList: [],
      selectedDownLevelOrgList: [],
      trueFalseList: trueFalseList,
      dimensionList: dimensionList,
      selectDimensionRows: [],
      isEdit: false,
      isCanDeleted: true,
      isMock: false,
      dialogVisible: false,
      pageTitle: '新建组织机构',
      loading: false,
      rules: {
        //验证规则
        fullCode: [{ required: true, message: '请输入组织机构编码' }], //组织机构编码
        nameZh: [{ required: true, message: '请输入组织机构名称（中）' }], //组织机构名称（中）
        nameEn: [{ required: true, message: '请输入组织机构名称（英）' }], //组织机构名称（英）
        level: [{ required: true, message: '请选择组织级别' }], //组织级别
        svcdCode: [{ required: true, message: '请输入SVCD组织编码' }], //SVCD组织编码
        isVisible: [{ required: true, message: '请选择是否显示在组织树' }], //是否显示在组织树
        isCommodity: [{ required: true, message: '请选择是否为Commodity' }], //是否为Commodity
        syncStatus: [{ required: true, message: '请选择是否同步svcd' }], //是否同步svcd
        logoName: [{ required: true, message: '请上传部门Logo' }] //部门LogoURL
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.HeaderTitle {
  font-size: 20px;
  font-weight: bold;
}

.Header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.Main {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .CreateOrgBottomOptions {
    flex-grow: 1;
    .CreateOrgBottomCard {
      height: 100%;
    }
  }
}

// .OrgOptionsFrom {
//   ::v-deep .iFormItem {
//     // margin-right: 0px;
//     .el-form-item__label {
//       font-size: 14px;
//       color: $color-black;
//       font-weight: 400;
//       line-height: 35px;
//       float: none;
//       display: inline-block;
//       text-align: left;
//     }

//     .el-form-item__content {
//       width: 80%;
//       line-height: inherit;
//     }
//   }
// }

// .Col-One,
// .Col-Two,
// .Col-Three,
// .Col-Four {
//   // background-color: brown;
//   .Col-OneItem,
//   .Col-TwoItem,
//   .Col-ThreeItem,
//   .Col-FourItem {
//     width: 100%;
//     // background-color: burlywood;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     display: flex;
//     align-items: center;
//     ::v-deep .el-form-item__content {
//       flex: 1;
//     }
//   }
//   // .Col-TwoItem{
//   //   ::v-deep .el-form-item__label{
//   //   width:110px
//   // }
//   // }
// }

.uploadBtn,
.chooseOrgTag,
.nextPosition {
  line-height: 32px;
  min-height: 32px;
  color: #aaaaaa;
  box-shadow: 0 0 0.1875rem rgba(0, 38, 98, 0.15);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #e0e6ed;
  padding: 0 15px;
  border-color: transparent;
}

.chooseOrgTagLayout {
  display: flex;
  align-items: center;
  padding-left: 3px;
  padding-right: 3px;
  position: relative;
}
.chooseOrgTagList {
  margin-right: 30px;
  overflow: hidden;
  display: flex;
  box-shadow: 2px 0px 3px #f2f2f2;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

.chooseDownLevelOrgTag {
  padding-left: 3px;
  padding-right: 3px;
  position: relative;
}

.uploadBtnContainer {
  display: flex;
  .uploadBtn {
    display: flex;
    justify-content: space-between;
    width: 100%; //  calc(100% - 231px);
    align-items: center;
    box-sizing: border-box;
  }

  .DepartmentLogoTipSuffix {
    color: red;
  }
}

.CustomOrgTagItem {
  display: flex;
  .CustomOrgTag {
    // display: inline-block;
    height: 31px;
    background-color: red;
  }
}

.Bottom {
  .Dimension {
    display: flex;
    justify-content: flex-end;
    margin-top: 37px;
  }
  .DimensionTable {
    margin-top: 25px;
    ::v-deep .el-table .el-table__row .el-input {
      width: 100% !important;
    }
    ::v-deep .el-table .el-table__row .el-autocomplete {
      width: 100% !important;
    }
    ::v-deep .el-table .el-table__row .el-select {
      width: 100% !important;
    }
    ::v-deep .el-input__suffix {
      display: flex;
      align-items: center;
    }
  }
}
// ::v-deep .CreateOrgTopOptions {
//   .el-form-item.is-required .el-form-item__label:before,
//   {
//       content: "*";
//       color: #f56c6c;
//       margin-right: 4px;
//   }
// }
</style>
