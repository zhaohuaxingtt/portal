export const mtzMaterielColumns = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    type: 'index',
    width: '50px'
  },
  {
    i18n: '原材料大类',
    prop: 'generalCategoryCode',
    // emit:'go-detail',
    minWidth: '100px',
    // openNewPage:true,
    tooltip: true
    // customRender:(h,scope)=>{
    //     return <span class='link-text'>{scope.row.generalCategoryCode}</span>
    // }
  },
  {
    i18n: '大类元素简称',
    prop: 'generalShortName',
    tooltip: true,
    minWidth: '130px'
  },
  {
    i18n: '材料中类',
    prop: 'rawMaterialCode',
    tooltip: true
  },
  {
    i18n: '中类描述',
    prop: 'rawMaterialName',
    tooltip: true,
    minWidth: '130px'
  },
  {
    i18n: '中类计量单位',
    prop: 'rawMaterialCountUnit',
    tooltip: true,
    minWidth: '130px'
  },
  {
    i18n: '原材料牌号',
    prop: 'mtzRawMaterialCode',
    emit: 'go-detail',
    tooltip: true,
    minWidth: '130px',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.mtzRawMaterialCode}</span>
    }
  },
  {
    i18n: '原材料名称',
    prop: 'mtzRawMaterialName',
    tooltip: true,
    minWidth: '130px'
  },
  {
    i18n: '原材料计量单位',
    tooltip: true,
    prop: 'mtzRawMaterialCountUnit',
    minWidth: '130px'
  },
  {
    i18n: '是否贵金属',
    tooltip: true,
    prop: 'statusDesc',
    customRender: (h, scope) => {
      return scope.row.isPreciousMetal ? '是' : '否'
    }
  },
  {
    i18n: '状态',
    tooltip: true,
    prop: 'statusDesc',
    customRender: (h, scope) => {
      if (scope.row.statusDesc == '无效') {
        return <span style="color:red">{scope.row.statusDesc}</span>
      } else {
        return scope.row.statusDesc
      }
    }
  }
  /* generalCategoryCode	: '',
        mtzRawMaterialCode : '',
        mtzRawMaterialCountUnit	: '',
        mtzRawMaterialName : '',
        rawMaterialCode	:'',
        rawMaterialCountUnit	:'',
        rawMaterialElementShort	:'',
        rawMaterialName	:'', */
]
