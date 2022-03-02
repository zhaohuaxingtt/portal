<template>
  <iCard title="" collapse>
      <el-form label-position="left" label-width="120px" style="margin-top:20px">
          <el-row :gutter="24">
              <el-col span="6">
                  <iFormItem :label="language('源货币编码')" >
                      <iInput v-model="formContent.originCurrencyCode" :placeholder="language('请输入')"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="6">
                  <iFormItem :label="language('目标货币编码')">
                      <iInput v-model="formContent.currencyCode" :placeholder="language('请输入')"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="6">
                  <iFormItem :label="language('汇率类型')">
                      <iSelect v-model="formContent.type" :placeholder="language('请选择')">
                          <el-option
                          v-for="item in paritiesType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
              <el-col span="6">
                  <iFormItem style="margin-left:8px">
                      <iButton @click="search">{{language('查询')}}</iButton>
                      <iButton @click='reset'>{{language('重置')}}</iButton>
                  </iFormItem>
              </el-col>
          </el-row>
      </el-form>
  </iCard>
</template>

<script>
import {iFormItem,iInput,iSelect,iCard,iButton} from 'rise'
export default {
    name:'theListPanel',
    components:{iFormItem,iInput,iSelect,iCard,iButton},
    props:{

    },
    data(){
        return{
            paritiesType:[
                {
                    label:'项目汇率',
                    value:1
                },
                {
                    label:'SAP汇率',
                    value:0
                }
            ],
            formContent:{
                currencyCode:"",
                originCurrencyCode:'',
                type:''
            },
        }
    },
    methods:{
        search(){
            this.$emit('search',this.formContent)
        },
        reset(){
            this.formContent = {
                currencyCode:"",
                originCurrencyCode:'',
                type:''
            }
            this.search()
        }
    }
}
</script>

<style>

</style>