<!--
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-25 17:02:32
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\index.vue
-->

<template>
  <iPage>
    <iSearch @reset="clickReset"
             @sure="sure"
             :icon="true">
      <el-form inline
               label-position="top">
        <el-form-item :label="language('YINGYONGMINGCHENG', '应用名称')">
          <iInput :placeholder="language('QINGSHURU', '请输入')"
                  v-model="form.nameZh">
          </iInput>
        </el-form-item>
        <el-form-item :label="language('YINGYONGFUZEREN', '应用负责人')">
          <iSelect filterable
                   v-model="form.userName">
            <el-option :value="item.id"
                       :label="item.nameZh"
                       v-for="(item, index) in userList"
                       :key="index"></el-option>
          </iSelect>

        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <div>

        <div class="floatright"
             style="margin-bottom: 20px">
          <i-button @click="add()">{{ language('XINJIAN','新建') }}</i-button>
          <i-button @click="edit()">{{ language('BIANJI','编辑') }}</i-button>
          <i-button @click="activeBtn">{{ language('JIHUO','激活') }}</i-button>
          <i-button v-if="stateAdmin"
                    @click="handleDelect()">{{ $t('LK_SHANCHU') }}</i-button>
          <i-button v-if="stateAdmin||stateOpcs"
                    @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
        </div>
      </div>
      <table-list style="margin-top: 20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  :openPageProps="'nameZh'"
                  @openPage="openPage"
                  :openPageGetRowData="stateAdmin||stateOpcs"
                  @handleSelectionChange="handleSelectionChange"
                  :index="true">
      </table-list>
      <!-- :selection='stateAdmin' -->

      <iPagination style="margin-top: 20px"
                   v-update
                   @size-change="handleSizeChange($event, sure)"
                   @current-change="handleCurrentChange($event, getTableData)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
    </iCard>
    <iDialog :visible.sync="dialog"
             width="70%"
             top="10%"
             v-if="dialog"
             @close="cleardialog('close')"
             :title="dialogTitle">
      <iFormGroup row="2"
                  :rules="dialogRules"
                  :model="formData"
                  ref="dialogRules">
        <iFormItem prop="nameZh">
          <iLabel :label="language('YINGYONGZHONGWENMING', '应用中文名')"
                  required
                  slot="label"></iLabel>
          <iInput v-model.trim="formData.nameZh"
                  :placeholder="$t('LK_QINGSHURU')"></iInput>
        </iFormItem>
        <iFormItem prop="nameEn">
          <iLabel :label="language('YINGYONGYINGWENMING', '应用英文名')"
                  required
                  slot="label"></iLabel>
          <iInput v-model.trim="formData.nameEn"
                  :placeholder="$t('LK_QINGSHURU')"></iInput>
        </iFormItem>
        <iFormItem prop="shortName">
          <iLabel :label="language('YINGYONGJIANCHENG', '应⽤简称')"
                  required
                  slot="label"></iLabel>
          <iInput v-model.trim="formData.shortName"
                  :placeholder="$t('LK_QINGSHURU')"></iInput>
        </iFormItem>
        <iFormItem prop="contactUserId">
          <iLabel :label="language('YINGYONGFUZEREN', '应用负责人')"
                  required
                  slot="label"></iLabel>
          <iSelect filterable
                   v-model="formData.contactUserId">
            <el-option :value="item.id"
                       :label="item.nameZh"
                       v-for="(item, index) in userList"
                       :key="index"></el-option>
          </iSelect>
        </iFormItem>
      </iFormGroup>
      <div class="btnBox">
        <i-button @click="addBtn()">{{ language('QUEREN','确认') }}</i-button>
        <i-button @click="cleardialog()">{{ language('CHONGZHI','重置') }}</i-button>
      </div>
    </iDialog>
  </iPage>
</template>

