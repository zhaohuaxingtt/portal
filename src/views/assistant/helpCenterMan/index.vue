<template>
  <iPage class="main">
    <!-- <div class="flex justify-between"> -->
    <!-- <div class="content-title">用户助手管理</div> -->
    <pageHeader class="title">
      <!-- {{ language('用户助手管理') }} -->
      <iNavMvp :list="menusLevel3" :lev="1" lang router-page />

      <div class="types" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            v-for="tab in tabs"
            :key="tab.name"
            :active="activeMoudle === tab.type"
            :name="language(tab.name)"
            v-permission="tab.permissionKey"
            @click="tabChange(tab.type)"
          />
        </iTabBadge>
      </div>
    </pageHeader>
    <!-- </div> -->
    <el-tabs class="nav" v-model="activeUser" @tab-click="typeChange">
      <el-tab-pane label="内部用户" name="inner"> </el-tab-pane>
      <el-tab-pane label="供应商用户" name="supplier"> </el-tab-pane>
    </el-tabs>
    <!-- 用户手册 -->
    <div
      class="flex flex-row content"
      v-if="activeMoudle === 'manual'"
      v-permission="'ADMIN_PROCS_USER_ASSIS_manual'"
    >
      <CommonProblem
        title="问题模块"
        :moudleList="manualList"
        :currentMoudleId="manualInfo.id"
        :loading="manualInfo.loading"
        @change="moduleChange($event, 'manualInfo')"
      >
        <iInput
          slot="top"
          v-model="manualInfo.keyword"
          placeholder="搜索.."
        ></iInput>
      </CommonProblem>
      <div class="content-right" v-loading="contentLoading">
        <UserManual
          ref="manual"
          :userType="activeUser"
          :detail="manualInfo.detail"
          :qs="manualInfo.activeInfo"
          @refresh="queryManualDetail()"
        ></UserManual>
      </div>
    </div>

    <!-- 常见问题 -->
    <div
      class="flex flex-row content"
      v-if="activeMoudle === 'question'"
      v-permission="'ADMIN_PROCS_USER_ASSIS_question'"
    >
      <CommonProblem
        ref="CommonProblem2"
        title="常见问题"
        :moudleList="qsInfo.list"
        :currentMoudleId="qsInfo.id"
        :loading="qsInfo.loading"
        showIcon
        nameKey="questionTitle"
        loadmore
        :noMore="qsInfo.noMore"
        @change="moduleChange($event, 'qsInfo')"
        @onLoad="loadQs"
      >
        <div class="flex" slot="top">
          <iInput
            class="flex-1"
            v-model="qsInfo.params.keyWord"
            @keydown.native.enter="refreshQs"
            @blur="refreshQs"
            placeholder="搜索.."
          ></iInput>
          <iSelect
            class="content-select"
            v-model="qsInfo.params.questionModuleId"
            filterable
            clearable
            @change="refreshQs"
          >
            <el-option
              v-for="m in qsInfo.moduleList"
              :key="m.id"
              :value="m.id"
              :label="m.menuName"
            ></el-option>
          </iSelect>
        </div>
      </CommonProblem>
      <div class="content-right" v-loading="contentLoading">
        <Question
          ref="qs"
          :userType="activeUser"
          :detail="qsInfo.detail"
          :qs="qsInfo.activeInfo"
          @editChange="queryProblemDetail()"
          @delChange="refreshQs"
          @addChange="refreshQs"
        ></Question>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iInput, iSelect, iNavMvp } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import pageHeader from '@/components/pageHeader'
