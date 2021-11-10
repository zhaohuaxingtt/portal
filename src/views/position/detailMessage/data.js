// 组织列表Table配置


//orgId  orgName  orgShortName  orgShortShortNickName  orgOwner orgMark
import Iselect from "./components/index.vue"
 

export const tableSetting = [
    {
      prop: 'roleNumber',
      label: '编号',
      key: '',
      width: '100px',
      tooltip: false,
      align: 'center',
    },
    {
      prop: 'roleId',
      label: '角色ID',
      key: '',
      tooltip: false,
      align: 'center',
      emit: 'go-detail',
    },
    {
      prop: 'roleCode',
      label: '角色代码',
      align: 'center',
      color:"#1763f7",
      key: '',
      tooltip: false,
      customRender: (h, scope) => {
        return <u class='open-link-text'>{scope.row.roleCode}</u>
      },
    },
    {
      prop: 'roleName',
      label: '角色名称',
      align: 'center',
      key: '',
      tooltip: false,
    },
    {
      prop: 'roleDescribe',
      label: '描述',
      align: 'center',
      key: '',
      tooltip: false,
    },
]

export const custmerTable=[
  {
    prop: 'codeNum',
    label: '编号',
    key: '',
    width: '100px',
    tooltip: false,
    align: 'center',
  },
  {
    prop: 'cusNum',
    label: '员工号',
    key: '',
    tooltip: false,
    align: 'center',
    color:"#1763f7",
    customRender: (h, scope) => {
      return <u class='open-link-text'>{scope.row.cusNum}</u>
    },
  },
  { 
    prop: 'cusName',
    label: '姓名',
    align: 'center',
    color:"#1763f7",
    key: '',
    tooltip: false,
  },
  {
    prop: 'department',
    label: '所属部门',
    align: 'center',
    key: '',
    tooltip: false,
  },
  {
    prop: 'smartPhone',
    label: '手机',
    align: 'center',
    key: '',
    tooltip: false,
  },
  {
    prop: 'phoneNumber',
    label: '电话',
    align: 'center',
    key: '',
    tooltip: false,
  },
]

export const basicTable = [
  {
    prop: 'basicNum',
    label: '序号',
    width: '100px',
    align: 'center',
    key: '',
    tooltip: false,
  },
  {
    prop: 'dimension',
    label: '维度',
    width: '200px',
    align: 'left',
    color:'#41434A',
    key: '',
    tooltip: false,
  },
  {
    prop: 'basicCon',
    label: '内容',
    align: 'left',
    color:'#41434A',
    key: '',
    tooltip: false,
    customRender: (h, scope, column, extraData) => {
      return <Iselect options={extraData[scope.row.dimension]} value1= {scope.row.basicCon}></Iselect>
    },
  },
] 