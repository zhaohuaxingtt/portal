import partAnalyseSelect from './components/partAnalyseSelect.vue'
import moldAnalyseSelect from './components/moldAnalyseSelect.vue'
import BUCSelect from './components/BUCselect.vue'
import PRASelect from './components/PRAselect.vue'
import TIASelect from './components/TIAselect.vue'


export const HEAVY_ITEM_COLUMNS=[
    {
        label:'序号',
        type:'index',
        width:50
    },
    {
        label:'材料组编号',
        prop:'categoryCode',
        tooltip:true,
        minWidth:100
    },
    {
        label:'材料组名称(中)',
        prop:'stuffCategoryName',
        width:'120px',
        openNewPage:true,
        tooltip:true,
        emit:'to-detail',
        customRender:(h,scope)=>{
            return <span class='link-text'>{scope.row.stuffCategoryName}</span>
        },
    },
    {
        label:'工艺组',
        prop:'stuffName',
        tooltip:true,
        minWidth:100
    },
    {
        label:'工艺组编号',
        prop:'stuffCode',
        tooltip:true,
        minWidth:100
    },
    {
        label:'Commodity',
        prop:'commodityDeptCode',
        tooltip:true,
        minWidth:100
    },
    {
        label:'是否Heavy Item',
        prop:'isHeavyItem',
        tooltip:true,
        minWidth:120,
        customRender:(h,scope) => {
            if(scope.row.heavyItemList.length > 0){
                return <span>是</span>
            }else{
                return <span>否</span>
            }
        }
    },
    {
        label:'BUC',
        prop:'BUC',
        customRender:(h,scope,columns,extraData)=>{
            return <BUCSelect heavyItemList={scope.row.heavyItemList} edit={extraData.edit}></BUCSelect>
        },
        minWidth:50
    },
    {
        label:'PRA',
        prop:'PRA',
        customRender:(h,scope,columns,extraData)=>{
            // console.log();
            return <PRASelect heavyItemList={scope.row.heavyItemList} edit={extraData.edit}></PRASelect>
        },
        minWidth:50
    },
    {
        label:'TIA',
        prop:'TIA',
        customRender:(h,scope,columns,extraData)=>{
            return <TIASelect heavyItemList={scope.row.heavyItemList} edit={extraData.edit}></TIASelect>
        },
        minWidth:50
    },
    {
        label:'零件成本分析员',
        prop:'partsAnalyst',
        tooltip:true,
        minWidth:180,
        customRender:(h,scope, column, extraData)=>{

            if(!extraData.edit && (scope.row.heavyItemList.indexOf('BUC') > -1 || scope.row.heavyItemList.indexOf('PRA') > -1)){
                return <partAnalyseSelect row={scope.row} partAnalyseOption={extraData.partAnalyseOption} />
             }else if(scope.row.partsAnalyst){
                const name = []
                scope.row.partsAnalyst.forEach((item) => {
                    if(item){
                        name.push(item.userName)
                    }
                })
                return name.join(',')
             }else{
                 return ''
             }
        }
    },
    {
        label:'模具成本分析员',
        prop:'moldAnalyst',
        tooltip:true,
        minWidth:180,
        customRender:(h,scope, column, extraData)=>{
            if(!extraData.edit && scope.row.heavyItemList.indexOf('TIA') > -1){
                return  <moldAnalyseSelect row ={scope.row} moldAnalyseOption={extraData.moldAnalyseOption}></moldAnalyseSelect>
            }else  if(scope.row.moldAnalyst){
                const name = []
                scope.row.moldAnalyst.forEach((item) => {
                    if(item){
                        name.push(item.userName)
                    }
                })
                return name.join(',')
            }else{
                return ''
            }
        }
    }
]