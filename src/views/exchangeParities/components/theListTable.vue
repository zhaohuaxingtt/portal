<template>
  <iCard title=" " collapse style="margin-top:20px">
      <div class="btnList" slot="header-control">
          <div v-if="editSta">
              <iButton @click='edit'>{{$t('编辑')}}</iButton>
          </div>
          <div v-else>
              <iButton @click="addNewItem">{{$t('新增')}}</iButton>
              <iButton @click="del" :disabled='this.selectedItems.length == 0'>{{$t('删除')}}</iButton>
              <iButton @click="save">{{$t('保存')}}</iButton>
          </div>
      </div>
      <div class="listTabel">
        <iTabelCustom
        :loading="loading"
        :data="tabelListData"
        :columns="viewColumns"
        v-show="editSta"
      />
      <iTabelCustom
        ref="paritiesList"
        :loading="loading"
        :data="tabelListData"
        :columns="editColumns"
        :extra-data='extraData'
        @handle-selection-change="handleSelectionChange"
        v-show="!editSta"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getPage)"
        @current-change="handleCurrentChange($event, getPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      </div>
  </iCard>
</template>

<script>
import {iCard,iButton,iPagination} from 'rise'
import iTabelCustom from '@/components/iTableCustom'
import {pageMixins} from '@/utils/pageMixins'
import {PARITIES_EDIT_COLUMNS,PARITIES_VIEW_COLUMNS} from './data.js'
import {getPageList,delPageListItems,savePageList,getSelectOptions} from '@/api/exchangeParities'
export default {
    name:'the-list-table',
    components:{iCard,iButton,iPagination,iTabelCustom},
    mixins:[pageMixins],
    data(){
        return {
            editSta:true,
            viewColumns:PARITIES_VIEW_COLUMNS,
            editColumns:PARITIES_EDIT_COLUMNS,
            loading:false,
            tabelListData:[],
            extraData:{
                currencyCode:[],
            },
            selectedItems:[],
            searchContent:{},
            iniListTableLength:'',
            addItem:{
                originCurrencyCode:'',
                currencyCode:'',
                exchangeRate:'',
                isEdit:true,
                type:1,
                effectiveStartTime:'',
                effectiveEndTime:'',
                isEffect:''
            }
        }
    },
    created(){
        this.getPage()
        getSelectOptions().then((res) => {
            if(res.code == 200){
               this.extraData. currencyCode= res.data.map((item) => {
                   return {'label':item.code,'value':item.code}
               })
            }else{
                this.$message.error(res.desZh)
            }
        })
        
    },
    methods:{
        edit(){
            this.editSta = false
        },
        addNewItem(){
            this.tabelListData.unshift({
                originCurrencyCode:'',
                currencyCode:'',
                exchangeRate:'',
                isEdit:true,
                type:1,
                effectiveStartTime:'',
                effectiveEndTime:'',
                isEffect:''
            })
        },
        del(){
            this.$confirm('是否删除已选中选项','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                const ids = this.selectedItems.map((item) => {
                    return item.id    
                })
                delPageListItems(ids).then((result) =>{
                    if(result.code == 200){
                        this.getPage(this.formContent)
                        this.$message.success("删除成功")
                    }else{
                        this.$message.error(result.desZh || "删除失败")
                    }
                })
            }).catch(()=>{
                this.$refs.paritiesList.clearSelection()
            })
        },
        handleSelectionChange(val){
            
            this.selectedItems = val
            // if(val.type == 0){

            // }
        },
        save(){
            const data = this.tabelListData.filter((item)=>{
                if(item.type == 1){
                    return item
                }
            })
            let originCurrencyCode = false
            let currencyCode = false
            let exchangeRate = false
            let isEffect = false
            let effectiveStartTime = false
            let effectiveEndTime = false
            this.tabelListData.forEach((item) =>{
                if(item.originCurrencyCode.length == 0){
                   originCurrencyCode = true
                }else if(item.currencyCode.length == 0){
                     currencyCode = true
                }else if(item.exchangeRate.length == 0){
                     exchangeRate =true
                }else if(item.isEffect.length == 0){
                     isEffect = true
                }
            })
            if(this.tabelListData.length > this.iniListTableLength){
                const newItem = this.tabelListData.slice(0,this.tabelListData.length - this.iniListTableLength)
                newItem.forEach((ele) =>{
                    console.log(ele,'p');
                    console.log(ele.effectiveStartTime,'p');
                    console.log(ele.effectiveEndTime,'p');

                    if(ele.effectiveStartTime === null || ele.effectiveStartTime.length == 0){
                        effectiveStartTime = true
                    }else if(  ele.effectiveEndTime === null || ele.effectiveEndTime.length == 0){
                            effectiveEndTime = true
                    }
                })
            }
            if(originCurrencyCode){
                this.$message.error('请选择源货币编码')
            }else if(currencyCode){
                this.$message.error('请选择目标货币编码')
            }else if(exchangeRate){
                this.$message.error('请填写汇率')
            }else if(effectiveStartTime){
                this.$message.error('请选择生效开始时间')
            }else if(effectiveEndTime){
                this.$message.error('请选择生效结束时间')
            }else  if(isEffect){
                this.$message.error('请选择是否有效')
            }else{
                savePageList(data).then((result) => {
                    if(result.code == 200){
                        this.$message.success('保存成功')
                        this.editSta = true
                        this.getPage()
                    }else{
                        this.$message.error(result.desZh || '保存失败')
                    }
                })
            }
            
        },
        search(data){
            this.page.currPage = 1
            this.page.totalCount = 0
            this.searchContent = {
                ...data
            }
            this.getPage()
        },
        getPage(){
            const data =  {
                ...this.searchContent ,
                current: this.page.currPage,
                size: this.page.pageSize
            }
            this.loading = true
            getPageList(data).then((val) => {
                if(val.code == 200){
                    const data = val.data
                    this.tabelListData = data || []
                    this.tabelListData.forEach((item) =>{
                        if(item.type == 1){
                            item.isEdit = true
                            item.disabledChecked = false
                        }else{
                            item.isEdit=false
                            item.disabledChecked = true
                        }
                    })
                    this.iniListTableLength = data.length || 0
                    this.page.totalCount = val.total
                }else{
                    this.$message.error(val.desZh || '获取数据失败')
                }
            }).finally(()=>{
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>