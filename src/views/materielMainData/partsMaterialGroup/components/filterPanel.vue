<template>
  <div>
    <iSearch @reset="reset" @sure="sure">
                {{language(formData)}}
      <el-form>
        <el-row :gutter="20">

          <el-col :span="8">
            <el-form-item :label='language(materialLabel.categoryCode)'>
              <iInput 
              :placeholder="language('请输入')"  
              v-model="fromData.categoryCode"></iInput>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='language(materialLabel.categoryName)'>
              <iInput 
              :placeholder="language('请输入')"  
              v-model="fromData.categoryName"></iInput>        
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='language(materialLabel.dept)'>
              <iInput 
              :placeholder="language('请输入')"  
              v-model="fromData.deptCodes"></iInput>  
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='language(materialLabel.linie)'>
              <iInput 
              :placeholder="language('请输入')"  
              v-model="fromData.linieNames"></iInput>  
            </el-form-item>     
          </el-col>
          <el-col :span="8">
            <el-form-item :label='language(materialLabel.isFixAsset)'>
              <iSelect 
              :placeholder="language('请选择')" 
              v-model="fromData.isFixAsset">
                <el-option 
                v-for="(item,index) in entryOptions"
                :key="index"
                :value="item.value"
                :label="item.lebal"
                ></el-option>
              </iSelect>  
            </el-form-item>
          </el-col>        
          <el-col :span="8">
            <el-form-item :label='language(materialLabel.sixPartNum)'>
              <iInput 
              :placeholder="language('请输入')" 
              v-model="fromData.sixPartNum"></iInput>  
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
    </iSearch>
  </div>
</template>
<script>
import {iSearch,iInput,iSelect} from 'rise'
import {PART_MATERIAL_DATA,MATERIAL_LABEL} from './data'
export default {
  name: 'filterPanel',
  components: {iSearch,iInput,iSelect},
  data(){
    return {
      materialLabel: MATERIAL_LABEL,
      entryOptions: [
        {
          lebal: '是',
          value: true
        },
        {
          lebal: '否',
          value: false
        }
      ],
      fromData: {...PART_MATERIAL_DATA},
    }
  },
  methods: {
    sure() {
      this.$emit('search',{...this.fromData})

    },
    reset() {
      this.fromData={
        categoryCode:'',
        categoryName:'',
        //deptNames:'',
        deptCodes:'',
        linieNames:'',
        isFixAsset:'',
        sixPartNum:'',
      }

      this.$emit('search',this.formData)
    }
  },
  created(){
  }
    
}
</script>
<style lang="scss" scoped>

</style>