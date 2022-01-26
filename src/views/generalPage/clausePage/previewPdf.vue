<!--
 * @Author: YoHo
 * @Date: 2022-01-17 09:49:53
 * @LastEditTime: 2022-01-25 19:15:35
 * @LastEditors: YoHo
 * @Description: 附件预览
-->
<template>
  <iPage class="page-preview">
    <div class="margin-bottom10">
      <div class="pageTitle">{{baseInfo.termsName}}</div>
    </div>
    <div class="pdf-box">
      <pdf ref="pdf" :src='baseInfo.placeHolderTermsTextUrl'/>
    </div>
    <div class="margin-top20" v-if="tableData.length">
        <div class="flex-content">
          <H2>相关附件</H2>
        </div>
        <iCard class="margin-top10">
          <el-table :data="tableData">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <!-- 比预期设计少了一个上传人 -->
            <template v-for="item in attachmentTableTitle">
              <el-table-column v-if="item.prop=='attachmentName'" :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" >
                <template slot-scope="scope">
                  <a class="openLinkText underline" :href="scope.row.fileUrl">{{scope.row.fileName}}</a>
                </template>
              </el-table-column>
              <el-table-column v-else :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" ></el-table-column>
            </template>
          </el-table>
        </iCard>
      </div>
  </iPage>
</template>

<script>
import { iPage } from "rise";
import pdf from "./pdf";
import { purchaseTermsOverView } from '@/api/frmRating/overView/overView.js'
import { attachmentTableTitle } from "./data";
export default {
  components: {
    iPage,
    pdf
  },
  data() {
    return {
      attachmentTableTitle,
      baseInfo: {},
      tableData:[]
    }
  },
mounted(){
  this.purchaseTermsOverView()
},
  methods: {
    purchaseTermsOverView(){
      purchaseTermsOverView(this.$route.query.id).then(res=>{
        if(res?.code=='200'){
          this.baseInfo = res.data
          this.tableData = this.baseInfo.attachments || []
        }
      })
      this.$refs.pdf.loading()
    }
  }
}
</script>

<style lang='scss' scoped>
.page-preview{

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
  }
  .pdf-box{
    height: calc(100% - 34px);
  }
}

</style>