// csf / commodity 审批界面选项卡
export const navList = [
  {
    value: 1,
    name:'生产采购',
    key:'LK_SHENGCHANCAIGOU',
    permissionKey:'ELECTRONIC_SIGNATURE_PRODUCTION_PURCHASE',
    url: "/electronicSignature/productionpurchase/0",
    activePath: "/electronicSignature/productionpurchase/0",
    permissionName:'生产采购',
  },
  {
    value: 2,
    name:'一般采购',
    key:'LK_YIBANCAIGOU',
    permissionKey:'ELECTRONIC_SIGNATURE_GENERAL_PURCHASE',
    url: "/electronicSignature/productionpurchase/1",
    activePath: "/electronicSignature/productionpurchase/1",
    permissionName:'一般采购',
  },
]

export  const sinatureColumns=[
  {
    type: 'selection',
    width: 50
  },
  {
    prop: "type",
    label: "合同类型",
    i18n: "LK_HETONGLEIXING",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    customRender:(h, scope, column, extraData)=>{
      let contractTypeSelectDatas=extraData.contractTypeSelectDatas
      if(contractTypeSelectDatas!=null&&contractTypeSelectDatas.length>0){
        let item=contractTypeSelectDatas.find(item=>item.code==scope.row.type)

        return <span>{item?.name}</span>
      }
      return <span>{scope.row.type}</span>
    }
  },
  {
    prop: "docTitle",
    label: "合同描述",
    i18n: "LK_HETONGMIAOHSHU",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "docNo",
    label: "编号",
    i18n: "LK_BIANHAO",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    emit: 'open-docNo',
    customRender: (h, scope) => {
      return <el-link type="primary" >{scope.row.docNo}</el-link>
    }
  },
  {
    prop: "supplierName",
    label: "供应商",
    i18n: "LK_GONGYINGSHANG",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "purchaseUserName",
    label: "采购员",
    i18n: "LK_CAIGOUYUAN",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "deptName",
    label: "科室",
    i18n: "LK_KESHI",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },

  {
    prop: "docTypeNo",
    label: "印章类型",
    i18n: "LK_YINZHANGLEIXING",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    customRender:(h, scope, column, extraData)=>{
      let sealtypes=extraData.sealtypes
      if(sealtypes!=null&&sealtypes.length>0){
        let item=sealtypes.find(item=>item.docTypeNo==scope.row.docTypeNo)
        return <span>{item.signName} {item.docTypeNo}</span>
      }
      return  <span>{scope.row?.docTypeNo}</span>
    }
  },
  {
    prop: "signStatus",
    label: "签署状态",
    i18n: "LK_QIANSHUZHUANGTAI",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    customRender:(h, scope, column, extraData)=>{
      let signStatusSelectDatas=extraData.signStatusSelectDatas
      if(signStatusSelectDatas!=null&&signStatusSelectDatas.length>0){
        let item=signStatusSelectDatas.find(item=>item.code==scope.row.signStatus)
        return <span>{item?.name}</span>
      }
      return <span>{scope.row.signStatus}</span>
    }
  },
  {
    prop: "option",
    label: "操作",
    i18n: "LK_CAOZUO",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    emit: 'open-page',
    customRender: (h, scope) => {
      return <el-link type="primary" >查看</el-link>
    }
  },
]