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
    <div class="title2" v-else>
      <iButton @click="dowload">{{ active == 1 ? '下载手工指标' : '导出Excel' }}
      </iButton>
      <el-upload style="margin-left: 10px" action="1" :accept="'.xlsx,.xls'" :before-upload="beforeAvatarUpload"
        :show-file-list="false" :http-request="httpUpload" :disabled="importLoading">
        <div>
          <iButton v-if="active == 1">{{ '上传手工指标' }}
          </iButton>
        </div>
      </el-upload>
      <el-upload style="margin-left: 10px" action="1" :accept="'.xlsx,.xls'" :before-upload="beforeAvatarUpload"
        :show-file-list="false" :http-request="httpUpload" :disabled="importLoading">
        <div>
          <iButton v-if="active == 2">{{ '上传主观打分' }}
          </iButton>
        </div>
      </el-upload>
      <iButton style="margin-left: 10px" @click="back">上一步</iButton>
      <iButton @click="submit(active)">下一步 </iButton>
      <!-- <iButton @click="back()">上一步 </iButton> -->

    </div>
    <div class="table">
      <table cellspacing="0" cellpadding="0">
        <!-- 一级表头 -->
        <tr class="theadBgcolor blod thead1">
          <td>
            <div>#</div>
          </td>
          <td>
            <div>供应商名称</div>
          </td>
          <td>
            <div>总体KPI</div>
          </td>
          <td v-for="(x, index) in theadData" :key="index">
            {{ x.label }}
            <span style="color:#1763f7" v-if="x.lev == 1 ">(</span><!-- 开始括号 -->
            <!-- <i v-if="x.lev != 4" :class="x.isShow ? 'el-icon-minus' : 'el-icon-plus'"
              @click="handleFoldCell(index, x.lev, x.id)"></i> -->
            <span style="color:#1763f7">{{ isLastData(x, index) }}</span><!-- 结束括号 -->
          </td>
        </tr>
        <!-- 数据列表 -->
        <tr v-for="(x, index) in tbodyData" :key="index">
          <td>
            <div>
              <!-- <el-checkbox v-model="x.checked" :label="x.checked" @change="changeStatus(x)"></el-checkbox> -->
              {{ index+ 1}}
            </div>
          </td>
          <td>
            <el-tooltip class="item" effect="light" :content="x.supplierName" placement="top">
              <div>{{ x.supplierName }}</div>
            </el-tooltip>
          </td>
          <td>
            <div>{{ x.allScore }}</div>
          </td>
          <template v-for="(lv1, index1) in x.score">
            <td :key="index1 + 'l1'">
              <div>{{ lv1.score }}</div>
            </td>
          </template>
          <td></td>
        </tr>
      </table>
    </div>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
    <viewProgress @closeDiolog="closeDiolog" v-if="viewProgressIs" v-model="viewProgressIs" />

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
    init() { },
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
          this.tittleData.forEach((x) => {
            x.isShowChildren = true
            x.childVo.forEach((z) => {
              z.isShowChildren = true
              z.childVo.forEach((k) => {
                k.isShowChildren = true
                z.childVo.forEach((y) => {
                  y.isShowChildren = true
                })
              })
            })
          })
          this.jointTittle()
          //默认折叠
          // let showLev1 = []
          // this.theadData.map((z) => {
          //   if (z.lev == 1) {
          //     showLev1.push(z)
          //   }
          // })
          // this.theadData = [...showLev1]
          // console.log(this.theadData)
        }
      })
      const req = {
        ...this.ipagnation,
        editionId: this.$route.query.editionId
      }
      getSupplierPerforManceScorePage(req).then((res) => {
        let data = []
        let tabledata = JSON.parse(JSON.stringify(res.data))

        // data = tabledata.map(val => {
        //   val.all = val.score[0].score
        //   val.supplierName = val.supplierName
        //   val.list = []
        //   val.score.forEach(lev1 => {
        //     if (lev1.level == 2) {
        //       val.list.push(lev1)
        //       val.score.forEach(lev2 => {
        //         if (lev2.level == 3) {
        //           lev2.children=[]
        //           lev2.children.push(lev2)
        //         }
        //       })
        //     }
        //   })
          // val.list.push(val.score.filter(item=>item.level==2))
          // val.list.forEach(k=>{
          //   k.children=[]
          //   k.children.push(val.score.filter(item=>item.level==3))
          // })
          // val.list.children=[]
          // val.list.children.push(val.score.filter(item=>item.level==3))
          // val.list.children.children=[]
          // val.list.children.children.push(val.score.filter(item=>item.level==4))
          // val.list.children.children.children=[]
          // val.list.children.children.children.push(val.score.filter(item=>item.level==5))

        //   return val
        // })
        console.log(data)

        this.allData = JSON.parse(JSON.stringify(tabledata))
        this.tbodyData = JSON.parse(JSON.stringify(tabledata))

        this.page.totalCount = res.total
        this.ipagnation.pageNo = res.pageNum
        this.ipagnation.pageSize = res.pageSize
      })
    },
    dowload() {
      if (this.active == 1) {
        exportManualSupplierPerforManceScoreExcel({ editionId: this.$route.query.editionId })
      } else {
        exportL2SupplierPerforManceScoreExcel({ editionId: this.$route.query.editionId })
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
    handleFoldCell(index, lev, id) {
      // console.log(index,lev,id)
      // console.log(this.theadData[index].isShow)
      // 隐藏表头
      let tittlebox = []
      if (this.theadData[index].isShow) {
        //1级折叠
        this.theadData.forEach((x) => {
          if (lev == 1) {
            if (x.parentID == id || x.grandpaID == id) {
            } else {
              tittlebox.push(x)
            }
          } else if (lev == 2) {
            if (x.parentID == id) {
            } else {
              tittlebox.push(x)
            }
          }
        })
        this.theadData = [...tittlebox]
        // 折叠一级时候一二级ishow=false
        this.theadData[index].isShow = !this.theadData[index].isShow
      } else {
        //展开
        let lev2ArryData = []
        this.berforTheadData.forEach((x, lev1Index) => {
          if (lev == 1) {
            //一级
            if (x.parentID == id) {
              lev2ArryData.push({ ...x, isShow: false })
            }
          }
          if (lev == 2) {
            if (x.parentID == id) {
              lev2ArryData.push(x)
            }
          }
        })
        // 倒叙插入对应位置
        for (let i = lev2ArryData.length - 1; i > -1; i--) {
          this.theadData.splice(index + 1, 0, { ...lev2ArryData[i] })
        }
        // lev2ArryData.unshift(index+1,0)
        // Array.prototype.splice.apply(this.theadData, lev2ArryData)

        this.theadData[index].isShow = !this.theadData[index].isShow
      }
      this.allData.forEach((x, index) => {
        x.list.forEach((y, lev1Index) => {
          //隐藏1级数据
          if (lev == 1 && y.id == id) {
            if (this.tbodyData[index].list[lev1Index].isShowChildren) {
              this.tbodyData[index].list[lev1Index].isShowChildren = false
            } else {
              this.tbodyData[index].list[lev1Index].isShowChildren = true
            }
            y.children.forEach((z, lev2index) => {
              //点击一级 隐藏二级三级
              this.tbodyData[index].list[lev1Index].children[
                lev2index
              ].isShowChildren = false
            })
          }
          if (y.children.length > 0) {
            y.children.forEach((z, lev2index) => {
              //隐藏2级数据
              if (lev == 2 && z.id == id) {
                if (
                  this.tbodyData[index].list[lev1Index].children[lev2index]
                    .isShowChildren
                ) {
                  this.tbodyData[index].list[lev1Index].children[
                    lev2index
                  ].isShowChildren = false
                } else {
                  this.tbodyData[index].list[lev1Index].children[
                    lev2index
                  ].isShowChildren = true
                }
              }
            })
          }
        })
      })
    },
    // 拼接一级表头
    jointTittle() {
      this.theadData = []
      // 拼接表头字段
      this.tittleData.forEach((x) => {
        this.theadData.push({
          //一级
          prop: x.id,
          label: x.title,
          id: x.id,
          lev: 1,
          isShow: false
        })
        if (x.childVo.length > 0) {
          //二级
          x.childVo.forEach((y) => {
            this.theadData.push({
              prop: y.id,
              label: y.title,
              id: y.id,
              parentID: x.id,
              lev: 2,
              isShow: false
            })
            if (y.childVo.length > 0) {
              //三级
              y.childVo.forEach((z) => {
                this.theadData.push({
                  prop: z.id,
                  label: z.title,
                  id: z.id,
                  lev: 3,
                  parentID: y.id,
                  grandpaID: x.id
                })
                if (z.childVo.length > 0) {
                  //四级
                  z.childVo.forEach((k) => {
                    this.theadData.push({
                      prop: k.id,
                      label: k.title,
                      id: k.id,
                      lev: 4,
                      parentID: k.id,
                      grandpaID: k.id
                    })
                  })
                }
              })
            }
          })
        }
      })
      console.log(this.theadData)
      this.berforTheadData = [...this.theadData]
    },
    back() {
      this.$emit('back')
    },
    // 判断是否是最后一条数据
    isLastData(x, index) {
      if (x.lev != 1) {
        if (index < this.theadData.length) {
          if (
            this.theadData[index].lev == 1 ||
            index + 1 == this.theadData.length ||
            this.theadData[index + 1].lev == 1
          ) {
            return '）'
          } else {
            return ''
          }
        }
        if (index == this.theadData.length - 1) {
          return '）'
        }
      } else {
        if (x.isShow) {
          if (index == this.theadData.length - 1) {
            return '）'
          }
          if (index < this.theadData.length) {
            if (
              this.theadData[index].lev == 1 &&
              this.theadData[index + 1].lev == 1
            ) {
              return '）'
            } else {
              return ''
            }
          }
        }
      }
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
  border-top: 1px dashed #1660f1;
  left: 0;
}

.lev1dashed::before {
  position: absolute;
  content: '';
  width: 100%;
  top: -25px;
  border-left: 1px dashed #1660f1;
  height: 40px;
  left: 75px;
}

.leftline::after {
  position: absolute;
  content: '';
  width: 75px;
  top: -25px;
  border-top: 1px dashed #1660f1;
  left: 0;
}

.halfWidth::before {
  position: absolute;
  content: '';
  width: 100%;
  top: -25px;
  border-left: 1px dashed #1660f1;
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

  .logButton .icon+span {
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
    color: #1660f1 !important;
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

    >div {
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
