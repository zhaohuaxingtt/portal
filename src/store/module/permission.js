/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-25 23:20:12
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息保存。
 * @FilePath: \rise\src\store\module\permission.js
 */
import { getSystemMeun, getUserInfoByToken } from '@/api/usercenter'
import { getMenuResource } from '@/utils/auth'
import { getModuleList } from '@/api/home'

//初始化菜单，新增active字段和默认选中第一个点亮
function initMeun(data) {
  data.forEach((items, index) => {
    if (index === 0) {
      items['active'] = true
    } else {
      items['active'] = false
    }
  })
  return data
}

function getColumnConfig(data) {
  data = data || []
  const configs = {}
  for (let i = 0; i < data.length; i++) {
    const dataItem = JSON.parse(data[i])
    for (const key in dataItem) {
      if (Object.hasOwnProperty.call(dataItem, key)) {
        const item = dataItem[key]
        configs[key] = configs[key] || { unCols: [] }
        if (item.unCols && item.unCols.length) {
          configs[key].unCols = [
            ...new Set([...configs[key].unCols, ...item.unCols])
          ]
        }
      }
    }
  }
  const res = {}
  for (const key in configs) {
    if (Object.hasOwnProperty.call(configs, key)) {
      const element = configs[key]
      if (element.unCols.length) {
        res[key] = element
      }
    }
  }
  return res
}

/* function getEklCardHeader(roleList, deptNum) {
  const deptName = deptNum
  let eklHeader = []
  let eklPfjHeader = []
  if (roleList.length == 1) {
    const Linie = roleList.some((item) => item.code == 'LINIE')
    const zycgkzORkzzl = roleList.some(
      (item) =>
        item.code == 'ZYCGKZ' ||
        item.code == 'WS2ZYCGKZ' ||
        item.code == 'ZYCGKSXTY'
    )
    const zycgkz = roleList.some(
      (item) => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ'
    )
    const kzzl = roleList.some(
      (item) => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY'
    )
    // const zycgbzORbzzl = this.roleList.some(item => item.code == 'BZZL' || item.code == 'CGBZ')
    const zycgbzORbzzl = roleList.some(
      (item) =>
        item.code == 'BZZL' || item.code == 'CGBZ' || item.code == 'CSXTGLY'
    )
    const zycgbz = roleList.some((item) => item.code == 'CGBZ')
    const bzzl = roleList.some((item) => item.code == 'BZZL')
    const zycggz = roleList.some(
      (item) => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ'
    )
    const CGBZ_WF = roleList.some((item) => item.code == 'CGBZ_WF')
    const ZYCGKZ_WF = roleList.some((item) => item.code == 'ZYCGKZ_WF')
    const PFJYJGLY = roleList.some((item) => item.code == 'PFJYJGLY')
    if (PFJYJGLY) {
      //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
      //            this.btnsgroup1 = ['CS(Spare)']
    } else if (Linie) {
      // 采购员 采购员视觉
      // this.username = this.$store.state.permission.userInfo.id;
      eklHeader = ['Linie']
      eklPfjHeader = ['Linie(Spare)']
    } else if (zycgkzORkzzl) {
      // 采购科长||科长助理 科室视觉
      if (zycgkz) {
        eklHeader = ['CSM']
        eklPfjHeader = ['CSM(Spare)']
      }
      if (kzzl) {
        eklHeader = [deptName]
        eklPfjHeader = [`${deptName}(Spare)`]
      }
    } else if (zycgbzORbzzl) {
      // 采购部长||部长助理 部门视觉
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = ['CS', 'CS(Spare)']
      eklHeader = ['CS']
      eklPfjHeader = [`CS(Spare)`]
    } else if (zycggz) {
      // 采购股长 股视觉
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
      eklHeader = [deptName]
      eklPfjHeader = [`${deptName}(Spare)`]
      return deptName
    } else if (CGBZ_WF) {
      this.btnsgroup1 = ['CS', 'CS(Spare)']
      eklHeader = ['CS']
      eklPfjHeader = [`CS(Spare)`]
    } else if (ZYCGKZ_WF) {
      eklHeader = ['CSM']
      eklPfjHeader = [`CSM(Spare)`]
    }
  } else {
    const Linie = roleList.some((item) => item.code == 'LINIE') // 采购员
    const KZ = roleList.some(
      (item) => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ'
    ) // 科长
    const KZZL = roleList.some(
      (item) => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY'
    ) // 科长助理
    const BZ = roleList.some((item) => item.code == 'CGBZ') // 部长
    const BZZL = roleList.some((item) => item.code == 'BZZL') // 部长助理
    const GZ = roleList.some(
      (item) => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ'
    ) // 股长
    const PFJYJGLY = roleList.some((item) => item.code == 'PFJYJGLY')
    const CSXTGLY = roleList.some((item) => item.code == 'CSXTGLY') // cs系统管理员
    if (PFJYJGLY) {
      //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
      //            this.btnsgroup1 = ['CS(Spare)']
    } else if (KZ && Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = ['CSM', 'CSM(Spare)']
      eklHeader = ['CSM']
      eklPfjHeader = [`CSM(Spare)`]
    } else if (KZ && !Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
      eklHeader = [deptName]
      eklPfjHeader = [`${deptName}(Spare)`]
    } else if (KZZL && Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
      eklHeader = [deptName, 'Linie']
      eklPfjHeader = [`${deptName}(Spare)`, 'Linie(Spare)']
    } else if (KZZL && !Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      //this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
      eklHeader = [deptName]
      eklPfjHeader = [`${deptName}(Spare)`]
    } else if ((BZ && Linie) || (BZ && !Linie) || (BZZL && !Linie)) {
      // this.btnsgroup1 = ['CS', 'CS(Spare)']
      eklHeader = ['CS']
      eklPfjHeader = [`CS(Spare)`]
    } else if (BZZL && Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = ['CS', 'CS(Spare)', 'Linie', 'Linie(Spare)']
      eklHeader = ['CS', 'Linie']
      eklPfjHeader = ['CS(Spare)', 'Linie(Spare)']
    } else if (GZ && Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
      eklHeader = [deptName, 'Linie']
      eklPfjHeader = [`${deptName}(Spare)`, 'Linie(Spare)']
    } else if (GZ && !Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
      eklHeader = [deptName]
      eklPfjHeader = [`${deptName}(Spare)`]
      return deptName
    } else if (Linie) {
      // this.username = this.$store.state.permission.userInfo.id;
      // this.btnsgroup1 = ['Linie', 'Linie(Spare)']
      eklHeader = ['Linie']
      eklPfjHeader = ['Linie(Spare)']
    } else if (CSXTGLY) {
      eklHeader = ['CS']
      eklPfjHeader = ['CS(Spare)']
    }
  }
  return { eklHeader, eklPfjHeader }
} */

