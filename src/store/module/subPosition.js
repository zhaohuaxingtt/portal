import {
  GetOrgDetail,
  GetSubPositionList,
  UpdateSubPosition,
  GetRoleList,
  GetSubDOptions,
  GetDeptUserList,
  GetUndistributed
} from '@/api/position'
const subPosition = {
  state: () => ({
    materialOptions: [],
    carTypeOptions: [],
    materialUndistributed: [],
    query: {
      categoryName: '',
      userNameZh: '',
      fullNameZh: ''
    },
    deptDetail: {},
    subPositionList: [],
    userOptions: [],
    roleOptions: [],
    dOptions: [],
    materialSelected: [],
    categoryOptions: [],
    getSubPositionLoading: false
  }),
  mutations: {
    SET_CATEGORY_OPTIONS: (state, data) => {
      state.categoryOptions = data
    },
    SET_CARTYPE_OPTIONS: (state, data) => {
      console.log(data)
      state.carTypeOptions = data
    },
    SET_DEPT_DETAIL: (state, data) => {
      state.deptDetail = data
    },
    /** 下属岗位分配 query */
    SET_SUB_QUERY: (state, data) => {
      state.query = data
    },
    RESET_SUB_QUERY: (state, data) => {
      state.query = { categoryName: '', userNameZh: '', fullNameZh: '' }
    },
    SET_NEW_CATEGORYOPTIONS: (state, data) => {
      const categoryOptions = _.cloneDeep(state.categoryOptions)
      categoryOptions.forEach((opt) => {
        opt.disabled = false
      })
      let materialIdsSelected = []
      data.materialList.forEach((li) => {
        li.material = li.materialItem.valueId
        materialIdsSelected.push(li.material)
      })
      materialIdsSelected = _.uniq(materialIdsSelected)
      categoryOptions.filter((d) => {
        if (materialIdsSelected.includes(d.valueId)) {
          d.disabled = true
        } else {
          d.disabled = false
        }
      })
      state.categoryOptions = categoryOptions
    },
    SET_SUB_POSITIONLIST: (state, data) => {
      // const categoryOptions = _.cloneDeep(state.categoryOptions)
      // categoryOptions.forEach(opt => {
      //   opt.disabled = false
      // })
      // let materialIdsSelected = []
      data.forEach((item) => {
        /* item.materialList =
          typeof item.materialList === 'string'
            ? JSON.parse(item.materialList)
            : item.materialList || []
        item.materialList.forEach((li) => {
          // li.material = li.materialItem.valueId
          // materialIdsSelected.push(li.material)
          li.carTypeOptions = state.carTypeOptions
          // categoryOptions.find(d => {
          //   return d.valueId === li.materialItem.valueId
          // })?.carType || []
          li.carType = li.carTypeList.map((tl) => {
            return tl.valueId
          })
        }) */
        item.isEdit = false
        item.userDTOListIds =
          item.userDTOList?.map((user) => {
            return user.id
          }) || []
        item.roleDTOListIds =
          item.roleDTOList?.map((role) => {
            return role.id
          }) || []
        item.leaderOptions = item.userDTOList || []
      })
      // materialIdsSelected = _.uniq(materialIdsSelected)
      // categoryOptions.filter(d => {
      //   if (materialIdsSelected.includes(d.valueId)) {
      //     d.disabled = true
      //   } else {
      //     d.disabled = false
      //   }
      // })
      // state.categoryOptions = categoryOptions
      state.subPositionList = data
    },
    SET_SUB_USEROPTIONS: (state, data) => {
      state.userOptions = data
    },
    SET_SUB_ROLEOPTIONS: (state, data) => {
      state.roleOptions = data
    },
    SET_SUB_DOptions: (state, data) => {
      state.dOptions = data
    },
    SET_SUB_Undistributed: (state, data) => {
      state.materialUndistributed = data
    },
    SET_GET_SUB_POSITION_LOADING: (state, data) => {
      state.getSubPositionLoading = data
    }
  },
  actions: {
    /** 部门详情 */
    async GetDeptDetail({ commit }, data) {
      const { deptId } = data
      const res = await GetOrgDetail({
        id: deptId
      })
      if (res.code === '200' && res.data) {
        const categoryOptions =
          res.data.permissionDTOList?.find((item) => {
            return item.code === 'category'
          })?.valueList || []
        const carTypeOptions =
          res.data.permissionDTOList?.find((item) => {
            return item.code === 'carType'
          })?.valueList || []
        commit('SET_DEPT_DETAIL', res.data)
        commit('SET_CATEGORY_OPTIONS', categoryOptions)
        commit('SET_CARTYPE_OPTIONS', carTypeOptions)
      }
    },

    async GetSubPosition({ commit }, data) {
      const query = this.state.subPosition.query
      const { deptId } = data
      const params = { ...query, deptId }

      commit('SET_GET_SUB_POSITION_LOADING', true)
      const res = await GetSubPositionList(params).finally(() =>
        commit('SET_GET_SUB_POSITION_LOADING', false)
      )

      if (res?.code === '200' && res?.data) {
        const subPositionList = res.data || []
        subPositionList.forEach((e) => {
          if (e && e.permissionList) {
            e.permissionList.forEach((item) => {
              if (item.valueList) {
                item.valueIds = item.valueList.map((e) => e.valueId)
              }
            })
          }
        })
        commit('SET_SUB_POSITIONLIST', subPositionList || [])
      }
    },

    async GetAllUser({ commit }, data) {
      const { deptId } = data
      const res = await GetDeptUserList({
        deptId: deptId
      })
      if (res?.code === '200' && res?.data) {
        commit('SET_SUB_USEROPTIONS', res.data)
      }
    },

    async GetRoleOptions({ commit }, data) {
      const res = await GetRoleList({})
      if (res?.code === '200' && res?.data) {
        commit('SET_SUB_ROLEOPTIONS', res.data)
      }
    },

    async GetDOptions({ commit }, data) {
      const { deptId } = data
      const res = await GetSubDOptions({ deptId: deptId })
      if (res?.code === '200' && res?.data) {
        commit('SET_SUB_DOptions', res.data)
      }
      return res
    },

    async GetUndistributed({ commit }, data) {
      const { deptId, positionId } = data
      const res = await GetUndistributed({
        deptId: deptId,
        positionId: positionId
      })
      if (res?.code === '200' && res?.data) {
        commit('SET_SUB_Undistributed', res.data)
      }
    },

    async UpdateSubPosition({ commit }, data) {
      const userDTOListIds = data.userDTOListIds
      const roleDTOListIds = data.roleDTOListIds
      const materialList = _.cloneDeep(data.materialList)
      const roleOptions = this.state.subPosition.roleOptions
      const userOptions = this.state.subPosition.userOptions
      const categoryOptions = this.state.subPosition.categoryOptions
      const carTypeOptions = this.state.subPosition.carTypeOptions
      // const dOptions = this.state.subPosition.dOptions
      const userDTOList = userOptions.filter((item) => {
        if (userDTOListIds.includes(item.id)) return item
      })
      const roleDTOList = roleOptions.filter((item) => {
        if (roleDTOListIds.includes(item.id)) return item
      })
      const leader = _.find(userOptions, (item) => {
        return item.id === data.chiefUserId
      })
      materialList.forEach((item) => {
        item.materialItem = categoryOptions.find((d) => {
          return item.material === d.valueId
        })
        item.carTypeList = carTypeOptions.filter((ct) => {
          if (item.carType.includes(ct.valueId)) return ct
        })
        // delete item.carType
        // delete item.carTypeOptions
        // delete item.material
      })
      console.log(materialList)
      data.userDTOList = userDTOList
      data.roleDTOList = roleDTOList
      data.chiefUserName = leader.nameZh
      data.materialList = JSON.stringify(materialList)
      // delete data.userDTOListIds
      // delete data.roleDTOListIds

      console.log(data)
      const res = await UpdateSubPosition(data)
      return res
    }
  }
}
export default subPosition
