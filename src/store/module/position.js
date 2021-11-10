// import { tree2Array } from '@/utils/tree2Array'
import {
  getPositionListByParams,
  GetTagsByCatagory,
  GetPositionPermissionList,
  GetRoleList,
  SavePosition,
  GetOrgList,
  DeletePosition,
  GetPositionDetail,
  UpdatePosition
} from '@/api/position'
const tree2Array = data => {
  const result = []
  data.forEach(item => {
    const loop = data => {
      result.push({
        ...data
      })
      let supDeptList = data.supDeptList
      if (supDeptList) {
        for (let i = 0; i < supDeptList.length; i++) {
          loop(supDeptList[i])
        }
      }
    }
    loop(item)
  })
  return result
}
const position = {
  state: {
    org: {
      loading: false,
      queryFlag: false,
      itemSelected: {},
      list: [],
      queryParams: {
        fullCode: '',
        nameZh: ''
      },
      query: [
        {
          label: '组织机构编码',
          key: 'fullCode',
          value: ''
        },
        {
          label: '组织机构名称',
          key: 'nameZh',
          value: ''
        }
      ],
      arrayList: [],
      currentRow: null
    },
    pos: {
      loading: false,
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },

      //---------------- 标签相关 ----------------
      tagsSystem: [
        //系统标签
      ],
      tags: [
        //标签选择页面的所有标签（自定义及系统）
      ],
      tagSelected: [], //选中标签

      //---------------- 维度相关 ----------------
      dimensionOptions: [
        //维度下拉选项
      ],
      dimensionList: [], //维度列表
      dimensionSelected: [], //选中维度列表

      //---------------- 角色相关 ----------------
      roleQuery: [
        {
          label: '角色ID',
          key: 'id',
          value: ''
        },
        {
          label: '角色代码',
          key: 'code',
          value: ''
        },
        {
          label: '角色名称',
          key: 'fullNameZh',
          value: ''
        }
      ],
      roleList: [
        //角色列表modal
      ],
      roleDeling: [], //待删除角色列表
      roleSelected: [], //角色选中detail
      roleSelectedIds: [],

      //---------------- 详情相关 ----------------
      positionDetail: {
        code: '',
        fullNameZh: '',
        fullNameEn: '',
        isDeptLead: '',
        description: '',
        tagList: [],
        roleDTOList: [],
        permissionList: [],
        userList: []
      },
      originPosDetail: {},

      //---------------- 列表相关 ----------------
      // 已经选择的岗位列表
      listSelected: [],
      // 所有岗位列表
      list: [],
      // 岗位 search query
      query: [
        {
          label: '岗位编码',
          key: 'code',
          value: ''
        },
        {
          label: '岗位名称（中）',
          key: 'fullNameZh',
          value: ''
        }
      ]
    },
    sub: {
      positionList: [],
      userOptions: [],
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      deptDetail: {},
      dimensionList: [],
      query: [
        {
          label: '材料组',
          key: 'categoryName',
          value: ''
        },
        {
          label: '人员姓名',
          key: 'userNameZh',
          value: ''
        },
        {
          label: '岗位名称',
          key: 'fullNameZh',
          value: ''
        }
      ]
    }
  },
  mutations: {
    SET_ORGLOADING: (state, data) => {
      state.org.loading = data
    },
    SET_POSLOADING: (state, data) => {
      state.pos.loading = data
    },
    SET_PAGE: (state, data) => {
      state.pos.page = data
    },
    //---------------->> sub ----------------<<

    SET_SUB_POSITION_STATUS: (state, data) => {
      const positionList = state.sub.positionList
      positionList.forEach(item => {
        item.isEdit = data
      })
      state.sub.positionList = positionList
    },

    SET_SUB_PAGE: (state, data) => {
      state.sub.page = data
    },

    /**---------------------------------------------------------------- */

    SET_POSITION_DETAIL: (state, data) => {
      state.pos.positionDetail = _.cloneDeep(data)
      state.pos.originPosDetail = _.cloneDeep(data)
      window.sessionStorage.setItem(
        window.btoa('position_detail'),
        JSON.stringify(state.pos.positionDetail)
      )
    },

    RESET_POSITION_DETAIL: state => {
      state.pos.positionDetail = {
        code: '',
        fullNameZh: '',
        fullNameEn: '',
        isDeptLead: '',
        description: '',
        tagList: [],
        roleDTOList: [],
        permissionList: [],
        userList: []
      }
      state.pos.dimensionSelected = []
      state.pos.dimensionList = []
      state.pos.tagSelected = []
      state.pos.roleSelected = []
      state.pos.roleSelectedIds = []
      state.pos.roleDeling = []
    },

    /**---------------------------------------------------------------- */

    /** 列表页 组织table及岗位table query */
    SET_LIST_QUERY: (state, data) => {
      const type = data.type
      const params = data.params
      if (type) {
        state[type].query = params
      }
    },

    SET_ORG_CURRENT_ROW: (state, data) => {
      state.org.currentRow = data
    },

    SET_ORG_QUERY_FLAG: (state, data) => {
      state.org.queryFlag = data
    },

    SET_ORG_ARRAYLIST: (state, item) => {
      item.map(i => {
        i.fullCode = i.fullCode || ''
        i.nameZh = i.nameZh || ''
      })

      state.org.arrayList = item
    },

    SET_ORG_ARRAYLIST_QUERY: state => {
      state.org.loading = true
      const query = state.org.query
      const list = tree2Array(_.cloneDeep(state.org.list))
      const fullCode = query[0].value
      const nameZh = query[1].value
      const array = list
        .filter(item => {
          return fullCode ? item.fullCode?.includes(fullCode) : item
        })
        .filter(item => {
          return nameZh ? item.nameZh?.includes(nameZh) : item
        })
      state.org.arrayList = array
      state.org.loading = false
    },

    /** 组织/岗位列表*/
    SET_LIST: (state, item) => {
      const type = item.type
      const list = item.list
      if (type) {
        state[type].list = list
      }
    },
    /** 岗位选中列表*/
    SET_SELECTED_LIST_POS: (state, item) => {
      state.pos.listSelected = item
    },
    /** 当前所选组织 */
    SET_CURRENT_ORG: (state, item) => {
      state.org.itemSelected = item
    },

    /**---------------------------------------------------------------- */
    /** dimensionOptions init */
    SET_DIMENSION_OPTIONS: (state, data) => {
      state.pos.dimensionOptions = data
      window.sessionStorage.setItem(
        window.btoa('dimension_options'),
        JSON.stringify(data)
      )
    },

    /** 新增维度 */
    ADD_DIMENSION: (state, item = {}) => {
      state.pos.dimensionList.push(item)
    },
    /** 更改所选维度 */
    SET_DIMENSIONSELECTED: (state, data) => {
      state.pos.dimensionSelected = data
    },
    /** 删除维度 */
    DEL_DIMENSION: state => {
      const dimensionSelected = JSON.parse(
        JSON.stringify(state.pos.dimensionSelected)
      )
      const dimensionList = JSON.parse(JSON.stringify(state.pos.dimensionList))
      for (let i = 0; i < dimensionSelected.length; i++) {
        for (let j = 0; j < dimensionList.length; j++) {
          if (dimensionSelected[i].index === dimensionList[j].index) {
            dimensionList.splice(j, 1)
          }
        }
      }
      state.pos.dimensionList = dimensionList
    },
    /** 更改岗位信息里面的维度 */
    SET_DETAIL_DIMENSION: state => {
      for (let i = 0; i < state.pos.dimensionList.length; i++) {
        state.pos.dimensionList[i].contentList = []
        state.pos.dimensionList[i].dimensionObj = {}
        state.pos.dimensionList[i].content.forEach(c => {
          const itemC = _.filter(
            state.pos.dimensionList[i].contentOptions,
            it => {
              return it.valueId === c
            }
          )[0]
          state.pos.dimensionList[i].contentList.push(itemC)
        })
        const itemD = _.filter(state.pos.dimensionOptions, item => {
          return item.id === state.pos.dimensionList[i].dimension
        })[0]
        state.pos.dimensionList[i].dimensionObj = itemD
      }
      state.pos.positionDetail.permissionList = JSON.parse(
        JSON.stringify(state.pos.dimensionList)
      )
    },

    INIT_DIMENSION_LIST: (state, data) => {
      const temp = _.cloneDeep(state.pos.dimensionOptions)
      _.map(data, item => {
        item.dimension = item.id
        item.content = []

        temp.forEach(i => {
          if (i.id === item.id) {
            item.contentOptions = i.valueList
          }
        })
        _.map(item.valueList, o => {
          item.content.push(o.valueId)
        })
      })
      state.pos.dimensionList = JSON.parse(JSON.stringify(data)) || []
    },

    /**---------------------------------------------------------------- */

    /** 更改岗位信息里面的角色 */
    SET_POSITION_DETAIL_ROLE: state => {
      state.pos.positionDetail.roleDTOList = JSON.parse(
        JSON.stringify(state.pos.roleSelected)
      )
    },
    /** 待删除的roleList */
    SET_ROLE_DEL: (state, data) => {
      state.pos.roleDeling = data
    },
    /** 选中role */
    SET_ROLE_SELECTED: (state, data) => {
      state.pos.roleSelected = data
    },
    SET_ROLEIDS_SELECTED: (state, data) => {
      state.pos.roleSelectedIds = data
    },
    INIT_ROLE_SELECTED: (state, data) => {
      state.pos.roleSelected = data
    },
    INIT_ROLEIDS_SELECTED: (state, data) => {
      state.pos.roleSelectedIds = _.map(data, item => {
        return item.id
      })
    },

    /** 删除所选role */
    DEL_ROLE: state => {
      const roleSelected = state.pos.roleDeling
      const roleList = state.pos.positionDetail.roleDTOList
      for (let i = 0; i < roleSelected.length; i++) {
        for (let j = 0; j < roleList.length; j++) {
          if (roleSelected[i].id === roleList[j].id) {
            roleList.splice(j, 1)
          }
        }
      }
      state.pos.positionDetail.roleDTOList = roleList
      state.pos.roleSelected = roleList
      state.pos.roleSelectedIds = _.map(roleList, item => {
        return item.id
      })
    },
    /** 更新rolelist query */
    SET_ROLELIST_QUERY: (state, data) => {
      state.pos.roleQuery = data
    },

    /** rolelist init */
    SET_ROLELIST: (state, data) => {
      state.pos.roleList = data
      window.sessionStorage.setItem(
        window.btoa('roleList'),
        JSON.stringify(data)
      )
    },

    /**---------------------------------------------------------------- */

    /** 改变所有标签 */
    CHANGE_TAGS: (state, data) => {
      let tags = _.cloneDeep(state.pos.tags)
      if (data.status === 'add') {
        tags.unshift(data)
      } else {
        tags = _.filter(tags, item => {
          return item.name !== data.name
        })
      }
      state.pos.tags = tags
    },
    /** 改变选中标签 */
    CHANGE_TAGS_SELECTED: (state, data) => {
      let tagSelected = JSON.parse(JSON.stringify(state.pos.tagSelected))
      if (data.type === '1') {
        if (data.checked) {
          tagSelected.push(data)
        } else {
          tagSelected = _.filter(tagSelected, item => {
            return item.id !== data.id
          })
        }
      } else {
        if (data.status === 'add') {
          tagSelected.unshift(data)
        } else {
          tagSelected = _.filter(tagSelected, item => {
            return item.name !== data.name
          })
        }
      }
      state.pos.tagSelected = tagSelected
    },
    /** 获取所有tags，包含自定义及系统checked */
    GET_TAGS: state => {
      const posDetail = _.cloneDeep(state.pos.positionDetail)
      const tags_s = _.cloneDeep(state.pos.tagsSystem)

      const tags_1 = _.filter(posDetail?.tagList || [], item => {
        return item.type === '1'
      })

      const tags_2 = _.filter(posDetail?.tagList || [], item => {
        return item.type === '2'
      })

      for (let i = 0; i < tags_s.length; i++) {
        for (let j = 0; j < tags_1.length; j++) {
          if (tags_s[i].id === tags_1[j].id) {
            tags_s[i].checked = true
          }
        }
      }

      state.pos.tags = tags_s.concat(tags_2)
    },
    GET_TAGS_SELECTED: state => {
      //编辑
      const positionDetail = _.cloneDeep(state.pos.positionDetail)
      state.pos.tagSelected = positionDetail?.tagList || []
    },
    /**将选中标签放入detail中 */
    SET_POSITION_TAGS: state => {
      state.pos.positionDetail.tagList = JSON.parse(
        JSON.stringify(state.pos.tagSelected)
      )
    },
    /** tagSystem init */
    SET_TAG_SYSTEM: (state, data) => {
      state.pos.tagsSystem = _.filter(data, item => {
        return item.type === '1'
      })
      window.sessionStorage.setItem(
        window.btoa('position_tags_sys'),
        JSON.stringify(state.pos.tagsSystem)
      )
    }
  },
  actions: {
    /** 通过deptId，positionCode， fullNameZh查找岗位列表 */
    async GetPositionList({ commit }, data) {
      const params = {}
      for (let index in data['params']) {
        params[data['params'][index].key] = data['params'][index].value
      }
      params.deptId = this.state.position.org.itemSelected.id || ''
      params.current = this.state.position.pos.page.currPage
      params.size = this.state.position.pos.page.pageSize
      commit('SET_POSLOADING', true)
      const res = await getPositionListByParams(params)
      commit('SET_POSLOADING', false)
      if (res?.code === '200' && res?.data) {
        const obj = {
          type: 'pos',
          list: res.data
        }
        commit('SET_LIST', obj)
        commit('SET_PAGE', {
          totalCount: res.total, //总条数
          pageSize: res.pageSize, //每页多少条
          pageSizes: [10, 20, 50, 100], //每页条数切换
          currPage: res.pageNum, //当前页
          layout: 'sizes, prev, pager, next, jumper'
        })
      }
    },
    /**批量删除岗位 */
    async DelPositionList() {
      const idList = this.state.position.pos.listSelected
        .filter(item => {
          return !item.userDTOList || !item.userDTOList.length
        })
        .map(item => {
          return item.id
        })
      console.log(idList)
      await DeletePosition(idList)
      const data = {
        type: 'pos',
        params: this.state.position.pos.query
      }
      this.dispatch('GetPositionList', data)
    },

    /*获取系统标签列表 */
    async GetTagsByCategory({ commit }) {
      /** 岗位category = 2 */
      const res = await GetTagsByCatagory({
        category: 2
      })
      if (res?.code === '200' && res?.data) {
        commit('SET_TAG_SYSTEM', res.data)
      }
    },
    /*获取角色列表 */
    async GetRoleList({ commit }) {
      // const params = {}
      // for (let index in data) {
      //   params[data[index].key] = data[index].value
      // }
      // params.deptId = this.state.position.org.itemSelected.deptId || ''
      // console.log('GetRoleList-params', params)
      /** 暂时无入参 */
      const res = await GetRoleList({})
      if (res?.code === '200' && res?.data) {
        commit('SET_ROLELIST', res.data)
      }
    },
    /*获取维度Options */
    async GetPositionPermissionList({ commit }, data) {
      const res = await GetPositionPermissionList({
        deptId: data
      })
      console.log('GetPositionPermissionList', res)

      if (res?.code === '200' && res?.data) {
        const data = res.data
        /* data.push({
          code: 'zhshijiacaigouzu',
          description: '正式价采购组',
          id: 325454,
          name: 'zhshijiacaigouzu',
          url: '',
          valueList: [
            {
              value: 'P10',
              valueId: 'P10'
            }
          ]
        })
        data.push({
          code: 'zanzuojiacaigouzu',
          description: '暂作价采购组',
          id: 23233454,
          name: 'zanzuojiacaigouzu',
          url: '',
          valueList: [
            {
              value: 'PZ1',
              valueId: 'PZ1'
            }
          ]
        })
        data.push({
          code: 'stGroup',
          description: 'ST组',
          id: 45342,
          name: 'stGroup',
          url: '',
          valueList: [
            {
              value: 'PZZ',
              valueId: 'PZZ'
            }
          ]
        }) */
        commit('SET_DIMENSION_OPTIONS', data)
      }
    },
    /** 新建岗位 */
    async SavePosition({ commit }, data) {
      const permissionList = _.cloneDeep(
        this.state.position.pos.positionDetail.permissionList
      )
      const temp = []
      permissionList.forEach(item => {
        let obj = {}
        item.dimensionObj.valueList = item.contentList
        obj = item.dimensionObj
        temp.push(obj)
      })
      const params = {
        code: this.state.position.pos.positionDetail.code,
        description: this.state.position.pos.positionDetail.description,
        fullNameEn: this.state.position.pos.positionDetail.fullNameEn,
        fullNameZh: this.state.position.pos.positionDetail.fullNameZh,
        isDeptLead: this.state.position.pos.positionDetail.isDeptLead,
        tagList: this.state.position.pos.positionDetail.tagList,
        roleDTOList: this.state.position.pos.positionDetail.roleDTOList,
        permissionList: temp,
        deptId: data
      }
      const res = await SavePosition(params)
      return res
    },

    /* 获取组织树 */
    async GetOrgList({ commit }, data) {
      commit('SET_ORGLOADING', true)
      const res = await GetOrgList({})
      commit('SET_ORGLOADING', false)
      if (res?.code === '200' && res?.data) {
        const obj = {
          type: 'org',
          list: res.data
        }
        const arrayList = tree2Array(res.data)
        const params = {
          type: 'pos',
          params: this.state.position.pos.query
        }
        commit('SET_LIST', obj)
        commit(
          'SET_ORG_CURRENT_ROW',
          _.find(arrayList, item => {
            return item.id === parseInt(data)
          })
        )
        commit(
          'SET_CURRENT_ORG',
          _.find(arrayList, item => {
            return item.id === parseInt(data)
          }) || {}
        )
        commit('SET_ORG_ARRAYLIST', arrayList)
        this.state.position.org.currentRow?.id
          ? this.dispatch('GetPositionList', params)
          : ''
      }
      return res
    },

    /* 获取岗位详情 */
    async GetPositionDetail({ commit }, data) {
      const res = await GetPositionDetail({
        id: data
      })
      if (res?.code === '200' && res?.data) {
        commit('SET_POSITION_DETAIL', res.data)
        commit('INIT_DIMENSION_LIST', res.data.permissionList)
        commit('INIT_ROLE_SELECTED', res.data.roleDTOList)
        commit('INIT_ROLEIDS_SELECTED', res.data.roleDTOList)
      }
    },

    /** 编辑岗位 */
    async UpdatePosition({ commit }, data) {
      const permissionList = JSON.parse(
        JSON.stringify(this.state.position.pos.positionDetail.permissionList)
      )
      const temp = []
      permissionList.forEach(item => {
        let obj = {}
        item.dimensionObj.valueList = item.contentList
        obj = item.dimensionObj
        temp.push(obj)
      })
      const params = {
        id: this.state.position.pos.positionDetail.id,
        code: this.state.position.pos.positionDetail.code,
        description: this.state.position.pos.positionDetail.description,
        fullNameEn: this.state.position.pos.positionDetail.fullNameEn,
        fullNameZh: this.state.position.pos.positionDetail.fullNameZh,
        isDeptLead: this.state.position.pos.positionDetail.isDeptLead,
        tagList: this.state.position.pos.positionDetail.tagList,
        roleDTOList: this.state.position.pos.positionDetail.roleDTOList,
        permissionList: temp,
        deptId: data
      }
      const res = await UpdatePosition(params)
      return res
    }

    /** 部门详情 */
    // async GetDeptDetail({ commit }, data) {
    // 	const res = await GetOrgDetail({
    // 		id: data
    // 	})
    // 	if (res.code === '200' && res.data) {
    // 		commit('SET_DEPT_DETAIL', res.data)
    // 	}
    // 	return res
    // },

    /** 获取下属岗位 */

    // async GetSubPosition({ commit }, data) {
    // 	const query = this.state.position.sub.query
    // 	const params = {}
    // 	for (let index in query) {
    // 		params[query[index].key] = query[index].value
    // 	}
    // 	params.positionId = data
    // 	const res_user = await GetSubPositionsUserList({
    // 		positionId: data
    // 	})
    // 	const res_pos = await GetSubPositionList(params)
    // 	if (res_pos?.code === '200' && res_pos?.data && res_user?.code === '200' && res_user?.data) {
    // 		commit('SET_SUB_USEROPTIONS', res_user.data)
    // 		commit('SET_SUB_POSITIONLIST', res_pos.data || [])
    // 		// commit('SET_SUB_PAGE', {
    // 		//   totalCount: res.total, //总条数
    // 		//   pageSize: res.pageSize, //每页多少条
    // 		//   pageSizes: [10, 20, 50, 100], //每页条数切换
    // 		//   currPage: res.pageNum, //当前页
    // 		//   layout: 'sizes, prev, pager, next, jumper',
    // 		// })
    // 	}
    // },

    // async GetAllUser({ commit }, data) {
    //   const res = await GetSubPositionsUserList({
    //     positionId: data
    //   })
    //   if (res?.code === '200' && res?.data) {
    //     commit('SET_SUB_USEROPTIONS', res.data)
    //   }
    // },

    // async UpdateSubPosition({ commit }, data) {
    //   const permissionList = data.permissionList
    //   const roleDTOListIds = data.roleDTOListIds
    //   const userDTOListIds = data.userDTOListIds
    //   const roleOptions = this.state.position.pos.roleList
    //   const userOptions = this.state.position.sub.userOptions
    //   const dimensionOptions = this.state.position.pos.dimensionOptions
    //   const leadOptions = data.leadOptions
    //   permissionList.forEach(item => {
    //     const valueList = item.valueList
    //     const valueListIds = item.valueListIds
    //     const dimension = _.find(dimensionOptions, d => {
    //       return d.id === item.id
    //     })
    //     let contentList = []
    //     contentList = dimension?.valueList?.filter(val => {
    //       if (valueListIds.includes(val.valueId)) return item
    //     })

    //     item.valueList = contentList
    //   })

    //   const userDTOList = userOptions.filter(item => {
    //     if (userDTOListIds.includes(item.id)) return item
    //   })

    //   const roleDTOList = roleOptions.filter(item => {
    //     if (roleDTOListIds.includes(item.id)) return item
    //   })

    //   const leader = _.find(leadOptions, item => {
    //     return item.id === data.chiefUserId
    //   })

    //   data.permissionList = permissionList
    //   data.userDTOList = userDTOList
    //   data.roleDTOList = roleDTOList
    //   data.chiefUserName = leader.nameZh
    //   console.log(data)
    //   // const res = await UpdatePosition(data)
    //   // return res
    // }
  }
}

export default position
