<!--
 * @Author: YoHo
 * @Date: 2022-01-11 16:40:20
 * @LastEditTime: 2022-01-28 19:25:20
 * @LastEditors: YoHo
 * @Description: 审批界面内嵌使用
-->
<template>
  <el-table :data="tableData">
    <template v-for="item in TableTitle">
      <el-table-column
        v-if="item.prop == 'termsName'"
        :minWidth="item.minWidth || item.width"
        :label="item.name"
        :prop="item.prop"
        :key="item.prop"
      >
        <template slot-scope="scope">
          <span class="underline" @click="gotoDetail(scope.row)">{{
            scope.row.termsName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :minWidth="item.minWidth || item.width"
        :label="item.name"
        :prop="item.prop"
        :key="item.prop"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>

import { purchaseTermsOverView, termsTypeById } from '@/api/frmRating/overView/overView.js'
import { procurementApproveTableTitle as TableTitle } from "./data";
export default {
  data() {
    return {
      TableTitle,
      tableData: [],
      typeObj:{}
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  created() {
    this.termsTypeById()
    
  },
  methods: {
    // 获取条款类型下拉项
    termsTypeById(){
      termsTypeById().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.typeObj[i.code] = i.value
          })
          this.purchaseTermsOverView()
        }
      })
    },
    purchaseTermsOverView(){
      purchaseTermsOverView(this.id).then(res=>{
        if(res?.code=='200'){
          res.data.termsType = this.typeObj[res.data.termsType]
          this.tableData = [res.data]
        }
      })
    },
    // 文件预览
    gotoDetail(row) {
      let query = {
        id:row.id,
      }
      const router =  this.$router.resolve({path: '/clausepage/preview', query})
      window.open(router.href,'_blank')
    }
  }
}
</script>