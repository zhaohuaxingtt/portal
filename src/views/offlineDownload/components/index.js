export {default as Search} from './theOfflineDownloadSearch.vue'
export {default as TableList} from './theOfficeDownloadTableList.vue'

export const TABLE_COLUMNS = [
    {
        type:'selection'
    },
    {
        label:'序号',
        type:'index'
    },
    {
        label:'任务编号',
        prop:'taskCode'
    },
    {
        label:'创建时间',
        prop:'createDate'
    },
    {
        label:'执行时间',
        prop:'startTime'

    },
    {
        label:'结束时间',
        prop:'endTime'
    },
    {
        label:'状态',
        prop:'status',
        customRender:(h,scope)=>{
            if(scope.row.status == 'INPROCESS'){
                return '执行中'
            }else if(scope.row.status == 'SUCCESS'){
                return '成功'
            }else if(scope.row.status == 'FAIL'){
                return '失败'
            }else{
                return ''
            }
        }
    },
    {
        label:'操作人',
        prop:'userName'
    }
]

export const SEARCH_FORM_CONTENT={
    taskCode:'',
    taskName:'',
    userName:'',
    status:'',
    time:''
}