<script>
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import {
  iLabel,
  iFormItem,
  iSearch,
  iButton,
  iCard,
  iPagination,
  iMessage,
  iInput,
  iMessageBox,
  iPage,
  iSelect,
  iDialog,
  iFormGroup
} from 'rise'
import { tableTitle } from './components/data'
import {
  deleteList,
  queryList,
  exportFile,
  getListByParam,
  opcsSupplier,
  active
} from '@/api/opcs/solPermission'
export default {
  mixins: [pageMixins],
  components: {
    iLabel,
    iFormItem,
    iFormGroup,
    iButton,
    iSearch,
    iCard,
    iPagination,
    iInput,
    tableList,
    iPage,
    iSelect,
    iDialog
  },
  data() {
    return {
      dialogTitle: '',
      formData: {},
      tableTitle: tableTitle,
      selectTableData: [],
      form: {},
      tableListData: [],
      userList: [],
      tableLoading: false,
      dialog: false,
      dialogRules: {
        nameZh: [
          { required: true, message: '请输入应用中文名', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入应用英文名', trigger: 'blur' },
          {
            min: 1,
            max: 7,
            message: '请输入1-7位英文字母或数字',
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '请输入1-7位英文字母或数字',
            trigger: 'blur'
          }
        ],
        shortName: [
          { required: true, message: '请输入应用简称', trigger: 'blur' }
          //   { min: 1, max: 7, message: '请输入1-7位英文字母或数字', trigger: 'blur' }
        ],
        contactUserId: [
          { required: true, message: '请选择应用负责人', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    stateAdmin() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) => item.code == 'ADMIN'
      )
    },
    stateOpcs() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) => item.code == 'WLGYSGLY'
      )
    }
  },
  created() {
    this.getUser()
    this.getTableData()
  },
  methods: {
    //激活
    activeBtn() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      active({
        opcsSupplierIds: this.selectTableData.map((res) => res.id)
      }).then((res) => {
        if (res && res.code == 200) {
          this.getTableData()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    add() {
      this.dialog = true
      this.cleardialog()
      this.dialogTitle = this.language('XINJIAN', '新建')
    },
    addBtn() {
      this.$refs.dialogRules.validate((valid) => {
        if (valid) {
          opcsSupplier(this.formData).then((res) => {
            if (res && res.code == 200) {
              this.dialog = false
              this.getTableData()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        } else {
          return false
        }
      })
    },
    edit() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      if (this.selectTableData.length > 1) {
        iMessage.warn(
          this.language('ZUIDUOZHINENGXUANZEYITIAOJILU', '最多只能选择一条记录')
        )
        return false
      }
      this.dialog = true
      this.dialogTitle = this.language('BIANJI', '编辑')
      this.formData = this.selectTableData[0]
      console.log(this.formData)
    },
    async getUser() {
      const res = await getListByParam({ roleCode: 'WLGYSGLY' })
      this.userList = res.data
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      queryList(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    handleDelect() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      iMessageBox(
        this.language(
          'SHANCHUGAIYINGYOINGSHI,SUOYOUBANGDINGYONGHUSHOUQUANJIANGYIQISHANCHU',
          '删除该应用时，所有绑定用户的授权将一并删除，是否继续？'
        ),
        this.language('SHANCHU', '删除'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        const req = {
          id: this.selectTableData.map((x) => {
            return x.id
          })
        }
        deleteList(req).then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    },
    openPage(row) {
      console.log(row)
      let path = ''
      if (this.stateOpcs) {
        path = '/provider/opcs/list/application/userManage'
      } else {
        path = '/provider/opcs/list/application'
      }
      let routeData = this.$router.resolve({
        path: path,
        query: {
          opcsSupplierId: row.id || '',
          nameZh: row.nameZh || '',
          opcsUserId: row.contactUserId || ''
        }
      })
      window.open(routeData.href)
    },
    //导出
    exportsTable() {
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      exportFile(params)
    },
    // 点击重置
    clickReset() {
      this.form = {}
      this.getTableData()
    },
    cleardialog(v) {
      if (v == 'close') {
        this.dialog = false
      }
      if (this.dialogTitle == this.language('XINJIAN', '新建')) {
        this.formData = {
          contactUserId: '',
          shortName: '',
          nameEn: '',
          nameZh: ''
        }
      } else {
        this.formData.contactUserId = ''
        this.formData.shortName = ''
        this.formData.nameEn = ''
        this.formData.nameZh = ''
      }
      console.log(this.formData)
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.btnBox {
  text-align: right;
  padding: 20px 0;
}
</style>
