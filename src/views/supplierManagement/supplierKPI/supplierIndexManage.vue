<template>
  <div>
    <iCard>
      <div class="imgkpi-head">
        <div>
          <el-form>
            <el-form-item class="SearchOption">
              <iSelect @change="changVersion" v-model="selectValue">
                <el-option
                  v-for="(x, index) in dropDownOptions"
                  :key="index"
                  :label="x.modelVersion"
                  :value="x.id"
                ></el-option>
              </iSelect>
            </el-form-item>
          </el-form>
          <div class="titleinof">
            <span>2022年度供应商绩效打分指南_V1.0.pptx</span>
            <i class="el-icon-upload icon blue"></i
            ><i class="el-icon-delete icon red"></i>
          </div>
        </div>

        <div>
          <iButton @click="canel">取消</iButton>
          <iButton @click="save">暂存</iButton>
          <iButton @click="submit">提交生效</iButton>
        </div>
      </div>
    </iCard>
    <indexManage />
    <kpiStructure
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
        treeVO: [],
        indicatorLibraryId: '',
        title: '',
        weight: ''
      },
      saveData: [],
      selectValue: '',
      templateName: ''
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  watch: {},
  methods: {
    changVersion(v) {
      getModelTree(v).then((res) => {
        if (res.code == '200') {
          this.allData = res.data
        }
      })
    },
    getDetail(x) {
      getModelTree().then((res) => {
        if (res.code == '200') {
          this.dropDownOptions = res.data
        }
      })
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
