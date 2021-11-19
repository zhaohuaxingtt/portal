<template>
  <div style="width:100%">
      <iSearch @sure='sure' @reset="reset">
          <el-form>
              <iFormItem :label='language("关键词")'>
                  <iSelect v-model="searchWord">
                      <el-option
                        v-for="item in keyWordsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >

                      </el-option>
                  </iSelect>
              </iFormItem>
          </el-form>
      </iSearch>
    <iCard class="table mt20">
        <div class="btn flex justify-end ">
            <iButton @click="newCreate">{{language('新建')}}</iButton>
            <iButton @click="del" :disabled='selectedItems.length == 0'>{{language('删除')}}</iButton>
        </div>
        <div class="mt20">
            <iTableCustom 
                ref="tableListRef"
                :loading="tableLoading"
                :data="tableListData"
                :columns="tableSetting"
                @handle-selection-change="handleSelectionChange"
            />
            <iPagination 
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
    <addKeyWordsDialog v-if="show" :show.sync='show' @refresh='refresh'/>
  </div>
</template>

<script>
import {iSearch,iFormItem,iSelect,iTableCustom,iCard,iButton,iPagination} from 'rise'
import {pageMixins} from '@/utils/pageMixins'
import {TABLE_KEYWORDS_COLUMNS} from './data.js'
import addKeyWordsDialog from './addKeyWords.vue'
export default {
    name:'keyWordsMana',
    components:{
        iSearch,
        iFormItem,
        iSelect,
        iTableCustom,
        iCard,
        iButton,
        iPagination,
        addKeyWordsDialog
    },
    mixins:[pageMixins],
    data(){
        return{
            searchWord:'',
            show:false,
            keyWordsOptions:[],
            tableLoading:false,
            tableListData:[
                {
                    keyWords:'sdf'
                },
                {
                    keyWords:'sdf'
                },
                {
                    keyWords:'sdf'
                },
            ],
            selectedItems:[],
            tableSetting:TABLE_KEYWORDS_COLUMNS,

        }
    },
    methods:{
        handleSelectionChange(val){
            this.selectedItems = val
        },
        newCreate(){
            this.show = true
        },
        del(){
            this.$confirm('是否删除已选中选项','提示',{
                confirmButtonText:'确认',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                
            }).catch(()=>{
                this.$refs.tableListRef.clearSelection()
            })
        },
        getPage(){
            const data= {
                ...this.searchWord,
                current: this.page.currPage,
                size: this.page.pageSize
            }

        },
        refresh(){
            this.getPage()
        },
        reset(){
            this.page.currPage = 1
            this.page.totalCount = 0
            this.getPage()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../comon.scss"
</style>