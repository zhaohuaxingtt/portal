<template>
  <iPage>
    <div class="flex justify-between">
      <div class="content-title">{{ language('问题管理') }}</div>
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
        </iTabBadge>
      </div>
    </div>
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'problemHandler'"
    >
      <ProblemHandler />
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
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import ProblemHandler from './components/problemHandler/index';
import LabelManagement from './components/labelManagement'
import ModuleManagement from './components/moduleManagement'
import ProblemStatement from './components/problemStatement/index'
import store from '@/store'
export default {
  data() {
    return {
      text: '问答处理',
      helpMoudle: 'problemHandler',
      problemHandlerCount: 10
    }
  },
  methods: {
		tabChange(val) {
			this.helpMoudle = val
		},
	},
  mounted() {
    console.log(store.state, 'store.state')
  },
  components: {
    iPage,
    iTabBadge,
    iTabBadgeItem,
    ProblemHandler,
    LabelManagement,
    ModuleManagement,
    ProblemStatement
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.content-title {
  font-weight: bold;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
</style>
