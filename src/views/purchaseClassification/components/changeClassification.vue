<!--修改弹窗-->
<template>
  <iDialog
    append-to-body
    title="修改采购分类"
    :visible.sync="isChange"
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
            
            disabled
              collapse-tags
              :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
              v-model="formData.parentMaterialGroupCode"
              @change="select"
            >
              <el-option
                v-for="item in listDeptData"
                :key="item.code"
                :label="item.materialGroupCode"
                :value="item.parentId"
              ></el-option>
            </i-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 上级采购分类名称-->
          <el-form-item label="上级采购分类名称">
            <i-input disabled v-model="formData.parentMaterialGroupName"></i-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 采购分类编号-->
          <el-form-item label="采购分类编号" class="el-form-itemnext lablesize">
            <i-input :placeholder="$t('partsignLanguage.QingShuRu')" v-model="formData.materialGroupCode"></i-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- 采购分类名称-->
          <el-form-item label="采购分类名称" class="el-form-itemnext lablesize">
            <i-input :placeholder="$t('partsignLanguage.QingShuRu')" v-model="formData.materialGroupName"></i-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6">
          <!-- 级别-->
          <el-form-item label="级别">
            <i-input disabled v-model="formData.parentMaterialGroupLevel"></i-input>
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
            <el-switch v-model="formData.isActive" activeText="Y" inactiveText="N">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-form-item label="备注">
        <i-input type="textarea" :autosize="{ minRows: 4 }" v-model="formData.materialGroupDesc"></i-input>
      </el-form-item>
    </el-form>
    <iButton @click="save" class="positionSize">{{
      $t('LK_BAOCUN')
    }}</iButton>
  </iDialog>
</template>
<script>
import { iDialog, iInput, iButton, iSelect,iMessage } from 'rise'
import { SEARCH_DATA} from './data'
import { updateList,getAll,getAllBelongOrgList } from '@/api/authorityMgmt'
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
      ideffect: true,
      // formData: SEARCH_DATA,
      AllBelongOrgList:[],
    }
  },
  props: {
  isEdit: { type: Boolean, default: false },
    isChange: { type: Boolean, default: false },
    formData:{ type: Object}
  },
  created() {
    console.log(this.isEdit)

    this.getListData()
    this.getBelongOrgList()
  },
  watch:{
      isEdit(val){
          this.isEdit=val
      }
  },
  methods: {
    // 关闭弹窗
    clearDiolog() {
      this.$emit('input', false)
    },
    //保存
    save(){
      // this.formData.materialGroupLevel=this.formData.parentMaterialGroupLevel
      // this.formData.organizationId=this.formData.isActive1
    //  this.formData.organizationId=parseInt(this.formData.organizationId)
     this.formData.organizationCode=this.AllBelongOrgList.find(val=>val.belongToOrgId==this.formData.organizationId)?.belongToOrgCode||''
      updateList(this.formData).then((res) => {
        iMessage.success('修改成功')
        this.getListData()
        this.$emit('saveChangeList', false)
      })
    },
    //获取上级采购分类编号
    getListData() {
      getAll().then((res) => {
        if (+res.code == 200) {
          this.listDeptData = res.data
        }
      })
      console.log(this.formData)
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