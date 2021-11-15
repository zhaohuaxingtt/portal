/*
 * @Author: moxuan
 * @Date: 2021-05-21 20:08:08
 * @Description: 初步评级
 */
import dayjs from '@/utils/dayjs.js';

export const tableListColumns = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "index",
    width: 50,
    label: "序号",
  },
  {
    prop: "positionCode",
    // i18n: "APPROVAL.POSITION_CODE",
    label: "会议名称",
    customRender: (h, scope) => {
      return <span class='open-link-text'>{scope.row.positionCode}</span>
    },
  },
  {
    prop: "positionName",
    // i18n: "APPROVAL.POSITION_NAME",
    label: "会议类型",
  },
  {
    prop: "positionUser",
    // i18n: "APPROVAL.POSITION_USER",
    label: "会议状态",
    customRender: (h, scope) => {
      return <span class='open-link-text'>{scope.row.positionUser}</span>
    },
  },
  {
    prop: "positionUser",
    label: "会议地点",
  },
  {
    prop: "positionUser",
    label: "会议日期",
  },
  {
    prop: "positionUser",
    label: "周次",
  },
  {
    prop: "positionUser",
    label: "操作",
    customRender: (h, scope) => {
      return (
        <span>
          <a href='javascript:void(0)'>生成会议纪要</a>｜
          <a href='javascript:void(0)'>上传会议纪要</a>
        </span>
      )
    },
  },
  {
    prop: "positionUser",
    label: "附件",
  },
];

export const tableListData = [
  {
    positionCode: "CSX-1101",
    positionName: "车灯采购经理",
    positionUser: "人员1",
    id: 1,
  },
  {
    positionCode: "CSX-1101",
    positionName: "车灯采购经理",
    positionUser: "人员2，人员3",
    id: 2,
  },
  {
    positionCode: "CSX-1101",
    positionName: "车灯采购经理",
    positionUser: "人员4，人员5",
    id: 3,
  },
];
export const statusList = [
  {
    label: '草稿',
    value: '01',
  },
  {
    label: '开放',
    value: '02',
  },
  {
    label: '锁定',
    value: '03',
  },
  {
    label: '开始',
    value: '04',
  },
  {
    label: '结束',
    value: '05',
  },
  {
    label: '关闭',
    value: '06',
  },
];
export const cycleList = [
  {
    label: '星期一',
    value: 1,
  },
  {
    label: '星期二',
    value: 2,
  },
  {
    label: '星期三',
    value: 3,
  },
  {
    label: '星期四',
    value: 4,
  },
  {
    label: '星期五',
    value: 5,
  },
  {
    label: '星期六',
    value: 6,
  },
  {
    label: '星期日',
    value: 7,
  },
];
export const intervalList = [
  {
    label: '一（周会）',
    value: 1,
  },
  {
    label: '二（双周会）',
    value: 2,
  },
  {
    label: '三',
    value: 3,
  },
  {
    label: '四（月会）',
    value: 4,
  },
  {
    label: '五',
    value: 5,
  },
  {
    label: '六',
    value: 6,
  },
  {
    label: '七',
    value: 7,
  },
  {
    label: '八',
    value: 8,
  },
  {
    label: '九',
    value: 9,
  },
  {
    label: '十',
    value: 10,
  },
  {
    label: '十一',
    value: 11,
  },
  {
    label: '十二（季度会）',
    value: 12,
  },
];
export const statusObj = {
  '01': '草稿',
  '02': '开放',
  '03': '锁定',
  '04': '开始',
  '05': '结束',
  '06': '关闭',
};
export const numToLetter = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  '9': 'I',
  '10': 'J',
  '11': 'K',
  '12': 'L',
  '13': 'M',
  '14': 'N',
  '15': 'O',
  '16': 'P',
  '17': 'Q',
  '18': 'R',
  '19': 'S',
  '20': 'T',
  '21': 'U',
  '22': 'V',
  '23': 'W',
  '24': 'X',
  '25': 'Y',
  '26': 'Z',
};
export const approvalBoolean = [
  {
    value: 'true',
    label: '是',
  },
  {
    value: 'false',
    label: '否',
  },
];

let weekNum = dayjs(dayjs().year()).isoWeeksInYear();
let weekListInit = [];
for (let index = 0; index < weekNum; index++) {
  if (index < 9) {
    weekListInit.push({
      label: 'CW0' + (index + 1) + '/' + weekNum,
      value: index,
    });
  } else {
    weekListInit.push({
      label: 'CW' + (index + 1) + '/' + weekNum,
      value: index,
    });
  }
}
export {weekListInit};

export const baseRules = {
  meetingTypeId: [
    { required: true, message: "请选择会议类型", trigger: "blur" },
  ],
  startDate: [
    { required: true, message: "请选择开始日期", trigger: "change" }
  ],
  endDate: [
    { required: true, message: "请选择结束日期", trigger: "change" }
  ],
  startTime: [
    { required: true, message: "请选择开始时间", trigger: "change" }
  ],
  meetingPlace: [
    { required: true, message: "请输入会议地址", trigger: "blur" },
    { min: 1, max: 255, message: "最大长度255字符", trigger: "blur" },
  ],
  receiverId: [
    { required: true, message: "请选择收件人", trigger: "change" }
  ],
  attendeeId: [
    { required: true, message: "请选择与会人", trigger: "change" }
  ],
  attendee: [
    { required: true, message: "请输入与会人", trigger: "blur" },
    { min: 1, max: 1024, message: "最大长度为1024字符", trigger: "change" }
  ],
};
export const baseRulesMultiple = {
  meetingTypeId: [
    { required: true, message: "请选择会议类型", trigger: "blur" },
  ],
  meetingInterval: [
    { required: true, message: "请选择会议会议间隔", trigger: "change" },
  ],
  startDate: [
    { required: true, message: "请选择开始日期", trigger: "change" }
  ],
  endDate: [
    { required: true, message: "请选择结束日期", trigger: "change" }
  ],
  startTime: [
    { required: true, message: "请选择开始时间", trigger: "change" }
  ],
  meetingPlace: [
    { required: true, message: "请输入会议地址", trigger: "blur" },
    { min: 1, max: 255, message: "最大长度255字符", trigger: "blur" },
  ],
  receiverId: [
    { required: true, message: "请选择收件人", trigger: "change" }
  ],
  attendeeId: [
    { required: true, message: "请选择与会人", trigger: "change" }
  ],
  attendee: [
    { required: true, message: "请输入与会人", trigger: "blur" },
    { min: 1, max: 1024, message: "最大长度为1024字符", trigger: "change" }
  ],
  meetingCycle: [
    { required: true, message: "请选择会议周期", trigger: "change" },
  ],
};
export const baseRulesUpdate = {
  name: [
    { required: true, message: "请输入会议名称！", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度100字符", trigger: "blur" },
  ],
  startDate: [
    { required: true, message: "请选择会议开始日期！", trigger: "change" }
  ],
  startTime: [
    { required: true, message: "请选择会议开始时间！", trigger: "change" }
  ],
  meetingPlace: [
    { required: true, message: "请输入会议地址", trigger: "blur" },
    { min: 1, max: 255, message: "最大长度255字符", trigger: "blur" },
  ],
};
