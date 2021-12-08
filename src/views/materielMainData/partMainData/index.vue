<template>
  <div class="main">
    <div class="search">
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('零件号')">
                <iInput
                  :placeholder="language('请输入')"
                  v-model="searchContent.partNum"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('零件名称')">
                <iInput
                  :placeholder="language('请输入')"
                  v-model="searchContent.partNameZh"
                >
                </iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('零件来源')">
                <iSelect
                  :placeholder="language('请输入/请选择')"
                  v-model="searchContent.source"
                  filterable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
          </el-row>
          <iFormItem :label="language('零件状态')">
            <iSelect v-model="searchContent.partStatus">
              <el-option
                v-for="item in partStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-form>
      </iSearch>
    </div>
    <div class="tabList" style="margin-top:20px">
      <iCard>
        <div class="btnList">
          <iButton @click="createNew">{{ language('新建') }}</iButton>
          <iButton @click="activeSta" :disabled="unActiveBtn">{{language('激活')}}</iButton>
          <iButton @click="del" :disabled="unLoseActiveBtn">{{language('删除')}}</iButton>
          <buttonDownload  :download-method="exportExcel">{{language('导出')}}</buttonDownload>
        </div>
        <div class="tableContent">
          <div class="tabel">
            <iTableCustom
              :loading="loading"
              :data="data"
              :columns="materirelList"
              @goDetail="goDetail"
              @handle-selection-change="handleSelectionChange"
            >
            </iTableCustom>
          </div>
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
        </div>
      </iCard>
    </div>
  </div>
</template>

<script>
import {
  iButton,
  iCard,
  iSearch,
  iFormItem,
  iInput,
  iSelect,
  iPagination,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { materirelList } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import { openUrl } from '@/utils'
import buttonDownload from '@/components/buttonDownload'
import {
  marerielTableList,
  exprtExcel,
  invalidPort,
  activePort,
  searchOptions
} from '@/api/materiel/materielMainData.js'

export default {
  components: {
    iButton,
    iCard,
    iSearch,
    iFormItem,
    iInput,
    iSelect,
    iTableCustom,
    iPagination,
    iMessage,
    buttonDownload
  },
  mixins: [pageMixins],
  created() {
    this.getTableList()
    searchOptions()
      .then(val => {
        if (val.code == 200) {
          for (let key in val.data.partSourceSelectData) {
            this.options.push({
              name: val.data.partSourceSelectData[key],
              value: key
            })
          }
        }
      })
      .catch(err => {
        iMessage.error(err)
      })
  },
  methods: {
    getTableList() {
      this.loading = true
      let data = {}
      if (this.times == 0) {
        data = {
          partNum: '',
          partNameZh: '',
          source: '',
          partStatus: '',
          current: this.page.currPage,
          size: this.page.pageSize
        }
      } else {
        data = {
          ...this.searchContent,
          current: this.page.currPage,
          size: this.page.pageSize
        }
      }
      marerielTableList(data)
        .then(val => {
          if (val.code == 200) {
            this.loading = false
            this.data = val.data
            this.page.totalCount = val.total
            this.times++
          }
        })
        .catch(err => {
          iMessage.error(err.dscZh || '获取数据失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    sure() {
      this.page.totalCount = 0
      this.page.currPage = 1
      this.getTableList()
    },
    reset() {
      this.searchContent = {
        partNum: '',
        partNameZh: '',
        source: '',
        partStatus: ''
      }
      this.getTableList()
    },
    createNew() {
      openUrl('/materielData/parts-message/edit')
    },
    activeSta() {
      let ids = []
      this.selectedData.map(item => {
        return ids.push(item.id)
      })
      activePort(ids)
        .then(val => {
          if (val.code == 200) {
            this.getTableList()
          }
        })
        .catch(err => {
          iMessage.error(err)
        })
    },
    del() {
      this.$confirm('是否删除已选中选项，是否继续', '失效', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        this.selectedData.map(item => {
          return ids.push(item.id)
        })
        invalidPort(ids)
          .then(val => {
            if (val.code == 200) {
              this.getTableList()
            }
          })
          .catch(err => {
            iMessage.error(err)
          })
      })
    },
    exportExcel() {
      return exprtExcel({ ...this.searchContent })
    },
    //选中的item
    handleSelectionChange(val) {
      if (val.length > 0) {
        let showDelButton = []
        showDelButton = val.filter(item => {
          return item.partStatusDesc == '草稿' && item.sourceDesc == '手工创建'
        })
        console.log(showDelButton, '=====', showDelButton.length)
        if (showDelButton.length != val.length) {
          this.unLoseActiveBtn = true
          this.unActiveBtn = true
        } else {
          this.unLoseActiveBtn = false
          this.unActiveBtn = false
        }
      } else {
        this.unLoseActiveBtn = true
        this.unActiveBtn = true
      }
      this.selectedData = val
    },
    goDetail(val) {
      let id = val.id
      openUrl(`/materielData/parts-message/edit?id=${id}`)
    }
  },
  data() {
    return {
      exportLoading: false,
      partStatusOptions: [
        {
          label: '激活',
          value: 'ACTIVE'
        },
        {
          label: '草稿',
          value: 'DRAFT'
        }
      ],
      times: 0,
      unActiveBtn: true,
      unLoseActiveBtn: true,
      loading: false,
      materirelList,
      searchItemTitle: {
        materielNum: '零件号',
        materielName: '零件名称',
        materielSource: '零件来源',
        partStatus: '零件状态'
      },
      placehoderText: '请输入',
      selectText: '请输入/请选择',
      searchContent: {
        partNum: '',
        partNameZh: '',
        source: '',
        partStatus: ''
      },
      options: [],
      btnList: {
        createNew: '新建',
        activeSta: '激活',
        del: '删除',
        exports: '导出'
      },
      data: [],
      selectedData: []
    }
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.tableContent {
  margin-top: 20px;
}
.tabel {
}
</style>
