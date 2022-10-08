/*
 * @Author: wentliao
 * @Date: 2021-12-30 17:49:01
 * @Description: 
 */
export const TAB = [
  // {
  //   value: 1,
  //   group: 1,
  //   name: '概览',
  //   url: "/capacityManagement/overview",
  //   activePath: "/overview",
  //   key: "概览",
  //   permissionName: "评分部门设置"
  // },
  {
    value: 1,
    group: 2,
    name: '报警信',
    url: "/capacityManagement/alarm",
    activePath: "/alarm",
    key: "报警信",
    permissionName: "质量评分预设规则"
  },
  {
    value: 2,
    group: 3,
    name: '产能维护任务',
    url: "/capacityManagement/capacityMaintenanceTask",
    activePath: "/capacityMaintenanceTask",
    key: "产能维护任务",
    permissionName: "定点申请预设逻辑"
  },
  // {
  //   value: 4,
  //   group: 4,
  //   name: '产能需求变动',
  //   url: "/capacityManagement/capacityDemandChange",
  //   activePath: "/capacityDemandChange",
  //   key: "产能需求变动",
  //   permissionName: "零件采购类型规则维护"
  // },
  // {
  //   value: 5,
  //   group: 5,
  //   name: '产能问卷',
  //   url: "/capacityManagement/capacityOfTheQuestionnaire",
  //   activePath: "/capacityOfTheQuestionnaire",
  //   key: "产能问卷",
  //   permissionName: "零件采购类型规则维护"
  // },
  // {
  //   value: 6,
  //   group: 6,
  //   name: 'BKM会议',
  //   url: "/capacityManagement/bkmMeeting",
  //   activePath: "/bkmMeeting",
  //   key: "BKM会议",
  //   permissionName: "零件采购类型规则维护"
  // },
]

export const subNav = [
  {
    value: 1,
    group: 2,
    name: '报警信',
    url: "/capacityManagement/alarm/toBeSent",
    activePath: "/toBeSent",
    key: "报警信",
    permissionName: ""
  },
  {
    value: 2,
    group: 2,
    name: '待反馈报警信',
    url: "/capacityManagement/alarm/sent",
    activePath: "/sent",
    key: "待反馈报警信",
    permissionName: ""
  },
]