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
        <iButton @click="viewProgressIs = true">查看进度 </iButton>
      </div>
    </div>
    <div class="title2" v-if="!isShow">
      <iButton v-if="$route.query.type == 'edit'" @click="dowload"
        >{{ active == 1 ? '下载手工指标' : '导出Excel' }}
      </iButton>
      <el-upload
        style="margin-left: 10px"
        action="1"
        :accept="'.xlsx,.xls'"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :http-request="httpUpload"
        :disabled="importLoading"
      >
        <div>
          <iButton :loading="importLoading" v-if="active == 1 && $route.query.type == 'edit'"
            >{{ '上传手工指标' }}
          </iButton>
        </div>
      </el-upload>
      <el-upload
        style="margin-left: 10px"
        action="1"
        :accept="'.xlsx,.xls'"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :http-request="httpUpload"
        :disabled="importLoading"
      >
        <div>
          <iButton :loading="importLoading" v-if="active == 2 && $route.query.type == 'edit'"
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
      <el-table :data="tbodyData">
        <el-table-column
          align="center"
          prop="supplierName"
          label="供应商"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="allScore"
          label="总体KPI"
          width="120"
        >
        </el-table-column>

        <column
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
  getModelTree,
  exportManualSupplierPerforManceScoreExcel,
  exportL2SupplierPerforManceScoreExcel,
  saveSystemPerformance,
  saveManualPerformance
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
      allData: []
    }
  },
  created() {
    this.init()
    this.getTableList()
  },
  methods: {
    closeDiolog() {
      this.viewProgressIs = false
    },
    init() {},
    getTableList() {
      let id = ''
      if (this.isShow) {
        id = this.$route.query.modelId
      } else {
        id = this.infoData.modelId
      }
      getModelTree(id).then((res) => {
        if (res.code == '200') {
          this.tittleData = JSON.parse(JSON.stringify(res.data.childVo))
          let titleCopy = JSON.parse(JSON.stringify(res.data.childVo))
          titleCopy.forEach((lev1) => {
            lev1.id = lev1.id.toString()
            lev1.childVo.unshift({
              id: 'val' + lev1.id,
              weight: lev1.weight,
              title: '总分',
                  width:80,
            })
            lev1.childVo.forEach((lev2) => {
              lev2.id = lev2.id.toString()
              lev2.childVo.unshift({
                id: 'val' + lev2.id,
                weight: lev2.weight,
                title: '总分',
                  width:80,
              })
              lev1.childVo.forEach((lev3) => {
                lev3.id = lev3.id.toString()
                lev3.childVo.unshift({
                  id: 'val' + lev3.id,
                  weight: lev3.weight,
                  title: '总分',
                  width:80,
                })
                lev1.childVo.forEach((lev4) => {
                  lev4.id = lev4.id.toString()
                  // lev4.childVo.unshift({
                  //   id: 'val' + lev4.id,
                  //   weight: lev4.weight,
                  //   title: '总分'
                  // })
                })
              })
            })
          })
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
        this.tbodyData = res.data
        this.tbodyData.map((val) => {
          val.score.forEach((item) => {
            val['val' + item.modelLibaryId] = item.score
          })
        })
        console.log(this.tbodyData)
        this.page.totalCount = res.total
        this.ipagnation.pageNo = res.pageNum
        this.ipagnation.pageSize = res.pageSize
      })
    },
    dowload() {
      if (this.active == 1) {
        exportManualSupplierPerforManceScoreExcel({
          editionId: this.$route.query.editionId
        })
      } else {
        exportL2SupplierPerforManceScoreExcel({
          editionId: this.$route.query.editionId
        })
      }
    },
    //导入
    async httpUpload(info) {
      this.importLoading = true
      let formData = new FormData()
      formData.append('uploadFile', info.file)
      formData.append('editionId', this.$route.query.editionId)
      if (this.active == 1) {
        await saveManualPerformance(formData).then((res) => {
          if (res.code == 200 && res) {
            this.importDialog = true
            this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
            this.getTableList()
          } else {
            this.$message.error(res.desZh)
          }
        })
      } else {
        await saveSystemPerformance(formData).then((res) => {
          if (res.code == 200 && res) {
            this.importDialog = true
            this.getTableList()
            this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
          } else {
            this.$message.error(res.desZh)
          }
        })
      }
      this.importLoading = false
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
.top {
  display: flex;
  justify-content: space-between;

  .searchOptions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .rotate {
    transform: rotate(180deg);
    color: #a0bffc;
    margin-left: 10px;
  }

  .closed {
    font-size: 24px;
    color: #a0bffc;
    cursor: pointer;
  }
}

.table {
  width: 100%;
  // height: calc(100vh - 340px);
  overflow: auto;
  margin-top: 20px;
  table {
    margin-top: 20px;
    position: relative;
    table-layout: fixed;
    white-space: nowrap;
    // width: 100%;
    height: 100px;
    background-color: #fff;

    tr {
      td {
        position: relative;
        height: 50px;
        text-align: left;
        border-bottom: 2px solid #fff;
        padding-left: 40px;

        div {
          position: relative;
          width: 100px;
          height: 50px;
          overflow: hidden;
          line-height: 50px;
          z-index: 1;
        }
      }

      //    td:first-child{
      //         padding-left: 40px;
      //     }
      td:last-child {
        padding-right: 40px;
      }

      td:nth-child(2) {
        div {
          width: 165px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

.theadBgcolor {
  background: rgba(22, 96, 241, 0.1);
  color: #000;
}

.blod {
  font-weight: bold;

  td:first-child {
    border-top-left-radius: 10px;
  }

  td:last-child {
    border-top-right-radius: 10px;
  }
}

.el-icon-plus {
  color: #fff;
  background: #1763f7;
  cursor: pointer;
  border-radius: 4px;
}

.el-icon-minus,
.el-icon-plus {
  color: #fff;
  background: #1763f7;
  cursor: pointer;
  border-radius: 4px;
}

.lev1dashed::after {
  position: absolute;
  content: '';
  width: 100%;
  top: -25px;
  border-top: 1px dashed #67C23A;
  left: 0;
}

.lev1dashed::before {
  position: absolute;
  content: '';
  width: 100%;
  top: -25px;
  border-left: 1px dashed #67C23A;
  height: 40px;
  left: 75px;
}

.leftline::after {
  position: absolute;
  content: '';
  width: 75px;
  top: -25px;
  border-top: 1px dashed #67C23A;
  left: 0;
}

.halfWidth::before {
  position: absolute;
  content: '';
  width: 100%;
  top: -25px;
  border-left: 1px dashed #67C23A;
  height: 40px;
  left: 75px;
}

.lay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #5d5d5d;
  opacity: 0.2;
  z-index: 1;
}

.upload {
  width: 390px;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.lay-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .el-icon-circle-close {
    font-size: 24px;
    color: #a0bffc;
    cursor: pointer;
  }
}

.dialog-box {
  padding: 30px;
}

.dialog-button {
  display: flex;
  justify-content: flex-end;
}

::v-deep.navBox {
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  margin-bottom: 20px;

  .logButton .icon + span {
    vertical-align: top;
  }

  div {
    font-size: 20px;
  }

  .el-tabs__nav-wrap::after {
    width: 0;
  }

  .el-tabs__item {
    line-height: 24px;
  }

  .el-tabs__item.is-active {
    font-weight: Bold;
  }

  .leftNav {
    float: left;
  }

  .rightNav {
    float: right;
    margin-right: 110px;

    .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}

.clearfix:after {
  content: '020';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}

.tabs {
  width: 208px;
  height: 35px;
  background: #f5f6f7;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  line-height: 35px;

  div:first-child {
    width: 104px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
  }

  div:last-child {
    width: 104px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
  }

  .current {
    background: #fff !important;
    color: #67C23A !important;
    font-weight: bold !important;
  }
}

.page {
  ::v-deep .el-table th {
    border: 0.5px solid #999;
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
