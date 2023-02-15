<template>
  <div>
    <iCard v-if="isShow">
      <div class="imgkpi-head">
        <div>
          <el-form>
            <el-form-item class="SearchOption">
              <iSelect @change="changVersion" v-model="allData.modelId">
                <el-option v-for="(x, index) in dropDownOptions" :key="index" :label="x.version"
                  :value="x.modelId"></el-option>
              </iSelect>
            </el-form-item>
          </el-form>
          <div class="titleinfo">
            <span style="margin-right:20px" :class="info.status ? 'blue' : info.status == false ? 'red' : ''">{{
              info.status ? '有效' :
                info.status == false ? '无效' : ''
            }}</span>

            <span class="link" @click="dowload(allData.fileId)">{{ allData.fileName }}</span>
            <uploadButton style="margin-right:20px" :accept="'.pdf,.xlsx,.xls,.docx'" uploadClass="uploadButton"
              :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
              <iButton :disabled="!isEdit" :loading="uploadLoading">{{ '上传' }}</iButton>
            </uploadButton>
            <iButton :disabled="!isEdit" @click="del">{{ '删除' }}</iButton>
          </div>
        </div>
        <div>
          <iButton v-permission="SUPPLIER_WORKBENCH_JIXIAO_SUPPLIERINDEXMANAGE" @click="edit" v-if="!isEdit">编辑</iButton>
          <iButton @click="canel" v-if="isEdit">取消</iButton>
          <!-- <iButton @click="save">暂存</iButton> -->
          <iButton @click="save" v-if="isEdit">提交生效</iButton>
        </div>
      </div>
    </iCard>
    <indexManage v-permission="SUPPLIER_WORKBENCH_JIXIAO_SUPPLIERINDEXMANAGE_ZHIBIAOKU" v-if="isShow" />
    <kpiStructure @back="back" :infoData="infoData" @submit0="submit0" ref="model" :isEdit="isEdit" style="margin-top: 20px"
      :treeData="allData" :temId="selectValue" :templateName="templateName" @click="changeSaveData" @init="init"
      :isShow="isShow"></kpiStructure>
  </div>
</template>

<script>
import uploadButton from "./uploadButton"
import { iButton, iPage, iCard, iInput, iSelect, iMessage } from 'rise'
import kpiStructure from './components/kpiStructure2'
import indexManage from './components/indexManage'
import { downloadFileWithName } from '@/api/common'
import {
  getModelTree,
  modelList
} from '@/api/supplierManagement/supplierIndexManage/index'
import { iNavMvp } from 'rise'
import logButton from '@/components/logButton'
export default {
  components: {
    uploadButton,
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
  props: {
    isShow: { type: Boolean, default: true },
    infoData: { type: Object }
  },
  data() {
    return {
      uploadLoading: false,
      activeName: '/supplier/kpiList',
      activeRightName: '/supplier/imgKpi',
      formData: {
        deptId: ''
      },
      dropDownOptions: [],
      allData: {
        modelId: '',
        childVo: {
          title: '总分',
          childVo: []
        }
      },
      saveData: [],
      templateName: '',
      isEdit: false,
      info: {},
      isShowFile: true
    }
  },
  created() { },
  mounted() {
    this.init()
  },
  watch: {},
  methods: {
    init(val) {
      this.isEdit = false
      modelList(false).then((res) => {
        if (res.code == '200') {
          this.dropDownOptions = res.data
          if (this.dropDownOptions.length > 0) {
            this.allData.modelId = this.dropDownOptions[this.dropDownOptions.length - 1].modelId
            this.allData.fileId = this.dropDownOptions[this.dropDownOptions.length - 1].fileId

            if (this.isShow || val == 'updata') {
              this.info = this.dropDownOptions.find(
                (val) => val.modelId == this.allData.modelId
              )
              if (val == 'updata') {
                let newQuery = JSON.parse(JSON.stringify(this.$route.query));
                newQuery.modelId = this.allData.modelId;
                this.$router.replace({
                  query: newQuery
                })
              }
            } else {
              this.allData.modelId = this.$route.query.modelId
            }
            console.log(this.allData)
          }
          this.$set(this.allData, 'fileName', this.dropDownOptions[this.dropDownOptions.length - 1].fileName)
          this.$emit('getallData', this.allData)
          getModelTree(this.allData.modelId).then((res) => {
            if (res.code == '200') {
              if (res.data.id != null) {
                this.allData.modelId = res.data.modelId
                this.allData.childVo = res.data
              }
            }
          })
        } else {
        }
      })
    },
    submit0() {
      this.$emit('submit0')
    },
    del() {
      this.$nextTick(() => {
        this.allData.fileId = ''
        this.allData.fileName = ''
        this.isShowFile = false
      })
    },
    back(){
      this.$emit('back')
    },
    save() {
      this.$refs.model.save()
    },
    canel() {
      this.isEdit = false
      this.init()
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      console.log(res)
      if (res.code == 200) {
        this.allData.fileId = res.data.data[0].id
        this.allData.fileName = res.data.data[0].name
        this.isShowFile = true
        iMessage.success(file.name + "上传成功")
      } else {
        iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`)

      }
      this.uploadLoading = false

    },
    edit() {
      this.isEdit = true
    },
    changVersion(v) {
      this.info = this.dropDownOptions.find((val) => val.modelId == v)
      this.allData.fileId = this.dropDownOptions[0].fileId
      this.allData.fileName = this.dropDownOptions[0].fileName
      getModelTree(this.allData.modelId).then((res) => {
        if (res.code == '200') {
          if (res.data.id != null) {
            this.allData.modelId = res.data.modelId
            this.allData.childVo = res.data
          }
        }
      })
    },
    dowload(v) {
      const params = {
        fileIds: v,
        fileName: this.allData.fileName
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


.imgkpi-head {
  .titleinfo {
    margin-bottom: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;

    .link {
      position: relative;
      display: inline-block;
      cursor: pointer;
      color: #1763f7;
      margin-right: 20px;
    }
  }


  >div {
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
  .logButton .icon+span {
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

.red {
  color: #e30d0d;
}

.blue {
  color: #1763f7;
}
</style>