import CommonProblem from '../components/commonProblem'
import Question from './components/question'
import UserManual from './components/userManual'
import {
  queryModuleBySource,
  getUserDes,
  getProblemDetail,
  queryFaqListByPage
} from '@/api/assistant'
import { getSiblingMenus, generateMenuData } from '@/utils/menu'
export default {
  components: {
    iPage,
    iTabBadge,
    iTabBadgeItem,
    CommonProblem,
    Question,
    UserManual,
    iInput,
    iSelect,
    pageHeader,
    iNavMvp
  },
  data() {
    return {
      activeUser: 'inner',
      tabs: [
        {
          name: '用户手册',
          type: 'manual',
          permissionKey: 'ADMIN_PROCS_USER_ASSIS_manual'
        },
        {
          name: '常见问题',
          type: 'question',
          permissionKey: 'ADMIN_PROCS_USER_ASSIS_question'
        }
      ],
      activeMoudle: 'manual',
      contentLoading: false,
      manualInfo: {
        //用户手册
        detail: {},
        keyword: '',
        list: [],
        loading: false,
        id: '',
        activeInfo: {}
      },
      qsInfo: {
        //常见问题
        detail: {},
        list: [],
        loading: false,
        id: '',
        activeInfo: {},
        params: {
          pageNum: 1,
          pageSize: 20,
          keyWord: '',
          questionModuleId: ''
        },
        noMore: false,

        moduleList: []
      },
      show: false,
      key: '',
      type: ''
    }
  },
  created() {
    this.activeMoudle = this.$route.query.module || 'manual'
    this.getProbleList()
    this.queryFaqListByPage()
    this.getMenusLevel3()
    this.checkHasEnterMenu()
  },
  computed: {
    manualList() {
      if (this.manualInfo.keyword) {
        return this.manualInfo.list.filter(
          (e) => e.menuName && e.menuName.includes(this.manualInfo.keyword)
        )
      }
      return this.manualInfo.list
    },
    fullMenus() {
      return this.$store.state.permission.menuList
    },
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  methods: {
    // 用户手册-问题模块
    async getProbleList() {
      this.manualInfo.loading = true
      try {
        await queryModuleBySource(this.activeUser).then((res) => {
          if (res.code === '200') {
            this.manualInfo.list = res.data
            this.manualInfo.id = res.data[0]?.id
            if (this.manualInfo.id) {
              this.manualInfo.activeInfo = res.data[0]
              this.queryManualDetail()
            }
          }
        })
      } finally {
        this.manualInfo.loading = false
      }
    },
    // 用户手册-常见问题查询
    async queryFaqListByPage() {
      this.qsInfo.loading = true
      try {
        this.qsInfo.params.source = this.activeUser
        await queryFaqListByPage(this.qsInfo.params).then((res) => {
          if (res.code === '200') {
            let list = res.data?.records || []
            if (this.qsInfo.params.pageNum == 1 && res.data.total == 0) {
              this.qsInfo.noMore = true
              this.qsInfo.list = []
            } else {
              if (this.qsInfo.params.pageNum == 1) {
                this.qsInfo.list = list
                this.qsInfo.id = list[0]?.id
                if (this.qsInfo.id) {
                  this.qsInfo.activeInfo = list[0]
                  this.queryProblemDetail()
                }
              } else {
                this.qsInfo.list.push(...list)
              }
              if (this.qsInfo.params.pageNum >= res.data.pages) {
                this.qsInfo.noMore = true
              }
            }
          }
        })
      } finally {
        this.qsInfo.loading = false
      }
    },
    // 加载问题列表
    loadQs() {
      if (this.qsInfo.noMore) return
      this.qsInfo.params.pageNum++
      this.queryFaqListByPage()
    },
    // 刷新常见问题列表
    refreshQs() {
      this.qsInfo.params.pageNum = 1
      this.qsInfo.list = []
      this.qsInfo.noMore = false
      this.queryFaqListByPage()
    },
    // tabs切换
    tabChange(val) {
      this.$router.replace({ path: this.$route.path, query: { module: val } })
      this.activeMoudle = val
      this.activeUser = 'inner'
      this.changeReq()
    },
    changeReq() {
      if (this.activeMoudle == 'question') {
        this.qsInfo.id = ''
        this.$set(this.qsInfo, 'activeInfo', {})
        this.$set(this.qsInfo, 'detail', {})
        this.$nextTick(async () => {
          this.refreshQs()
          this.qsInfo.moduleList = await this.$refs.qs.getModuleList(
            this.activeUser
          )
        })
      } else {
        this.manualInfo.id = ''
        this.$set(this.manualInfo, 'activeInfo', {})
        this.$set(this.manualInfo, 'detail', {})
        this.getProbleList()
      }
    },
    // 用户类型切换
    typeChange(t) {
      this.activeUser = t.name
      this.qsInfo.params.keyWord = ''
      this.manualInfo.keyword = ''
      this.$nextTick(() => {
        this.changeReq()
      })
    },
    // 查询用户手册详情
    async queryManualDetail() {
      try {
        this.contentLoading = true
        let { data } = await getUserDes({
          moduleId: this.manualInfo.id,
          source: this.activeUser
        })
        this.manualInfo.detail = data || {}
      } finally {
        this.contentLoading = false
      }
    },
    // 查询问题详情
    async queryProblemDetail() {
      try {
        this.contentLoading = true
        let { data } = await getProblemDetail({ id: this.qsInfo.id })
        this.qsInfo.detail = data || {}
      } finally {
        this.contentLoading = false
      }
    },
    // 左侧问题列表change事件
    moduleChange(v, type) {
      this[type].id = v.id
      this[type].activeInfo = v
      if (type == 'manualInfo') {
        this.queryManualDetail()
        this.$refs.manual.cancel()
      } else {
        this.$refs.qs.cancel()
        this.queryProblemDetail()
      }
    },
    // 3级菜单显示
    getMenusLevel3() {
      const menus = getSiblingMenus(
        this.fullMenus,
        '/assistant/helpCenterMan',
        '/assistant/helpCenterMan'
      )
      const menusLevel3 = generateMenuData(menus, 3)
      menusLevel3.forEach((e) => {
        if (e.url === '/assistant/helpCenterMan') {
          e.activePath = '/assistant/helpCenterMan'
        }
        if (e.url === '/assistant/problemMan') {
          e.activePath = '/assistant/problemMan'
        }
      })
      this.menusLevel3 = menusLevel3
      console.log('helpCenterMan getMenusLevel3', menusLevel3)
    },
    checkHasEnterMenu() {
      const menuList = [
        {
          permissionKey: 'ADMIN_PROCS_USER_ASSIS_manual',
          url: '/assistant/helpCenterMan'
        },
        {
          permissionKey: 'ADMIN_PROCS_USER_ASSIS_question',
          url: '/assistant/helpCenterMan?module=question'
        }
      ]
      const { fullPath } = this.$route
      const menuItem = menuList.find(
        (e) =>
          e.url === fullPath || e.url + '?module=problemHandler' === fullPath
      )

      if (menuItem) {
        const permissionKey = menuItem.permissionKey
        // 入口url不在授权列表
        if (!this.whiteBtnList[permissionKey]) {
          let redirectUrl = ''
          for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i]
            if (this.whiteBtnList[menu.permissionKey]) {
              redirectUrl = menu.url
              break
            }
          }
          if (redirectUrl) {
            this.$router.push({ path: redirectUrl })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* .nav {
  font-size: 14px;
  font-weight: bold;
} */
.content-title {
  font-weight: bold;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.content-select {
  width: 150px !important;
  margin-left: 10px;
}
.content {
  width: 100%;
  flex: 1;
  // margin-top: 40px;
  overflow: hidden;
}
.content-right {
  flex: 1;
  padding: 30px 40px 20px 40px;
  margin-left: 20px;
  box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
  border-radius: 5px;
  background-color: #fff;
  overflow: auto;
}
</style>
