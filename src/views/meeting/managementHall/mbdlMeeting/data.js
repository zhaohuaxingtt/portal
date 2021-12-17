/*
 * @Author: HS
 * @FilePath: \front-portal\front-portal\src\views\meeting\managementHall\mbdlMeeting\data.js
 */
//列表表头
export const TABLE_COLUMNS_DEFAULT = [
    {
      type: 'selection',
      width: 50
    },
    {
      type: 'index',
      label: '#',
      i18n: 'GP_NO',
      width: 50
    },
    {
      value: 1,
      prop: '',
      label: '标记',
      i18n: 'RFQ_GL.BJ',
      width: 50,
      customRender: (h, scope) => {
        // nominationType == 2 iconicon-baofeichuzhi
        // isSection == true  iconicon-fenduandingdian
        if (scope.row.isSection == true) {
          return <icon symbol class="cursor font24" name="iconicon-fenduandingdian" />
        }
        if (scope.row.nominationType == "2") {
          return <icon symbol class="cursor font24" name="iconicon-baofeichuzhi" />
        }
      }
    },
    {
      value: 2,
      prop: 'code',
      label: 'CSC编号',
      i18n: 'CSC编号',
      customRender: (h, scope) => {
        return <span class='open-link-text' > {scope.row.code} </span>
      },
      emit: 'go-detail',
      width: 100
    },
    {
      value: 3,
      prop: 'name',
      label: '项目描述',
      i18n: 'XIANGMUMIAOSHU'
    },
    {
      value: 4,
      prop: 'status',
      label: 'CSC状态',
      i18n: 'CSCZHUANGTAI'
    },
    {
      value: 5,
      prop: 'rsStatus',
      label: 'RS状态',
      i18n: 'RS状态'
    },
    {
      value: 6,
      prop: 'rfqCode',
      label: 'RFQ编号',
      i18n: 'RFQ_GL.RFQ_NUMBER',
      customRender: (h, scope) => {
        return <span class='open-link-text' > {scope.row.rfqCode} </span>
      },
      emit: 'go-detailRFQ',
    },
    {
      value: 7,
      prop: 'documentType',
      label: '单据类型',
      i18n: 'DANJULEIXING',
    },
    {
        value: 8,
        prop: 'prCode',
        label: '采购申请单号',
        i18n: 'CAIGOUSHNEGQINGDANHAO',
        width: 100,
        customRender: (h, scope) => {
          if(scope.row.prCode){
            let prCodeArry = scope.row.prCode.split(",")
            return (
              prCodeArry.map(x=>{
                return <div class='open-link-text'>{x}</div>
              })
                
            )
          }else{
            return <span class='open-link-text' > {scope.row.prCode} </span>
          }
        },
        emit: 'go-prCode'
      },
      {
        value: 9,
        prop: 'supplieName',
        label: '推荐供应商',
        i18n: 'TUIJIANGONGYINGSHANG',
        width: 190,
        customRender: (h, scope) => {
          return (
            scope.row.quoteList.map(x=>{
              return <div>{x.supplieName}</div> 
            })
          )
        }
      },
      {
        value: 10,
        prop: 'auditType',
        label: '审计类型',
        i18n: 'SHENJILEIXING',
       
      },
      
      
  ]