<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div class="page">
    <div class="title" v-if="isShow">
      <div class="left">
        <p>数据版本日期：{{ $route.query.dataTime }}</p>
        <!-- <p>CS科室打分状态：待上传手工指标（2/4）</p>
          <p>其他科室打分状态：进行中（2/4）</p> -->
      </div>
      <div>
        <iButton @click="godept">{{ '发送评分部门' }}</iButton>
        <iButton @click="exportalFile">导出 </iButton>
        <iButton @click="viewProgressIs = true">查看进度 </iButton>
      </div>
    </div>
    <div class="title2" v-if="!isShow">
      <iButton v-if="$route.query.type == 'edit'" @click="dowload"
        >{{ active == 1 ? '下载手工指标' : '导出Excel' }}
      </iButton>
      <el-upload
        :disabled="importLoading"
        style="margin-left: 10px"
        action="1"
        :accept="'.xlsx,.xls'"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :http-request="httpUpload"
      >
        <div>
          <iButton
            :loading="importLoading"
            v-if="active == 1 && $route.query.type == 'edit'"
            >{{ '上传手工指标' }}
          </iButton>
        </div>
      </el-upload>
      <el-upload
        :disabled="importLoading"
        style="margin-left: 10px"
        action="1"
        :accept="'.xlsx,.xls'"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :http-request="httpUpload"
      >
        <div>
          <iButton
            :loading="importLoading"
            v-if="active == 2 && $route.query.type == 'edit'"
            >{{ '上传主观打分' }}
          </iButton>
        </div>
      </el-upload>
      <iButton style="margin-left: 10px" @click="back">上一步</iButton>
      <iButton v-if="active == 1" @click="submit(active)">下一步 </iButton>
      <iButton
        v-if="$route.query.type == 'edit' && active == 2"
        @click="submit(active)"
        >下一步
      </iButton>

      <!-- <iButton @click="back()">上一步 </iButton> -->
    </div>
    <div class="table">
      <el-table
        :cell-class-name="cellClassName"
        style="width: 100%"
        :data="tbodyData"
      >
        <el-table-column
          align="center"
          prop="supplierName"
          label="供应商"
          min-width="120"
          fixed
        >
        <template slot-scope="scope">
            <span>{{ scope.row.sapCode }}-{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isAll || this.isShow"
          align="center"
          prop="allScore"
          label="总体KPI"
          min-width="80"
          fixed
        >
        </el-table-column>

        <column
          :isShow="isShow"
          v-if="item.isShow || isShow"
          v-for="(item, index) in tittleData"
          :key="index"
          :col="item"
        ></column>
      </el-table>
    </div>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <viewProgress
      @closeDiolog="closeDiolog"
      v-if="viewProgressIs"
      v-model="viewProgressIs"
    />
  </div>
</template>

<script>
import viewProgress from './viewProgress'
import column from './column'
import {
  getSupplierPerforManceScorePage,
  getModelTreeTitle,
  exportManualSupplierPerforManceScoreExcel,
  exportL2SupplierPerforManceScoreExcel,
  saveSystemPerformance,
  saveManualPerformance,
  sendPerformanceTask,
  getAllModelTree,
  getAllSupplierPerforManceScorePage,
  getAllModelTreeData,
  exportSupplierPerforManceAllScoreExcel
} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import {
  iMessage,
  iMessageBox,
  iPagination,
  iCard,
  iSearch,
  iButton,
  iInput,
  iSelect,
  iDatePicker,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],

  components: {
    column,
    viewProgress,
    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    tableList,
    iDialog
  },
  props: {
    isShow: { type: Boolean, default: true },
    active: { type: Number, default: 1 },
    infoData: { type: Object }
  },
  data() {
    return {
      tbodyDataCopy: [],
      loadingFile: false,
      viewProgressIs: false,
      importLoading: false,
      ipagnation: {
        pageNo: 1,
        pageSize: 10
      },
      tbodyData: [],
      tittleData: [],
      tableData: [],
      theadData: [],
      berforTheadData: [],
      allData: [],
      isAll: true
    }
  },
  created() {
    this.init()
    if (this.isShow) {
      this.getTableList2()
    } else {
      this.getTableList()
    }
  },
  methods: {
    closeDiolog() {
      this.viewProgressIs = false
    },
    init() {
      getAllModelTree(this.$route.query.modelId).then((res) => {
        this.isAll = res.data
      })
    },
    getTableList() {
      let id = ''
      if (this.isShow) {
        id = this.$route.query.modelId
      } else {
        id = this.infoData.modelId
      }
      getModelTreeTitle(id).then((res) => {
        if (res.code == '200') {
          this.tittleData = JSON.parse(JSON.stringify(res.data.childVo))
          let titleCopy = JSON.parse(JSON.stringify(res.data.childVo))
          if (titleCopy.length > 0) {
            titleCopy.forEach((lev1) => {
              lev1.id = lev1.id.toString()
              if (lev1.childVo.length > 0) {
                lev1.childVo.unshift({
                  id: lev1.id,
                  weight: lev1.weight,
                  title: '总分',
                  childVo: [],
                  'min-width': '60',
                  isShow: true
                })
                lev1.childVo.forEach((lev2) => {
                  lev2.id = lev2.id.toString()
                  if (lev2.childVo.length > 0) {
                    lev2.childVo.unshift({
                      id: lev2.id,
                      weight: lev2.weight,
                      title: '总分',
                      childVo: [],
                      'min-width': '60',
                      isShow: true
                    })
                    lev2.childVo.forEach((lev3) => {
                      lev3.id = lev3.id.toString()
                      if (lev3.childVo.length > 0) {
                        lev3.childVo.unshift({
                          id: lev3.id,
                          weight: lev3.weight,
                          title: '总分',
                          childVo: [],
                          'min-width': '60',
                          isShow: true
                        })
                        lev3.childVo.forEach((lev4) => {
                          lev4.id = lev4.id.toString()
                          // lev4.childVo.unshift({
                          //   id: 'val' + lev4.id,
                          //   weight: lev4.weight,
                          //   title: '总分',
                          //   childVo: []
                          // })
                        })
                      }
                    })
                  }
                })
              }
            })
          }

          this.tittleData = titleCopy
          console.log(titleCopy)
        }
      })
      const req = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        editionId: this.$route.query.editionId
      }
      getSupplierPerforManceScorePage(req).then((res) => {
     
        this.tbodyData = JSON.parse(JSON.stringify(res.data))
        this.tbodyData.map((val) => {
          val.score.forEach((item, i) => {
            val[item.modelLibaryId + item.modelLibaryId] = item.beforeScore
            val[item.modelLibaryId] = item.score
          })
        })

        console.log(this.tbodyData)
        this.page.totalCount = res.total
      })
    },
    getTableList2() {
      let id = ''
      if (this.isShow) {
        id = this.$route.query.modelId
      } else {
        id = this.infoData.modelId
      }
      getAllModelTreeData(id).then((res) => {
        if (res.code == '200') {
          this.tittleData = JSON.parse(JSON.stringify(res.data.childVo))
          let titleCopy = JSON.parse(JSON.stringify(res.data.childVo))
          if (titleCopy.length > 0) {
            titleCopy.forEach((lev1) => {
              lev1.id = lev1.id.toString()
              if (lev1.childVo.length > 0) {
                lev1.childVo.unshift({
                  id: lev1.id,
                  weight: lev1.weight,
                  title: '总分',
                  childVo: [],
                  width: '60',
                  isShow: true
                })
                lev1.childVo.forEach((lev2) => {
                  lev2.id = lev2.id.toString()
                  if (lev2.childVo.length > 0) {
                    lev2.childVo.unshift({
                      id: lev2.id,
                      weight: lev2.weight,
                      title: '总分',
                      childVo: [],
                      width: '60',
                      isShow: true
                    })
                    lev2.childVo.forEach((lev3) => {
                      lev3.id = lev3.id.toString()
                      if (lev3.childVo.length > 0) {
                        lev3.childVo.unshift({
                          id: lev3.id,
                          weight: lev3.weight,
                          title: '总分',
                          childVo: [],
                          width: '60',
                          isShow: true
                        })
                        lev3.childVo.forEach((lev4) => {
                          lev4.id = lev4.id.toString()
                          // lev4.childVo.unshift({
                          //   id: 'val' + lev4.id,
                          //   weight: lev4.weight,
                          //   title: '总分',
                          //   childVo: []
                          // })
                        })
                      }
                    })
                  }
                })
              }
            })
          }

          this.tittleData = titleCopy
          console.log(titleCopy)
        }
      })
      const req = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        editionId: this.$route.query.editionId
      }
      getAllSupplierPerforManceScorePage(req).then((res) => {
        this.tbodyData = JSON.parse(JSON.stringify(res.data))
        this.tbodyData.map((val) => {
          val.score.forEach((item,i) => {
            val[item.modelLibaryId] = item.score
          })
        })

        this.page.totalCount = res.total
      })
    },
    cellClassName(obj) {
    
      // this.tbodyDataCopy.forEach((val,i)=>{
      //   for (const key in val) {
      // }
      //   if(i==obj.rowIndex){
      //     val
      //   }
      // })
      // console.log(obj)
      // console.log(this.tbodyDataCopy)
    },
    dowload() {
      if (this.active == 1) {
        exportManualSupplierPerforManceScoreExcel({
          editionId: this.$route.query.editionId,
          taskId: this.$route.query.id
        })
      } else {
        exportL2SupplierPerforManceScoreExcel({
          editionId: this.$route.query.editionId
        })
      }
    },

    exportalFile() {
      exportSupplierPerforManceAllScoreExcel({
        editionId: this.$route.query.editionId
      })
    },
    godept() {
      sendPerformanceTask(this.$route.query.editionId).then((res) => {
        if (res.code == '200') {
          iMessage.success('发送成功')
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //导入

    async httpUpload(info) {
      this.importLoading = true
      let formData = new FormData()
      formData.append('uploadFile', info.file)
      formData.append('editionId', this.$route.query.editionId)

      formData.append('taskId', this.$route.query.id)
      if (this.active == 1) {
        await saveManualPerformance(formData)
          .then((res) => {
            if (res.code == 200 && res) {
              this.importLoading = false
              this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
              this.getTableList()
            } else {
              // this.$set(this.importLoading,'fasle')
              this.importLoading = false
              this.$message.error(res.desZh)
            }
          })
          .catch(() => {
            this.importLoading = false
          })
      } else {
        await saveSystemPerformance(formData)
          .then((res) => {
            if (res.code == 200 && res) {
              this.importLoading = false
              this.getTableList()
              this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
            } else {
              this.importLoading = false
              this.$message.error(res.desZh)
            }
          })
          .catch(() => {
            this.importLoading = false
          })
      }
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error(`上传文件大小不能超过10MB!`)
      }
      return isLt10M
    },
    submit() {
      this.$emit('submit12')
    },

    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  ::v-deep .el-table th {
    border: 0.5px solid #999;
  }
  .table {
    margin-top: 20px;
  }
  .title2 {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  background: white;
  padding: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        margin: 0 20px;
        font-size: 16px;
        font-weight: 600;
        color: #666;
      }
    }
  }
}
</style>
