/*
 * @Author: moxuan
 * @Date: 2021-04-14 17:50:00
 * @LastEditTime: 2022-03-03 18:02:50
 * @LastEditors: YoHo
 * @Description: 历年合作记录
 */


export const tableTitle = [
    {props: 'year', name: 'TO年份', key: 'SUPPLIER_T0'},
    {props: 'cse', name: 'CSE', width: 240},
    {props: 'cseConfirm', name: 'CSE二次件TO', width: 240, key: 'SUPPLIER_CSE2'},
    {props: 'csi', name: 'CSI', width: 240},
    {props: 'csiConfirm', name: 'CSI二次件确认值', width: 240, key: 'SUPPLIER_CSI2'},
    {props: 'csm', name: 'CSM', width: 240},
    {props: 'csmConfirm', name: 'CSM二次件确认值', width: 240, key: 'SUPPLIER_CSM2'},
    {props: 'csp', name: 'CSP', width: 240},
    {props: 'cspConfirm', name: 'CSP二次件确认值', width: 240, key: 'SUPPLIER_CSP2'},
    {props: 'csx', name: 'CSX', width: 240},
    {props: 'csxConfirm', name: 'CSX二次件确认值', width: 240, key: 'SUPPLIER_CSX2'},
    {props: 'css', name: 'CSS', width: 240},
    {props: 'cssConfirm', name: 'CSS二次件确认值', width: 240, key: 'SUPPLIER_CSS2'},
    {props: 'once', name: '一次件TO', key: 'SUPPLIER_YICJIANT0', width: 240},
    {props: 'attach', name: '配附件TO', key: 'SUPPLIER_PEIFUJIANTO', width: 240},
    {props: 'twice', name: '二次件TO', key: 'SUPPLIER_ERCIJIANTO', width: 240},
    {props: 'total', name: '总TO', key: 'SUPPLIER_ZONGTO', width: 240},
    {props: 'bub', name: 'BU-B TO',key: 'SUPPLIER_BUBTO', width: 240}
]
export const projectDescriptionsTableTitle = [
    {props: 'contractCode', name: '合同编号'},
    {props: 'contractRemark', name: '项目描述'},
    {props: 'nominationTotalPrice', name: '定点金额'},
    {props: 'nominationApproveDate', name: '定点时间'},
    {props: 'purchaserName', name: '采购员'}
]