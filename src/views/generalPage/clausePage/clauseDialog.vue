<!--
 * @Author: YoHo
 * @Date: 2022-01-10 14:51:08
 * @LastEditTime: 2022-02-17 14:24:14
 * @LastEditors: YoHo
 * @Description: 采购条款维护
-->
<template>
  <div>
    <i-dialog
      title="查看已发布采购条款"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
    >
      <div class="search-box">
        <iSearch :icon="true" @sure="search" @reset="reset">
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
            >
              <iDatePicker
                v-model="query.date"
                :start-placeholder="language('开始日期')"
                :end-placeholder="language('结束日期')"
                :picker-options="pickerOptions"
                type="daterange"
                format="yyyy-MM-dd"
                range-separator="-"
                :default-time="['00:00:00', '23:59:59']"
                class="picker"
                clearable
              />
            </el-form-item>
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
          :accept="'.pdf'"
          :upload="offLineUploadAttach"
           :before-upload="beforeUpload"
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
            type="selection"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
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
              v-else-if="item.prop == 'fileName'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
              <template slot-scope="scope">
                <span
                  class="underline openLinkText cursor"
                  @click="attachPreview(scope.row)"
                  >{{ (scope.row.termsName?scope.row.termsName+'-':'')+new Date(scope.row.signTime).getTime() }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.type == 'select'"
              :minWidth="item.minWidth || item.width"
              :label="item.name"
              :prop="item.prop"
              :key="item.prop"
            >
            <template slot-scope="scope">
              <span>{{selectData[item.select][scope.row[item.prop]]}}</span>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.signWay == 'off_line'">
                <iButton
                  :disabled="scope.row.termsStatus != '01'"
                  type="text"
                  @click="confirmSign(scope.row)"
                  >确认已签署</iButton>
              </template>
              <template v-else>
                <!-- 05: 签署中 -->
                <iButton
                  v-if="['05'].includes(scope.row.termsStatus)"
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
  offLineUploadAttach,
  termsTypeById
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
          let y = new Date().getFullYear()
          let m = new Date().getMonth()
          let d = new Date().getDate()
          return time.getTime() >= new Date(y+'/'+(+m+1)+'/'+d).getTime() + 1000*60*60*24
        }
      },
      // 条款类型
      typeList: [],
      // 条款状态
      statusList: [],
      selectData:{
        statusObj:{},
        typeObj:{},
        signWayObj:{},
      },
      // 科室列表
      linieDeptNumList: [],
      // 负责人列表
      headerList: [],
      tableData: [],
      tableDataAll:[],
      tableTitle,
      selectionArr: [],
      selectedTableData: [],
      updataValue: false,
      loading: false,
      disabled: false,
    }
  },
  watch: {
    value(nv) {
      if (nv) {
        if(this.getAgain){  // 接口总是调用失败，再次获取数据
          this.initSelectData()
        }
        this.getTableList()
        this.query =  {
          termsCode: '',
          termsType: [],
          termsName: '',
          termsStatus: [],
          headerId: '',
          date: []
        }
      }
    }
  },
  created(){
    this.initSelectData()
  },
  methods: {
    initSelectData(){
      this.signWaySelector()
      this.termsState()
      this.termsTypeById()
    },
    // 采购条款状态
    termsState(){
      termsState().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.selectData.statusObj[i.code] = i.value
          })
        }else{
          this.getAgain = true
        }
      })
    },
    // 条款类型
    termsTypeById(){
      termsTypeById().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.selectData.typeObj[i.code] = i.value
          })
        }else{
          this.getAgain = true
        }
      })
    },
    // 获取签署方式下拉项
    signWaySelector(){
      signWaySelector().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.selectData.signWayObj[i.code] = i.value
          })
        }else{
          this.getAgain = true
        }
      })
    },
    // 筛选数据
    search() {
      let tableData = JSON.parse(JSON.stringify(this.tableDataAll))
      if (this.query.termsType.length) {
        tableData = tableData.filter((i) =>
          this.query.termsType.includes(this.selectData.typeObj[i.termsType])
        )
      }
      if (this.query.termsStatus.length) {
        tableData = tableData.filter((i) =>
          this.query.termsStatus.includes(this.selectData.statusObj[i.termsStatus])
        )
      }
      if (this.query.date&&this.query.date.length) {
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
      console.log(this.tableData);
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
      let typeList = []
      let statusList = []
      this.tableDataAll.forEach((i) => {
        typeList.includes(this.selectData.typeObj[i.termsType]) || typeList.push(this.selectData.typeObj[i.termsType])
        statusList.includes(this.selectData.statusObj[i.termsStatus]) || statusList.push(this.selectData.statusObj[i.termsStatus])
      })
      this.typeList = typeList
      this.statusList = statusList
      this.getAgain = false
      Object.keys(this.selectData).forEach(key=>{
        if(!Object.keys(this.selectData[key]).length){
          this.getAgain = true
        }
      })
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
    // 归档条款上传前文件类型检测
    beforeUpload(file){
      if(file.name){
        let arr = file.name.split('.')
        let type = arr[arr.length-1].toUpperCase()
        console.log(type);
        if(type=='PDF'){
          return
        }else{
          iMessage.error('请归档PDF文件格式')
          return false
        }
      }
      return false
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
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 删除条款
    deleteTerms() {
      if (!this.selectionArr.length) {
        iMessage.error('未选择需要删除的条款')
        return
      }
      let list = this.selectionArr.filter(i=>this.selectData.statusObj[i.termsStatus] != '草稿')
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
          this.$emit('purchaseTerms')
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
      let params = {
        supplierId: this.supplierId,
        headerId: this.$store.state.permission.userInfo.id // 就是Linie id
      }
      delete params.date
      purchaseTerms(params).then((res) => {
        this.loading = false
        if (res?.code == '200') {
          this.tableDataAll = res.data
          this.tableData = this.tableDataAll.map(item=>{
            item.signTime = item.signTime&&window.moment(new Date(item.signTime)).format('YYYY-MM-DD')
            return item
          })
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
    // 已签署文件预览
    attachPreview(row) {
      let query = {
        src: row.fileUrl,
        title: row.fileName
      }
      const router = this.$router.resolve({ path: '/clausepage/attach', query })
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
  ::v-deep .el-range__close-icon{
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
