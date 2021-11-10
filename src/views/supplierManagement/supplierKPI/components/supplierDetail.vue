<!--
 * @Author: youyuan
 * @Date: 2021-08-06 14:46:27
 * @LastEditTime: 2021-09-06 11:26:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\components\supplierDetail.vue
-->
<template>
  <div>
    <iPage>
           <iCard style="margin-top:20px">
              <div class="top">
                <div class="searchOptions">
                  <el-form>
                    <el-row>
                      <el-col>
                        <iSelect v-model="reportData" @change="selectChange"> 
                          <el-option v-for="(item, index) in reportList" :key="index" :value="item.id" :label="item.title">{{item.title}}</el-option>
                        </iSelect>
                      </el-col>
                    </el-row>
                  </el-form>
                  <el-tooltip :content="language('BANNIANBAOTISHI', '下列展示数据为，从当前时间起往前推三个半年的数据')" placement="top" effect="light">
                    <i class="el-icon-warning-outline rotate"></i>
                  </el-tooltip>
                </div>
                <div class="el-icon-error closed" @click="handleClosed"></div>
              </div>
               <div class="tableBox">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="categoryName"
                    :label="$route.query.supplierName"
                    align="center"
                    header-align="center"
                    width="300">
                    <template v-slot="scope">
                      {{scope.row.categoryName}}
                      <el-tooltip :content="language('ZHIBIAOXIAJIANGTISHI', '该指标连续三个半年呈下降趋势')" placement="top" effect="light">
                        <i v-show="checkShowReason(scope.row)" class="el-icon-warning-outline rotate"></i>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column
                  v-for="(item, index) in columns"
                    :key="index"
                    align="center"
                    header-align="center"
                    :prop="item.name"
                    :label="item.value">
                  </el-table-column>
                  <el-table-column
                    prop="explanation"
                    align="center"
                    header-align="center"
                    label="解释"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="target"
                    align="center"
                    header-align="center"
                    label="目标"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"                  
                    prop="actionPlan"
                    label="行动计划"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
               </div>
           </iCard>
    </iPage>
  </div>
</template>

<script>
import {iPage,iCard,iSelect,iMessage} from 'rise'
import {getInfo, getReportDetail } from '@/api/kpiChart/spi.js'
export default {
    components:{
        iPage,
        iCard,
        iSelect,
    },
    data(){
      return {
        reportData: null,
        reportList: [],
        supplierId: this.$route.query.supplierId,
        tableData:[],
        columns: [],
        reasonData: []
      }
    },
    created () {
      this.fetchInfo().then(_ => {
        this.fetchReportDetail()
      })
    },
    computed: {
      checkShowReason() {
        return function(row) {
          let flag = true
          let temp = null
          this.columns.map((item) => {
            const data = eval(window._.cloneDeep(row[item.name]))
            if(!data || (temp && temp >= data)) {
              flag = false
            }
            temp = data 
          })
          return flag
        }
      },
    },
    methods:{
      handleClosed(){
          this.$router.go(-1)
      },
      fetchReportDetail() {
        const params = {
          id: this.reportData,
          supplierId: this.supplierId,
          supplierType: this.$route.query.supplierType || null
        }
        getReportDetail(params).then(res => {
          if(res && res.code == 200) {
            this.columns = []
            for(const key in res.data.titleMap) {
              this.columns.push({
                name: key,
                value: res.data.titleMap[key]
              })
            }
            this.tableData = res.data.reportDetailList
            if(this.tableData && this.tableData.length > 0) {
              this.tableData.forEach(item => {
                for(const key in item.dataMap) {
                  item[key] = item.dataMap[key]
                }
              })
            }
          } else iMessage.error(res.desZh)
        })
      },
      fetchInfo() {
        return new Promise(resolve => {
          const params = {
            supplierId: this.supplierId,
          }
          getInfo(params).then(res => {
            if(res && res.code == 200) {
              this.reportList = res.data
              this.reportData = res.data[res.data.length - 1].id
              resolve()
            } else iMessage.error(res.desZh)
          })
        })
      },
      selectChange(val) {
        this.fetchReportDetail()
      }
    },
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    
    .top{
        display: flex;
        justify-content: space-between;
        .searchOptions{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .rotate{
            transform: rotate(180deg);
            color: #A0BFFC;
            margin-left: 10px;
            font-size: 16px;
        }
        .closed{
            font-size: 24px;
            color: #A0BFFC;
            cursor: pointer;
        }
    }

    .tableBox {
      margin-top: 20px;
      .rotate{
        color: #E30D0D;
        font-size: 16px;
      }
    }
</style>