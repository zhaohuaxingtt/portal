<!--
 * @Author: YoHo
 * @Date: 2022-01-10 14:51:08
 * @LastEditTime: 2022-01-25 19:17:30
 * @LastEditors: YoHo
 * @Description: 采购条款维护
-->
<template>
  <div>
    <i-dialog
      :title="title"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
    >
      <div class="search-box">
        <iSearch v-if="showType" :icon="true" @sure="search" @reset="reset">
          <el-form class="form-group">
            <el-form-item label="条款编码">
              <iInput v-model="query.termsCode" placeholder="请输入"></iInput>
            </el-form-item>
            <el-form-item label="条款类型">
              <iSelect
                v-model="query.termsType"
                collapse-tags
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="item in typeList"
                  :value="item"
                  :key="item"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item label="条款名称">
              <iInput v-model="query.termsName" placeholder="请输入"></iInput>
            </el-form-item>
            <el-form-item label="条款状态">
              <iSelect
                v-model="query.termsStatus"
                collapse-tags
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="item in statusList"
                  :value="item"
                  :key="item"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item
              class="last-item"
              label="签署起止时间"
              v-if="isMaintain"
            >
              <iDatePicker
                v-model="query.date"
                :start-placeholder="language('开始日期')"
                :end-placeholder="language('结束日期')"
                :picker-options="pickerOptions"
                type="daterange"
                format="yyyy-MM-dd"
                range-separator="-"
                value-format="yyyy-MM-dd"
                class="picker"
                clearable
              />
            </el-form-item>
            <!-- <el-form-item label="签署起止时间" v-if="isMaintain" style="margin-right: 0px">
              <iDatePicker
                v-model="query.startDate"
                :placeholder="language('请选择')"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="picker"
                :picker-options="startPickerOptions"
              />
            </el-form-item>
            <span class="speator">-</span>
            <el-form-item>
              <iDatePicker
                v-model="query.endDate"
                :placeholder="language('请选择')"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="picker"
                :picker-options="endPickerOptions"
              />
            </el-form-item> -->
          </el-form>
        </iSearch>
      </div>

      <div class="line"></div>
      <div class="btn-box">
        <uploadButton
          class="margin-left10"
          button-text="归档线下签署条款"
          :selectionArr="selectionArr"
          :uploadCheck="uploadCheck"
          :disabled="disabled"
          :upload="offLineUploadAttach"
        />
        <el-tooltip
          class="item"
          effect="light"
          content="若需上传标准条款\DB条款\附件采购条款请联系条款管理员。"
          placement="top"
        >
          <icon symbol name="iconxinxitishi"></icon>
        </el-tooltip>
        <iButton @click="deleteTerms">删除</iButton>
      </div>
      <div class="padding-bottom20">
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          height="400px"
        >
          <el-table-column
            v-if="selection"
            type="selection"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="index"
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
          <template v-for="item in tableTitle">
            <el-table-column
              v-if="item.prop == 'termsName'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
              <template slot-scope="scope">
                <span
                  class="underline openLinkText cursor"
                  @click="filePreview(scope.row)"
                  >{{ scope.row.termsName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.prop == 'fileUrl'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
              <template slot-scope="scope">
                <span
                  class="underline openLinkText cursor"
                  @click="filePreview(scope.row)"
                  >{{ scope.row.fileUrl ? scope.row.termsName : '' }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.prop == 'signWay'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
            <template slot-scope="scope">
              <span>{{signWayObj[scope.row[item.prop]]}}</span>
            </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.prop == 'termsStatus'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
            <template slot-scope="scope">
              <span>{{statusObj[scope.row[item.prop]]}}</span>
            </template>
            </el-table-column>
            <el-table-column
              v-else
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            ></el-table-column>
          </template>
          <el-table-column v-if="isMaintain" label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.signWay == 'off_line'">
                <iButton
                  :disabled="scope.row.termsStatus != '01'"
                  type="text"
                  @click="confirmSign(scope.row)"
                  >确认已签署</iButton>
              </template>
              <template v-else>
                <iButton
                  v-if="['06'].includes(scope.row.termsStatus)"
                  @click="cancelApprove(scope.$index, scope.row)"
                  type="text"
                  >撤回签署</iButton>

              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </i-dialog>
  </div>
</template>

<script>
import {
  iDialog,
  iSearch,
  iFormGroup,
  iFormItem,
  iLabel,
  iText,
  icon,
  iInput,
  iSelect,
  iDatePicker,
  iButton,
  iMessage
} from 'rise'
import uploadButton from './upload'
import { ClauseDialogTableTitle as tableTitle } from './data'
import {
  deleteTerms,
  purchaseTerms,
  confirmSign,
  cancelApprove,
  signWaySelector,
  termsState,
  offLineUploadAttach
} from '@/api/frmRating/overView/overView.js'
import deleteMixin from '@/mixins/deleteMixin'

export default {
  mixins: [deleteMixin],
  components: {
    iDialog,
    iSearch,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    icon,
    iInput,
    iSelect,
    iDatePicker,
    iButton,
    uploadButton
  },
  props: {
    value: { type: Boolean },
    // isMaintain 采购条款维护: true, 采购条款查询: false
    isMaintain: { type: String, default: true },
    status: { type: String, default: '1' },
    selection: { type: Boolean, default: true }, // 采购员 true, 供应商false
    index: { type: Boolean, default: true },
    showType: { type: Boolean, default: true },
    supplierId: { type: String },
  },
  data() {
    return {
      query: {
        termsCode: '',
        termsType: [],
        termsName: '',
        termsStatus: [],
        headerId: '',
        date: []
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > new Date()
        }
      },
      // 条款类型
      typeList: [],
      // 条款状态
      statusList: [],
      statusObj:{},
      signWayObj:{},
      // 科室列表
      linieDeptNumList: [],
      // 负责人列表
      headerList: [],
      tableData: [],
      tableTitle,
      selectionArr: [],
      selectedTableData: [],
      updataValue: false,
      loading: false,
      disabled: false,
      options: [
        {
          label: '科室1',
          value: '1',
          children: [
            {
              label: '张三',
              code: '001',
              value: '1'
            },
            {
              label: '李四',
              code: '002',
              value: '2'
            },
            {
              label: '王五',
              code: '003',
              value: '3'
            }
          ]
        },
        {
          label: '科室2',
          value: '2',
          children: [
            {
              label: '周星驰',
              code: '004',
              value: '1'
            },
            {
              label: '阿萨德',
              code: '005',
              value: '2'
            },
            {
              label: '权威',
              code: '006',
              value: '3'
            }
          ]
        }
      ]
    }
  },
  watch: {
    value(nv) {
      if (nv) {
        this.getTableList()
      }
    }
  },
  computed: {
    title() {
      if (this.isMaintain) {
        return '查看已发布采购条款'
      } else {
        return '采购条款查询'
      }
    },
    newOptions() {
      return this.options.map((i) => {
        if (Array.isArray(i.children) && i.children.length) {
          i.children.forEach((j) => {
            if (j.code) {
              j.labelCode = '【' + j.label + '-' + j.code + '】'
            } else {
              j.labelCode = '【' + j.label + '】'
            }
          })
        }
        i.labelCode = '【' + i.label + '】'
        return i
      })
    }
  },
  created() {
    this.initSelectData()
  },
  methods: {
    initSelectData(){
      this.signWaySelector()
      this.termsState()
    },
    // 采购条款状态
    termsState(){
      termsState().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.statusObj[i.code] = i.value
          })
        }
      })
    },
    // 获取签署方式下拉项
    signWaySelector(){
      signWaySelector().then(res=>{
        console.log(res);
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.signWayObj[i.code] = i.value
          })
        }
      })
    },
    // 筛选数据
    search() {
      let tableData = JSON.parse(JSON.stringify(this.tableDataAll))
      if (this.query.termsType.length) {
        tableData = tableData.filter((i) =>
          this.query.termsType.includes(i.termsType)
        )
      }
      if (this.query.termsStatus.length) {
        tableData = tableData.filter((i) =>
          this.query.termsStatus.includes(this.statusObj[i.termsStatus])
        )
      }
      if (this.query.date.length) {
        tableData = tableData.filter((i) =>
          new Date(i.signTime).getTime() >= new Date(this.query.date[0]).getTime() && new Date(i.signTime).getTime() <= new Date(this.query.date[1]).getTime()
        )
      }
      tableData = tableData.filter((i) =>
        i.termsCode.includes(this.query.termsCode)
      )
      tableData = tableData.filter((i) =>
        i.termsName.includes(this.query.termsName)
      )
      this.tableData = tableData
    },
    // 重置
    reset() {
      this.query = {
        termsCode: '',
        termsType: [],
        termsName: '',
        termsStatus: [],
        headerId: '',
        date: []
      }
      this.getTableList()
      // this.tableData = this.tableDataAll
    },
    // 获取筛选项
    getSelectData() {
      console.log(this.tableDataAll)
      let typeList = []
      let statusList = []
      this.tableDataAll.forEach((i) => {
        typeList.includes(i.termsType) || typeList.push(i.termsType)
        statusList.includes(this.statusObj[i.termsStatus]) || statusList.push(this.statusObj[i.termsStatus])
      })
      this.typeList = typeList
      this.statusList = statusList
    },
    // 归档条款上传前检测
    uploadCheck() {
      let msg = ''
      if (this.selectionArr.length > 1) {
        msg = '此操作仅支持单选，请重新需选择'
      } else if (!this.selectionArr.length) {
        msg = '请选择一条记录进行归档'
      } else if (
        this.selectionArr[0].signWay != 'off_line' ||
        this.selectionArr[0].termsStatus != '06'
      ) {
        console.log(this.selectionArr);
        msg = '请选择已完成线下签署的采购条款进行上传。'
      }
      if (msg) {
        iMessage.error(msg)
        this.disabled = true
      }
      setTimeout(() => {
        this.disabled = false
      })
    },

    // 归档线下签署条款
    offLineUploadAttach(content) {
      let id = this.selectionArr[0].id
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('id', id);
      formData.append('userId', this.$store.state.permission.userInfo.id);
      offLineUploadAttach(formData).then(res=>{
        if(res?.code=='200'){
          this.getTableList()
        }
      })
    },
    // 删除条款
    deleteTerms() {
      if (!this.selectionArr.length) {
        iMessage.error('未选择需要删除的条款')
        return
      }
      let list = this.selectionArr.filter(i=>i.termsType != '其它采购条款')
      if (list.length) {
        iMessage.error('不可删除标准采购条款和附件采购条款')
        return
      }
      list = this.selectionArr.filter(i=>this.statusObj[i.termsStatus] != '草稿')
      if (list.length) {
        iMessage.error('仅可删除状态为草稿的条款，若要删除请先撤回。')
        return
      }
      let ids = this.selectionArr.map((i) => i.id)
      deleteTerms(ids).then((res) => {
        if (res?.code == '200') {
          this.getTableList()
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },

    // 确认签署，刷新表格数据
    confirmSign(row) {
      console.log('确认签署')
      confirmSign(row.id).then((res) => {
        if (res?.code == '200') {
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 撤回已签署,刷新表格
    cancelApprove(index, row) {
      cancelApprove(row.id).then(res=>{
        if(res?.code=='200'){
          // this.tableData.splice(index, 1)
          this.getTableList()
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
      this.getSelectData()
    },
    // 复选框调整
    handleSelectionChange(val) {
      this.selectionArr = val
    },
    // 获取条款列表
    getTableList() {
      this.loading = true
      if (!this.supplierId) {
        iMessage.error('供应商id获取失败')
      }
      let params = {
        supplierId: this.supplierId,
        headerId: this.$store.state.permission.userInfo.id // 就是Linie id
      }
      delete params.date
      purchaseTerms(params).then((res) => {
        this.loading = false
        if (res?.code == '200') {
          this.tableDataAll = res.data
          this.tableData = this.tableDataAll
          this.getSelectData()
          this.search()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 已发布条款预览
    filePreview(row) {
      let query = {
        id: row.id,
      }
      const router = this.$router.resolve({ path: '/clausepage/preview', query })
      window.open(router.href, '_blank')
    },
    // 关闭弹窗
    clearDiolog() {
      this.$emit('input', false)
    },
  }
}
</script>

<style scoped lang="scss">
.search-box {
  ::v-deep .card {
    box-shadow: none;
    .cardBody {
      padding: 0;
    }
  }
}
// .form-group{
//   ::v-deep .el-form-item{
//     margin-right: 48px !important;
//   }
// }
.table-header {
  display: flex;
  justify-content: space-between;
}
.openLinkText {
  color: $color-blue;
}
.changeContent {
  padding: 0 10px 20px 10px;
}
.cascader {
  width: 220px;
}
.picker.el-date-editor {
  width: 240px;
  v-deep .el-range__close-icon{
    display: inline-block;
  }
}
.item {
  margin: 0 10px;
}
.line {
  margin: 10px 0;
  height: 1px;
  background-color: #dcdfe6;
}
.btn-box {
  text-align: right;
  margin-bottom: 10px;
}
.move-top {
  text-align: right;
  // margin: -60px 0 15px;
}
.last-item {
  margin-bottom: 0;
}
.speator {
  display: inline-block;
  width: 20px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
</style>
