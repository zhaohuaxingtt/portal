<template>
  <iPage>
    <div class="title">
      <div>
        <span v-if="this.$route.query.id">
          <span class="title__clause">{{ this.ruleForm.name }}</span>
          <span class="title__version">条款版本：</span>
          <span>
            <iSelect
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.termsVersion"
              @change="changeDisplayVersion"
              class="title__select"
            >
              <el-option
                :value="item.id"
                :label="item.termsVersion"
                v-for="item of ruleForm.termsHistoryList"
                :key="item.id"
              ></el-option>
            </iSelect>
          </span>
        </span>
        <span v-else class="title__clause">{{ '新建条款' }}</span>
      </div>
      <div>
        <!-- 返回 -->
        <iButton @click="clearDiolog">{{ '返回' }}</iButton>
        <!-- 发布 -->
        <iButton @click="handleSubmit(0)" :disabled="submitLoading">{{
          '发布'
        }}</iButton>
        <!-- 删除 -->
        <iButton
          @click="handleDelete"
          :disabled="submitLoading || this.ruleForm.id == null"
          >{{ '删除' }}</iButton
        >
        <!-- 保存 -->
        <iButton @click="handleSubmit(1)" :disabled="submitLoading">{{
          '保存'
        }}</iButton>
      </div>
    </div>
    <iCard>
      <div class="basic">基本信息</div>
      <el-form
        :model="ruleForm"
        label-width="10rem"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <div class="form">
          <div class="input-box">
            <!-- 第一行 -->
            <el-col :span="6" class="form-item">
              <iFormItem label="条款编码" prop="termsCode">
                <iLabel :label="'条款编码'" slot="label"></iLabel>
                <iInput v-model="ruleForm.termsCode" disabled></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="条款名称" prop="name">
                <iLabel :label="'条款名称'" slot="label" required></iLabel>
                <iInput
                  :disabled="ruleForm.isNewest == false"
                  v-model="ruleForm.name"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="条款状态" prop="state">
                <iLabel :label="'条款状态'" slot="label"></iLabel>
                <iSelect
                  :placeholder="$t('LK_QINGXUANZE')"
                  v-model="ruleForm.state"
                  clearable
                  disabled
                >
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item of statusList"
                    :key="item.value"
                  ></el-option>
                </iSelect>
                <!-- <iInput v-model="ruleForm.state" disabled></iInput> -->
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="生效时间" prop="inDate">
                <iLabel :label="'生效时间'" slot="label" required></iLabel>
                <iDatePicker
                  style="width: 100%"
                  :disabled="ruleForm.isNewest == false"
                  value-format="yyyy-MM-dd"
                  type="date"
                  v-model="ruleForm.inDate"
                  :picker-options="pickerOptions"
                />
              </iFormItem>
            </el-col>
            <!-- 第二行 -->
            <el-col :span="6" class="form-item">
              <iFormItem label="是否个人条款" prop="isPersonalTerms">
                <iLabel :label="'是否个人条款'" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.isPersonalTerms"
                  :placeholder="$t('LK_QINGXUANZE')"
                  :disabled="ruleForm.isNewest == false"
                >
                  <el-option
                    v-for="item in isApprovalOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="签署节点" prop="signNode">
                <iLabel :label="'签署节点'" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.signNode"
                  :placeholder="$t('LK_QINGXUANZE')"
                  :disabled="ruleForm.isNewest == false"
                >
                  <el-option
                    v-for="item in signNodeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="条款负责人" prop="chargeName">
                <iLabel :label="'条款负责人'" slot="label" required></iLabel>
                <el-autocomplete
                  style="width: 100%"
                  :disabled="ruleForm.isNewest == false"
                  v-model="ruleForm.chargeName"
                  :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('请输入')"
                  @select="handleSelect"
                ></el-autocomplete>
              </iFormItem>
            </el-col>
            <el-col :span="6" class="form-item">
              <iFormItem label="签署情况" prop="signResult">
                <iLabel :label="'签署情况'" slot="label"></iLabel>
                <iInput v-model="ruleForm.signResult" disabled></iInput>
              </iFormItem>
            </el-col>
            <!-- 第三行 -->
            <el-col :span="6" class="form-item">
              <iFormItem label="是否按轮次" prop="isRound">
                <iLabel :label="'是否按轮次'" slot="label"></iLabel>
                <iSelect
                  v-model="ruleForm.isRound"
                  :placeholder="$t('LK_QINGXUANZE')"
                  :disabled="ruleForm.isNewest == false"
                >
                  <el-option
                    v-for="item in isApprovalOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="18" class="form-item">
              <iFormItem label="供应商范围" prop="supplierRange">
                <iLabel :label="'供应商范围'" slot="label" required></iLabel>
                <el-checkbox-group
                  style="display: inline-block"
                  v-model="ruleForm.supplierRange"
                  @input="handleGroupCheckList"
                  :disabled="ruleForm.isNewest == false"
                >
                  <el-checkbox
                    label="PP"
                    :disabled="ruleForm.supplierRange.includes('CM')"
                    >生产供应商</el-checkbox
                  >
                  <el-checkbox
                    label="GP"
                    :disabled="ruleForm.supplierRange.includes('CM')"
                    >一般供应商</el-checkbox
                  >
                  <el-checkbox
                    label="NT"
                    :disabled="ruleForm.supplierRange.includes('CM')"
                    >N-Tier</el-checkbox
                  >
                  <el-checkbox
                    label="CM"
                    :disabled="
                      ruleForm.supplierRange.includes('PP') ||
                      ruleForm.supplierRange.includes('GP') ||
                      ruleForm.supplierRange.includes('NT')
                    "
                    >自定义</el-checkbox
                  >
                </el-checkbox-group>
                <div class="searchInput">
                  <iInput
                    :placeholder="'选择器'"
                    @focus="handleOpenSupplierChooseDialog()"
                    :disabled="!ruleForm.supplierRange.includes('CM')"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </iInput>
                </div>
                <iButton
                  :disabled="!ruleForm.supplierRange.includes('CM')"
                  class="look"
                  @click="handleOpenSupplierListDialog()"
                  >查看</iButton
                >
              </iFormItem>
            </el-col>
            <!-- 第四行 -->
            <el-col :span="12" class="form-item">
              <iFormItem label="供应商身份" prop="supplierIdentity">
                <iLabel :label="'供应商身份'" slot="label" required></iLabel>
                <el-checkbox-group
                  v-model="ruleForm.supplierIdentity"
                  @input="handleGroupCheckList"
                  :disabled="
                    ruleForm.isNewest == false ||
                    ruleForm.supplierRange.includes('CM')
                  "
                >
                  <el-checkbox label="0">临时</el-checkbox>
                  <el-checkbox label="1">正式</el-checkbox>
                  <el-checkbox
                    :disabled="!ruleForm.supplierRange.includes('NT')"
                    label="2"
                    >储蓄池</el-checkbox
                  >
                </el-checkbox-group>
              </iFormItem>
            </el-col>
            <el-col
              :span="12"
              class="form-item"
              v-if="ruleForm.isPersonalTerms == true"
            >
              <iFormItem
                class="change-label-class"
                label="供应商用户范围"
                prop="supplierContacts"
              >
                <iLabel
                  :label="'供应商用户范围'"
                  slot="label"
                  required
                ></iLabel>
                <el-radio-group
                  v-model="ruleForm.supplierContacts"
                  @input="handleGroupCheckList"
                >
                  <el-radio
                    v-for="item in supplierContactsList"
                    :key="item.value"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </iFormItem>
            </el-col>
            <!-- 第五行 -->
            <el-col :span="24" class="form-item">
              <iFormItem label="备注" prop="remark">
                <iLabel :label="'备注'" slot="label"></iLabel>
                <iInput
                  :disabled="ruleForm.isNewest == false"
                  v-model="ruleForm.remark"
                  class="textarea"
                  type="textarea"
                  :rows="3"
                ></iInput>
              </iFormItem>
            </el-col>
          </div>
        </div>
      </el-form>
    </iCard>
    <!-- 正文 -->
    <iCard style="margin: 1.5rem 0">
      <div class="editBox">编辑框</div>
      <el-form
        :model="ruleForm"
        label-width="10rem"
        :rules="rules"
        ref="ruleFormEdit"
        :hideRequiredAsterisk="true"
      >
        <div class="form">
          <div class="input-box">
            <el-col :span="23" class="form-item" id="editMode">
              <iFormItem label="编辑方式" prop="editMode">
                <iLabel :label="'编辑方式'" slot="label" required></iLabel>
                <el-radio-group
                  v-model="ruleForm.editMode"
                  @input="handleGroupCheckList"
                  :disabled="ruleForm.isNewest == false"
                >
                  <el-radio
                    v-for="item in editModeList"
                    :key="item.value"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </iFormItem>
            </el-col>
            <el-col
              :span="24"
              v-show="ruleForm.editMode == '01'"
              class="form-item"
            >
              <iFormItem label="条款正文" prop="termsText">
                <iLabel :label="'条款正文'" slot="label" required></iLabel>
                <div ref="editer" class="editer" id="editer"></div>
              </iFormItem>
            </el-col>
            <el-col
              :span="24"
              v-show="ruleForm.editMode == '02'"
              class="form-item"
            >
              <iFormItem label="条款正文" prop="termsTextId">
                <iLabel :label="'条款正文'" slot="label" required></iLabel>
                <el-upload
                  v-if="
                    this.ruleForm.termsTextId == '' ||
                    this.ruleForm.termsTextId == null
                  "
                  :on-success="handleAvatarSuccess"
                  :show-file-list="false"
                  :http-request="httpUploadTerms"
                  style="display: inline-block"
                  accept=".doc,.docx"
                  ><span
                    class="el-icon-upload2"
                    style="margin-right: 1rem; color: blue; font-size: 16px"
                  ></span>
                </el-upload>
                <li
                  v-else
                  class="el-upload-list__item is-success i-paperclip"
                  style="display: inline-block; margin-right: 64px"
                >
                  <a
                    class="el-upload-list__item-name"
                    @click="
                      handleDownloadFile(ruleForm.termsTextId, termsTextName)
                    "
                  >
                    <i class="el-icon-paperclip" :title="this.termsTextName">
                      {{ this.termsTextName }}
                    </i>
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                  </label>
                  <i @click="handleDeleteAccessory()" class="el-icon-close"></i>
                </li>
                <iButton
                  @click="handlePre()"
                  :disabled="this.ruleForm.termsTextId == ''"
                  >{{ '预览' }}</iButton
                >
              </iFormItem>
            </el-col>
          </div>
        </div>
      </el-form>
    </iCard>
    <!-- 附件 -->
    <iCard>
      <div class="enclosure">附件</div>
      <div class="form">
        <div class="input-box">
          <el-col :span="24" class="form-item">
            <div class="upload-box">
              <el-upload
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                :http-request="httpUpload"
                multiple
              >
                <iButton
                  v-if="ruleForm.isNewest != false"
                  style="margin-right: 8px"
                  >上传附件</iButton
                >
              </el-upload>
              <iButton
                @click="handleDownload"
                :disabled="this.selectedFileData.length === 0"
                >{{ '下载附件' }}</iButton
              >
              <iButton
                @click="handleDel"
                v-if="ruleForm.isNewest != false"
                :disabled="this.selectedFileData.length === 0"
                >{{ '删除' }}</iButton
              >
            </div>
          </el-col>
          <el-col :span="24" class="form-item">
            <iTableML
              tooltip-effect="light"
              :data="this.ruleForm.attachments"
              @selectionChange="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="文件名称"
                ><template slot-scope="scope">
                  <span
                    class="open-link-text"
                    @click="handleDownFile(scope.row)"
                    >{{ scope.row['attachmentName'] }}</span
                  >
                </template></el-table-column
              >
              <el-table-column align="center" label="大小（KB）"
                ><template slot-scope="scope">
                  <span>{{ scope.row['attachmentSize'] }}</span>
                </template></el-table-column
              >
              <el-table-column align="center" label="上传日期"
                ><template slot-scope="scope">
                  <span>{{ scope.row['uploadDate'] }}</span>
                </template></el-table-column
              >
            </iTableML>
          </el-col>
        </div>
      </div>
    </iCard>
    <supplierListDialog
      v-if="openSupplierListDialog"
      :openDialog="openSupplierListDialog"
      :supplierList="this.ruleForm.supplierList"
      @closeDialog="closeSupplierListDialog"
    />
    <supplierChooseDialog
      v-if="openSupplierChooseDialog"
      :openDialog="openSupplierChooseDialog"
      @closeDialog="closeSupplierChooseDialog"
      @selectedTableData="selectedTableData"
      :supplierList="this.ruleForm.supplierList"
    />
  </iPage>
