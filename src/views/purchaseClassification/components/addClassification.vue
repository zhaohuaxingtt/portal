<!--新增弹窗-->
<template>
  <iDialog
    append-to-body
    title="新增采购分类"
    :visible.sync="isShow"
    height="100px"
    width="82%"
    @close="clearDiolog"
  >
    <el-form label-position="left" label-width="130px">
      <el-row :gutter="30">
        <el-col :span="6">
          <!-- 上级采购分类编号-->
          <el-form-item label="上级采购分类编号">
            <i-select
              collapse-tags
              :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
              v-model="formData.parentMaterialGroupCode"
              @change="select"
            >
              <el-option
                v-for="item in listDeptData"
                :key="item.code"
                :label="item.materialGroupCode"
                :value="item.id"
              ></el-option>
            </i-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 上级采购分类名称-->
          <el-form-item label="上级采购分类名称">
            <i-input
              disabled
              v-model="formData.parentMaterialGroupName"
            ></i-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 采购分类编号-->
          <el-form-item label="采购分类编号" class="el-form-itemnext lablesize">
            <i-input
              :placeholder="$t('partsignLanguage.QingShuRu')"
              v-model="formData.materialGroupCode"
            ></i-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 采购分类名称-->
          <el-form-item label="采购分类名称" class="el-form-itemnext lablesize">
            <i-input
              :placeholder="$t('partsignLanguage.QingShuRu')"
              v-model="formData.materialGroupName"
            ></i-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <!-- 级别-->
          <el-form-item label="级别">
            <i-input
              disabled
              v-model="formData.parentMaterialGroupLevel"
            ></i-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 股别-->
          <el-form-item label="股别">
            <i-select
              
              collapse-tags
              :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
              v-model="formData.organizationId"
            >
              <el-option
                v-for="item in AllBelongOrgList"
                :key="item.belongToOrgCode"
                :label="item.belongToOrgCode"
                :value="item.belongToOrgId"
              ></el-option>
            </i-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 是否生效-->
          <el-form-item label="是否生效">
            <el-switch
              v-model="formData.isActive"
              activeText="Y"
              inactiveText="N"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-form-item label="备注">
        <i-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          v-model="formData.materialGroupDesc"
        ></i-input>
      </el-form-item>
    </el-form>
    <iButton @click="saveData" class="positionSize">{{
      $t('LK_BAOCUN')
    }}</iButton>
  </iDialog>
</template>
<script>
import { iDialog, iInput, iButton, iSelect,iMessage } from 'rise'
import { SEARCH_ADD_DATA } from './data'
import { getAll, getMaterialGroupById, save,getAllBelongOrgList } from '@/api/authorityMgmt'
export default {
  components: {
    iDialog,
    iInput,
    iButton,
    iSelect,
    iMessage
  },
  data() {
    return {
      listDeptData: [],
      formData: SEARCH_ADD_DATA,
      AllBelongOrgList:[],
    }
  },
  props: {
    isShow: { type: Boolean, default: false }
  },
  created() {
    this.getListData()
    this.getBelongOrgList()
  },
  methods: {
    // 关闭弹窗
    clearDiolog() {
      this.$emit('input', false)
    },
    //获取上级采购分类编号
    getListData() {
      getAll().then((res) => {
        if (+res.code == 200) {
          this.listDeptData = res.data
        }
      })
    },
    //获取上级采购分类名称
    select(val) {
      getMaterialGroupById(val).then((res) => {
        if (+res.code == 200) {
          this.formData.parentMaterialGroupName=res.data.materialGroupName
          this.formData.parentId=res.data.id
          if (res.data.materialGroupLevel != null) {
            this.formData.parentMaterialGroupLevel =
              res.data.materialGroupLevel + 1
          }
          else{
            this.formData.parentMaterialGroupLevel =
              res.data.materialGroupLevel
          }
        }
      })
    },
    //保存
    saveData() {
             this.formData.organizationCode=this.AllBelongOrgList.find(val=>val.belongToOrgId==this.formData.organizationId)?.belongToOrgCode||''

      if(!this.formData.parentMaterialGroupCode){
          this.formData.materialGroupLevel=1
      }else{
      this.formData.materialGroupLevel=this.formData.parentMaterialGroupLevel

      }
      save(this.formData).then((res) => {
        // if (+res.code == 200) {
        //   this.$emit('input', false)
        // }
        this.getListData()
        iMessage.success('新增成功')
        this.$emit('saveDataList', false)
      })
    },
    //获取股别
    getBelongOrgList() {
      getAllBelongOrgList().then((res) => {
        if (+res.code === 200) {
          this.AllBelongOrgList = res.data
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.positionSize {
  margin-top: 100px;
  position: relative;
  right: -90%;
  margin-bottom: 30px;
}
::v-deep .el-form-itemnext {
  flex: 1;
  .el-form-item__label {
    &:after {
      text-align: center;
      content: '*';
      padding-left: 0.5rem;
      color: $color-delete;
      // margin-right: 0.25rem;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .localSize {
    font-size: 123px;
  }
}
::v-deep .el-switch {
  position: relative;
  color: transparent;
  .el-switch__label {
    position: absolute;
    color: transparent;
  }
  .el-switch__label--left {
    left: 25px;
    z-index: 1;
  }
  .el-switch__label--right {
    left: 5px;
  }
  .el-switch__label--left.is-active {
    color: #000;
  }
  .el-switch__label--right.is-active {
    color: #fff;
  }
}
</style>