<template>
  <div>
    <iCard>
      <div v-if="isShow == false" class="imgkpi-head">
        <el-form label-position="left" label-width="60px">
          <el-form-item label="版本：" class="SearchOption">
            <span>{{ infoData.modelVersion }}</span>
          </el-form-item>
        </el-form>
        <div >
          <iButton v-if="!isEdit&& $route.query.type == 'edit'" @click="edit ">编辑</iButton>
          <iButton v-if="isEdit" @click="canel">取消</iButton>
          <iButton v-if="isEdit" @click="save">保存</iButton>
          <!-- <iButton v-if="!isEdit" @click="back">上一步</iButton> -->
          <iButton v-if="!isEdit" @click="submit">下一步</iButton>
        </div>
      </div>
      <div class="scoll-y">
        <div class="kpi-chart">
          <div class="tab1">
            <!-- <div class="head">总体</div> -->
            <div class="cell">
              <div :class="
                formDataLevel2.childVo.childVo.length > 0
                  ? 'total first-cloum-after'
                  : 'total'
              ">
                <div class="titleCard">
                  <span>总分</span>
                </div>
                <div class="line">
                  <label>权重</label>
                  <span v-if="!isEdit">{{ formDataLevel2.childVo.weight }}</span>
                  <iInput v-else class="kpi-input2" v-model="formDataLevel2.childVo.weight"></iInput>
                </div>
                <div>
                  <label>等于</label>
                  <span v-if="formDataLevel2.childVo.childVo.length >= 1">{{ '指标加权汇总' }}</span>
                  <iSelect v-else :disabled="!isEdit" class="kpi-input2" clearable
                    :placeholder="$t('partsprocure.PLEENTER')" v-model="formDataLevel2.childVo.indicatorLibraryId">
                    <el-option v-for="(j, index) in infoList" :key="index" :value="j.id" :label="j.nameZh">
                    </el-option>
                  </iSelect>
                </div>
                <!-- <div class="line bottomcard">
                  <div style="border-right: 1px solid #909091">
                    <iButton
                      v-if="!modeAll"
                      @click="deleteTemplate"
                      icon="el-icon-delete"
                      >删除</iButton
                    >
                    <iButton v-else @click="canelAll" icon="el-icon-delete"
                      >取消</iButton
                    >
                  </div>
                  <div>
                    <iButton
                      v-if="!modeAll"
                      @click="modeAll = true"
                      icon="el-icon-edit-outline"
                      >编辑</iButton
                    >
                    <iButton
                      v-else
                      @click="modeAll = false"
                      icon="el-icon-edit-outline"
                      >提交</iButton
                    >
                  </div>
                </div> -->
                <i v-if="isEdit" class="el-icon-circle-plus-outline iconbtn" @click="addCell"></i>
              </div>
            </div>
          </div>
          <!-- <div class="tab2">
            <div class="head">
              <p class="border-class">指标1</p>
            </div>
          </div>
          <div class="tab3">
            <div class="head">
              <p class="border-class">指标2</p>
            </div>
          </div>
          <div class="tab4">
            <div class="head">
              <p class="border-class">指标3</p>
            </div>
          </div>
          <div class="tab5">
            <div class="head">
              <p class="border-class">指标4</p>
            </div>
          </div> -->
        </div>
        <div class="list2">
          <div class="list" v-for="(item, index) in formDataLevel2.childVo.childVo" :key="index" :class="
            index < formDataLevel2.childVo.childVo.length - 1
              ? 'second-cloum-before'
              : ''
          ">
            <div class="cell">
              <div :class="
                item.childVo.length > 0
                  ? 'content kpi-module second-before second-after'
                  : 'content kpi-module second-before'
              ">
                <div class="titleCard">
                  <!-- <label>标题</label> -->
                  <span v-if="!isEdit">{{ item.title }}</span>
                  <iInput v-else class="kpi-input2 kpi-input3" v-model="item.title"></iInput>
                </div>
                <div class="line">
                  <label>权重</label>
                  <span v-if="!isEdit">{{ item.weight }}</span>
                  <iInput v-else class="kpi-input2" v-model="item.weight"></iInput>
                </div>
                <div>
                  <label>等于</label>
                  <span v-if="item.childVo.length >= 1">{{ '指标加权汇总' }}</span>
                  <iSelect v-else :disabled="!isEdit" class="kpi-input2" clearable
                    :placeholder="$t('partsprocure.PLEENTER')" v-model="item.indicatorLibraryId">
                    <el-option v-for="(j, index) in infoList" :key="index" :value="j.id" :label="j.nameZh">
                    </el-option>
                  </iSelect>
                </div>

                <i v-if="isEdit" class="add el-icon-circle-plus-outline" @click="handleAdd(index, '', '2')"></i>
                <i v-if="isEdit" class="less el-icon-remove-outline" @click="handleLess(index, '', '', '2')"></i>
              </div>
            </div>
            <div class="part2">
              <div class="itemList" v-for="(lev3, index3) in item.childVo" :key="index3">
                <div class="cell third-cell" :class="
                  index3 < item.childVo.length - 1 ? 'cloum-before' : ''
                ">
                  <div :class="
                    lev3.childVo.length > 0
                      ? 'content kpi-module third-border-before third-border-after'
                      : 'content kpi-module third-border-before'
                  ">
                    <div class="titleCard">
                      <!-- <span v-if="!modeAll">总分</span> -->
                      <span v-if="!isEdit">{{ lev3.title }}</span>
                      <iInput v-else class="kpi-input2 kpi-input3" v-model="lev3.title"></iInput>
                    </div>
                    <div class="line">
                      <label>权重</label>
                      <span v-if="!isEdit">{{ lev3.weight }}</span>
                      <iInput v-else class="kpi-input2" v-model="lev3.weight"></iInput>
                    </div>
                    <div>
                      <label>等于</label>
                      <span v-if="lev3.childVo.length >= 1">{{ '指标加权汇总' }}</span>

                      <iSelect v-else :disabled="!isEdit" class="kpi-input2" clearable
                        :placeholder="$t('partsprocure.PLEENTER')" v-model="lev3.indicatorLibraryId">
                        <el-option v-for="(j, index) in infoList" :key="index" :value="j.id" :label="j.nameZh">
                        </el-option>
                      </iSelect>
                    </div>

                    <i v-if="isEdit" class="add el-icon-circle-plus-outline" @click="handleAdd(index, index3, '3')"></i>
                    <i v-if="isEdit" class="less el-icon-remove-outline"
                      @click="handleLess(index, index3, '', '3')"></i>
                  </div>
                </div>
                <div class="cell cell2 third-cell cente-cell" :class="
                  index3 < lev3.childVo.length - 1 ? 'cloum-before1' : ''
                " :key="index3 + 'lev3'">
                  <div v-for="(lev4, index4) in lev3.childVo" :key="index4 + 'lev4'" class="box2">
                    <div :class="index4 < lev4.childVo.length ? 'lev4 ' : ' '">
                      <div class="content kpi-module kpi-module1 last-border">
                        <div class="titleCard">
                          <span v-if="!isEdit">{{ lev4.title }}</span>
                          <iInput v-else class="kpi-input2 kpi-input3" v-model="lev4.title"></iInput>
                        </div>
                        <div class="line">
                          <label>权重</label>
                          <span v-if="!isEdit">{{ lev4.weight }}</span>
                          <iInput v-else class="kpi-input2" v-model="lev4.weight"></iInput>
                        </div>
                        <div>
                          <label>等于</label>
                          <span v-if="lev4.childVo.length >= 1">{{ '指标加权汇总' }}</span>

                          <iSelect v-else :disabled="!isEdit" class="kpi-input2" clearable
                            :placeholder="$t('partsprocure.PLEENTER')" v-model="lev4.indicatorLibraryId">
                            <el-option v-for="(j, index) in infoList" :key="index" :value="j.id" :label="j.nameZh">
                            </el-option>
                          </iSelect>
                        </div>

                        <i v-if="isEdit" class="add el-icon-circle-plus-outline"
                          @click="handleAdd(index, index3, '4', index4)"></i>
                        <i v-if="isEdit" class="less el-icon-remove-outline"
                          @click="handleLess(index, index3, '', '4', index4)"></i>
                      </div>
                    </div>
                    <div :key="index4 + 'lev4'" class="lev5brfore">
                      <div class="content kpi-module kpi-module2 last-border" v-for="(lev5, index5) in lev4.childVo"
                        :key="index5 + 'lev5'">
                        <div class="titleCard">
                          <!-- <span v-if="!modeAll">总分</span> -->
                          <span v-if="!isEdit">{{ lev5.title }}</span>
                          <iInput v-else class="kpi-input2 kpi-input3" v-model="lev5.title"></iInput>
                        </div>
                        <div class="line">
                          <label>权重</label>
                          <span v-if="!isEdit">{{ lev5.weight }}</span>
                          <iInput v-else class="kpi-input2" v-model="lev5.weight"></iInput>
                        </div>
                        <div>
                          <label>等于</label>
                          <iSelect :disabled="!isEdit" class="kpi-input2" clearable
                            :placeholder="$t('partsprocure.PLEENTER')" v-model="lev5.indicatorLibraryId">
                            <el-option v-for="(j, index) in infoList" :key="index" :value="j.id" :label="j.nameZh">
                            </el-option>
                          </iSelect>
                        </div>

                        <i v-if="isEdit" class="less el-icon-remove-outline"
                          @click="handleLess(index, index4, index, '5', index5)"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iInput, iButton, iSelect } from 'rise'
