// const roleMap = {
//     90: "admin",
//     91: "meeting_admin",
//     92: "attendee",
//     93: "admin",
//     94: "meeting_admin",
//     95: "attendee",
//     300: "admin",
//     301: "meeting_admin",
//     302: "attendee",
//   };
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  export default [
    {
      path: "/meeting",
      name: "meeting",
      component: () => import("@/views/manage/meeting/index.vue"),
      redirect: "/meeting/home",
      children: [
        {
          path: "/meeting/home",
          name: "meetingHome",
          meta: {
            title: "会议管理",
          },
          component: () => import(`@/views/manage/meeting/home/index.vue`),
          beforeEnter: (to, from, next) => {
            // const roleList = store.state.permission.userInfo.roleList;
            // console.log(roleList);
            // const userId = store.state.permission.userInfo.id;
            const roleList = userInfo.roleList;
            const userId = userInfo.id;
            localStorage.setItem("isAdmin", false);
            localStorage.setItem("isMA", false);
            localStorage.setItem("isAtte", false);
            // console.log(userId, roleList);
            if (userId) {
              sessionStorage.setItem("userId", userId);
              for (let role of roleList) {
                switch (role.fullNameZh) {
                  case "admin":
                    localStorage.setItem("isAdmin", true);
                    break;
                  case "meeting_admin":
                    localStorage.setItem("isMA", true);
                    break;
                  case "attendee":
                    localStorage.setItem("isAtte", true);
                    break;
                  default:
                    break;
                }
              }
              if (
                localStorage.getItem("isAdmin") ||
                localStorage.getItem("isAtte")
              ) {
                // console.log("home", 1.1);
                next();
              } else {
                // console.log("home", 2);
                next();
              }
            } else {
              if (JSON.parse(localStorage.getItem("isMA"))) {
                // console.log("home", 3);
                next();
              } else {
                // console.log("home", 4);
                next(false); // 禁止跳转
              }
            }
            // if (to.query.userId) {
            //   // localStorage.setItem("userId", to.query.userId);
            //   sessionStorage.setItem("userId", to.query.userId);
            //   localStorage.setItem(
            //     "isAdmin",
            //     roleMap[to.query.userId] === "admin"
            //   );
            //   localStorage.setItem(
            //     "isMA",
            //     roleMap[to.query.userId] === "meeting_admin"
            //   );
            //   localStorage.setItem(
            //     "isAtte",
            //     roleMap[to.query.userId] === "attendee"
            //   );
            //   if (
            //     roleMap[to.query.userId] === "attendee" ||
            //     roleMap[to.query.userId] === "admin"
            //   ) {
            //     next("/");
            //   } else {
            //     next();
            //   }
            // } else {
            //   if (JSON.parse(localStorage.getItem("isMA"))) {
            //     next();
            //   } else {
            //     next(false); // 禁止跳转
            //   }
            // }
          },
        },
        {
          path: "/meeting/participants",
          name: "meetingParticipants",
          meta: {
            title: "参会人列表",
          },
          component: () =>
            import(`@/views/manage/meeting/participants/index.vue`),
        },
        {
          path: "/meeting/information",
          name: "meetingHome",
          meta: {
            title: "会议信息",
          },
          component: () => import(`@/views/manage/meeting/information/index.vue`),
        },
      ],
    },
    {
      path: "/meeting/hall",
      name: "meetingHall",
      meta: {
        title: "会议大厅",
      },
      component: () => import(`@/views/manage/meeting/hall/index.vue`),
      beforeEnter: (to, from, next) => {
        // const roleList = store.state.permission.userInfo.roleList;
        // console.log(roleList);
        // const userId = store.state.permission.userInfo.id;
        // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        // const roleList = store.state.permission.userInfo.roleList;
        // const userId = store.state.permission.userInfo.id;
        const roleList = userInfo.roleList;
        const userId = userInfo.id;
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("isMA", false);
        localStorage.setItem("isAtte", false);
        if (userId) {
          // localStorage.setItem("userId", to.query.userId);
          // sessionStorage.setItem("userId", to.query.userId);
          // localStorage.setItem("isAdmin", roleMap[to.query.userId] === "admin");
          // localStorage.setItem(
          //   "isMA",
          //   roleMap[to.query.userId] === "meeting_admin"
          // );
          // localStorage.setItem("isAtte", roleMap[to.query.userId] === "attendee");
          // if (
          //   roleMap[to.query.userId] === "admin" ||
          //   roleMap[to.query.userId] === "meeting_admin"
          // ) {
          //   next("/");
          // } else {
          //   next();
          // }
          sessionStorage.setItem("userId", userId);
          for (let role of roleList) {
            switch (role.fullNameZh) {
              case "admin":
                localStorage.setItem("isAdmin", true);
                break;
              case "meeting_admin":
                localStorage.setItem("isMA", true);
                break;
              case "attendee":
                localStorage.setItem("isAtte", true);
                break;
              default:
                break;
            }
          }
          if (localStorage.getItem("isAdmin") || localStorage.getItem("isMA")) {
            // console.log("hall", 1);
            // next("/");
            next();
          } else {
            // console.log("hall", 2);
            next();
          }
        } else {
          if (JSON.parse(localStorage.getItem("isAtte"))) {
            // console.log("hall", 3);
            next();
          } else {
            // console.log("hall", 4);
            next(false); // 禁止跳转
          }
        }
      },
    },
    // {
    //   path: "/meeting/my-live",
    //   name: "liveMeeting",
    //   component: () => import(`@/views/manage/meeting/myMeeting.vue`),
    //   children: [
    //     {
    //       path: "/meeting/live",
    //       name: "liveMeeting",
    //       meta: {
    //         title: "直播会议",
    //       },
    //       component: () => import(`@/views/manage/meeting/live/index.vue`),
    //     },
    //   ],
    // },
    {
      path: "/meeting/my-meeting",
      name: "nearMeetingBox",
      component: () => import(`@/views/manage/meeting/myMeeting.vue`),
      children: [
        {
          path: "/meeting/near-meeting",
          name: "nearMeeting",
          meta: {
            title: "近期会议",
          },
          component: () => import(`@/views/manage/meeting/nearMeeting/index.vue`),
        },
        {
          path: "/meeting/near-meeting/detail",
          name: "nearMeetingDetail",
          meta: {
            title: "近期会议详情",
          },
          component: () =>
            import(`@/views/manage/meeting/nearMeeting/detail/index.vue`),
        },
        {
          path: "/meeting/live",
          name: "liveMeeting",
          meta: {
            title: "直播会议",
          },
          component: () => import(`@/views/manage/meeting/live/index.vue`),
        },
      ],
    },
    {
      path: "/meeting/near-meeting/more-themens",
      name: "moreThemens",
      meta: {
        title: "更多议题",
      },
      component: () =>
        import(`@/views/manage/meeting/nearMeeting/more/index.vue`),
    },
    {
      path: "/meeting/live/more-themens",
      name: "moreThemens",
      meta: {
        title: "更多议题",
      },
      component: () =>
        import(`@/views/manage/meeting/nearMeeting/more/index.vue`),
    },
    {
      path: "/meeting/meetingShow",
      name: "meetingShow",
      meta: {
        title: "会议展示",
      },
      component: () =>
        import(`@/views/manage/meeting/show/index.vue`),
    },
  ];
  