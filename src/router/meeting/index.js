import meeting from './meeting'

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default [
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/meeting/layout.vue'),
    children: [...meeting]
  },
  {
    path: '/meeting/type',
    name: 'meetingType',
    meta: {
      title: '会议类型管理'
    },
    component: () => import(`@/views/meeting/type/index.vue`),
    beforeEnter: (to, from, next) => {
      const roleList = userInfo.roleList
      const userId = userInfo.id
      localStorage.setItem('isAdmin', false)
      localStorage.setItem('isMA', false)
      localStorage.setItem('isAtte', false)
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
    component: () => import(`@/views/meeting/details/index.vue`)
  },
  {
    path: "/meeting/specialDetails",
    name: "meetingSpecialDetails",
    meta: {
      title: "会议详情管理",
    },
    component: () => import(`@/views/meeting/specialDetails/index.vue`),
  },
  {
    path: '/meeting/same-screen',
    name: 'sameScreen',
    meta: {
      title: '会议同屏'
    },
    component: () => import(`@/views/meeting/sameScreen/index.vue`)
  },
  {
    path: "/meeting/meeting-same-screen",
    name: "meetingSameScreen",
    meta: {
      title: "新会议同屏",
    },
    component: () => import(`@/views/meeting/meetingSameScreen/index.vue`),
  },
  {
    path: '/meeting/meeting-show',
    name: 'meetingShow',
    meta: {
      title: '会议展示'
    },
    component: () => import(`@/views/meeting/meetingShow/index.vue`)
  }
]
