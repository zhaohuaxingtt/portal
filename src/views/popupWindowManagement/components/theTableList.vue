<template>
  <iCard style="margin-top:20px">
    <div class="btnList" >
      <iButton @click="newCreate">{{language('新建')}}</iButton>
      <iButton @click="checkView" :disabled='this.selectedItems.length != 1'>{{language('查看')}}</iButton>
      <iButton @click="del" :disabled='this.selectedItems.length == 0'>{{language('删除')}}</iButton>
      <iButton @click="exportExcell">{{language('导出')}}</iButton>
    </div>
    <div class="tableList">
      <iTabelCustom
        ref="customList"
        :loading="loading"
        :data="tabelListData"
        :columns="columns"
        :extra-data='extraData'
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getPageList)"
        @current-change="handleCurrentChange($event, getPageList)"
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
import {TABLE_COLUMNS} from './data'
import {getPage,delPageItems,exportEx,searchDetail} from '@/api/popupWindowMgmt'
export default {
  name:'theTableList',
  components:{iCard,iButton,iPagination,iTabelCustom},
  mixins:[pageMixins],
  data(){
    return{
      loading:false,
      columns:TABLE_COLUMNS,
      selectedItems:[],
      tabelListData:[],
      timer:null,
      iniSearchForm:{},
      linkUrl:''
    }
  },
  created(){
    this.getPageList()
  },
  methods:{
    del(){
      console.log(this.selectedItems,'ppp');
      const list = this.selectedItems
      const ids = list.map((ele)=>{
        return ele.id
      })
      this.$confirm('是否删除已选中选项','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        delPageItems(ids).then((res)=>{
          if(res.code == 200){
            this.$message.success('删除成功')
            this.getPageList()
          }else{
            this.$message.error(res.desZh || '删除失败')
          }
        })  
      }).catch(()=>{
        this.$refs.customList.clearSelection()
      })
      
    },
    handleSelectionChange(val){
      this.selectedItems = val
    },
    checkView(){
      const data = this.selectedItems
      const ids = data.map((ele) =>{
        return ele.id
      })
      searchDetail(ids).then((res)=>{
        if(res.code == 200){
          const formData = res.data
          let _this = this
          this.linkUrl = formData.linkUrl
          this.$notify({
          duration: 0,
          dangerouslyUseHTMLString: true,
          message:`<div style='display: flex;justify-content: space-between;${formData.linkUrl && 'cursor:pointer;'}'>
                      <div class="popupLeft" style='width:50px;height:50px; '>
                        <img src="${formData.picUrl}" style='width:100%;height:100%; border-radius: 50%;'>
                      </div>
                      <div class="popupRight" style='position:relative;margin-left:20px'>
                        <p class='${formData.linkUrl && 'linkTitle'}' 
                          style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
                          width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;
                          ${formData.linkUrl && 'text-decoration:underline'}'>
                          ${formData.popupName}
                        </p>
                        <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:34px;color: #4B5C7D;'
                        >${formData.content}</p>
                      </div>
                    </div>`,
          position:'bottom-right',
          onClick(){
              _this.toNewPage()
            }
          })
        }else{
          this.$message.error(res.desZh)
        }
      })
      
    },
    toNewPage(){
      if(this.linkUrl){
        window.open(this.linkUrl)
      }
      
    },
    newCreate(){
        window.open('portal/#/dialogMgmt/popup-window-management/create')
    },
    exportExcell(){
      const data = {
        ...this.iniSearchForm
      }
      exportEx(data)
    },
    search(val){
      this.iniSearchForm = {
        ...val
      }
      this.page.currPage = 1
      this.page.totalCount = 0
      this.getPageList()
    },
    getPageList(){
      const data = {
        ...this.iniSearchForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getPage(data).then((res) => {
        if(res.code == 200){
          const data = res.data.records
          this.tabelListData = data
          this.page.totalCount =  res.data.total
        }else{
          this.$message.error(res.desZh)
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.btnList{
  display: flex;
  justify-content: flex-end;
  margin-top:20px ;
  
}
.tableList{
  margin-top: 20px;
}
</style>