const state = {
  menuList: [],
  vueRouter: [],
  //系统登录用户信息。存入store，前台不存储用户的敏感信息。
  roleList: '',
  code: [],
  eklTabList: [],
  eklPfjTabList: [],
  leadTabList: [],
  whiteBtnList: {},
  userInfo: {},
  isLeader: false,
  cardList: [],
  currentMenu: {},
  language: 'zh'
}
const mutations = {
  SET_LANGUAGE(state, data) {
    if (data) {
      localStorage.setItem('lang', data)
      state.language = data
    }
  },
  SET_MENU_LIST(state, data) {
    state.menuList = data
  },
  SET_VUE_ROUTER(state, data) {
    state.vueRouter = data
  },
  SET_USER_INFO(state, data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data))
    state.userInfo = data
  },
  SET_ROLE_INFO(state, data) {
    state.roleList = data
  },
  SET_ROLE_CODE(state, data) {
    state.code = data.map((item) => item.code)
  },
  SET_ROLE_EklTabList(state, data) {
    state.eklTabList = []
    state.eklPfjTabList = []
    let cs = 0
    data.forEach((item, index) => {
      if (
        item.code === 'BZZL' ||
        item.code === 'CIXTGLY' ||
        item.code === 'CGBZ_WF' ||
        (item.code === 'CGBZ' && cs < 1)
      ) {
        cs += 1
        //ekl
        state.eklTabList.push({
          name: 'EKL-CS',
          id: index,
          type: 1
        })
        //ekl配附件
        state.eklPfjTabList.push({
          name: 'CS(Spare)',
          id: index,
          type: 1
        })
      } else if (item.code === 'ADMIN') {
        //ekl
        state.eklTabList.push({
          name: 'EKL-CS',
          id: index,
          type: 1
        })
      } else if (
        [
          'PFJYJGLY',
          'CGKZKZ',
          'PJCGGZ',
          'FJCGGZ',
          'CSXTGLY',
          'CIXTGLY'
        ].includes(item.code)
      ) {
        //ekl配附件
        state.eklPfjTabList.push({
          name: 'CS(Spare)',
          id: index,
          type: 1
        })
        state.eklTabList.push({
          name: 'CS',
          id: index,
          type: 1
        })
      } else if (item.code === 'CWEKLGLY') {
        state.eklTabList.push({
          name: 'EKL-CFPM',
          id: index,
          type: 1
        })
        state.eklTabList.push({
          name: 'EKL-CFPM-1',
          id: data.length,
          type: 1
        })
      } else if (item.code == 'ZYCGKSXTDY') {
        const parentDeptList = data.parentDeptList || []
        parentDeptList.map((item) => {
          if (item.grade === 3) {
            state.eklTabList.push({
              name: `EKL-${item.fullCode}`,
              id: index,
              type: 2
            })
          }
        })
      } else if (
        item.code == 'ZYCGKSXTY' ||
        // item.code == 'ZYCGKSXTDY' ||
        item.code == 'WS2ZYCGKZ'
      ) {
        state.eklTabList.push({
          name: `EKL-${item.fullNameZh}`,
          id: index,
          type: 2
        })
      } else if (item.code === 'LINIE') {
        //ekl
        state.eklTabList.push({
          name: 'EKL-Linie',
          id: index,
          type: 4
        })
        //ekl配附件
        state.eklPfjTabList.push({
          name: 'Linie(Spare)',
          id: index,
          type: 4
        })
      } else if (item.code === 'WS2ZYCGGZ') {
        state.eklTabList.push({
          name: `EKL-${item.fullNameZh}`,
          id: index,
          type: 3
        })
      }
    })
  },
  SET_ROLE_EklTabList_LEAD(state, data) {
    state.leadTabList = data
  },
  SET_WIHTEBTN_LIST(state, data) {
    state.whiteBtnList = data
  },
  SET_IS_LEADER(state, data) {
    state.isLeader = data
  },
  SET_CARD_LIST(state, data) {
    sessionStorage.setItem('cardList', JSON.stringify(data))
    state.cardList = data
  },
  SET_CURRENT_MENU(state, data) {
    state.currentMenu = data
  },
  SET_MODULES(state, data) {
    sessionStorage.setItem('cardList', JSON.stringify(data))
    state.cardList = data
  },
  SET_COLUMN_CONFIG(state, data) {
    sessionStorage.setItem('columnConfig', JSON.stringify(data))
    state.columnConfig = data
  }
}

