<template>
  <div class="main">
      <div class="serachForm">
        <iSearch @sure='sure' @reset='reset'>
            <el-form>
                <el-grow gutter='24'>
                    <el-col :span='8'> 
                        <iFormItem :label='language("产品组编号")'>
                            <iInput :placeholder="language('请输入')" v-model="searchContent.productGroupCode"></iInput>
                        </iFormItem>
                    </el-col>
                    <el-col :span='8'> 
                        <iFormItem :label='language("产品组名称(中)")'>
                            <iInput :placeholder="language('请输入')" v-model="searchContent.productGroupNameZh"></iInput>
                        </iFormItem>
                    </el-col>
                    <el-col :span='8'> 
                        <iFormItem :label='language("产品组名称(德)")'>
                            <iInput :placeholder="language('请输入')" v-model="searchContent.productGroupNameDe"></iInput>
                        </iFormItem>
                    </el-col>
                </el-grow>
            </el-form>
        </iSearch>
      </div>
      <div class="tabelList">
          <iCard>
              <div class="btnList">
                  <iButton @click='create'>{{language('新建')}}</iButton>
                  <!-- <iButton @click="edit" :disabled='this.selectedItem.length != 1'>{{btnTitle.edit}}</iButton> -->
                  <iButton @click="loseAc" :disabled='this.selectedItem.length == 0'>{{language('删除')}}</iButton>
                  <buttonDownload   :download-method="exportExcel">{{language('导出')}}</buttonDownload>
              </div>
              <div class="tabelContent">
                <iTableCustom
                ref="productTabel"
                :loading='loading'
                :columns='productTabelList'
                :data='tabelList'
                @to-detail='toDetail'
                @handle-selection-change="handleSelectionChange"
                >
                </iTableCustom>
                <iPagination
                    v-update
                    @size-change="handleSizeChange($event, getTabelList)"
                    @current-change="handleCurrentChange($event, getTabelList)"
                    background
                    :current-page="page.currPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :total="page.totalCount"
                >
                </iPagination> 
              </div>
          </iCard>
      </div>
  </div>
</template>

<script>
import { iSearch, iFormItem, iInput, iPagination, iCard, iButton } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { productTabelList } from './data.js'
import {
  getProductTabelList,
  deleteProduct,
  exportExcel
} from '@/api/materiel/productData.js'
import { openUrl } from '@/utils'
import buttonDownload from '@/components/buttonDownload'
export default {
    name:'产品主数据',
    components:{iSearch,iFormItem,iInput,iTableCustom,iPagination,iCard,iButton,buttonDownload},
    mixins:[pageMixins],
    computed:{},
    data(){
        return{
            productTabelList,
            selectedItem:[],
            tabelList:[],
            loading:false,
            // btnTitle:{
            //     create:'新建',
            //     edit:'编辑',
            //     loseAc:'删除',
            //     exportExcel:'导出'
            // },
            // formTitle:{
            //     productNum:'产品组编号',
            //     productCh:'产品组名称(中)',
            //     productDe:'产品组名称(德)'
            // },
            // placeholderText:'请输入',
            searchContent:{
                productGroupCode:'',
                productGroupNameZh:'',
                productGroupNameDe:'',
            }
        }
    },
    methods:{
        sure(){
            this.page.totalCount = 0
            this.page.currPage = 1
            this.getTabelList()
        },
        reset(){
            this.searchContent={
                productGroupCode:'',
                productGroupNameZh:'',
                productGroupNameDe:''
            }
            this.page.totalCount = 0
            this.page.currPage = 1
            this.getTabelList()
        },
        create(){
            openUrl('/materielData/product-message/edit')
        },
        edit(){
             openUrl(`/materielData/product-message/edit?id=${this.selectedItem[0].id}`)
            //  openUrl(`/materielData/product-message/edit?id=2`)
        },
        loseAc(){
            this.$confirm('此动作会导致数据失效，是否继续','失效',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let ids = []
                this.selectedItem.map((item)=>{
                    return ids.push(item.id)
                })
                deleteProduct(ids).then((val)=>{
                    if(val.code == 200){
                        this.getTabelList()
                        this.$message.success('删除成功')
                    }else if(val.code){
                        this.$message.error(val.desZh)
                    }
                }).catch(()=>{
                    this.$message.error('失效失败')
                })
            }).catch(()=>{
                this.$refs.productTabel.clearSelection()
            })
        },
    exportExcel() {
      let data = {
        ...this.searchContent
      }
      return exportExcel(data)
    },
    toDetail(row) {
      openUrl(`/materielData/product-message/edit?id=${row.id}`)
    },
    handleSelectionChange(val) {
      this.selectedItem = val
    },
    getTabelList() {
      this.loading = true
      const data = {
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getProductTabelList(data)
        .then(val => {
          if (val.code == 200) {
            const tabelData = val
            this.tabelList = tabelData.data
            this.page.totalCount = tabelData.total
            this.loading = false
          } else if (val.code == 1) {
            this.$message.error(val.desZh)
          }
        })
        .catch(() => {
          this.$message.error('获取数据失败')
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.getTabelList()
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.tabelList,
.tabelContent {
  margin-top: 20px;
}
</style>
