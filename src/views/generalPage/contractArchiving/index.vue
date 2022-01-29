<!--
 * @Author: YoHo
 * @Date: 2022-01-17 17:52:58
 * @LastEditTime: 2022-01-28 22:15:56
 * @LastEditors: YoHo
 * @Description: 
-->
<!--条款归档页面-->
<template>
  <iPage class="partsprocureHome" v-permission="CONTRACT_MANAGE_ARCHIVING_HOME_PAGE">
    <div class="header margin-bottom20">
      <h2>档案管理</h2>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" v-on:keyup.13.native="sure" @sure="sure" @reset="reset" v-permission="CONTRACT_MANAGE_ARCHIVING_HOME_SEARCH">
      <el-form>
        <el-form-item v-for="item in search" :key="item.prop" :label="item.label">
          <iSelect v-if="item.type=='select'" :placeholder="$t('LK_QINGXUANZE')"  v-model="form[item.prop]"
            collapse-tags
            filterable
            clearable>
            <el-option v-for="item in selectData[item.prop]" :key="item.code" :value="item.code" :label="item.value" />
          </iSelect>
          <iInput v-else :placeholder="$t('partsignLanguage.QingShuRu')" v-model="form[item.prop]"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      
      <div class="margin-bottom10">
        <span class="switch-text">仅查看线下签署</span>
        <el-switch class="margin-left10" v-model="isOnlyOffLine" @change="sure"></el-switch>
      </div>
      <!------------------------------------------------------------------------>
      <!--                  table模块，向外入参表格数据，表头                    --->
      <!------------------------------------------------------------------------>

      <archiveTable class="content" v-permission="CONTRACT_MANAGE_ARCHIVING_HOME_DATA_SHOW_AREA" :tableData="tableListData" :signWayObj="signWayObj" :typeObj="typeObj" :getcontractType="typeList" @open-page="openPage" @ContractUpload="ContractUpload" ref="name"> </archiveTable>
      <iPagination background @size-change="handleSizeChange($event, clickQuery)" @current-change="handleCurrentChange($event, clickQuery)" :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.total" />
    </iCard>
  </iPage>
</template>
<script>
import { iPage, iSearch, iInput, iSelect, iCard, iPagination,iMessage } from 'rise'
import archiveTable from './components/archiveTable'
import { search } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { pagePurchaseTerms, termsTypeById, cancelTerms, confirmTerms, 
  signWaySelector,
  termsState, } from '@/api/frmRating/overView/overView.js'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iSearch,
    iInput,
    iSelect,
    iCard,
    archiveTable,
    iPagination,
  },
  data() {
    return {
      isOnlyOffLine:true,
      search,
      form: {},
      selectData:{
        termsType:[],
        termsStatus:[{
          "code": "06",
          "value": "已生效"
        },
        {
          "code": "07",
          "value": "已归档"
        }]
      },
      tableListData: [],
      typeList: [],
      statusObj:{},
      signWayObj:{},
      typeObj:{}
    }
  },
  created() {
    this.initSelectData()
    this.clickQuery()
  },
  methods: {
    initSelectData(){
      this.signWaySelector()
      // this.termsState()
      this.termsTypeById()
    },
    // 采购条款状态
    // termsState(){
    //   termsState().then(res=>{
    //     if(res?.code=='200'){
    //       res.data.forEach(i=>{
    //         this.statusObj[i.code] = i.value
    //       })
    //       this.selectData.termsStatus = res.data
    //     }
    //   })
    // },
    // 采购条款类型
    termsTypeById(){
      termsTypeById().then(res=>{
        if(res?.code=='200'){
          res.data.forEach(i=>{
              this.typeObj[i.code] = i.value
            })
          this.selectData.termsType = res.data
        }
      })
    },
    // 获取签署方式下拉项
    signWaySelector(){
      signWaySelector().then(res=>{
        console.log(res);
        if(res?.code=='200'){
          res.data.forEach(i=>{
            this.signWayObj[i.code] = i.value
          })
        }
      })
    },
    // 查询
    sure() {
      this.page.currPage = 1
      this.clickQuery()
    },

    //重置查询条件
    reset() {
      for (let i in this.form) {
        if (i !== 'isOnlyMyself') {
          this.form[i] = ''
        }
      }
      this.page.currPage = 1
      this.getTableListFn()
    },
    clickQuery() {
      this.tableLoading = true
      let tableListData = []
      let total = 0
      let params = {
        ...this.form,
        pageSize:this.page.pageSize,
        pageNo:this.page.currPage,
        signWay: this.isOnlyOffLine?'off_line':''
      }
      pagePurchaseTerms(params)
        .then((res) => {
          if(res?.code=='200'){
            tableListData = res.data
            total = res.total
          }
          this.page.total = total
          this.tableListData = tableListData
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查看材料组权限 查看详情
    openPage(row) {
      let query = {
        id:row.id
      }
      const router =  this.$router.resolve({path: '/clausepage/preview', query})
      window.open(router.href,'_blank')
    },
    // 条款状态修改
    ContractUpload(row){
      if(row.termsStatus=='06'){  // 确认归档
        confirmTerms(row.id).then(res=>{
          if(res?.code=='200'){
            // 重新获取数据
            this.clickQuery()
          }
        })
      }else if(row.termsStatus=='07'){  // 取消归档
        cancelTerms(row.id).then(res=>{
          if(res?.code=='200'){
            // 重新获取数据
            this.clickQuery()
          }
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.margin-bottom20 {
  margin-bottom: 20px;
}

.partsprocureHome {
  position: relative;
}
</style>