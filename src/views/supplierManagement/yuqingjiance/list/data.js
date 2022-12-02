export const tableTitle = [
    {
        type: 'selection',
        width: 50
    },
    {
        type: 'index',
        width: 60,
        label: '序号'
    },
    {
        prop: 'nameZh',
        label: '供应商名称',
        li8n: 'LK_GONGYINGSHANGMINGCHENG1',
        width: 300,
        tooltip: true
    },
    {
        prop: 'qualitativeScoreStatus',
        label: '供应商简称',
        li8n: 'LK_ZHUANGTAI',
        tooltip: true
    },
    { 
        prop: 'versionNum', 
        label: '统一社会信用代码', 
        li8n: 'SPR_FRM_CBPJ_BB', 
        tooltip: true 
    },
    {
        prop: 'createDate',
        label: '相关科室',
        li8n: 'SPR_FRM_CBPJ_PFFCSJ',
        tooltip: true
    },
    {
        prop: 'view',
        label: '标题',
        li8n: 'SPR_FRM_CBPJ_CZJL',
        tooltip: true,
        emit: 'go-title',
        customRender: (h, scope) => {
            const val = scope.row.view
            return (
            <span class="cursor" style="color:#1763F7">
                {val}
            </span>
            )
        }
    },
    { 
        prop: 'sectionName', 
        label: '分类', 
        li8n: 'FUZEKEGU', 
        tooltip: true 
    },
    {
        prop: 'operateContent',
        label: '发布日期',
        li8n: 'SPR_FRM_CBPJ_ZXCZ',
        tooltip: true
    },
    { 
        prop: 'nr', 
        label: '内容分类', 
        li8n: 'Nr.', 
        tooltip: true 
    },
    {
        prop: 'returnReason',
        label: '来源',
        li8n: 'SPR_FRM_CBPJ_THLY',
        tooltip: true
    }
]