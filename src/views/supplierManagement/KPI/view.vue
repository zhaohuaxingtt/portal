<template>
  <div>
    <iCard style="margin-top:20px">
      <div class="top">
        <div class="searchOptions">
          <el-form>
            <el-row>
              <el-col>
                <iSelect v-model="selectValue"
                         @change="handleChange">
                  <el-option v-for="(x,index) in dropDownOptions"
                             :key="index"
                             :label="x.value"
                             :value="x.key"></el-option>
                </iSelect>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <input type="file"
                 id="file"
                 accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                 @change="upfileChange($event)"
                 style="display:none;" />
          <iButton @click="handleupLoad" v-permission="KPI_INFOR_CHAKAN_SHANGCHUAN">上传</iButton>
          <iButton @click="handleDownload" v-permission="KPI_INFOR_CHAKAN_XIAZAI">下载</iButton>
        </div>
      </div>
      <!-- 自定义列表 -->
      <div class="table">
        <table cellspacing="0"
               cellpadding="0">
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
            <td v-for="(x,index) in theadData"
                :key="index">
              {{x.label}}
              <template v-if="x.lev==1&&x.isShow">(</template><!-- 开始括号 -->
              <i v-if="x.lev!=3"
                 :class="x.isShow?'el-icon-minus':'el-icon-plus'"
                 @click="handleFoldCell(index,x.lev,x.id)"></i>
              <template>{{isLastData(x,index)}}</template><!-- 结束括号 -->
            </td>
          </tr>
          <!-- 数据列表 -->
          <tr v-for="(x,index) in tbodyData"
              :key="index">
            <td>
              <div>
                <!-- <el-checkbox v-model="x.checked" :label="x.checked" @change="changeStatus(x)"></el-checkbox> -->
                {{(index+1)+(ipagnation.pageNo-1)*ipagnation.pageSize}}
              </div>
            </td>
            <td>

              <el-tooltip class="item"
                          effect="light"
                          :content="x.nameZh"
                          placement="top">
                <div>{{x.nameZh}}</div>
              </el-tooltip>
            </td>
            <td>
              <div>{{x.all}}</div>
            </td>
            <template v-for="(lv1,index1) in x.list">
              <td :key="index1+'l1'">
                <div>{{lv1.score}}</div>
              </td>
              <template v-if="lv1.isShowChildren">
                <!-- 隐藏1级 -->
                <template v-for="(lv2,index2) in lv1.children">
                  <td :key="index2+'l2'">
                    <div>{{lv2.score}}</div>
                  </td>
                  <template v-if="lv2.isShowChildren">
                    <!-- 隐藏2级 -->
                    <template v-for="(lv3,index3) in lv2.children">
                      <td :key="index3+'l3'">
                        <div>{{lv3.score}}</div>
                      </td>
                    </template>
                  </template>
                </template>
              </template>

            </template>
            <td></td>
          </tr>
        </table>
      </div>

      <!-- 分页标签 -->
      <iPagination v-update
                   @size-change="handleSizeChange($event)"
                   @current-change="handleCurrentChange($event)"
                   background
                   :current-page="ipagnation.pageNo"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :total="page.totalCount">
      </iPagination>
    </iCard>
    <div v-if="isShowDialog">
      <div class="lay"></div>
      <div class="upload dialog-box">
        <div class="lay-head">
          <div>{{dialogName}}</div>
          <div class="el-icon-circle-close"
               @click="isShowDialog=fasle"></div>
        </div>
        <div>请选择对应打分模型的版本号</div>
        <div style="margin:10px 0 26px 0;">
          <iSelect v-model="uploadVersion"
                   @change="changeSelectVer()">
            <el-option v-for="(x,index) in dropDownOptions"
                       :key="index"
                       :label="x.value"
                       :value="x.key"></el-option>
          </iSelect>
        </div>
        <div class="dialog-button">
          <iButton @click="handleSure">确认</iButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect, iPagination, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { kpiDetail, slelectkpiList, dowbloadAPI, templateDetail, uploadTemplate } from '@/api/kpiChart'
import publicHeaderMenu from './commonHeardNav/headerNav'
import { iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantListkpi } from './commonHeardNav/navData'
import logButton from '@/components/logButton'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iPage,
    iCard,
    iInput,
    iSelect,
    iPagination,
    slelectkpiList,
    publicHeaderMenu,
    categoryManagementAssistantListkpi,
    tabRouterList,
    iNavMvp,
    logButton
  },
  data () {
    return {
      isShowImgKpi: false,
      activeName: '/supplier/kpiList',
      activeRightName: '/supplier/supplierKpiTreeTable',
      tabRouterList: tabRouterList,
      categoryManagementAssistantList: categoryManagementAssistantListkpi,
      formData: {
        deptId: ''
      },
      tittleData: [],
      allData: [{
        list: []
      }],
      scoreList: [],
      selectOptions: [],
      selectValue: "",
      dropDownOptions: [],
      checked: false,
      isShowDialog: false,
      uploadVersion: '',
      file: null,
      ipagnation: {
        pageNo: 1,
        pageSize: 10
      },
      isDownload: false,
      theadData: [],
      tbodyData: [],
      berforTheadData: [],
      dialogName: ""
    }
  },
  created () {
    this.getSelectKpiList({ deptCode: this.$store.state.permission.userInfo.deptDTO.deptNum })
  },
  mounted () {

  },
  methods: {
    getSelectKpiList (params) {
      slelectkpiList({ ...params, orderByUpload: true }).then(res => {
        this.dropDownOptions = res.data
        if (this.dropDownOptions.length > 0) {
          this.getTittleDetail(this.dropDownOptions[this.dropDownOptions.length - 1].key)//初始化表头
          this.getDetail(this.dropDownOptions[this.dropDownOptions.length - 1].key)//初始化最新版本数据
          this.selectValue = this.dropDownOptions[this.dropDownOptions.length - 1].key
        }
      })
    },
    // 获取表格数据
    getDetail (templateId) {
      kpiDetail({
        templateId: templateId,
        ...this.ipagnation
      }).then(res => {
        if (res.code == "200") {
          if (res.data.length < 1) {
            this.tbodyData = []
            return this.$message({ type: 'warning', message: '当前无KPI数据，请上传打分数' })
          } else {
            this.allData = JSON.parse(JSON.stringify(res.data))

            this.tbodyData = JSON.parse(JSON.stringify(res.data))
            this.tbodyData.forEach(x => {
              x.list.forEach(y => {
                y.isShowChildren = false
                y.children.forEach(z => {
                  z.isShowChildren = false
                })
              })
            })
            this.page.totalCount = res.total
            this.ipagnation.pageNo = res.pageNum
            this.ipagnation.pageSize = res.pageSize
          }
        }
      })
    },
    handleFoldCell (index, lev, id) {
      // console.log(index,lev,id)
      // console.log(this.theadData[index].isShow)
      // 隐藏表头
      let tittlebox = []
      if (this.theadData[index].isShow) {//1级折叠
        this.theadData.forEach(x => {
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
      } else {//展开
        let lev2ArryData = []
        this.berforTheadData.forEach((x, lev1Index) => {
          if (lev == 1) {//一级
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
        x.list.forEach((y, lev1Index) => {//隐藏1级数据
          if (lev == 1 && y.id == id) {
            if (this.tbodyData[index].list[lev1Index].isShowChildren) {
              this.tbodyData[index].list[lev1Index].isShowChildren = false
            } else {
              this.tbodyData[index].list[lev1Index].isShowChildren = true
            }
            y.children.forEach((z, lev2index) => {//点击一级 隐藏二级三级
              this.tbodyData[index].list[lev1Index].children[lev2index].isShowChildren = false
            })
          }
          if (y.children.length > 0) {
            y.children.forEach((z, lev2index) => {//隐藏2级数据
              if (lev == 2 && z.id == id) {
                if (this.tbodyData[index].list[lev1Index].children[lev2index].isShowChildren) {
                  this.tbodyData[index].list[lev1Index].children[lev2index].isShowChildren = false
                } else {
                  this.tbodyData[index].list[lev1Index].children[lev2index].isShowChildren = true
                }
              }
            })
          }
        })
      })
    },
    handleChange (e) {
      this.getTittleDetail(this.selectValue)
      this.getDetail(this.selectValue)
    },
    handleupLoad () {
      this.isShowDialog = true
      this.uploadVersion = ""
      this.isDownload = false
      this.dialogName = "上传"
    },
    handleDownload () {
      this.uploadVersion = ""
      this.isShowDialog = true
      this.isDownload = true
      this.dialogName = "下载"
    },
    changeSelectVer (e) {
      if (this.isDownload) {//下载
        console.log(e)
      } else {//上传
        let link = document.querySelector("#file")
        link.click()
      }

    },
    upfileChange (e) {
      this.file = e.target.files[0]
    },
    async handleSure () {
      if (this.isDownload) {//下载
        if (!this.uploadVersion) return this.$message({ type: 'warning', message: '请选择版本' })
        let name = ""
        this.dropDownOptions.forEach(x => {
          if (x.key == this.uploadVersion) {
            name = x.value
          }
        })
        await dowbloadAPI({ templateId: this.uploadVersion })
        this.isShowDialog = false
      } else {//上传
        if (this.uploadVersion) {
          let formdata = new FormData()
          formdata.append('file', this.file)
          formdata.append('templateId', this.uploadVersion)
          uploadTemplate(formdata).then(res => {
            if (res.result) {
              this.$message(res.desZh)
              this.isShowDialog = false
              this.getSelectKpiList({ deptCode: this.$store.state.permission.userInfo.deptDTO.deptNum })
            } else {
              this.$message({ message: res.desZh, type: 'warning' })
              // this.isShowDialog=false
              this.uploadVersion = ""
            }
          }).catch(error => {
            this.$message({
              message: error,
              type: 'warning'
            })
          })
        } else {
          this.$message({
            message: '请选择版本',
            type: 'warning'
          })
        }
      }
    },
    changeStatus (x) {
      x.checked = !x.checked
    },
    // 获取表头
    getTittleDetail (x) {
      templateDetail({
        pageNo: 1,
        pageSize: 100,
        templateId: x
      }).then(res => {
        if (res.code == "200") {
          this.tittleData = JSON.parse(JSON.stringify(res.data))
          this.tittleData.forEach(x => {
            x.isShowChildren = true
            x.children.forEach(z => {
              z.isShowChildren = true
              z.children.forEach(k => { k.isShowChildren = true })
            })
          })

          this.jointTittle()

          //默认折叠
          let showLev1 = []
          this.theadData.map(z => {
            if (z.lev == 1) {
              showLev1.push(z)
            }
          })
          this.theadData = [...showLev1]
        }
      })

    },
    // 拼接一级表头
    jointTittle () {
      this.theadData = []
      // 拼接表头字段
      this.tittleData.forEach(x => {
        this.theadData.push({//一级
          prop: x.id,
          label: x.name,
          id: x.id,
          lev: 1,
          isShow: false,
        })
        if (x.children.length > 0) {//二级
          x.children.forEach(y => {
            this.theadData.push({
              prop: y.id,
              label: y.name,
              id: y.id,
              parentID: x.id,
              lev: 2,
              isShow: false,
            })
            if (y.children.length > 0) {//三级
              y.children.forEach(z => {
                this.theadData.push({
                  prop: z.id,
                  label: z.name,
                  id: z.id,
                  lev: 3,
                  parentID: y.id,
                  grandpaID: x.id
                })
              })
            }
          })
        }
      })
      this.berforTheadData = [...this.theadData]
    },
    // //改变page操作
    handleSizeChange (event) {
      this.ipagnation.pageSize = event
      this.page.pageSize = event
      this.getDetail(this.selectValue)
      // 改变页码长度默认折叠
      this.getDetail(this.selectValue)
      this.getTittleDetail(this.selectValue)
    },
    handleCurrentChange (event) {
      this.ipagnation.pageNo = event
      this.page.pageSize = event
      this.page.currPage = event
      // 改变分页默认折叠
      this.getDetail(this.selectValue)
      this.getTittleDetail(this.selectValue)
    },
    // 判断是否是最后一条数据
    isLastData (x, index) {
      if (x.lev != 1) {
        if (index < this.theadData.length) {
          if (this.theadData[index].lev == 1 || index + 1 == this.theadData.length || this.theadData[index + 1].lev == 1) {
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
            if (this.theadData[index].lev == 1 && this.theadData[index + 1].lev == 1) {
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
.imgkpi-head {
  display: flex;
  justify-content: space-between;
}

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
  height: calc(100vh - 340px);
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
</style>