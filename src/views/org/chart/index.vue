<template>
  <iPage>
    <div class="search-bar">
      <searchBar
        :sources="searchSources"
        @on-search="onSearch"
        @on-clear="clearSearch"
      />
    </div>
    <div class="org-tree" v-loading="loading">
      <tree
        :org-data="orgTreeList"
        :search-item="searchItem"
        @get-user="queryCurOrgUsers"
        @search="toggleSide"
      />
    </div>
    <div class="org-users margin-top20">
      <users
        :users="curOrgUsers"
        :search-item="searchItem"
        :is-search="isSearch"
      />
    </div>
  </iPage>
</template>

<script>
import $ from 'jquery'
import { iPage } from 'rise'
import { searchBar, tree, users } from './components'
import { queryOrganizationStructure } from '@/api/organization'
import { ROOT_NODE } from './components/data'
export default {
  components: {
    iPage,
    searchBar,
    tree,
    users
  },
  data() {
    return {
      activeName: 'first',
      orgTreeList: {},
      orgUserMap: {},
      curOrgUsers: [],
      searchSources: [],
      searchSourcesMap: {},
      treeMap: {},
      loading: false,
      orginalOrgTreeList: [],
      searchItem: {}
    }
  },
  created() {
    this.queryOrgTreeList()
  },
  methods: {
    orgSort(a, b) {
      a.fullCode = a.fullCode || '0'
      b.fullCode = b.fullCode || '0'
      return a.fullCode.toLowerCase() > b.fullCode.toLowerCase() ? 1 : -1
    },
    logBtnClick: function () {
      this.$router.push('/organizationManagement/orglist')
    },
    async queryOrgTreeList() {
      this.loading = true
      const { data } = await queryOrganizationStructure({
        isVisible: true,
        queryTree: true,
        nativeOnly: true
      }).finally(() => {
        this.loading = false
      })

      if (data) {
        const newData = data.map((e) => {
          return { ...e, parentId: 0 }
        })

        const children = this.generateOrgList(newData)
        this.setChildrenProperties(children)

        this.orgTreeList = {
          ...ROOT_NODE,
          children: children
        }
        this.orginalOrgTreeList = _.cloneDeep(this.orgTreeList)

        this.orgUserMap = this.getOrgUserMap(this.orgTreeList.children, {})

        const orgSearchSources = this.getOrgSearchSources(
          this.orgTreeList.children
        )
        const userSearchSources = this.getUserSearchSources(
          this.orgTreeList.children
        )
        this.searchSources = orgSearchSources.concat(userSearchSources)
      }
    },
    generateOrgList(data) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.supDeptList && element.supDeptList.length > 0) {
          element.children = element.supDeptList
          element.children.sort((a, b) => this.orgSort(a, b))
          this.generateOrgList(element.supDeptList)
        }
      }
      return data
    },
    getNodeLeaders(nodeData) {
      const orgLeaders = []
      if (nodeData.positionList) {
        for (let i = 0; i < nodeData.positionList.length; i++) {
          const position = nodeData.positionList[i]
          if (position.isDeptLead && position.userDTOList) {
            position.userDTOList.forEach((user) => {
              /* const name = (user.nameZh || '') + '&nbsp;' + (user.nameEn || '')
              orgLeaders.push(name) */
              orgLeaders.push({
                nameZh: user.nameZh,
                nameEn: user.nameEn,
                property: user.property
              })
            })
          } else if (position.isDeptLead && position.child) {
            /* const name =
              (position.child.nameZh || '') +
              '&nbsp;' +
              (position.child.nameEn || '')
            orgLeaders.push(name) */

            orgLeaders.push({
              nameZh: position.child.nameZh,
              nameEn: position.child.nameEn,
              property: position.child.property
            })
          }
        }
      }
      return orgLeaders
    },
    getNodeElement(nodeData) {
      const leaders = this.getNodeLeaders(nodeData)
      leaders.sort((a, b) => a.property - b.property)
      const leaderElement = []
      leaders.forEach((e) => {
        leaderElement.push(`<div class="leader-user">
          <span class="leader-zh">${e.nameZh || ''}</span>
          <span class="leader-en">${e.nameEn || ''}</span>
        </div>`)
      })
      return `<div class="org-node-item" id="org-node-item--${
        nodeData.id
      }" level="${nodeData.nodeLevel}">
        <div class="org-node-name" title="${nodeData.fullCode || ''}">
          ${nodeData.fullCode || ''}
        </div>
        <div class="org-node-content">
          <div class="org-node-description">
            <div class="org-name title="${nodeData.nameZh || ''}">${
        nodeData.nameZh || ''
      }</div>
            <div class="org-name" title="${nodeData.nameEn || ''}">${
        nodeData.nameEn || ''
      }</div>
          </div>
          <div class="org-node-users">
            ${leaderElement.join('')}
          </div>
        </div> 
      </div>`
    },
    setChildrenProperties(data, parentUniqueId) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (parentUniqueId) {
          element.uniqueId = `${parentUniqueId}@@${element.id}`
        } else {
          element.uniqueId = `${element.id}`
        }

        // 刚进来时，只显示3层
        element.expanded = element.uniqueId.split('@@').length < 3 // true
        element.visible = element.uniqueId.split('@@').length <= 3 // true
        element.nodeLevel = element.uniqueId.split('@@').length
        element.hideParent = false
        if (element.children && element.children.length > 0) {
          element.childNum = element.children.length
          element.hasChild = true
        } else {
          element.childNum = 0
          element.hasChild = false
        }
        element.nodeElement = this.getNodeElement(element)
        if (element.children) {
          this.setChildrenProperties(element.children, element.uniqueId)
        }
      }
    },
    getOrgUserMap(data, res) {
      res = res || {}
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.positionList) {
          element.positionList.forEach((e) => {
            e.orgFullCode = element.fullCode
            e.deptLogo = element.deptLogo
          })

          res[element.id] = element.positionList
        }
        if (element.children) {
          this.getOrgUserMap(element.children, res)
        }
      }
      return res
    },
    queryCurOrgUsers(orgId) {
      const users = []
      if (this.orgUserMap[orgId]) {
        const positionList = this.orgUserMap[orgId]
        positionList.forEach((position) => {
          if (position.userDTOList) {
            position.userDTOList.forEach((userDTO) => {
              if (userDTO.status !== false) {
                const user = {
                  id: userDTO.id,
                  avatar: '',
                  logo: '',
                  nameZh: userDTO.nameZh,
                  nameEn: userDTO.nameEn,
                  email: userDTO.email,
                  phone: userDTO.phone,
                  userNum: userDTO.userNum,
                  isDeptLead: position.isDeptLead,
                  location: userDTO.officeLocal,
                  mobile: userDTO.mobile,
                  description: position.bussinessAreaName,
                  positionZh: position.fullNameZh,
                  positionEn: position.fullNameEn,
                  categoryNameZh: userDTO.categoryNameZh,
                  orgFullCode: position.orgFullCode,
                  deptLogo: position.deptLogo,
                  wechat: userDTO.wechat,
                  profile: userDTO.profile,
                  profileId: userDTO.profileId
                }
                if (
                  Object.keys(this.searchItem).length > 0 &&
                  this.searchItem.type === 'USER'
                ) {
                  if (this.searchItem.nameZh === user.nameZh) {
                    users.push(user)
                  }
                } else if (
                  Object.keys(this.searchItem).length > 0 &&
                  this.searchItem.type === 'POSITION'
                ) {
                  if (
                    this.searchItem.nameZh === user.positionZh ||
                    this.searchItem.nameEn === user.positionEn
                  ) {
                    users.push(user)
                  }
                } else {
                  users.push(user)
                }
              }
            })
          }
        })
      }
      this.curOrgUsers = users
    },
    getOrgSearchSources(data, res) {
      res = res || []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const orgItem = {
          nameZh: item.nameZh,
          nameEn: item.nameEn,
          id: item.id,
          parentId: item.parentId,
          type: 'ORG',
          value: '【组织】' + item.nameZh,
          positionList: item.positionList,
          uniqueId: item.uniqueId
        }
        res.push(orgItem)
        this.searchSourcesMap['ORG_' + item.id] = orgItem
        this.treeMap['ORG_' + item.id] = item
        if (item.children) {
          this.getOrgSearchSources(item.children, res)
        }
      }
      return res
    },
    getUserSearchSources(data, res) {
      res = res || []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.positionList) {
          item.positionList.forEach((position) => {
            const positionItem = {
              nameZh: position.fullNameZh,
              nameEn: position.fullNameEn,
              id: position.id,
              parentId: item.id,
              type: 'POSITION',
              value: '【岗位】' + position.fullNameZh,
              orgId: item.id,
              isDeptLead: position.isDeptLead,
              uniqueId: item.uniqueId
            }
            res.push(positionItem)
            this.searchSourcesMap['POSITION_' + position.id] = positionItem
            this.treeMap['POSITION_' + item.id] = positionItem
            if (position.userDTOList) {
              position.userDTOList.forEach((user) => {
                const userItem = {
                  nameZh: user.nameZh,
                  nameEn: user.nameEn,
                  id: user.id,
                  parentId: position.id,
                  type: 'USER',
                  value: '【人员】' + user.nameZh,
                  orgId: item.id,
                  uniqueId: item.uniqueId
                }
                res.push(userItem)
                this.searchSourcesMap['USER_' + user.id] = userItem
                this.treeMap['USER_' + item.id] = user
              })
            }
          })
        }
        if (item.children) {
          this.getUserSearchSources(item.children, res)
        }
      }
      return res
    },
    clearSearch() {
      this.searchItem = {}
      this.orgTreeList = _.cloneDeep(this.orginalOrgTreeList)
    },
    toggleSide(val) {
      if (val) {
        this.onSearch(val)
      } else {
        this.searchItem = {}
        this.clearSearch()
      }
    },
    onSearch(item) {
      this.searchItem = item

      const uniqueIdArr = item.uniqueId.split('@@')
      const orgId = uniqueIdArr[uniqueIdArr.length - 1]

      const currentBottomEdge = $('#org_node_id_' + orgId).find('.bottomEdge')
      if (currentBottomEdge) {
        currentBottomEdge.trigger('click')
      }
      for (let i = 0; i < uniqueIdArr.length; i++) {
        const id = uniqueIdArr[i]
        const nodeSide = $('#org_node_id_' + id).find('.rightEdge')
        const node = $('#org_node_id_' + id)

        const slibingNodes = node.closest('tr.nodes').find('>td').not('.hidden')
        if (slibingNodes.length > 1) {
          nodeSide.trigger('click')
        }
      }
      $('.org-node-item').removeClass('active')
      $('#org-node-item--' + orgId).addClass('active')
      this.queryCurOrgUsers(orgId)
    },
    generateSearchData(data, searchItem) {
      if (data) {
        data.forEach((e) => {
          const uniqueId = searchItem.uniqueId
          e.visible =
            e.uniqueId.length <= uniqueId.length &&
            uniqueId.includes(e.uniqueId)
          if (e.children) {
            this.generateSearchData(e.children, searchItem)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
