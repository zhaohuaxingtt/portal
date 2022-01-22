import { SYSTEM_TAGS } from '@/views/provider/data'
export const userMessage = [
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'nameZh',
    label: '联系人姓名',
    width: '180px',
    align: 'center'
  },
  {
    prop: 'userName',
    label: '用户登录名',
    minWidth: '180px',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'userName',
    label: '用户类型',
    minWidth: '100px',
    align: 'center',
    customRender: (h, scope) => {
      let type = scope.row.type
      let typeStr = ''
      if (type == '1') {
        typeStr = '生产采购'
      } else if (type == '2') {
        typeStr = '一般采购'
      } else if (type == '3') {
        typeStr = 'N-Tier'
      }
      // let sysTags = [
      //     {
      //       id:"3",
      //       label:'N-Tier',
      //     },
      //     {
      //       id:"1",
      //       label:'生产采购',
      //     },
      //             {
      //       id:"2",
      //       label:'一般采购',
      //     }
      //   ]
      // let array = type ? type.split(",") : []
      // let strArray = []
      // if(array.length>0){
      //     sysTags.forEach((val)=>{
      //         if(array.indexOf(val.id)>=0){
      //             strArray.push(val.label)
      //         }
      //     })
      // }
      // return strArray.join(",")
      return typeStr
    }
  }
]

export const authList = [
  {
    type: 'customSelection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    label: 'Id',
    prop: 'id'
  },
  {
    prop: 'appNameCn',
    label: '中文名称',
    // minWidth: '150px',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'appNameEn',
    label: '英文文名称',
    // minWidth: '150px',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'appNameEn',
    label: '系统类型',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.systemType) {
        if (scope.row.systemType == '1') {
          return '系统'
        }
        return 'Scenario'
      }
      return ''
    }
  },
  {
    prop: 'appNameEn',
    label: '系统标签',
    // minWidth: '150px',
    align: 'center',
    customRender: (h, scope) => {
      // let type = scope.row.systemType
      // if(type=='1'){
      //     return '系统'
      // }
      // return 'Scenario'
      let type = scope.row.supplierType
      let sysTags = SYSTEM_TAGS
      let array = type ? type.split(',') : []
      let strArray = []
      if (array.length > 0) {
        sysTags.forEach((val) => {
          if (array.indexOf(val.id) >= 0) {
            strArray.push(val.label)
          }
        })
      }
      return strArray.join(',')
    }
  }
]
