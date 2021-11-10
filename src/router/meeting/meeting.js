const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default [
    {
        path: '/meeting',
        name: 'meeting',
        component: () => import('@/views/meeting/index.vue'),
        redirect: '/meeting/home',
        children: [
            {
                path: '/meeting/home',
                name: 'meetingHome',
                meta: {
                    title: '会议管理'
                },
                component: () => import(`@/views/meeting/home/index.vue`),
                beforeEnter: (to, from, next) => {
                    // const roleList = store.state.permission.userInfo.roleList;
                    // console.log(roleList);
                    // const userId = store.state.permission.userInfo.id;
                    const roleList = userInfo.roleList
                    const userId = userInfo.id
                    localStorage.setItem('isAdmin', false)
                    localStorage.setItem('isMA', false)
                    localStorage.setItem('isAtte', false)
                    // console.log(userId, roleList);
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
                        if (
                            localStorage.getItem('isAdmin') ||
                            localStorage.getItem('isAtte')
                        ) {
                            // console.log("home", 1.1);
                            next()
                        } else {
                            // console.log("home", 2);
                            next()
                        }
                    } else {
                        if (JSON.parse(localStorage.getItem('isMA'))) {
                            // console.log("home", 3);
                            next()
                        } else {
                            // console.log("home", 4);
                            next(false) // 禁止跳转
                        }
                    }
                }
            },
            {
                path: '/meeting/participants',
                name: 'meetingParticipants',
                meta: {
                    title: '参会人列表'
                },
                component: () => import(`@/views/meeting/participants/index.vue`)
            },
            {
                path: '/meeting/information',
                name: 'meetingHome',
                meta: {
                    title: '会议信息'
                },
                component: () => import(`@/views/meeting/information/index.vue`)
            }
        ]
    },
    {
        path: '/meeting/hall',
        name: 'meetingHall',
        meta: {
            title: '会议大厅'
        },
        component: () => import(`@/views/meeting/hall/index.vue`),
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
                if (localStorage.getItem('isAdmin') || localStorage.getItem('isMA')) {
                    next()
                } else {
                    next()
                }
            } else {
                if (JSON.parse(localStorage.getItem('isAtte'))) {
                    next()
                } else {
                    next(false)
                }
            }
        }
    },
    {
        path: '/meeting/my-meeting',
        name: 'nearMeetingBox',
        component: () => import(`@/views/meeting/myMeeting.vue`),
        children: [
            {
                path: '/meeting/near-meeting',
                name: 'nearMeeting',
                meta: {
                    title: '近期会议'
                },
                component: () => import(`@/views/meeting/nearMeeting/index.vue`)
            },
            {
                path: '/meeting/near-meeting/detail',
                name: 'nearMeetingDetail',
                meta: {
                    title: '近期会议详情'
                },
                component: () => import(`@/views/meeting/nearMeeting/detail/index.vue`)
            },
            {
                path: '/meeting/live',
                name: 'liveMeeting',
                meta: {
                    title: '直播会议'
                },
                component: () => import(`@/views/meeting/live/index.vue`)
            }
        ]
    },
    {
        path: '/meeting/near-meeting/more-themens',
        name: 'moreThemens',
        meta: {
            title: '更多议题'
        },
        component: () => import(`@/views/meeting/nearMeeting/more/index.vue`)
    },
    {
        path: '/meeting/live/more-themens',
        name: 'moreThemens',
        meta: {
            title: '更多议题'
        },
        component: () => import(`@/views/meeting/nearMeeting/more/index.vue`)
    },
    {
        path: "/meeting/meetingShow",
        name: "meetingShow",
        meta: {
            title: "会议展示",
        },
        component: () =>
            import(`@/views/meeting/show/index.vue`),
    },
]
