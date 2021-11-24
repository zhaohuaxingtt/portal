// import meeting from "./RouterMeeting";

// const roleMap = {
//   90: "admin",
//   91: "meeting_admin",
//   92: "attendee",
//   93: "admin",
//   94: "meeting_admin",
//   95: "attendee",
//   300: "admin",
//   301: "meeting_admin",
//   302: "attendee",
// };
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default [
  // {
  //   path: "/manage",
  //   name: "manage",
  //   component: () => import("@/views/manage/index.vue"),
  //   children: [...meeting],
  // },
  {
    path: '/meeting/type',
    name: 'meetingType',
    meta: {
      title: '会议类型管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MEETING_TYPE']
    },
    component: () => import('@/views/meeting/type/index.vue'),
    beforeEnter: (to, from, next) => {
      // if (to.query.userId) {
      //   sessionStorage.setItem("userId", to.query.userId);
      //   // localStorage.setItem('userId', to.query.userId);
      //   localStorage.setItem("isAdmin", roleMap[to.query.userId] === "admin");
      //   localStorage.setItem(
      //     "isMA",
      //     roleMap[to.query.userId] === "meeting_admin"
      //   );
      //   localStorage.setItem("isAtte", roleMap[to.query.userId] === "attendee");
      //   if (
      //     roleMap[to.query.userId] === "attendee" ||
      //     roleMap[to.query.userId] === "meeting_admin"
      //   ) {
      //     next("/");
      //   } else {
      //     next();
      //   }
      // } else {
      //   if (JSON.parse(localStorage.getItem("isAdmin"))) {
      //     next();
      //   } else {
      //     next(false); // 禁止跳转
      //   }
      // }
      // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // const roleList = store.state.permission.userInfo.roleList;
      // const userId = store.state.permission.userInfo.id;
      const roleList = userInfo.roleList
      const userId = userInfo.id
      localStorage.setItem('isAdmin', false)
      localStorage.setItem('isMA', false)
      localStorage.setItem('isAtte', false)
      // console.log(store.state.permission.userInfo.roleList);
      if (userId) {
        sessionStorage.setItem('userId', userId)
        for (let role of roleList) {
          switch (role.fullNameZh) {
            case 'admin':
              localStorage.setItem('isAdmin', true)
              break
            case 'meeting_admin':
              localStorage.setItem('isMA', true)
              break
            case 'attendee':
              localStorage.setItem('isAtte', true)
              break
            default:
              break
          }
        }
        if (localStorage.getItem('isMA') || localStorage.getItem('isAtte')) {
          // console.log("type",1);
          // next("/");
          next()
        } else {
          // console.log("type",2);
          next()
        }
      } else {
        if (JSON.parse(localStorage.getItem('isAdmin'))) {
          // console.log("type",3);
          next()
        } else {
          // console.log("type",4);
          next(false) // 禁止跳转
        }
      }
    }
  },
  {
    path: '/meeting/details',
    name: 'meetingDetails',
    meta: {
      title: '会议详情管理'
    },
    component: () => import('@/views/meeting/details/index.vue')
  },
  {
    path: '/meeting/specialDetails',
    name: 'meetingSpecialDetails',
    meta: {
      title: '会议详情管理'
    },
    component: () => import('@/views/meeting/specialDetails/index.vue')
  },
  {
    path: '/meeting/same-screen',
    name: 'sameScreen',
    meta: {
      title: '会议同屏'
    },
    component: () => import('@/views/meeting/sameScreen/index.vue')
  },
  {
    path: '/meeting/meeting-same-screen',
    name: 'meetingSameScreen',
    meta: {
      title: '新会议同屏'
    },
    component: () => import('@/views/meeting/meetingSameScreen/index.vue')
  },
  {
    path: '/meeting/meeting-show',
    name: 'meetingShow',
    meta: {
      title: '会议展示'
    },
    component: () => import('@/views/meeting/meetingShow/index.vue')
  }
]
