<template>
  <div class="main">
    <div class="search-form">
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="searchLabel.materialGroup">
                <iSelect
                  v-model="searchContent.stuffCategoryId"
                  :placeholder="language('请选择')"
                  filterable
                >
                  <el-option
                    v-for="item in materialGroupOption"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="searchLabel.isHeavyItem">
                <iSelect
                  v-model="searchContent.isHeavyItem"
                  :placeholder="language('请选择')"
                >
                  <el-option
                    v-for="item in heavyItemStaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="searchLabel.analyseType">
                <iSelect v-model="searchContent.heavyItem" :placeholder="language('请选择')">
                  <el-option
                    v-for="item in analyseTypeOption"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
          </el-row>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="searchLabel.partsCostAnalyst">
                <iSelect
                  v-model="searchContent.partsAanlystUserId"
                  :placeholder="language('请选择')"
                >
                  <el-option
                    v-for="item in partsCostAnalystOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="searchLabel.moldCostAnalyst">
                <iSelect
                  v-model="searchContent.modlAanlystUserId"
                  :placeholder="language('请选择')"
                >
                  <el-option
                    v-for="item in moldCostAnalystOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="searchLabel.commoditySta">
                <iInput
                  v-model="searchContent.commidityDeptCode"
                  :placeholder="language('请选择')"
                >
                </iInput>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </iSearch>
    </div>
    <div class="heavyItemTabel">
        <iCard :title="language('Heavy Item材料组')">
            <div class="btnList" slot="header-control">
                <div v-if="viewSta">
                    <iButton @click="edit">{{language('编辑')}}</iButton>
                    <buttonDownload :download-method="exportExcel">{{language('导出')}}</buttonDownload>
                </div>
                <div v-else>
                    <iButton @click="save">{{language('保存')}}</iButton>
                    <iButton @click="cancel">{{language('取消')}}</iButton>
                </div>
            </div>
            <div class="tabelList">
                <iTableCustom
                :loading='loading'
                :columns='tabelSetting'
                :data='tabelData'
                :extra-data='heavyExtraData'
                @to-detail='toDetail'
                @handle-selection-change="handleSelectionChange"
                ></iTableCustom>
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
                ></iPagination>
            </div>
        </iCard>
    </div>
  </div>
