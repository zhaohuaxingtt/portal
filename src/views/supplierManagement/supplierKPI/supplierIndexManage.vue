<template>
  <div>
    <iCard>
      <div class="imgkpi-head">
        <div>
          <el-form>
            <el-form-item class="SearchOption">
              <iSelect @change="changVersion" v-model="allData.modelId">
                <el-option
                  v-for="(x, index) in dropDownOptions"
                  :key="index"
                  :label="x.versionName"
                  :value="x.id"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-form>
          <div class="titleinof">
            <span @click="dowload(info.fileId)">{{ info.fileName }}</span>
            <i class="el-icon-upload icon blue"></i
            ><i class="el-icon-delete icon red"></i>
          </div>
        </div>

        <div>
          <iButton @click="edit">编辑</iButton>
          <iButton @click="canel">取消</iButton>
          <!-- <iButton @click="save">暂存</iButton> -->
          <iButton @click="save">提交生效</iButton>
        </div>
      </div>
    </iCard>
    <indexManage />
    <kpiStructure
      ref="model"
      :idEdit="idEdit"
      style="margin-top: 20px"
      :treeData="allData"
      :temId="selectValue"
      :templateName="templateName"
      @click="changeSaveData"
      @saveVersion="saveVersion"
    ></kpiStructure>
  </div>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect } from 'rise'
import kpiStructure from './components/kpiStructure2'
import indexManage from './components/indexManage'
import {
  kpiDetail,
  slelectkpiList,
  dowbloadAPI,
  templateDetail
} from '@/api/kpiChart'
import {
  downloadFileWithName,
} from '@/api/common'
import {
  getSupplierPerforManceModelPage,
  getModelTree
} from '@/api/supplierManagement/supplierIndexManage/index'
import { iNavMvp } from 'rise'
import logButton from '@/components/logButton'
export default {
  components: {
    indexManage,
    iButton,
    iPage,
    kpiStructure,
    iCard,
    iInput,
    iSelect,
    iNavMvp,
    logButton
  },
  data() {
    return {
      activeName: '/supplier/kpiList',
      activeRightName: '/supplier/imgKpi',
      formData: {
        deptId: ''
      },
      dropDownOptions: [],
      allData: {
        modelId: '',
        childVo: {
          childVo:[]
        },
      },
      saveData: [],
      templateName: '',
      idEdit: false,
      info:{}
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  watch: {},
  methods: {
    init() {
      const parms = {
        pageNo: 1,
        pageSize: 10000
      }
      getSupplierPerforManceModelPage(parms).then((res) => {
        if (res.code == '200') {
          this.dropDownOptions = res.data
          this.allData.modelId = this.dropDownOptions[0].id
          this.info=this.dropDownOptions.find(val=>val.id==this.dropDownOptions[0].id)
          console.log(this.dropDownOptions[0].id)
          getModelTree(this.allData.modelId).then((res) => {
            if (res.code == '200') {
              if (res.data.id != null) {
                this.allData = res.data
              }
            }
          })
        } else {
        }
      })
    },
    save() {
      this.$refs.model.save()
    },
    canel() {
      this.idEdit = false
    },
    edit() {
      this.idEdit = true
    },
    changVersion(v) {
      this.info=this.dropDownOptions.find(val=>val.id==v)
      getModelTree(this.allData.modelId).then((res) => {
        if (res.code == '200') {
          if (res.data.id != null) {

          this.allData = res.data
          }
        }
      })
    },
    dowload(v){
      const params = {
        fileIds: v,
        fileName:info.fileName
      }
      downloadFileWithName(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin: 0 8px;
  display: inline-block;
  cursor: pointer;
}
.red {
  color: #e30d0d;
}
.blue {
  // color: #1763f7;
}
.imgkpi-head {
  .titleinof {
    margin-bottom: 20px;
    margin-left: 20px;
    span {
      cursor: pointer;
      color: #1763f7;
    }
  }
  > div {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
::v-deep.navBox {
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  .logButton .icon + span {
    vertical-align: top;
  }
  margin-bottom: 20px;
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
</style>