</template>

<script>
import {
  iPage,
  iInput,
  iFormItem,
  iLabel,
  iButton,
  iSelect,
  iMessage,
  iDatePicker,
  iCard
} from 'rise'
import E from 'wangeditor'
import UploadMenu from './UploadPanel'
import {
  baseRules,
  statusList,
  supplierContactsList,
  editModeList
} from './data'
import uploadIcon from '@/assets/images/upload-icon.svg'
import iTableML from '@/components/iTableML'
import { uploadFile } from '@/api/terms/uploadFile.js'
import { getDictByCode } from '@/api/dictionary/index'
import { download, downloadZip } from '@/utils/downloadUtil'
import supplierListDialog from './supplierListDialog.vue'
import supplierChooseDialog from './supplierChooseDialog.vue'
import dayjs from 'dayjs'
import {
  saveTerms,
  updateTerms,
  releaseTerms,
  findById,
  deleteTerms,
  getPageListByParam
} from '@/api/terms/terms'
import { getFileByIds } from '@/api/terms/uploadFile'
export default {
  components: {
    iPage,
    iSelect,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iCard,
    iDatePicker,
    iTableML,
    supplierListDialog,
    supplierChooseDialog
  },
  data() {
    return {
      uploadIcon,
      rules: baseRules,
      supplierContactsList,
      editModeList,
      signNodeList: [], // 签署节点
      statusList,
      termsTextName: '',
      ruleForm: {
        termsVersion: '', // 条款版本
        termsCode: '', // 条款编码
        name: '', // 条款名称
        state: '01', // 条款状态
        inDate: dayjs().format('YYYY-MM-DD'), // 生效时间
        isPersonalTerms: false, // 是否个人条款
        signNode: '', // 签署节点
        chargeId: '1', // 条款负责人
        chargeName: '', // 条款负责人名
        signResult: '', // 签署情况
        isRound: false, // 是否按轮次
        supplierRange: [], // 供应商范围
        supplierIdentity: [], // 供应商身份
        supplierContacts: '', // 供应商用户范围
        supplierList: [], // 供应商列表
        remark: '', // 备注
        editMode: '01', // 编辑方式
        termsText: '', // 正文
        termsTextId: '', // 条款正文id
        termsTextUrl: '', // 条款正文url
        attachments: [], // 附件列表
        termsHistoryList: []
      },
      selectedFileData: [],
      pickerOptions: {
        disabledDate: (time) => {
          let curDate = Date.now() - 8.64e7
          return time.getTime() < curDate
        }
      },
      isApprovalOption: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      uploadLoading: false,
      submitLoading: false,
      openSupplierListDialog: false,
      openSupplierChooseDialog: false,
      supplierCheckList: [],
      exc: -1,
      supplierExcCheckList: []
    }
  },
  watch: {
    'ruleForm.supplierRange': {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.includes('NT')) {
          if (this.ruleForm.supplierIdentity.indexOf('2') == -1) {
            this.ruleForm.supplierIdentity.push('2')
          }
        } else if (val.includes('CM')) {
          this.ruleForm.supplierIdentity = []
        } else {
          const indexSupplier = this.ruleForm.supplierIdentity.indexOf('2')
          if (indexSupplier != -1) {
            this.ruleForm.supplierIdentity.splice(indexSupplier, 1)
          }
        }
      }
    },
    'ruleForm.supplierIdentity': {
      immediate: true,
      deep: true,
      handler(val) {
        console.log('supplierIdentity', val)
      }
    },
    'ruleForm.supplierContacts': {
      immediate: true,
      deep: true,
      handler(val) {
        console.log('supplierContacts', val)
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      // 根据ID查询条款信息
      let param = { id: this.$route.query.id }
      this.query(param)
    }
    // this.signNodeList = [
    //   {
    //     name: "注册",
    //     id: "01",
    //   },
    //   {
    //     name: "询价",
    //     id: "02",
    //   },
    //   {
    //     name: "定点",
    //     id: "03",
    //   },
    // ];
    getDictByCode('SIGN_NODE').then((res) => {
      if (res && res.data !== null && res.data.length > 0) {
        this.signNodeList = res.data[0].subDictResultVo
      }
    })
    this.createEditor()
  },
  methods: {
    createEditor() {
      let that = this
      this.editor = new E('#editer')
      // 配置菜单栏，设置不需要的菜单
      // this.editor.config.excludeMenus = [
      //   'list',
      //   'todo',
      //   'emoticon',
      //   'image',
      //   'video',
      //   'table',
      //   'code'
      // ]
      // 配置字体
      this.editor.config.fontNames = [
        // 字符串形式
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New'
      ]
      this.editor.config.menus = this.editor.config.menus.concat('uploadMenu') // 配置菜单栏，删减菜单，调整顺序
      this.editor.config.customUploadImg = async (files, callaback) => {
        const urls = []
        for (let i = 0; i < files.length; i++) {
          const res = await this.upload(files[i])
          urls.push(res)
        }
        callaback(urls)
      }
      this.editor.menus.extend('uploadMenu', UploadMenu) // 配置扩展的菜单
      this.editor.config.onchange = function (newHtml) {
        that.ruleForm.termsText = newHtml
      }
      this.editor.create()
      this.editor.txt.html(this.ruleForm.termsText)
    },
    handleSelect(item) {
      this.ruleForm.chargeId = item.id
      this.ruleForm.chargeName = item.nameZh
    },
    async querySearchAsync(queryString, cb) {
      let res = await this.getUsersAll(queryString)
      res = res || { data: [] }
      let userArr = res.data || []
      userArr = userArr.map((item) => {
        return {
          value: item.nameZh,
          ...item
        }
      })
      cb(userArr)
    },
    async getUsersAll(str) {
      const data = {
        nameZh: str
      }
      let res = await getPageListByParam(data)
      return res
    },
    query(e) {
      // 根据ID查询条款信息
      findById(e).then((res) => {
        res.supplierRange = res.supplierRange?.split(',')
        res.supplierIdentity = res.supplierIdentity?.split(',')
        this.ruleForm = res
        if (this.ruleForm.termsText != '') {
          this.editor.txt.html(this.ruleForm.termsText)
          if (this.ruleForm.isNewest != true) {
            this.editor.disable()
          } else {
            this.editor.enable()
          }
        }
        if (this.ruleForm.editMode == '02') {
          getFileByIds([this.ruleForm.termsTextId]).then((res) => {
            this.termsTextName = res.name
          })
        }
      })
    },
    upload(file) {
      return new Promise((resolve) => {
        let formData = new FormData()
        formData.append('file', file)
        uploadFile(formData)
          .then((res) => {
            resolve(res.path)
          })
          .catch(() => {})
      })
    },
    async httpUploadTerms(content) {
      this.uploadLoading = true
      this.submitLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      await uploadFile(formData)
        .then((res) => {
          this.ruleForm.termsTextId = res.id
          this.ruleForm.termsTextUrl = res.path
          iMessage.success('上传成功')
          console.log('res')
          getFileByIds([res.id]).then((res) => {
            this.termsTextName = res.name
          })
        })
        .catch(() => {
          // iMessage.error("上传失败");
        })
      this.uploadLoading = false
      this.submitLoading = false
    },
    async httpUpload(content) {
      this.uploadLoading = true
      this.submitLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      await uploadFile(formData)
        .then((res) => {
          let createDate = new Date(+new Date() + 8 * 3600 * 1000)
            .toJSON()
            .substr(0, 19)
            .replace('T', ' ')
          this.ruleForm.attachments.push({
            fileType: '01',
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path,
            attachmentSize: (content.file.size / 1024).toFixed(0),
            uploadDate: createDate
          })
          iMessage.success('上传成功')
        })
        .catch(() => {
          // iMessage.error("上传失败");
        })
      this.uploadLoading = false
      this.submitLoading = false
    },
    handleDownloadFile(id, name) {
      download({
        fileIds: id,
        filename: name,
        callback: (e) => {
          if (!e) {
            iMessage.error('下载失败')
          }
        }
      })
    },
    handleDownFile(row) {
      download({
        fileIds: row.attachmentId,
        filename: row.attachmentName,
        callback: (e) => {
          if (!e) {
            iMessage.error('下载失败')
          }
        }
      })
    },
    handleDownload() {
      const fileNameids = this.selectedFileData
        .map((i) => {
          return i.attachmentId
        })
        .join(',')
      const filename =
        this.selectedFileData.length == 1
          ? ''
          : this.$route.query.id
          ? this.ruleForm.name +
            this.ruleForm.termsVersion +
            new Date().getTime()
          : '条款附件' + new Date().getTime()
      downloadZip({
        fileIds: fileNameids,
        filename: filename,
        callback: (e) => {
          if (!e) {
            iMessage.error('下载失败')
          }
        }
      })
    },
    handlePre() {
      let routeUrl = this.$router.resolve({
        path: '/terms/management/termsPreview',
        query: {
          id: this.ruleForm.termsTextId
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    handleSelectionChange(val) {
      this.selectedFileData = val
    },
    handleDel() {
      this.selectedFileData.map((i) => {
        this.ruleForm.attachments.map((item) => {
          if (item.attachmentId == i.attachmentId) {
            let index = this.ruleForm.attachments.indexOf(item)
            this.ruleForm.attachments.splice(index, 1)
          }
        })
      })
    },
    changeDisplayVersion(value) {
      this.query({ id: value })
    },
    handleOpenSupplierListDialog() {
      this.openSupplierListDialog = true
    },
    closeSupplierListDialog(bol) {
      this.openSupplierListDialog = bol
    },
    handleOpenSupplierChooseDialog() {
      this.openSupplierChooseDialog = true
    },
    closeSupplierChooseDialog(bol) {
      this.openSupplierChooseDialog = bol
    },
    selectedTableData(val) {
      this.ruleForm.supplierList = val
    },
    clearDiolog() {
      this.$confirm('是否取消编辑？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: '/terms/management'
        })
      })
    },
    handleSubmit(e) {
      this.$confirm(e === 0 ? '是否发布该条款？' : '是否保存该条款？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.submitForm('ruleForm', e)
      })
    },
    submitForm(formName, e) {
      this.$refs[formName].validate((validBase) => {
        if (validBase) {
          this.$refs['ruleFormEdit'].validate((valid) => {
            if (
              (this.ruleForm.editMode == '01' &&
                this.ruleForm.termsText == '') ||
              (this.ruleForm.editMode == '02' &&
                this.ruleForm.termsTextId == '')
            ) {
              this.$message.error('条款正文不能为空！')
            } else if (
              this.ruleForm.supplierRange[0] != 'CM' &&
              this.ruleForm.supplierIdentity.length == 0
            ) {
              this.$message.error('供应商身份不能为空！')
            } else {
              if (valid) {
                this.submitLoading = true
                this.ruleForm.supplierRange = this.ruleForm.supplierRange
                  .map((i) => {
                    return i
                  })
                  .join(',')
                this.ruleForm.supplierIdentity = this.ruleForm.supplierIdentity
                  .map((i) => {
                    return i
                  })
                  .join(',')
                const formData = this.ruleForm
                formData.isPublish = e === 0 ? true : false
                if (this.$route.query.id) {
                  if (e === 0) {
                    if (formData.inDate >= dayjs().format('YYYY-MM-DD')) {
                      releaseTerms(formData)
                        .then((data) => {
                          if (data) {
                            iMessage.success(this.$t('发布成功！'))
                            this.$router.push({
                              path: '/terms/management'
                            })
                          } else {
                            formData.supplierRange =
                              formData.supplierRange?.split(',')
                            formData.supplierIdentity =
                              formData.supplierIdentity?.split(',')
                          }
                          this.submitLoading = false
                        })
                        .catch(() => {
                          this.submitLoading = false
                        })
                    } else {
                      iMessage.error(this.$t('生效日期不能小于当天'))
                      formData.supplierRange =
                        formData.supplierRange?.split(',')
                      formData.supplierIdentity =
                        formData.supplierIdentity?.split(',')
                      this.submitLoading = false
                    }
                  } else {
                    updateTerms(formData)
                      .then((data) => {
                        if (data) {
                          iMessage.success(this.$t('保存成功！'))
                          this.$router.push({
                            path: '/terms/management'
                          })
                        } else {
                          formData.supplierRange =
                            formData.supplierRange?.split(',')
                          formData.supplierIdentity =
                            formData.supplierIdentity?.split(',')
                        }
                        this.submitLoading = false
                      })
                      .catch(() => {
                        this.submitLoading = false
                      })
                  }
                } else {
                  saveTerms(formData)
                    .then((data) => {
                      if (data) {
                        iMessage.success(e === 0 ? '发布成功！' : '保存成功！')
                        this.$router.push({
                          path: '/terms/management'
                        })
                      } else {
                        formData.supplierRange =
                          formData.supplierRange?.split(',')
                        formData.supplierIdentity =
                          formData.supplierIdentity?.split(',')
                      }
                      this.submitLoading = false
                    })
                    .catch(() => {
                      this.submitLoading = false
                    })
                }
              } else {
                return false
              }
            }
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      const isSize = file.size / 1024 / 1024 < 50
      if (!isSize) {
        this.$message.error('文件大小最大限制50MB')
      }
      return isSize
    },
    handleDeleteAccessory() {
      this.ruleForm.termsTextId = ''
      this.ruleForm.termsTextUrl = ''
    },
    handleDelete() {
      this.$confirm('是否删除该条款？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        if (this.ruleForm.state == '01' || this.ruleForm.state == '02') {
          deleteTerms({ id: this.ruleForm.id })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success('删除成功')
                this.$router.push({
                  path: '/terms/management'
                })
              }
            })
            .catch(() => {
              // this.$message.error("删除失败!");
            })
        } else {
          this.$message.error('此条款状态不是草稿/待生效状态，不能删除')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  .title__clause {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    line-height: 0px;
    color: #000000;
    opacity: 1;
    margin-right: 29px;
  }
  .title__version {
    margin: 0 1rem 0 3rem;
    font-size: 8px;
    font-family: Arial;
    font-weight: 400;
    line-height: 0px;
    color: #4b4b4c;
    opacity: 1;
  }
  .title__select {
    width: 12rem;
  }
}

.basic,
.editBox,
.enclosure {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  margin-bottom: 30px;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .input-box {
    width: 100%;
    margin-left: -2rem;
    .form-item {
      padding-left: 2rem;
    }
  }
  // .input-box {
  // :nth-child(4n + 1) {
  //   left: 0 !important;
  // }
  // :nth-child(11) {
  //   padding-left: 0 !important;
  // }
  // }
}
.upload-box {
  float: right;
  display: flex;
  margin-bottom: 22px;
  text-align: right;
}

.searchInput ::v-deep {
  margin-left: 26px;
  display: inline-block;
  .el-input {
    width: 9rem;
    .el-input__inner {
      padding-left: 1rem;
    }
    .el-input__prefix {
      margin-left: 7rem;
      font-size: 18px;
    }
  }
}
.look {
  margin-left: 26px;
}

.i-paperclip {
  width: 30%;
  .el-icon-paperclip {
    color: rgb(23, 99, 247);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: underline;
  }
}
.el-upload-list__item {
  margin-top: 0 !important;
  vertical-align: middle;
}

::v-deep .change-label-class .el-form-item__label {
  width: 10.5rem !important;
}
::v-deep .el-checkbox__label {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  line-height: 0px;
  color: #4b4b4c;
  opacity: 1;
}
::v-deep .el-checkbox__input .el-checkbox__inner {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 5px;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #4b4b4c;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  // 对号
  position: absolute;
  margin: 1px;
  border: 2px solid #fff;
  // 不覆盖下面的 会 导致对号变形
  box-sizing: content-box;
  content: '';
  border-left: 0;
  border-top: 0;
}
::v-deep .el-radio__label {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  line-height: 0px;
  color: #4b4b4c;
  opacity: 1;
}

::v-deep .w-e-menu {
  z-index: 2 !important;
}
::v-deep .w-e-text-container {
  z-index: 1 !important;
}
::v-deep .w-e-toolbar {
  z-index: 2 !important;
}

::v-deep .el-autocomplete {
  width: 15rem;
}
</style>