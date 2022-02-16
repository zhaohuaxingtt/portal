<template>
  <div>
    <div @click="dialogVisible = true">
      <iSelectorInput tag-label="nameZh" v-model="suppliers" />
    </div>
    <i-selector-dialog
      :show.sync="dialogVisible"
      @change="handleAreaControllerCallback"
      v-model="suppliers"
      :tableSetting="tableSetting"
      :filter="supplierFilters"
      :title="'选择供应商'"
      :search-method="handleSearch"
      tag-label="nameZh"
    />
  </div>
</template>

<script>
import iSelectorDialog from '@/components/iSelector/iSelectorDialog'
import iSelectorInput from '@/components/iSelector/iSelectorInput'
import { getBasicList, getSuppliers } from "@/api/basic/basic";
import {SUPPLIER_TABLE_COLUMNS} from './data.js'
export default {
    name:'supplierSelect',
    components:{iSelectorDialog,iSelectorInput},
    props: {
        value: {
            type: Array,
            require: true
        },
        onlyReportForm: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            dialogVisible: false,
            tableSetting:SUPPLIER_TABLE_COLUMNS,
            supplierFilters:[
                {
                    value: 'supplierName',
                    label: '供应商中文名',
                    type: 'input'
                },
                {
                    value: 'sapCode',
                    label: 'SAP号',
                    type: 'input'
                },
                {
                    value: 'svwCode',
                    label: 'SVW号',
                    type: 'input'
                },
                {
                    value: 'supplierType',
                    label: '供应商类型',
                    type: 'select',
                    initVal:'PP',
                    options: [
                        {
                          label:'一般供应商',
                          value:'GP'
                        },
                        {
                        label:'生产供应商',
                        value:'PP'
                        },
                        {
                        label:'共用供应商',
                        value:'PD'
                        },
                    ]
                },
                {
                    value: 'formalStatus',
                    label: '供应商身份',
                    type: 'select',
                    options: [
                        {
                            label:'正式',
                            value:'1'
                        },
                        {
                            label:'临时',
                            value:'0'
                        },
                        {
                            label:'蓄水池',
                            value:'2'
                        }
                    ]
                },
                // {
                //     value:'',
                //     label:'供应商类别',
                //     type:'select',
                //     options:[

                //     ]
                // },
                // {
                //     value:'',
                //     label:'采购分类',
                //     type:'select',
                //     options:[
                        
                //     ]
                // }
            ],
            suppliers: []
        }
    },
    watch: {
        suppliers(val) {
            this.$emit('change', val)
        }
    },
    created(){
        if(this.value){
            this.suppliers = this.value
        }
    },
    methods:{
        handleSearch(param){
            if (this.onlyReportForm) {
                param.isExpired = true
                param.isMainContact = true
                param.isValid = true
                return getSuppliers(param)
            } else {
                return  getBasicList(param)
            }
            
        }
    }
}
</script>

<style>

</style>