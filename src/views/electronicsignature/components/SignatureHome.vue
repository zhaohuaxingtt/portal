<template>
 <div>
   <!--搜索区--->
   <i-search  class="margin-bottom20" @sure="queryPendingAKEOForm" @reset="restQueryForm" :icon="true" :resetKey="QUEREN"
              :searchKey="REST" v-permission.auto="ELECTRONIC_SIGNATURE_SEARCHAREA|电子签章搜索区">
     <el-form :model="queryForm" ref="AKEOQueryFormRef">
       <!-- 编号 -->
       <el-form-item :label="language('LK_BIANHAO', '编号')" prop='a'>
         <i-input
           v-model.trim="queryForm.aekoNum"
           :placeholder="language('LK_QINGSHURU','请输入')"
           clearable
         ></i-input>
       </el-form-item>
       <!-- 合同类型 -->
       <el-form-item :label="language('LK_HETONGLEIXING', '合同类型')" prop='a'>
         <i-select  v-model.trim="queryForm.buyerId"   :placeholder="language('LK_QINGXUANZE','请选择')">

         </i-select>
       </el-form-item>


     <!-- 合同描述 -->
     <el-form-item :label="language('LK_HETONGMIAOHSHU', '合同描述')" prop='a'>
       <i-input
         v-model.trim="queryForm.aekoNum"
         :placeholder="language('LK_QINGSHURU','请输入')"
         clearable
       ></i-input>
     </el-form-item>

     <!-- 科室 -->
     <el-form-item :label="language('LK_KESHI', '科室')" prop='a'>
       <i-input
         v-model.trim="queryForm.aekoNum"
         :placeholder="language('LK_QINGSHURU','请输入')"
         clearable
       ></i-input>
     </el-form-item>

     <!-- 供应商 -->
     <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')" prop='a'>
       <i-input
         v-model.trim="queryForm.aekoNum"
         :placeholder="language('LK_QINGSHURU','请输入')"
         clearable
       ></i-input>
     </el-form-item>
     <!-- 采购员 -->
     <el-form-item :label="language('LK_CAIGOUYUAN', '采购员')" prop='a'>
       <i-input
         v-model.trim="queryForm.aekoNum"
         :placeholder="language('LK_QINGSHURU','请输入')"
         clearable
       ></i-input>
     </el-form-item>

     <!-- 印章类型 -->
     <el-form-item :label="language('LK_YINZHANGLEIXING', '印章类型')" prop='a'>
       <i-select  v-model.trim="queryForm.buyerId"   :placeholder="language('LK_QINGXUANZE','请选择')">

       </i-select>
     </el-form-item>
       <!-- 签署状态 -->
       <el-form-item :label="language('LK_QIANSHUZHUANGTAI', '签署状态')" prop='a'>
         <i-select  v-model.trim="queryForm.buyerId"   :placeholder="language('LK_QINGXUANZE','请选择')">

         </i-select>
       </el-form-item>

     </el-form>
   </i-search>
   <i-card>
     <div class="floatright margin-bottom20">
       <i-button @click=""> {{language('LK_QIANSHU','签署')}}</i-button>
       <i-button @click="" > {{ language('LK_CHEXIAO', '撤销') }}</i-button>
     </div>
     <i-table-custom  :columns="sinatureColumns"
                      :data="sinaturedatas"></i-table-custom>

       <iPagination v-update class="pagination"
                    @size-change="handleSizeChange($event, )"
                    @current-change="handleCurrentChange($event, )"
                    background
                    :current-page="page.currPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :total="page.totalCount"/>
   </i-card>
 </div>

</template>

<script>
import {iSearch, iInput, iCard, iButton, iSelect, iPagination,iTableCustom} from "rise"
import { sinatureColumns } from '@/views/electronicsignature/config/data'
import {pageMixins} from '@/utils/pageMixins'

export default {
  name: 'SignatureHome',
  mixins: [pageMixins],
  components:{
    iSearch,
    iInput,
    iButton,
    iSelect,
    iPagination,
    iCard,
    iTableCustom
  },
  props: ['type'],
 data(){
    return {
      queryForm:{},
      sinatureColumns,
      sinaturedatas:[],
    }
 },
  created() {
  }

}
</script>

<style scoped>

</style>