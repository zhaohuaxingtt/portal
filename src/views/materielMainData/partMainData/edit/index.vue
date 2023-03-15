<template>
  <iPage>
    <pageHeader v-if="this.$route.query.id">
      {{ language(pageTitle) }}
    </pageHeader>
    <pageHeader v-else>
      {{ language(pageTitle) }}
    </pageHeader>
    <div class="basicMessage">
      <iCard :title="language(title.icardMessage)" collapse>
        <div class="btnList">
          <iButton
            style="margin-right: 20px"
            @click="toColorStandardParts"
            v-if="isEditColorPart && isDisabled"
            v-permission="
              'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_BASEINFO_BATCH_MODIFY'
            "
          >
            {{ language('批量修改') }}</iButton
          >
          <div class="browse" v-if="isDisabled > 0 ? true : false">
            <iButton
              @click="edit"
              v-permission="
                'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_BASEINFO_MODIFY'
              "
              >{{ language('编辑') }}</iButton
            >
          </div>
          <div class="edit" v-else>
            <!-- <iButton @click="avtiveSta">{{btnList.avtiveSta}}</iButton> -->
            <iButton
              @click="temporaryStorage"
              v-permission="
                'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_BASEINFO_MODIFY|BUTTON_MATERIEL_DATA_PARTS_MESSAGE_ADD'
              "
              >{{ language('保存') }}</iButton
            >
            <iButton @click="cancel">{{ language('取消') }}</iButton>
          </div>
        </div>
        <div class="elForm">
          <el-form
            label-width="120px"
            label-position="left"
            :rules="rules"
            ref="itemContent"
            :model="itemContent"
            class="validate-required-form"
          >
            <el-row gutter="24" class="materiel">
              <el-col :span="6" v-if="isDisabled > 0 ? true : false">
                <iFormItem
                  :label="language(itemLabel.number)"
                  prop="partNum"
                  label-width="80px"
                >
                  <iInput
                    v-model="itemContent.partNum"
                    :disabled="isDisabled > 0 ? true : false"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col
                :span="6"
                style="display: flex; justify-content: space-between"
                v-else
                class="numbers"
              >
                <iFormItem v-model="itemContent.number" label-width="80px">
                  <div class="l" slot="label">
                    {{ language('零件号') }}<span style="color: red">*</span>
                  </div>
                </iFormItem>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    flex-grow: 2;
                    align-content: center;
                  "
                >
                  <iFormItem label-width="0" prop="partNum1">
                    <span class="red">*</span>
                    <iInput
                      v-model="itemContent.partNum1"
                      :disabled="editNumber"
                      @input="topartNum2"
                      class="partNum1 partNum partNum-input"
                      maxlength="3"
                    >
                    </iInput>
                  </iFormItem>
                  <iFormItem label-width="0" prop="partNum2">
                    <span class="red">*</span>
                    <iInput
                      v-model="itemContent.partNum2"
                      @change="searchMaterielGroup"
                      id="partNum2"
                      :disabled="editNumber"
                      :focus="onPartNum2"
                      maxlength="3"
                      class="partNum partNum-input"
                      @input="topartNum3"
                    >
                    </iInput>
                  </iFormItem>
                  <iFormItem label-width="0" prop="partNum3">
                    <span class="red">*</span>
                    <iInput
                      v-model="itemContent.partNum3"
                      @change="searchMaterielGroup"
                      id="partNum3"
                      :disabled="editNumber"
                      maxlength="3"
                      class="partNum partNum-input"
                      @input="topartNum4"
                    ></iInput>
                  </iFormItem>
                  <iFormItem label-width="0">
                    <iInput
                      v-model="itemContent.partNum4"
                      :disabled="editNumber"
                      id="partNum4"
                      maxlength="2"
                      class="partNum partNum-input"
                      @input="topartNum5"
                    >
                    </iInput>
                  </iFormItem>
                  <iFormItem label-width="0">
                    <iInput
                      v-model="itemContent.partNum5"
                      :disabled="editNumber"
                      id="partNum5 "
                      maxlength="3"
                      class="partNum partNum-input"
                    ></iInput>
                  </iFormItem>
                </div>
                <div class="repeateMa" v-if="repeateMa">
                  {{ language('零件号重复') }}
                </div>
                <div class="repeateMa" v-if="matirielFill">
                  {{ language('请输入零件号') }}
                </div>
              </el-col>

              <el-col :span="6">
                <iFormItem :label="language('零件名称(中)')" prop="partNameZh">
                  <iInput
                    :placeholder="language('请输入')"
                    v-model="itemContent.partNameZh"
                    :disabled="isDisabled > 0 ? true : false"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem
                  :label="language('零件名称(德)')"
                  prop="partNameDe"
                  label-width="140px"
                >
                  <iInput
                    :placeholder="language('请输入')"
                    v-model="itemContent.partNameDe"
                    :disabled="isDisabled > 0 ? true : false"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('零件来源')">
                  <iInput disabled v-model="itemContent.sourceDesc"></iInput>
                </iFormItem>
              </el-col>
            </el-row>
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem :label="language('零件状态')" label-width="80px">
                  <iInput
                    disabled
                    v-model="itemContent.partStatusDesc"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('BMG')" prop="bmgDesc">
                  <iSelect
                    :placeholder="language('请选择')"
                    v-model="itemContent.bmgDesc"
                    :disabled="isDisabled > 0 ? true : false"
                  >
                    <el-option
                      v-for="item in BGMoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem
                  :label="language('ZP')"
                  prop="zp"
                  label-width="140px"
                >
                  <iSelect
                    :placeholder="language('请输入/请选择')"
                    v-model="itemContent.zp"
                    filterable
                    :disabled="isDisabled > 0 ? true : false"
                  >
                    <el-option
                      v-for="item in ZPoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('图纸日期')" prop="drawingDate">
                  <iDatePicker
                    v-model="itemContent.drawingDate"
                    style="width: 100%"
                    v-if="datePickerStatus"
                    type="date"
                  ></iDatePicker>
                  <iInput v-model="oldDrawingDate" disabled v-else></iInput>
                </iFormItem>
              </el-col>
            </el-row>
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem :label="language('FOP')" label-width="80px">
                  <!-- <iInput :placeholder='language("请输入")' v-model="itemContent.fop" :disabled='isDisabled>0?true:false'></iInput> -->
                  <iSelectorInput
                    v-model="fop"
                    singleSelect
                    @handle-click="handleClick"
                    @value-change="valueChange"
                    :value="fop"
                    :disabled="isDisabled > 0"
                    :placeholder="language('请选择')"
                    tagLabel="nameZh"
                  />
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('技术部门')">
                  <iInput v-model="itemContent.techDept" disabled></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('零件材料组')" label-width="140px">
                  <iInput
                    :disabled="chooseMaterielGroup"
                    v-model="itemContent.categoryDesc"
                  >
                    <!-- <el-option
                                  v-for = 'item in materielGroupOptions'
                                  :key='item.id'
                                  :label="item.name"
                                  :value="item.id"
                                  >
                                  </el-option> -->
                  </iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('common sourcing')">
                  <iSelect
                    v-model="itemContent.isCommonSourcingDesc"
                    :disabled="isDisabled > 0 ? true : false"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </el-col>
            </el-row>
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem
                  :label="language('专业组')"
                  prop="fgId"
                  label-width="80px"
                >
                  <iSelect
                    :placeholder="language('请输入/请选择')"
                    v-model="itemContent.fgId"
                    filterable
                    :disabled="isDisabled > 0 ? true : false"
                  >
                    <el-option
                      v-for="item in groupOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('SET号')">
                  <iInput
                    :placeholder="language('请输入')"
                    v-model="itemContent.setCode"
                    :disabled="isDisabled > 0 ? true : false"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem
                  :label="language('最近一次修改时间')"
                  label-width="140px"
                >
                  <iInput disabled v-model="itemContent.updateDate"></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('采购员')">
                  <iInput disabled v-model="purchaser"></iInput>
                </iFormItem>
              </el-col>
            </el-row>
            <!-- 暂时未确定要显示 -->
            <el-row gutter="24" v-if="false">
              <el-col :span="6">
                <iFormItem :label="language('配附件采购员')">
                  <iInput disabled v-model="accessoriesUserInfo"></iInput>
                </iFormItem>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </iCard>
    </div>
    <div class="measurement" v-show="searchId">
      <iCard :title="language(title.icardMeasure)" collapse>
        <div slot="header-control">
          <div v-if="editStatus">
            <iButton
              @click="measurementEdit"
              v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
              >{{ language('编辑') }}</iButton
            >
          </div>
          <div v-else>
            <iButton
              @click="saveUnit"
              v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
              >{{ language('保存') }}</iButton
            >
            <iButton
              @click="unitTabCancel"
              v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
              >{{ language('取消') }}</iButton
            >
          </div>
        </div>
        <div class="measureTable">
          <el-form
            label-position="left"
            label-width="120px"
            :rules="rules"
            :model="materielUnit"
            class="validate-required-form unit"
          >
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem
                  :label="language('基本计量单位')"
                  prop="materielUnit"
                >
                  <iSelect
                    :placeholder="language('请选择')"
                    :disabled="editStatus"
                    v-model="materielUnit"
                    @change="changeMaterielUnit"
                    class="select"
                  >
                    <el-option
                      v-for="item in unitoptions"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    ></el-option>
                  </iSelect>
                </iFormItem>
              </el-col>
            </el-row>
          </el-form>
          <el-divider class="divider"></el-divider>
          <div class="measure">
            <div class="measuretitle">
              {{ language(title.measuretitle) }}
            </div>
            <div class="btn" v-if="!editStatus">
              <iButton @click="add">{{ language('新增') }}</iButton>
              <iButton
                @click="del"
                :disabled="selectedItem.length > 0 ? false : true"
                >{{ language('删除') }}</iButton
              >
              <!-- <iButton @click="unitTabCancel">{{btnList.cancel}}</iButton> -->
            </div>
          </div>
          <div class="tabelList" v-show="editStatus">
            <iTableCustom
              key="viewTable"
              :loading="loading"
              :data="data"
              :extra-data="readeExtraData"
              :columns="measurementTable"
              @handle-selection-change="handleSelectionChange"
            ></iTableCustom>
          </div>
          <div class="tabelList" v-show="!editStatus">
            <iTableCustom
              key="editTable"
              ref="theCustomTable"
              :loading="loading"
              :data="measureEditdata"
              :columns="measureEdit"
              :extra-data="extraData"
              @handle-selection-change="handleSelectionChange"
            ></iTableCustom>
          </div>
        </div>
      </iCard>
    </div>
    <i-selector-dialog
      :show.sync="dialogFopVisible"
      @change="handleProjectManagerCallback"
      v-model="fop"
      :value="fop"
      :tableSetting="MATERIEL_SELECTOR_TableSetting"
      :filter="selectorQuery"
      :title="'FOP'"
      singleSelect
      sizeType="size"
      :search-method="handleFopSearch"
      tagLabel="nameZh"
    />
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iFormItem,
  iInput,
  iSelect,
  iDatePicker,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
