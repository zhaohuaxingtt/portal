<template>
  <div>
    <iSearch @reset="reset" @sure="sure">
                {{formData}}
      <el-form>
        <el-row :gutter="20">

          <el-col :span="8">
            <el-form-item :label='materialLabel.categoryCode'>
              <iInput 
              :placeholder="materialLabel.inputPlaceholder"  
              v-model="fromData.categoryCode"></iInput>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='materialLabel.categoryName'>
              <iInput 
              :placeholder="materialLabel.inputPlaceholder"  
              v-model="fromData.categoryName"></iInput>        
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='materialLabel.dept'>
              <iInput 
              :placeholder="materialLabel.inputPlaceholder"  
              v-model="fromData.deptCodes"></iInput>  
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='materialLabel.linie'>
              <iInput 
              :placeholder="materialLabel.inputPlaceholder"  
              v-model="fromData.linieNames"></iInput>  
            </el-form-item>     
          </el-col>
          <el-col :span="8">
            <el-form-item :label='materialLabel.isFixAsset'>
              <iSelect 
              :placeholder="materialLabel.iSelectPlaceholder" 
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
            <el-form-item :label='materialLabel.sixPartNum'>
              <iInput 
              :placeholder="materialLabel.inputPlaceholder" 
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