import {
  getModelTree,
  addModelTree,
  uploadPerformanceModelFile,
  getSupplierPerforManceModelPage,
  getIndicatorList
} from '@/api/supplierManagement/supplierIndexManage/index'
import {
  saveTemplateDetail,
  deleteTemplate,
  downloadTemplate
} from '@/api/kpiChart'
export default {
  props: {
    isShow: { type: Boolean, default: true },
    treeData: {
      type: Array
    },
    temId: {
      type: String
    },
    templateName: {
      type: String
    },
    isEdit: {
      type: Boolean, default: false
    },
    infoData: {
      type: Object
    }
  },
  components: {
    iCard,
    iInput,
    iButton,
    iSelect
  },
  data() {
    return {
      formDataLevel2: {},
      form: {},
      modeAll: false,
      infoList: []
    }
  },
  mounted() {
    this.getInfo()
    this.formDataLevel2 = this.treeData
  },
  watch: {
    treeData: {
      handler(curVal, oldVal) {
        this.formDataLevel2 = this.treeData
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getInfo() {
      getIndicatorList().then((res) => {
        this.infoList = res.data
        console.log(this.infoList)
      })
    },
    edit() {
      this.isEdit = true
    },
    canel() {
      this.isEdit = false
      this.$parent.init()
    },

    submit() {
      this.$emit('submit0')
    },
    back() {
      this.$emit('back')
    },
    addCell() {
      const tableChild = this.formDataLevel2.childVo.childVo
      console.log(tableChild)
      if (tableChild.length == 5)
        return this.$message({
          type: 'error',
          message: '每层最多5个分支',
          duration: 10000, // error 错误提示显示10秒
          showClose: true
        })
      tableChild.push({
        indicatorLibraryId: '',
        title: '',
        weight: '',
        childVo: []
      })
      if (tableChild.length >= 1) {
        this.formDataLevel2.childVo.indicatorLibraryId = ''
      }
    },
    handleAdd(index, idx3, str, idx4) {
      const tableChild = this.formDataLevel2.childVo.childVo

      if (str === '2') {
        if (tableChild[index].childVo.length == 5)
          return this.$message({
            type: 'error',
            message: '每层最多5个分支',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        tableChild[index].childVo.push({
          indicatorLibraryId: '',
          title: '',
          weight: '',
          childVo: []
        })
        if (tableChild[index].childVo.length >= 1) {
          tableChild[index].indicatorLibraryId = ''
        }
      } else if (str === '3') {
        if (
          tableChild[index].childVo[idx3].childVo
            .length == 5
        )
          return this.$message({
            type: 'error',
            message: '每层最多5个分支',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        tableChild[index].childVo[idx3].childVo.push({
          indicatorLibraryId: '',
          title: '',
          weight: '',
          childVo: []
        })
        if (tableChild[index].childVo[idx3].childVo.length >= 1) {
          tableChild[index].childVo[idx3].indicatorLibraryId = ''
        }
      } else if (str === '4') {
        if (
          tableChild[index].childVo[idx3].childVo[idx4]
            .childVo.length == 5
        )
          return this.$message({
            type: 'error',
            message: '每层最多5个分支',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        tableChild[index].childVo[idx3].childVo[
          idx4
        ].childVo.push({
          indicatorLibraryId: '',
          title: '',
          weight: '',
          childVo: []
        })
        if (tableChild[index].childVo[idx3].childVo[
          idx4
        ].childVo.length >= 1) {
          tableChild[index].childVo[idx3].childVo[
            idx4
          ].indicatorLibraryId = ''
        }
      }
    },
    handleLess(index, index3, index4, str, index5) {
      const tableChild = this.formDataLevel2.childVo.childVo

      if (str === '2') {
        tableChild.splice(index, 1)
      } else if (str === '3') {
        tableChild[index].childVo.splice(index3, 1)
      } else if (str === '4') {
        tableChild[index].childVo[
          index3
        ].childVo.splice(index4, 1)
      } else {
        tableChild[index].childVo[index4].childVo[
          index4
        ].childVo.splice(index5, 1)
      }
    },
    save() {
      const tableChild = this.formDataLevel2.childVo.childVo
      let lv1Weight = 0
      let lv2Weight = 0
      let lv3Weight = 0
      let lv4Weight = 0
      let lev4p=true
      let nameIsNull = true
      if (tableChild.length > 0) {
        tableChild.forEach((x) => {
          if (!x.title || !x.weight) nameIsNull = false
          lv1Weight += Number(x.weight)
          if (x.childVo.length > 0) {
            x.childVo.forEach((y) => {
              if (!y.title || !y.weight) nameIsNull = false
              lv2Weight += Number(y.weight)
              if (y.childVo.length > 0) {
                y.childVo.forEach((z) => {
                  if (!z.title || !z.weight) nameIsNull = false
                  lv3Weight += Number(z.weight)
                  if (z.childVo.length > 0) {
                    z.childVo.forEach((k) => {
                      if (!z.title || !z.weight) nameIsNull = false
                      lv4Weight += Number(k.weight)
                      lev4p=true
                      console.log(lv4Weight)
                    })
                  } else {
                    lv4Weight += Math.floor(100 * 100) / 100
                  }
                })
              } else {
                lv4Weight += Math.floor(100 * 100) / 100
                lv3Weight += Math.floor(100 * 100) / 100
              }
            })
          } else {
            lv2Weight += Math.floor(100 * 100) / 100
            lv3Weight += Math.floor(100 * 100) / 100
            lv4Weight += Math.floor(100 * 100) / 100
            lev4p=false
            console.log(+1)
          }
        })
      } else {
        lv2Weight += Math.floor(100 * 100) / 100
        lv3Weight += Math.floor(100 * 100) / 100
        lv4Weight += Math.floor(100 * 100) / 100
        lv1Weight += Math.floor(100 * 100) / 100
      }

      if (lv1Weight !== 100) {
        return this.$message({
          type: 'error',
          message: '指标1的比重错误',
          duration: 10000, // error 错误提示显示10秒
          showClose: true
        })
      }
      console.log(lv4Weight)
      if (lv2Weight !== 100) {
        if (lv2Weight / tableChild.length !== 100) {
          return this.$message({
            type: 'error',
            message: '指标2的比重错误',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        }
      }
      if (lv3Weight !== 100) {
        let num = 0
        tableChild.forEach((x) => {
          if (x.childVo.length < 1) {
            num += 1
          } else {
            num += x.childVo.length
          }
        })
        if (lv3Weight / num !== 100) {
          return this.$message({
            type: 'error',
            message: '指标3的比重错误',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        }
      }
      if (lv4Weight !== 100&&lev4p) {
        let num = 0
        tableChild.forEach((x) => {
          x.childVo.forEach(l => {
            if (l.childVo.length < 1) {
              num += 1
            } else {
              console.log( l.childVo)
              num += l.childVo.length
            }
          })

        })
        console.log(num, lv4Weight, tableChild)
        if (lv4Weight / num !== 100) {
          return this.$message({
            type: 'error',
            message: '指标4的比重错误',
            duration: 10000, // error 错误提示显示10秒
            showClose: true
          })
        }
      }

      if (!nameIsNull) {
        return this.$message({
          type: 'error',
          message: '名称和比重不能为空',
          duration: 10000, // error 错误提示显示10秒
          showClose: true
        })
      }
      let isNullWeight = true
      tableChild.filter(x => {
        if (!x.weight) {
          isNullWeight = false
        }
        return x.childVo.filter(y => {
          if (!y.weight) {
            isNullWeight = false
          }
          return y.childVo.filter(z => {
            if (!z.weight) {
              isNullWeight = false
            }
            return
          })
        })
      })

      // 保存执行
      console.log(this.formDataLevel2)
      addModelTree({
        ...this.formDataLevel2
      })
        .then((res) => {
          if (res.code == '200' && res.result) {
            this.$message('操作成功')
            this.isEdit = false
            if (this.isShow) {
              this.$emit('init')
            } else {

              this.$emit('init', 'updata')
            }

          } else {
            this.$message.error(res.desZh)
          }
        })
        .catch((error) => {
          this.$message.error(res.desZh)
        })
    },
    deleteTemplate() {
      this.$confirm('请确认是否删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTemplate({ templateId: this.temId }).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$router.go(0)
          })
        })
        .catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   });
        })
    },
    downloadTeplate() {
      downloadTemplate({ templateId: this.temId }).then((res) => {
        let URL = window.URL || window.webkitURL
        let objectUrl = URL.createObjectURL(res)
        let a = document.createElement('a')
        a.href = objectUrl
        a.download = `${this.childTemplateName}.xls`
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin: 0 4px;
  cursor: pointer;
  // display: inline-block;
}

.red {
  color: #e30d0d;
}

.blue {
  color: #1763f7;
}

.kpi-Chart-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.kpi-chart {
  width: 100%;
  position: relative;
  color: #fff;
  font-size: 22px;
  display: flex;
  justify-content: space-between;

  .tab1 {
    width: calc(20% - 4px);
    position: relative;
    z-index: 1;

    .head {
      line-height: 60px;
      text-align: center;
      border-radius: 10px 0 0 0;
      height: 60px;
      background-color: #0c47a1;
    }

    .cell {
      width: 100%;
      position: relative;
      margin-top: 30px;
      padding-bottom: 50px;

      .total {
        >div {
          height: 30px;
          font-size: 16px;
          margin: 0 20px;
          color: #909091;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .kpi-input2 {
            width: 140px;
            height: 24px;
            border-radius: 10px;
          }

          .kpi-input3 {
            width: 140px;
          }

          margin-top: 10px;
        }

        .titleCard {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .bottomcard {
          height: 40px;

          >div {
            height: 34px;
            width: 50%;
          }

          line-height: 40px;
        }

        .line {
          padding-top: 10x;
          border-top: 1px solid #909091;
        }

        left: 50%;
        transform: translateX(-50%);
        width: 244px;
        height: 140px;
        text-align: center;

        border-radius: 10px;
        border: 1px solid #1a75d1;
        position: relative;
        color: #000000;

        &.first-cloum-after::after {
          content: '';
          position: absolute;
          border-top: 1px solid #2297f3;
          top: 34px;
          right: -30px;
          width: 30px;
          height: 1px;
        }

        .iconbtn {
          position: absolute;
          top: -15px;
          right: -15px;
          font-size: 30px;
          background-color: #fff;
          color: #1a75d1;
          cursor: pointer;
        }
      }
    }
  }

  .tab2 {
    width: calc(20% - 4px);

    .head {
      width: 100%;
      text-align: center;
      height: 60px;
      background-color: #1976d1;
    }
  }

  .tab3 {
    width: calc(20% - 4px);

    .head {
      width: 100%;
      text-align: center;
      height: 60px;
      background-color: #2297f3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .tab4 {
    width: calc(20% - 4px);

    .head {
      width: 100%;
      text-align: center;
      //   border-radius: 0 10px 0 0;
      height: 60px;
      background-color: #64b5f6;
    }
  }

  .tab5 {
    width: 20%;

    .head {
      width: 100%;
      text-align: center;
      border-radius: 0 10px 0 0;
      height: 60px;
      background-color: #64b5f6;
    }
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border-class {
    border: 1px solid #fff;
    width: 200px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
  }
}

.scoll-y {
  height: calc(100vh - 436px);
  overflow-y: auto;
}

.list2 {
  margin-top: -230.5px;
  min-height: 120px;
  position: relative;
}

.second-cloum-before::before {
  content: '';
  position: absolute;
  border-left: 1px solid #2297f3;
  top: 65px;
  left: 0;
  height: calc(100% + 10px);
}

.list {
  width: 80%;
  margin-left: 20%;
  position: relative;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;

  .cell {
    width: 25%;
    position: relative;
    margin-top: 30px;

    .total {
      width: 244px;
      height: 140px;
      line-height: 60px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #1a75d1;
      position: relative;

      >div {
        height: 30px;
        font-size: 16px;
        margin: 0 20px;
        color: #909091;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .kpi-input2 {
          width: 140px;
          height: 24px;
          border-radius: 10px;
        }

        .kpi-input3 {
          width: 150px;
        }

        margin-top: 10px;
      }

      .titleCard {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .bottomcard {
        height: 40px;

        >div {
          height: 34px;
          width: 50%;
        }

        line-height: 40px;
      }

      .line {
        padding-top: 10x;
        border-top: 1px solid #909091;
      }

      i {
        position: absolute;
        top: -15px;
        right: -15px;
        font-size: 30px;
        background-color: #fff;
        color: #1a75d1;
        cursor: pointer;
      }
    }
  }

  .second-before::before {
    content: '';
    position: absolute;
    border-top: 1px solid #2297f3;
    top: 34px;
    left: -20px;
    width: 20px;
    height: 1px;
  }

  .second-after::after {
    content: '';
    position: absolute;
    border-top: 1px solid #2297f3;
    top: 30px;
    right: -30px;
    width: 30px;
    height: 1px;
  }
}

.kpi-module {
  margin-bottom: 20px;
  width: 244px;
  height: 140px;
  border-radius: 10px;
  border: 1px solid #1a75d1;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  >div {
    height: 30px;
    font-size: 16px;
    margin: 0 20px;
    color: #909091;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .kpi-input2 {
      width: 140px;
      height: 24px;
      border-radius: 10px;
    }

    .kpi-input3 {
      width: 150px;
    }

    margin-top: 10px;
  }

  .titleCard {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .bottomcard {
    height: 40px;

    >div {
      height: 34px;
      width: 50%;
    }

    line-height: 40px;
  }

  .line {
    padding-top: 10x;
    border-top: 1px solid #909091;
  }

  .case {
    width: 1112px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;

    label {
      margin-right: 10px;
    }

    .kpi-input {
      width: 66px;
      height: 34px;
      border-radius: 10xp;
    }
  }

  .add {
    display: none;
    position: absolute;
    top: -15px;
    right: -15px;
    font-size: 30px;
    background-color: #fff;
    color: #1a75d1;
    cursor: pointer;
  }

  .less {
    display: none;
    position: absolute;
    bottom: -15px;
    right: -15px;
    font-size: 30px;
    background-color: #fff;
    color: #1a75d1;
    cursor: pointer;
  }
}

.kpi-module:hover .add {
  display: block;
}

.kpi-module:hover .less {
  display: block;
}

.part2 {
  width: 75%;
  position: relative;

  .itemList {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;

    .cell {
      width: 33.33%;
      position: relative;

      // border-left: 1px solid #1976D1;
      .kpi-module {
        position: relative;
      }
    }

    .cell2 {
      .box2 {
        width: 100%;
        display: flex;

        >div {
          width: 50%;
        }
      }

      width: 66.66%;

      .kpi-module1 {
        // width: 50%;
        left: 10%;
        transform: translateX(10%);
      }

      .kpi-module2 {
        // position: absolute;
        left: 10%;
        transform: translateX(10%);
      }

      .lev4 {}
    }

    .cloum-before::before {
      content: '';
      position: absolute;
      border-left: 1px solid #2297f3;
      top: 32px;
      left: 0;
      height: calc(100% + 30px);
    }

    .cloum-before1::before {
      content: '';
      position: absolute;
      border-left: 1px solid #2297f3;
      top: 32px;
      left: 0;
      height: calc(100% + -160px);
    }

    .cente-cell {
      position: relative;
    }

    .last-cell {
      // width: 50%;
      //   position: absolute;
      //   top: 0px;
      //   left: 600px;
      //   > div {
      //     display: block;
      //   }
    }

    .lev5::after {
      content: '';
      position: absolute;
      border-left: 1px solid #2297f3;
      top: 32px;
      left: -64px;
      height: calc(100% + 20px);
    }

    .lev5brfore {
      position: relative;
    }

    .lev5brfore::before {
      content: '';
      position: absolute;
      border-left: 1px solid #2297f3;
      top: 32px;
      height: calc(100% - 160px);
    }

    .lev4::before {
      content: '';
      position: absolute;
      border-top: 1px solid #2297f3;
      top: 31px;
      left:312px;
      width: 28px;
      height: 1px;
    }

    .last-cell::before {
      content: '';
      position: absolute;
      border-left: 1px solid #2297f3;
      top: 32px;
      left: 0;
      height: calc(100% - 160px);
    }

    .last-border::before {
      content: '';
      position: absolute;
      border-top: 1px solid #2297f3;
      top: 29px;
      left: -26px;
      width: 26px;
      height: 1px;
    }

    .third-border-before::before {
      content: '';
      position: absolute;
      border-top: 1px solid #2297f3;
      top: 30px;
      left: -24px;
      width: 24px;
      height: 1px;
    }

    .third-border-after::after {
      content: '';
      position: absolute;
      border-top: 1px solid #2297f3;
      top: 29px;
      right: -36px;
      width: 36px;
      height: 1px;
    }
  }
}

.part3 {
  width: 50%;

  // margin-left: 25%;
  //  padding-left: 25%;
  .kpi-module {
    margin-bottom: 20px;
    width: 244px;
    height: 140px;
    border-radius: 10px;
    border: 1px solid #1a75d1;
    position: relative;
    transform: translateX(-12%);
  }
}

.imgkpi-head {
  display: flex;
  justify-content: space-between;
}
</style>