const actions = {
  // 通过异步方式获取菜单。
  getPermissinInfo({ commit }) {
    return new Promise((r, j) => {
      getSystemMeun()
        .then((res) => {
          if (res.code === '200' && res.data) {
            const menuList = res.data?.menuList || []
            commit('SET_MENU_LIST', initMeun(menuList))
            const menuResource = getMenuResource(menuList)
            const resourceList = res.data?.resourceList || {}
            commit('SET_WIHTEBTN_LIST', {
              ...resourceList,
              ...menuResource
            })
            // 列权限
            const columnConfigStr = res.data?.columnConfig || []
            const columnConfig = getColumnConfig(columnConfigStr)
            commit('SET_COLUMN_CONFIG', columnConfig)
            r(menuList)
          } else {
            commit('SET_MENU_LIST', [])
            commit('SET_WIHTEBTN_LIST', {})
            j()
          }
        })
        .catch(() => {
          commit('SET_MENU_LIST', [])
          commit('SET_WIHTEBTN_LIST', {})
          j()
        })
    })
  },

  // 通过异步方式获取modules。
  getModules({ commit }) {
    return new Promise((r, j) => {
      getModuleList({})
        .then((res) => {
          if (res.code === '200' && res.data) {
            const cards = res.data || []
            commit('SET_CARD_LIST', cards)
            r(cards)
          } else {
            commit('SET_CARD_LIST', [])
            j()
          }
        })
        .catch(() => {
          commit('SET_CARD_LIST', [])
          j()
        })
    })
  },

  setModules({ commit }, data) {
    commit('SET_MODULES', data)
  },

  userInfoByToken({ commit }) {
    //根据token获取用户信息
    // eslint-disable-next-line no-debugger
    return new Promise((resole, reject) => {
      getUserInfoByToken()
        .then((res) => {
          // eslint-disable-next-line no-debugger
          if (res.code === '200' && res.data) {
            commit('SET_USER_INFO', res.data)
            commit('SET_ROLE_INFO', res.data.userName)
            commit('SET_ROLE_CODE', res.data.roleList || [])
            commit('SET_ROLE_EklTabList', res.data.roleList || [])
            if (
              res.data.deptDTO &&
              res.data.deptDTO.isCommodity &&
              res.data.positionDTO.isDeptLead
            ) {
              commit('SET_ROLE_EklTabList_LEAD', [
                {
                  name: `EKL-${res.data.deptDTO.fullCode}(Spare)`,
                  id: 1,
                  type: 4
                }
              ])
            }
            if (res.data.positionList) {
              let isLeader = false
              for (let i = 0; i < res.data.positionList.length; i++) {
                const element = res.data.positionList[i]
                if (element.isDeptLead) {
                  isLeader = true
                  break
                }
              }
              commit('SET_IS_LEADER', isLeader)
            }

            resole(res.data)
          } else {
            commit('SET_USER_INFO', {})
            commit('SET_ROLE_INFO', {})
            reject({})
          }
        })
        .catch((err) => {
          console.log('permission.err', err)
          commit('SET_USER_INFO', {})
          commit('SET_ROLE_INFO', {})
          reject(err)
        })
    })
  },

  setUserInfo({ commit }, data) {},

  loginOut({ commit }) {},

  refreshToken() {},

  setCurrentMenu({ commit }, data) {
    commit('SET_CURRENT_MENU', data)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
