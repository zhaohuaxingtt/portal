export default [
  {
    path: "/capacityManagement",
    meta: {
      title: "产能管理",
      activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
    },
    component: () => import("@/views/capacityManagement"),
    redirect: "/capacityManagement/overview",
    children: [
      {
        path: "overview",
        name: "overview",
        meta: {
          title: "概览",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/overview"),
      },
      {
        path: "alarm",
        name: "alarm",
        meta: {
          title: "报警信",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/alarm"),
        redirect: "alarm/alarmList",
        children: [
          {
            path: "alarmList",
            name: "alarmList",
            meta: {
              title: "报警信",
              activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
            },
            component: () => import("@/views/capacityManagement/alarm/alarmList"),
          }, {
            path: "waitingFeedback",
            name: "waitingFeedback",
            meta: {
              title: "待反馈报警信",
              activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
            },
            component: () => import("@/views/capacityManagement/alarm/waitingFeedback"),
          }
        ]
      },
      {
        path: "capacityMaintenanceTask",
        name: "capacityMaintenanceTask",
        meta: {
          title: "产能维护任务",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/capacityMaintenanceTask"),
      },
      {
        path: "capacityDemandChange",
        name: "capacityDemandChange",
        meta: {
          title: "产能需求变动",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/capacityDemandChange"),
      },
      {
        path: "capacityOfTheQuestionnaire",
        name: "capacityOfTheQuestionnaire",
        meta: {
          title: "产能问卷",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/capacityOfTheQuestionnaire"),
      },
      {
        path: "bkmMeeting",
        name: "bkmMeeting",
        meta: {
          title: "BKM会议",
          activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
        },
        component: () => import("@/views/capacityManagement/bkmMeeting"),
      },
    ]
  },
  {
    path: "capacityManagement/alarmLetter",
    name: "alarmLetter",
    meta: {
      title: "报警信详情",
      activeMenu: ['RISE_COMMON_FUNCTION', 'BACKSTAGEMANAGEMENT']
    },
    component: () => import("@/views/capacityManagement/alarmLetter"),
  },
]