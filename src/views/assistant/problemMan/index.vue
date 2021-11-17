<template>
  <iPage>
    <div class="flex justify-between">
      <div class="content-title">{{ language('问题管理') }}</div>
      <div class="types" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            :active="helpMoudle === 'manual'"
            :name="language('问答处理')"
            @click="tabChange('manual')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'problem'"
            :name="language('问题报表')"
            @click="tabChange('problem')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'ask'"
            :name="language('模块管理')"
            @click="tabChange('ask')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'ask'"
            :name="language('标签管理')"
            @click="tabChange('ask')"
          />
        </iTabBadge>
      </div>
    </div>
    <div class="flex flex-row content mt20" v-show="helpMoudle === 'manual'">
      <!-- <CommonProblem />
			<DataManage /> -->
    </div>
    <div
      class="flex flex-column content mt20"
      v-show="helpMoudle === 'problem'"
    >
      <!-- <ProblemSearch />
			<div class="flex flex-row mt20 middle-content">
				<CommonProblem />
				<div class="right-content">
					<ProblemDetail />
				</div>
			</div> -->
    </div>
    <div class="flex flex-row content mt20" v-show="helpMoudle === 'ask'">
      我的提问
    </div>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import store from '@/store'
export default {
  data() {
    return {
      text: '问答处理',
      helpMoudle: 'manual',
    }
  },
  components: {
    iPage,
    iTabBadge,
    iTabBadgeItem
    // CommonProblem,
    // DataManage,
    // ProblemSearch,
    // ProblemDetail
  },
  mounted() {
    console.log(store.state, 'store.state')
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