</template>
<script>
import {
  iButton,
  iSearch,
  iFormItem,
  iPagination,
  iSelect,
  iInput,
  iCard
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  getHeavyItemPage,
  saveHeavyItemPage,
  getAnalyseSelect,
  exportHeavyItem
} from '@/api/materiel/heavyItem'
import { materielGroup } from '@/api/materiel/materielMainData'
import iTableCustom from '@/components/iTableCustom'
import {HEAVY_ITEM_COLUMNS} from './data.js'
import buttonDownload from '@/components/buttonDownload'
import { openUrl } from '@/utils'
export default {
    name:'Heavy-Item',
    components:{iButton,iSearch,iFormItem,iPagination,iSelect,iInput,iTableCustom,iCard,buttonDownload},
    mixins:[pageMixins],
    computed:{},
    props:{},
    data(){
        return {
            viewSta:true,
            tabelSetting:HEAVY_ITEM_COLUMNS,
            heavyExtraData:{
                edit:true,
                heavyItemList:[],
                partAnalyseOption:[],
                moldAnalyseOption:[]
            },
            tabelData:[],
            loading:false,
            searchContent:{
                stuffCategoryId:'',
                isHeavyItem:'',
                heavyItem:'',
                partsAanlystUserId:'',
                modlAanlystUserId:'',
                commidityDeptCode:''
            },
            searchLabel:{
                materialGroup:'材料组',
                isHeavyItem:'是否Heavy Item',
                analyseType:'分析类型',
                partsCostAnalyst:'零件成本分析员',
                moldCostAnalyst:'模具成本分析员',
                commoditySta:'Commodity'
            },
            materialGroupOption:[],
            heavyItemStaOption:[
                {
                    label:'是',
                    value:1
                },
                {
                    label:'否',
                    value:0
                }
            ],
            analyseTypeOption:[{label:'BUC',value:'BUC'},{label:'PRA',value:'PRA'},{label:'TIA',value:'TIA'}],
            partsCostAnalystOption:[],
            moldCostAnalystOption:[]
        }
  },
  methods:{
    edit(){
        this.viewSta = false
        this.heavyExtraData.edit = false
    },
    save(){
        let judgeTIAChecked 
        let judgeBOrP 
        this.tabelData.forEach((item)=>{
          if(item.heavyItemList.indexOf('TIA') > -1 && item.moldUserIds.length == 0){
            judgeTIAChecked = true
          } 
          if((item.heavyItemList.indexOf('BUC') > -1 || item.heavyItemList.indexOf('PRA') > -1) && item.partsUserIds.length == 0){
              judgeBOrP = true
          }
        })
        console.log(judgeTIAChecked,'judgeTIAChecked');
        if(judgeTIAChecked){
          return this.$message.error('选择TIA后请选择模具成本分析员')
        }
        if(judgeBOrP){
          return this.$message.error('选择BUC或者PRA后请选择零件成本分析员')
        }

        this.viewSta = true
        this.heavyExtraData.edit = true
        const data = this.tabelData.map((val) => {
            return {
                categoryId:val.categoryId,
                employName:val.employName,
                groupName:val.groupName,
                id:val.id,
                moldBudgetType:val.moldBudgetType,
                moldUserIds:val.moldUserIds,
                partsUserIds:val.partsUserIds,
                stuffCode:val.stuffCode,
                stuffMemo:val.stuffMemo,
                stuffName:val.stuffName,
                stuffNameDe:val.stuffNameDe,
                heavyItem: val.heavyItemList.join(',')
            }
        })
        saveHeavyItemPage(data).then((val)=>{
            if(val.code == 200){
                this.$message.success('保存成功')
                this.getPageList()
            }else{
                this.$message.error(val.desZh)
            }
        })
    },
    exportExcel(){
        return exportHeavyItem(this.searchContent)
    },
    cancel(){
        this.viewSta = true
        this.heavyExtraData.edit = true
        this.getPageList()
    },
    sure(){
        this.page.totalCount = 0
        this.page.currPage = 1
        this.getPageList()
    },
    reset(){
        this.page.totalCount = 0
        this.page.currPage = 1
        this.searchContent={
            materialGroup:'',
            heavyItemSta:'',
            analyseType:'',
            partsCostAnalystL:'',
            moldCostAnalystL:'',
            commoditySta:''
        }
        this.getPageList()
    },
    getPageList(){
        this.loading = true
        let data ={
            ...this.searchContent,
            current: this.page.currPage,
            size: this.page.pageSize
        }
        getHeavyItemPage(data).then((val)=>{
            if(val.code == 200){
                const data = val.data
                data.forEach((item) => {
                    if(!item.heavyItemList){
                        item.heavyItemList = []
                    }
                    item.partsUserIds = []
                    item.moldUserIds = []
                    if(item.partsAnalyst){
                        item.partsAnalyst.forEach((element) => {
                            if(element) {
                                item.partsUserIds.push(element.userId)
                            }
                        })
                    }
                    if(item.moldAnalyst){
                        item.moldAnalyst.forEach((element) => {
                            if(element){
                                item.moldUserIds.push(element.userId) 
                            }
                        })
                    }
                })
                this.tabelData = data
                this.page.totalCount = val.total
            }else{
                this.$message.error(val.desZh)
            }
        }).finally(()=>{
            this.loading = false
        })
    },
    toDetail(val){
      openUrl(`/materielData/material-group/detail?id=${val.categoryId}&readOnly=1`)
    }
  },
  created() {
    materielGroup().then(val => {
      if (val.code == 200) {
        this.materialGroupOption = val.data
      }
    })
    //获取零件成本分析员下拉
    getAnalyseSelect({ type: 1 }).then(val => {
      if (val.code == 200) {
        this.heavyExtraData.partAnalyseOption = val.data
        this.partsCostAnalystOption = val.data
      }
    })
    //模具成本分析员
    getAnalyseSelect({ type: 2 }).then(val => {
      if (val.code == 200) {
        this.heavyExtraData.moldAnalyseOption = val.data
        this.moldCostAnalystOption = val.data
        this.getPageList()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.heavyItemTabel {
  margin-top: 20px;
}
.btnList {
  display: flex;
  justify-content: flex-end;
}
</style>
