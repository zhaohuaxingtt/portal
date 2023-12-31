<template>
  <div class="material-dialog">
    <iDialog
      title="业务用户日志"
      :visible.sync="isShow"
      width="85%"
      @open="handleOpen"
      @close="handleClose"
    >
      <i-search @sure="sure" @reset="reset" class="margin-bottom20">
        <el-form :model="query" ref="queryForm">
          <el-form-item :label="'操作类型'">
            <iSelect
              v-model="query.type"
              filterable
              clearable
              placeholder="请选择（支持搜索）"
            >
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="'操作人'">
            <i-input :placeholder="'请输入'" v-model="query.creator" />
          </el-form-item>
          <el-form-item :label="'业务编号'">
            <i-input
              :placeholder="'请输入'"
              :disabled="disabledBiz"
              v-model="query.bizId"
            />
          </el-form-item>
          <el-form-item :label="'操作内容'">
            <i-input :placeholder="'请输入'" v-model="query.content_like" />
          </el-form-item>
          <el-form-item :label="'日志编号'">
            <i-input :placeholder="'请输入'" v-model="query.id" />
          </el-form-item>
          <el-form-item :label="'时间筛选'" style="width: auto">
            <iDatePicker
              v-model="date"
              :start-placeholder="language('开始日期')"
              :end-placeholder="language('结束日期')"
              type="daterange"
              format="yyyy-MM-dd"
              range-separator="至"
              value-format="yyyy-MM-dd"
              style="width: 320px"
              clearable
              @change="dateChange"
            />
          </el-form-item>
          <el-form-item v-if="recordShow" style="padding-top: 10px">
            <div slot="label" style="opacity: 0">显示关键查看记录</div>
            <el-checkbox v-model="query.isSee" :disabled="recordFlag">{{
              language('显示关键查看记录', '显示关键查看记录')
            }}</el-checkbox>
          </el-form-item>
        </el-form>
      </i-search>
      <el-table
        :data="tableData"
        style="width: 100%"
        class="log-table"
        default-expand-all
        v-loading="loading"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            {{ props.row.content }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="日志编号"
          prop="id"
          width="150"
          align="center"
        />
        <el-table-column label="操作类型" prop="typeName" align="center" />
        <el-table-column
          label="操作内容"
          prop="content"
          width="250"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="请求时间"
          prop="rqTime"
          width="150"
          align="center"
        />
        <el-table-column
          label="响应时间"
          prop="respTime"
          width="150"
          align="center"
        />
        <el-table-column
          label="异常信息"
          prop="exceptionMsg"
          width="200"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="用户" prop="creator" align="center" />
        <el-table-column label="岗位" prop="userPosition" align="center" />
        <el-table-column label="是否成功" prop="userPosition" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.success ? '是' : '否' }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="isPage" slot="footer">
        <iPagination
          v-update
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iDialog>
  </div>
</template>

<script>
import {
  iDialog,
  iSearch,
  iInput,
  iSelect,
  iPagination,
  iDatePicker
} from 'rise'
import moment from 'moment'

