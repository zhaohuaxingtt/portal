<template>
  <iPage>
    <!-- <div class="flex justify-between"> -->
      <pageHeader class="title">
        {{language('问题管理')}}
         <div class="types" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            :active="helpMoudle === 'problemHandler'"
            :name="language('问答处理')"
            @click="tabChange('problemHandler')"
            :badge="problemHandlerCount"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'problemStatement'"
            :name="language('问题报表')"
            @click="tabChange('problemStatement')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'moduleManagement'"
            :name="language('模块管理')"
            @click="tabChange('moduleManagement')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'labelManagement'"
            :name="language('标签管理')"
            @click="tabChange('labelManagement')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'keyWordsManagement'"
            :name="language('关键词管理')"
            @click="tabChange('keyWordsManagement')"
          />
        </iTabBadge>
      </div>
        </pageHeader>
      <!-- <div class="content-title">{{ language('问题管理') }}</div> -->
     
    <!-- </div> -->
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'problemHandler'"
    >
      <ProblemHandler @changeSelfHandle="changeSelfHandle" />
    </div>
    <div
      class="flex flex-column content mt20"
      v-if="helpMoudle === 'problemStatement'"
    >
      <ProblemStatement />
    </div>
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'moduleManagement'"
    >
      <ModuleManagement />
    </div>
		<div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'labelManagement'"
    >
      <LabelManagement />
    </div>
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'keyWordsManagement'"
    >
      <KeyWordsManagement />
    </div>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import ProblemHandler from './components/problemHandler/index';
import LabelManagement from './components/labelManagement/index'
import ModuleManagement from './components/moduleManagement/index'
import ProblemStatement from './components/problemStatement/index'
import KeyWordsManagement from './components/keyWordsManagement'
import { questionUnReplyCountApi} from '@/api/assistant';
import pageHeader from '@/components/pageHeader'
import store from '@/store'
export default {
  data() {
    return {
      text: '问答处理',
      helpMoudle: 'problemHandler',
      problemHandlerCount: 0,
    }
  },
  methods: {
		tabChange(val) {
			this.helpMoudle = val
		},
    // 获取未读问题数量
    async questionUnReplyCount(selfOnly) {
      const response = await questionUnReplyCountApi(selfOnly);
      if (response?.code === '200') {
        this.problemHandlerCount = response.data;
      }
    },
    changeSelfHandle(val) {
      this.questionUnReplyCount(val);
    }
	},
  mounted() {
    console.log(store.state, 'store.state');
    this.questionUnReplyCount(0);
  },
  components: {
    iPage,
    iTabBadge,
    iTabBadgeItem,
    ProblemHandler,
    LabelManagement,
    ModuleManagement,
    ProblemStatement,
    KeyWordsManagement,
    pageHeader
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.content{
  height: 100%;
}
.content-title {
  font-weight: bold;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
</style>
