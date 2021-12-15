/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-15 10:41:28
 * @Descripttion: your project
 */
export const tabRouterList = [
  {
    value: 1,
    name: '管理大厅',
    url:'/meeting/home',
    key: '管理大厅',
  },
  // {
  //   value: 2,
  //   name: '通用会议',
  //   url: '/meeting/type',
  //   activePath: '/meeting/type',
  //   key: '通用会议',
  // },
  // {
  //   value: 3,
  //   name: '生产会议采购',
  //   url:'/meeting/home',
  //   key: '生产会议采购',
  // },
  // {
  //   value: 4,
  //   name: '一般会议采购',
  //   url:'/meeting/home',
  //   key: '一般会议采购',
  // },
];

export const meetingButtonList = [
  {
    value: 1,
    name: '会议列表',
    url:'/meeting/home',
    activePath: '/meeting/home',
    key: '会议列表',
  },
  {
    value: 2,
    name: '与会人列表',
    url:'/meeting/participants',
    activePath: '/meeting/participants',
    key: '与会人列表',
  },
  {
    value: 3,
    name: '会议信息',
    url: '/meeting/information',
    activePath: '/meeting/information',
    key: '会议信息',
  },
]
// 新添加管理大厅
export const meetingRightList = [
  {
    value: 1,
    name: '会议列表',
    url:'/meeting/managementHall/meetingListCurrent',
    activePath: '/meeting/managementHall/meetingListCurrent',
    key: '会议列表',
  },
  {
    value: 2,
    name: '与会人列表',
    url:'/meeting/managementHall/meetingListAttendees',
    activePath: '/meeting/managementHall/meetingListAttendees',
    key: '与会人列表',
  },
  {
    value: 3,
    name: '会议信息',
    url: '/meeting/managementHall/meetingInformation',
    activePath: '/meeting/managementHall/meetingInformation',
    key: '会议信息',
  },
];