import iSelectorInput from '@/components/iSelector/iSelectorInput.vue'
import { openUrl } from '@/utils'
import { getPageListByParams } from '@/api/authorityMgmt/index'
import {
  measurementTable,
  itemLabel,
  measureEdit,
  MATERIEL_SELECTOR_TableSetting
} from './data.js'
import {
  getMaterielById,
  saveMateriel,
  getProGroupOptions,
  searchOptions,
  materielGroup,
  materielUnit,
  saveActive,
  upDateMateriel,
  getMaterielGroup,
  getUnitList,
  saveUnitList,
  queryPurchasers
} from '@/api/materiel/materielMainData.js'

export default {
  components: {
    iPage,
    pageHeader,
    iCard,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iDatePicker,
    iTableCustom,
    iSelectorDialog,
    iSelectorInput
  },
  methods: {
    queryPurchasers() {
      if (this.$route.query.id) {
        queryPurchasers(this.$route.query.id).then((res) => {
          console.log('res res res:', res)
          if (res.code === '200') {
            this.purchaser = res?.data?.linieUserInfo?.userName || ''
            this.accessoriesUserInfo = res?.data?.accessoriesUserInfo?.userName || ''
          }
        })
      }
    },
    handleClick() {
      this.dialogFopVisible = true
    },
    valueChange(val) {
      this.itemContent.techDept = val[0]?.department || ''
      this.itemContent.fop = val[0]?.nameZh || ''
      this.itemContent.fopUserId = val[0]?.id || ''
    },
    handleFopSearch(param) {
      return getPageListByParams({ ...param })
    },
    topartNum2(val) {
      if (val.length == 3) {
        document.getElementById('partNum2').focus()
      }
    },
    topartNum3(val) {
      if (val.length == 3) {
        document.getElementById('partNum3').focus()
      }
    },
    topartNum4(val) {
      if (val.length == 3) {
        document.getElementById('partNum4').focus()
      }
    },
    topartNum5(val) {
      if (val.length == 2) {
        document.getElementById('partNum5').focus()
      }
    },
    changeMaterielUnit() {
      for (let item of this.unitoptions) {
        if (item.id == this.materielUnit) {
          Vue.set(this.extraData, 'materielUnit', item.name)
        }
      }
    },
    searchMaterielGroup() {
      let params = {
        sixPartNum: this.itemContent.partNum2 + this.itemContent.partNum3
      }
      getMaterielGroup(params).then((val) => {
        if (val.code == 200) {
          this.itemContent.categoryId = val.data.categoryId
            ? val.data.categoryId.toString()
            : null
          this.materielGroupOptions.forEach((element) => {
            if (element.id == val.data.categoryId) {
              this.itemContent.categoryDesc = element.name
              this.itemContent.categoryId = element.id
            }
          })
          // this.chooseMaterielGroup = true
        } else if (val.desEn == 'failed') {
          // this.chooseMaterielGroup = false
        } else if (val.code == 1) {
          this.$message.error(val.desZh)
        }
      })
    },
    check() {
      this.$refs.itemContent.validate((valid) => {
        if (valid) {
          this.sta = true
        } else {
          if (
            this.itemContent.partNum1 === '' ||
            this.itemContent.partNum2 === '' ||
            this.itemContent.partNum3 === ''
          ) {
            this.matirielFill = true
            this.repeateMa = false
            this.sta = false
          } else {
            this.matirielFill = false
            this.repeateMa = false
            this.sta = false
          }
        }
      })
    },
    avtiveSta() {
      this.itemContent.partStatusDesc = '激活'
      if (this.searchId) {
        this.itemContent.partStatusDesc = '激活'
        this.save()
      }
    },
    temporaryStorage() {
      this.check()
      if (this.sta) {
        // this.savaMethods = 'draft'
        this.save()
      }
    },
    save() {
      if (this.itemContent.partNum4 == '') {
        this.itemContent.partNum4 = null
      }
      if (this.itemContent.partNum5 == '') {
        this.itemContent.partNum5 = null
      }

      if (this.itemContent.bmgDesc == '是') {
        this.itemContent.bmg = true
      } else if (this.itemContent.bmgDesc == '否') {
        this.itemContent.bmg = false
      }
      if (this.itemContent.isCommonSourcingDesc == '是') {
        this.itemContent.isCommonSourcing = true
      } else this.itemContent.isCommonSourcing = false

      if (this.itemContent.partStatusDesc == '激活') {
        this.itemContent.partStatus = 'ACTIVE'
        let params = {
          ...this.itemContent
        }
        if (this.itemContent.updateDate == '') {
          saveActive(params).then((val) => {
            if (val.code == 200) {
              this.searchId = val.data.id
              this.getFormMessage()
              this.isDisabled = 1
              // this.chooseMaterielGroup = true
              this.matirielFill = false
              this.repeateMa = false
              this.editNumber = true
              this.$router.replace({
                query: { id: this.searchId, firstSave: true }
              })

              this.$message.success('保存成功')
              this.editStatus = false
            } else if (val.desZh == '保存失败，零件号已存在') {
              this.matirielFill = false
              this.repeateMa = true
            } else if (val.code == 1) {
              this.$message.error(val.desZh)
            }
          })
        } else {
          upDateMateriel(params)
            .then((val) => {
              if (val.code == 200) {
                this.getFormMessage()
                this.chooseMaterielGroup = true
                this.isDisabled = 1
                this.editNumber = true
                this.$message.success('更新成功')
              } else if (val.code == 1) {
                this.$message.error(val.desZh)
              }
            })
            .catch((err) => {
              iMessage.error(err)
            })
        }
      } else {
        this.itemContent.partStatus = 'DRAFT'
        let params = {
          ...this.itemContent
        }
        if (this.itemContent.updateDate == '') {
          this.$confirm('是否直接激活此零件', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否'
          })
            .then(() => {
              this.itemContent.partStatus = 'ACTIVE'
              saveActive(params).then((val) => {
                if (val.code == 200) {
                  this.searchId = val.data.id
                  this.getFormMessage()
                  this.chooseMaterielGroup = true
                  this.isDisabled = 1
                  this.matirielFill = false
                  this.repeateMa = false
                  this.editNumber = true
                  this.editStatus = false
                  this.$router.replace({
                    query: { id: this.searchId, firstSave: true }
                  })
                  this.$message.success('保存成功')
                } else if (val.desZh == '保存失败，零件号已存在') {
                  this.matirielFill = false
                  this.repeateMa = true
                } else if (val.desZh == '保存失败，材料组不存在') {
                  this.$message.error('保存失败，零件材料组未选择')
                } else if (val.code == '1') {
                  this.$message.error(val.desZh)
                }
              })
            })
            .catch(() => {
              this.itemContent.partStatus = 'DRAFT'
              saveMateriel(params).then((val) => {
                if (val.code == 200) {
                  this.searchId = val.data.id
                  this.getFormMessage()
                  this.chooseMaterielGroup = true
                  this.isDisabled = 1
                  this.matirielFill = false
                  this.repeateMa = false

                  this.editNumber = true
                  this.$router.replace({
                    query: { id: this.searchId, firstSave: true }
                  })
                  this.editStatus = false
                  this.$message.success('保存成功')
                } else if (val.desZh == '保存失败，零件号已存在') {
                  this.matirielFill = false
                  this.repeateMa = true
                } else if (val.desZh == '保存失败，材料组不存在') {
                  this.$message.error('保存失败，零件材料组未选择')
                } else if (val.code == '1') {
                  this.$message.error(val.desZh)
                }
              })
            })
        } else {
          upDateMateriel(params)
            .then((val) => {
              if (val.code == 200) {
                this.getFormMessage()
                this.chooseMaterielGroup = true
                this.isDisabled = 1
                this.$message.success('更新成功')
              } else if (val.code == 1) {
                this.$message.error(val.desZh)
              }
            })
            .catch((err) => {
              iMessage.error(err)
            })
        }
      }
    },
    add() {
      let propData = ''
      for (let item of this.unitoptions) {
        if (this.materielUnit == item.id) {
          propData = item.name
        }
      }
      this.extraData.materielUnit = propData
      this.readeExtraData.materielUnit = propData
      this.measureEditdata.push({})
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.selectedItem.forEach((val) => {
            this.measureEditdata = this.measureEditdata.filter((item) => {
              if (item.uniqueId !== val.uniqueId) {
                return item
              }
            })
          })
        })
        .catch(() => {
          this.$refs.theCustomTable.clearSelection()
        })
    },
    measurementEdit() {
      this.editStatus = false
    },
    unitTabCancel() {
    //   if (this.initialValue.baseUnitId == '') {
    //     this.initialValue.baseUnitId = '59'
    //   }
      if (this.initialValue.vos && this.measureEditdata) {
        if (
          this.initialValue.vos.length == this.measureEditdata.length &&
          this.initialValue.vos.length != 0 &&
          this.measureEditdata.length != 0
        ) {
          for (let i = 0; i < this.measureEditdata.length; i++) {
            if (
              this.initialValue.vos[i].denominatorUnitId !=
                this.measureEditdata[i].denominatorUnitId ||
              this.initialValue.vos[i].numeratorValue !=
                this.measureEditdata[i].numeratorValue
            ) {
              return this.confirmCancel()
            } else if (this.initialValue.baseUnitId != this.materielUnit) {
              this.confirmCancel()
            } else {
              this.editStatus = true
              this.id = 0
              this.getUnitTableList()
            }
          }
        } else if (
          this.initialValue.baseUnitId != this.materielUnit ||
          this.initialValue.vos.length != this.measureEditdata.length
        ) {
          this.confirmCancel()
        } else {
          this.editStatus = true
          this.id = 0
          this.getUnitTableList()
        }
      }
    },
    confirmCancel() {
      this.$confirm('数据有改动，是否取消此次的改动', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.initialValue.baseUnitId = '59'
        this.editStatus = true
        this.id = 0
        this.getUnitTableList()
      })
    },
    edit() {
      // this.isEdit = false
      this.isDisabled = 0
      this.editNumber = true
      this.datePickerStatus = true
      console.log('---===', JSON.stringify(this.itemContent))
    },
    cancel() {
      if (
        this.searchId &&
        JSON.stringify(this.itemContent) !=
          JSON.stringify(this.initialItemContent)
      ) {
        this.$confirm('数据有改动，是否取消此次的改动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.searchId) {
            this.getFormMessage()
            this.isDisabled = 1
          } else {
            window.close()
          }
        })
      } else {
        if (this.searchId) {
          this.getFormMessage()
          this.isDisabled = 1
        } else {
          window.close()
        }
      }
    },
    handleSelectionChange(val) {
      this.selectedItem = val
    },
    getFormMessage() {
      this.datePickerStatus = false
      getMaterielById(this.searchId)
        .then((val) => {
          if (val.code == 200) {
            const data = val.data
            val.data.fgId = val.data.fgId ? val.data.fgId.toString() : null
            val.data.categoryId = val.data.categoryId
              ? val.data.categoryId.toString()
              : null
            this.itemContent = val.data
            if (this.itemContent.fop) {
              this.fop = [
                {
                  nameZh: this.itemContent.fop,
                  department: this.itemContent.techDept,
                  id: Number(this.itemContent.fopUserId)
                }
              ]
              this.itemContent.fopUserId = Number(this.itemContent.fopUserId)
            } else {
              this.fop = []
              this.itemContent.fopUserId = ''
              this.itemContent.fop = ''
              this.itemContent.techDept = this.itemContent.techDept ?? ''
            }
            this.pageTitle = `${this.itemContent.partNum} ${this.itemContent.partNameZh}`
            this.materielGroupOptions.forEach((element) => {
              if (element.id == this.itemContent.categoryId) {
                this.itemContent.categoryDesc = element.name
              }
            })
            this.oldDrawingDate = data.drawingDate
              ? data.drawingDate.slice(0, 10)
              : data.drawingDate
            this.initialItemContent = JSON.parse(
              JSON.stringify(this.itemContent)
            )
            this.isEditColorPart = data.isEditColorPart
            // console.log('-------',JSON.stringify(this.itemContent));
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
        })
    },
    getUnitTableList() {
      this.loading = true
      getUnitList(this.searchId)
        .then((val) => {
          if (val.code == 200) {
            if (val.data.baseUnitId == null) {
              this.data = []
              this.measureEditdata = []
              this.loading = false
              this.materielUnit = ''
            } else {
              const data = val.data.vos
              if (data) {
                console.log('ppp')
                this.data = data
              } else {
                this.data = []
              }
              let propData = ''

              for (let item of this.unitoptions) {
                if (val.data.baseUnitId == item.id) {
                  propData = item.name
                }
              }
              this.extraData.materielUnit = propData
              this.readeExtraData.materielUnit = propData
              this.materielUnit = val.data.baseUnitId
              if (val.data.vos) {
                this.measureEditdata = val.data.vos
              }
              this.initialValue = JSON.parse(JSON.stringify(val.data))
              this.loading = false
            }
          } else if (val.code == 1) {
            this.$message.error(val.desZh)
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    saveUnit() {
      let params = {}
      params.baseUnitId = this.materielUnit //选择零件号id
      params.partInfoId = this.searchId //保存后返回的id
      params.vos = []
      let isFill = this.measureEditdata.filter((item) => {
        return !item.numeratorValue
      })
      if (isFill.length > 0) {
        this.$message.error(this.language('请输入计量单位转换关系数值'))
      } else {
        this.measureEditdata.map((item) => {
          params.vos.push({
            denominatorUnitId: item.denominatorUnitId,
            numeratorValue: item.numeratorValue
          })
        })
        saveUnitList(params)
          .then((val) => {
            if (val.code == 200) {
              this.getUnitTableList()
              this.$message.success('保存成功')
            } else if (val.code == 1) {
              this.$message.error(val.desZh)
            }
          })
          .catch((err) => {
            iMessage.error(err)
          })
          .finally(() => {
            this.editStatus = true
          })
      }
    },
    async getProGroupOptions() {
      await getProGroupOptions()
        .then((val) => {
          if (val.code == 200) {
            this.groupOption = val.data
          }
        })
        .catch((err) => {
          iMessage.error(err)
        })
    },
    toColorStandardParts() {
      openUrl(`/colorStandardParts?id=${this.$route.query.id}`)
    }
  },
  created() {
    this.isDisabled = this.$route.query.id
    this.searchId = this.$route.query.id
    this.datePickerStatus = true
    this.queryPurchasers()
    //材料组下拉
    materielGroup()
      .then((val) => {
        if (val.code == 200) {
          this.materielGroupOptions = val.data
          if (this.$route.query.id) {
            this.getFormMessage()
          }
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })

    //专业组下拉选项
    this.getProGroupOptions()
    searchOptions()
      .then((val) => {
        if (val.code == 200) {
          for (let key in val.data.commonBooleanSelectData) {
            this.sourceOptions.push({
              name: key,
              value: val.data.commonBooleanSelectData[key]
            })
            this.BGMoptions.push({
              name: key,
              value: val.data.commonBooleanSelectData[key]
            })
          }
          for (let key in val.data.zpSelectData) {
            this.ZPoptions.push({
              name: key,
              value: val.data.zpSelectData[key]
            })
          }
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })

    //零件单位下拉
    materielUnit()
      .then((val) => {
        if (val.code == 200) {
          const unitoption = []
          for (let item of val.data) {
            unitoption.push({
              name: item['nameZh'],
              value: item['nameZh'],
              id: item['id']
            })
          }
          this.unitoptions = unitoption
          this.extraData.unitoptions = unitoption
          this.readeExtraData.unitoptions = unitoption
          if (this.searchId) {
            this.getUnitTableList()
          }
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })
    //获取tabelList
    if (!this.isDisabled) {
      this.editNumber = false
      this.editStatus = false
      this.itemContent.partStatusDesc = '草稿'
      this.itemContent.sourceDesc = 'RISE'
      this.itemContent.materielUnit = '59'
    }
    if (this.$route.query.firstSave) {
      this.editStatus = false
    }
  },
  computed: {},
  watch: {
    searchId(val) {
      this.materielUnit = '59'
    }
  },
  data() {
    var repeate = (rule, value, callback) => {
      if (
        this.itemContent.number3 === '' ||
        this.itemContent.number2 === '' ||
        this.itemContent.number1 === ''
      ) {
        //    return callback(new Error('零件号重复'))
        this.matirielFill = true
        this.repeateMa = false
        callback()
      } else if (this.materielNumber) {
        this.matirielFill = false
        this.repeateMa = true
        callback()
      } else {
        this.matirielFill = false
        this.repeateMa = false
        callback()
      }
    }
    return {
      MATERIEL_SELECTOR_TableSetting,
      isEditColorPart: true,
      dialogFopVisible: false,
      fop: [],
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
      rules: {
        partNameZh: [
          {
            required: true,
            message: this.language('请输入零件中文名称'),
            trigger: 'blur'
          }
        ],
        partNameDe: [
          {
            required: true,
            message: this.language('请输入零件德文名称'),
            trigger: 'blur'
          }
        ],
        bmgDesc: [
          {
            required: true,
            message: this.language('请输入BMG'),
            trigger: 'blur'
          }
        ],
        zp: [
          {
            required: true,
            message: this.language('请输入ZP'),
            trigger: 'blur'
          }
        ],
        // drawingDate:[
        //     { required: true, message: '请选择时间', trigger: 'blur' },
        // ],
        fgId: [
          {
            required: true,
            message: this.language('请选择专业组'),
            trigger: 'blur'
          }
        ],
        partNum1: [{ required: true, message: ' ', trigger: 'blur' }],
        partNum2: [{ required: true, message: ' ', trigger: 'blur' }],
        partNum3: [{ required: true, message: ' ', trigger: 'blur' }],
        partNum: [{ required: true, message: ' sssss', trigger: 'blur' }],
        materielUnit: [{ required: true, message: ' ', trigger: 'blur' }]
      },
      itemContent: {
        partNum1: '',
        partNum2: '',
        partNum3: '',
        partNum4: '',
        partNum5: '',
        partNum: '',
        partNameZh: '',
        partNameDe: '',
        sourceDesc: '',
        partStatusDesc: '',
        bmgDesc: '',
        zp: '',
        drawingDate: '',
        fop: '',
        fopUserId: '',
        techDept: '',
        techDeptId: '',
        categoryId: '',
        categoryDesc: '',
        isCommonSourcingDesc: '',
        fgId: '',
        setCode: '',
        updateDate: ''
      },
      initialItemContent: {
        partNum1: '',
        partNum2: '',
        partNum3: '',
        partNum4: '',
        partNum5: '',
        partNum: `${this.partNum1}${this.partNum2}${this.partNum3}${this.partNum4}${this.partNum5}`,
        partNameZh: '',
        partNameDe: '',
        sourceDesc: '',
        partStatusDesc: '',
        bmgDesc: '',
        zp: '',
        drawingDate: '',
        fop: '',
        techDept: '',
        categoryId: '',
        isCommonSourcingDesc: '',
        fgId: '',
        setCode: '',
        updateDate: ''
      },
      oldDrawingDate: '',
      chooseMaterielGroup: true,
      materielGroupOptions: [],
      sta: false,
      id: 0,
      searchId: '',
      savaMethods: '',
      editStatus: true,
      //编辑状态
      isDisabled: 0,
      matirielFill: false,
      repeateMa: false,
      title: {
        icardMessage: '基本信息',
        icardMeasure: '计量单位',
        measuretitle: '常用计量单位与基本计量单位转换关系'
      },
      data: [],
      measureEditdata: [],
      measureEdit,
      measurementTable,
      pageTitle: '新增零件',
      isEdit: true,
      itemLabel,
      materielUnit: '',
      placeholderText: '请输入',
      selectText: '请输入/请选择',
      BGMoptions: [],
      ZPoptions: [],
      groupOption: [],
      sourceOptions: [],
      unitoptions: [],
      readeExtraData: {
        materielUnit: '',
        unitoptions: []
      },
      extraData: {
        materielUnit: '',
        unitoptions: []
      },
      errorMessage: {
        inputMessage: '请输入零件号',
        numberMessage: '零件号重复'
      },
      selectedItem: '',
      initialValue: {
        baseUnitId: '',
        vos: []
      },
      datePickerStatus: false,
      purchaser: '', // 采购员
      accessoriesUserInfo: '', // 配附件采购员
    }
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.measurement,
.tabelList,
.basicMessage,
.elForm {
  margin-top: 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.measuretitle {
  font-size: 16px;
  font-weight: bold;
}
.measure {
  display: flex;
  justify-content: space-between;
}
.numbers {
  ::v-deep .el-input__inner {
    padding: 6px;
  }
}

.materiel {
  position: relative;
  .repeateMa {
    position: absolute;
    color: red;
    font-size: 12px;
    left: 126px;
    top: 46px;
    zoom: 0.9;
  }
}
.red {
  color: red;
  float: left;
}
.unit {
  ::v-deep .el-form-item {
    margin-bottom: 0px;
  }
}
.partNum {
  ::v-deep .el-input__inner {
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    font-size: 12px;
  }
}
.partNum-input {
  width: 35px;
}
</style>
