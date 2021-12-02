export {default as search} from './theSearch.vue'
export {default as tableList} from './theTableList.vue'

export const SYSTEM_TABLE_COLUMNS = [
    {
        type:'selection'
    },
    {
        label:'#',
        type:'index'
    },
    {
        label:'中文名称',
        prop:'nameZh',
        emit:'open-dialog',
        customRender:(h,scope)=>{
            return <span class='link-text'>{scope.row.nameZh}</span>
        }
    },
    {
        label:'英文名称'
    },
    {
        label:'链接'
    },
    {
        label:'系统功能说明'
    }
]

export const SEARCH_CONTENT = {

}
