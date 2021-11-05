<template>
  <iCard title="" collapse>
      <el-form label-position="left" label-width="100px" style="margin-top:20px">
          <el-row :gutter="24">
              <el-col span="6">
                  <iFormItem :label="$t('源货币编码')">
                      <iInput v-model="formContent.originCurrencyCode"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="6">
                  <iFormItem :label="$t('目标货币编码')">
                      <iInput v-model="formContent.currencyCode"></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="6">
                  <iFormItem :label="$t('汇率类型')">
                      <iSelect v-model="formContent.type">
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
                      <iButton @click="search">{{$t('查询')}}</iButton>
                      <iButton @click='reset'>{{$t('重置')}}</iButton>
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