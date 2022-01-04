export const triggerApproval = [
  {
    value: 1,
    label: '是',
    i18n: 'MT_SHI'
  },
  {
    value: 0,
    label: '否',
    i18n: 'MT_FOU'
  }
]

// export const baseRules = {
//   name: [
//     { required: true, message: "必填", trigger: "blur" },
//     { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
//   ],
//   meetingNameSuffix: [
//     { required: true, message: "必填", trigger: "blur" },
//     { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
//   ],
//   meetingInfoDesc: [
//     { max: 255, message: "最大长度 255 字符", trigger: "blur" },
//   ],
//   duration: [
//     { required: true, message: "必填", trigger: "blur" },
//     {
//       type: "number",
//       message: "最大长度3位，单位（分钟），必须正整数",
//       trigger: "blur",
//     },
//     {
//       type: "number",
//       message: "最大长度3位，单位（分钟），必须正整数",
//       trigger: "blur",
//       transform(value) {
//         if (value !== null && value !== "") {
//           if (
//             String(value).trim() === "" ||
//             Number(value) <= 0 ||
//             Number(value) >= 1000
//           ) {
//             return false;
//           } else if (
//             String(value).indexOf(".") !== -1 ||
//             String(value).indexOf("-") !== -1
//           ) {
//             return false;
//           } else {
//             return Number(value);
//           }
//         } else {
//           return null;
//         }
//       },
//     },
//   ],
//   coverImage: [
//     {
//       required: true,
//       message:
//         "必填",
//       trigger: "change",
//     },
//   ],
//   // approvalProcessId: [{ required: true, message: "必选", trigger: "change" }],
//   isTriggerApproval: [{ required: true, message: "必选", trigger: "change" }],
// };

export const tableColumns = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    i18n: 'MT_XUHAO3',
    width: 69,
    tooltip: false
  },
  {
    prop: 'name',
    label: '类型名称',
    i18n: 'MT_LEIXINGMINGCHENG',
    align: 'left',
    emit: 'go-detail',
    customRender: (h, scope) => {
      return (
        <span
          class="open-link-text cursor"
          style="overflow:hidden text-overflow:ellipsis white-space:nowrap"
        >
          {scope.row.name}
        </span>
      )
    },
    tooltip: false
  },
  {
    prop: 'meetingInfoDesc',
    label: '会议信息描述',
    i18n: 'MT_HUIYIXINXIMIAOSHU',
    align: 'left',
    tooltip: true
  },
  {
    prop: 'meetingNameSuffix',
    label: '生成会议名称后缀',
    i18n: 'MT_SHENGCHENGHUIYIMINGCHENGHOUZHUI',
    align: 'left',
    tooltip: true
  },
  {
    prop: 'duration',
    label: '默认议题时长',
    i18n: 'MT_MORENYITISHICHANG',
    width: 163,
    tooltip: false
  },
  {
    prop: 'isTriggerApproval',
    label: '是否触发审批流',
    i18n: 'MT_SHIFOUCHUFASHENPILIU',
    width: 163,
    tooltip: false,
    customRender: (h, scope) => {
      return <span>{scope.row.isTriggerApproval ? '是' : '否'}</span>
    }
  }
]

//会议类型管理列表入参
export const searchForm = {
  name: '',
  meetingInfoDesc: '',
  isTriggerApproval: ''
}