export default {
  components: { iDialog, iSearch, iInput, iSelect, iPagination, iDatePicker },
  props: {
    bizId: {
      type: Number,
      Default: function () {
        return 0
      }
    },
    menuId: {
      type: [Number, String],
      default: ''
    },
    show: [Boolean],
    isPage: {
      type: Boolean, // 是否分页
      default: false
    },
    extendParams: {
      type: Object,
      default: function () {
        return {}
      }
    },
    env: {
      // 运行环境，如dev,sit,vmsit,uat等，一般传process.env.NODE_ENV
      type: String,
      default: ''
    },
    recordShow: {
      type: Boolean, // 是否默认显示关键查看记录
      default: true
    }
  },
  data() {
    return {
      tableData: [],
      query: {
        type: '',
        creator: '',
        bizId: '',
        content_like: '',
        createDate_gt: '',
        createDate_le: '',
        id: ''
      },
      options: [],
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      loading: false,
      date: '',
      disabledBiz: false
    }
  },
  created() {
    this.restForm()
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    appEnv() {
      return window.sessionStorage.getItem('env') || this.env
    },
    bizLogApiPrefix() {
      const baseMap = {
        '': '/api',
        dev: '/bizlogApi',
        sit: '/bizlogApi',
        vmsit: '/bizlogApi',
        uat: '/bizlogApi',
        production: '/bizlogApi'
      }
      return baseMap[this.appEnv.toLowerCase()] || '/api'
    }
  },
  methods: {
    restForm() {
      return new Promise((resolve) => {
        let end = moment().format('YYYY-MM-DD')
        let start = moment(
          new Date(end).getTime() - 30 * 24 * 3600 * 1000
        ).format('YYYY-MM-DD') //30天
        this.date = [start, end]
        this.query.createDate_gt = start
        this.query.createDate_le = end
        resolve()
      })
    },
    dateChange(date) {
      this.query.createDate_gt = date ? date[0] : ''
      this.query.createDate_le = date ? date[1] : ''
    },
    sure() {
      if (this.isPage) {
        this.page.currPage = 1
      }
      this.getList()
    },
    async reset() {
      await this.restForm()
      this.query = {
        type: '',
        creator: '',
        bizId: '',
        content_like: '',
        createDate_gt: '',
        createDate_le: '',
        id: ''
      }
      if (this.disabledBiz) {
        this.query.bizId = this.bizId
        this.query.menuId = this.menuId
      }
      // this.date = null
      if (this.isPage) {
        this.page.currPage = 1
      }
      this.getList()
    },
    async handleClose() {
      await this.restForm()
      this.query = {
        type: '',
        creator: '',
        bizId: '',
        content_like: '',
        createDate_gt: '',
        createDate_le: '',
        id: ''
      }
      // this.date = null
    },
    handleOpen() {
      if (this.bizId) {
        this.disabledBiz = true
      } else {
        this.disabledBiz = false
      }
      this.query.bizId = this.bizId
      this.query.menuId = this.menuId
      this.getOptions()
      this.getList()
    },
    getOptions() {
      // 操作类型
      const http = new XMLHttpRequest()
      const url = `${this.bizLogApiPrefix}/operationLog/listOperation`
      http.open('POST', url, true)
      http.setRequestHeader('content-type', 'application/json')
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          this.options = JSON.parse(http.responseText)?.data || []
        }
      }
      http.send(JSON.stringify({ isAdmin: false }))
    },
    getList() {
      this.loading = true
      const http = new XMLHttpRequest()
      const url = `${this.bizLogApiPrefix}/operationLog/findRecordLogs`

      http.open('POST', url, true)
      http.setRequestHeader('content-type', 'application/json')
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (this.isPage) {
            const { data } = JSON.parse(http.responseText)
            this.tableData = data.content || []
            this.page.totalCount = data.total
          } else {
            this.tableData = JSON.parse(http.responseText)?.data || []
          }
        }
        this.loading = false
      }
      const extendParams = this.extendParams || {}
      const sendData = {
        extendFields: { ...this.query, ...extendParams }
      }
      if (this.isPage) {
        sendData.current = this.page.currPage - 1
        sendData.size = this.page.pageSize
      }
      http.send(JSON.stringify(sendData))
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.currPage = val
      this.getList()
    }
  }
}
</script>
<style lang="scss">
.pagination-box {
  padding-bottom: 30px;
}
.el-tooltip__popper.is-dark {
  z-index: 9999 !important;
}

.material-dialog {
  .card {
    box-shadow: none;

    .cardBody {
      padding: 0;
    }
  }

  .log-table {
    padding-bottom: 35px;
  }

  .el-table__body-wrapper {
    height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #eee;
  }
}
</style>
